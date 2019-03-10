from flask_restful import reqparse

# Parser for POST create requests
get_parser = reqparse.RequestParser()

get_parser.add_argument(
    'name',
    type=str,
    required=True,
    help="suburb cannot be blank",
    location='args'
)