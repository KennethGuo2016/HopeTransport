import uuid
from datetime import datetime
from sqlalchemy import exc
from app import DB
from ..model.member_model import MemberModel, member_schema, members_schema

def get_lifegroup_members(lifegroup):
    members = MemberModel.query.filter_by(lifegroup=lifegroup).all()
    return members_schema.dump(members)[0], 200

def create_member(data):
    member = MemberModel(**data)
    oldMember = MemberModel.query.filter_by(name=data['name']).filter_by(lifegroup=data['lifegroup']).all()
    if len(oldMember) >= 1:
        return 'that member already exists', 422
    member.id = str(uuid.uuid1())
    try:
        DB.session.add(member)
        DB.session.commit()
    except exc.SQLAlchemyError as e:
        return 'Something is wrong with the database. Please try again or contact support', 500

    res = member_schema.dump(member)
    return res[0], 201

def edit_member(data):
    member = MemberModel.query.get(data['id'])
    if member is None:
        return 'member not found', 404
    if data['suburb'] is not None:
        member.suburb = data['suburb']
    if data['seats'] is not None:
        member.seats = data['seats']
    try:
        DB.session.commit()
    except exc.SQLAlchemyError:
        return 'Something is wrong with the database. Please try again or contact support', 500
    res = member_schema.dump(member)
    return res[0], 200

def delete_member(id):
    member = MemberModel.query.get(id)
    if member is None:
        return 'member not found', 404
    try:
        DB.session.delete(member)
        DB.session.commit()
    except exc.SQLAlchemyError as e:
        return 'Something is wrong with the database. Please try again or contact support', 500
    return "the member is deleted", 202