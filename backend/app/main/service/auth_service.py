import uuid
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token
from sqlalchemy import exc
from app import DB
from ..model.lifegroup_model import LifegroupModel, lifegroup_schema
from .mail_service import send_email
from .token_service import revoke_token

def login(data):
    lifegroup = LifegroupModel.query.filter_by(name=data['lifegroup']).first()

    if lifegroup is None:
        return 'lifegroup not found', 404
    if lifegroup.check_password(data['password']):
        expires = timedelta(minutes=60)
        return {
            'lifegroup': lifegroup_schema.dump(lifegroup)[0],
            'access_token': create_access_token(identity=lifegroup.name, expires_delta=expires)
        }, 200
    else:
        return 'Password is incorrect', 401

def reset_password(data):
    print(data)
    if data['password'] != data['confirm_password']:
        return 'Passwords do not much', 400
    lifegroup = LifegroupModel.query.filter_by(email=data['email']).first()
    if lifegroup is None:
        return 'lifegroup not found', 404

    if lifegroup.reset_password_code == None or lifegroup.reset_password_timestamp == None:
        return 'Reset code not available', 400
    
    # Check code has not expired
    time_elapsed = datetime.utcnow() - lifegroup.reset_password_timestamp
    if time_elapsed.days > 0:
        return 'Reset code has expired', 400

    # Check code is correct
    if lifegroup.reset_password_code != data['reset_code']:
        return 'Reset code does not match', 400
        
    lifegroup.password = data['password']
    lifegroup.reset_password_code = None

    try:
        DB.session.commit()
    except exc.SQLAlchemyError:
        return 'Something is wrong with the database. Please try again or contact support', 500
    return 'Your password has been reset', 200

def reset_password_request(email):
    lifegroup = LifegroupModel.query.filter_by(email=email).first()
    if lifegroup is None:
        return 'lifegroup not found', 404
    lifegroup.reset_password_code = str(uuid.uuid1())[0:5]
    lifegroup.reset_password_timestamp = datetime.utcnow()
    try:
        DB.session.commit()
    except exc.SQLAlchemyError as e:
        return 'Something is wrong with the database. Please try again or contact support', 500
    return send_reset_password_email(lifegroup)

def send_reset_password_email(lifegroup):
    data = {
        'from': 'hopechurchtransport@gmail.com',
        'to': lifegroup.email,
        'subject': 'Reset the password for your Hope Transport account',
        'content': '''
                    <p>Hi {0},</p>
                    <p>
                        Click 
                        <a href="http://transport-ministry1.1.s3-website-ap-southeast-2.amazonaws.com/reset-password/{1}/{2}">
                            here
                        </a>
                        to reset your Transport App password
                    </p>
                    '''.format(lifegroup.name, lifegroup.email, lifegroup.reset_password_code)
    }
    return send_email(data)