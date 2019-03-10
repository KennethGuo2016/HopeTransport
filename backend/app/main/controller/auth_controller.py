"""
Authentication and token endpoints
"""
from flask import request
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from .parsers.auth_parsers import login_parser, reset_parser, reset_request_parser
from ..service.auth_service import login, reset_password, reset_password_request, revoke_token

class Login(Resource):
    def post(self):
        data = login_parser.parse_args()
        if data['lifegroup'] == "":
            return 'lifegroup unit cannot be blank', 400
        if data['password'] == "":
            return 'password cannot be blank', 400
        return login(data)

class Logout(Resource):
    @jwt_required
    def get(self):
        return revoke_token()

class ResetPassword(Resource):
    def get(self):
        data = reset_request_parser.parse_args()
        email = data['email']
        if not email:
            return 'Email address cannot be blank', 400
        return reset_password_request(email)

    def post(self):
        data = reset_parser.parse_args()
        if data['password'] == "":
            return 'password cannot be blank', 400
        if data['confirm_password'] == "":
            return 'confirm_password cannot be blank', 400
        return reset_password(data)