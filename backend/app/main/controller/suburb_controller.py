import requests
from flask import request,jsonify
from flask_restful import Resource, reqparse
from .parsers.suburb_parsers import get_parser

class Suburb(Resource):
    def get(self):
        suburb = get_parser.parse_args()['name']
        url = 'http://v0.postcodeapi.com.au/suburbs.json?name=' + suburb
        r = requests.get(url)
        return eval(r.text)