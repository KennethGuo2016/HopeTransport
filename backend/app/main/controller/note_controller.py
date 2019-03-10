from flask import request
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required
from .parsers.note_parsers import get_parser, post_parser, delete_parser
from ..service.note_service import get_lifegroup_notes, add_note, delete_note

class Note(Resource):
    @jwt_required
    def get(self):
        data = get_parser.parse_args()
        if data['lifegroup'] == "":
            return "lifegroup name cannot be empty", 400
        return get_lifegroup_notes(data['lifegroup'])

    @jwt_required
    def post(self):
        data = post_parser.parse_args()
        if data['lifegroup'] == "":
            return "lifegroup name cannot be empty", 400
        if data['text'] == "":
            return "note cannot be empty", 400
        return add_note(data)

    @jwt_required
    def delete(self):
        data = delete_parser.parse_args()
        if data['id'] == "":
            return "id cannot be empty", 400
        return delete_note(data['id'])