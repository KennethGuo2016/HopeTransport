from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from .parsers.lifegroup_parsers import post_parser, put_parser, delete_parser
from ..service.lifegroup_service import get_all_lifegroups, create_lifegroup, delete_lifegroup, change_email_address

class Lifegroup(Resource):

    def get(self):
        return get_all_lifegroups()

    def post(self):
        data = post_parser.parse_args()
        if data['name'] == "":
            return "lifegroup name cannot be empty", 400
        if data['password'] == "":
            return "password cannot be empty", 400
        if data['confirm_password'] == "":
            return "password cannot be empty", 400
        if data['email'] == "":
            return "email cannot be empty", 400
        return create_lifegroup(data)

    def put(self):
        data = put_parser.parse_args()
        if data['name'] == "":
            return "lifegroup cannot be empty", 400
        if data['email'] == "":
            return "email cannot be empty", 400
        return change_email_address(data)

    @jwt_required
    def delete(self):
        user = get_jwt_identity()
        if user != "admin":
            return "forbidden content", 403
        data = delete_parser.parse_args()
        if data['name'] == "":
            return "lifegroup name cannot be empty", 400
        return delete_lifegroup(data['name'])