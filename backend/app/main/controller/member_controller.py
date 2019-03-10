from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from .parsers.member_parsers import get_parser, post_parser, put_parser, delete_parser
from ..service.member_service import get_lifegroup_members, create_member, edit_member, delete_member

class Member(Resource):
    @jwt_required
    def get(self):
        data = get_parser.parse_args()
        lifegroup = data['lifegroup']
        if lifegroup == "":
            return "lifegroup name cannot be empty", 400
        return get_lifegroup_members(lifegroup)

    def post(self):
        data = post_parser.parse_args()
        if data['name'] == "":
            return "name cannot be empty", 400
        if data['lifegroup'] == "":
            return "lifegroup name cannot be empty", 400
        if data['suburb'] == "":
            return "suburb cannot be empty", 400
        return create_member(data)

    @jwt_required
    def put(self):
        data = put_parser.parse_args()
        if data['id'] == "":
            return "member id cannot be empty", 400   
        return edit_member(data)
        
    @jwt_required
    def delete(self):
        data = delete_parser.parse_args()
        if data['id'] == "":
            return "member id cannot be empty", 400
        return delete_member(data['id'])