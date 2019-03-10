import uuid
from datetime import datetime
from sqlalchemy import exc
from app import DB
from ..model.lifegroup_model import LifegroupModel, lifegroup_schema, lifegroups_schema

def get_all_lifegroups():
    data = LifegroupModel.query.with_entities(LifegroupModel.name)
    lifegroups = []
    for lifegroup in data:
        if lifegroup.name != 'admin':
            lifegroups.append(lifegroup.name)
    return lifegroups, 200

def create_lifegroup(data):
    if data['password'] != data['confirm_password']:
        return 'Passwords do not much', 400
    else:
        data.pop('confirm_password')

    lifegroup = LifegroupModel(**data)
    try:
        DB.session.add(lifegroup)
        DB.session.commit()
    except exc.SQLAlchemyError as e:
        if isinstance(e, exc.IntegrityError):
            if 'lifegroups_email_key' in str(e):
                return 'That email already exists', 422
            if 'lifegroups_pkey' in str(e):
                return 'That lifegroup already exists', 422
            return 'There was a problem with the user data. Please try again or contact support', 500
        else:
            return 'Something is wrong with the database. Please try again or contact support', 500

    res = lifegroup_schema.dump(lifegroup)
    return res[0], 201

def delete_lifegroup(name):
    lifegroup = LifegroupModel.query.get(name)
    if lifegroup is None:
        return "lifegroup not found", 404
    try:
        DB.session.delete(lifegroup)
        DB.session.commit()
    except exc.SQLAlchemyError:
        return 'Something is wrong with the database. Please try again or contact support', 500
    return "lifegroup deleted", 202

def change_email_address(data):
    lifegroup = LifegroupModel.query.get(data['name'])
    if lifegroup is None:
        return "lifegroup not found", 404
    lifegroup.email = data['email']
    try:
        DB.session.commit()
    except exc.SQLAlchemyError:
        if 'lifegroups_email_key' in str(e):
            return 'That email already exists', 422
        return 'Something is wrong with the database. Please try again or contact support', 500
    return "The email is changed successfully", 200
