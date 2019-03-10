from flask_restful import reqparse

# Parser for POST create requests
get_parser = reqparse.RequestParser()

get_parser.add_argument(
    'lifegroup',
    type=str,
    required=True,
    help="lifegroup name cannot be blank",
    location='args'
)

post_parser = reqparse.RequestParser()

post_parser.add_argument(
    'lifegroup',
    type=str,
    required=True,
    help="lifegroup name cannot be blank"
)

post_parser.add_argument(
    'text',
    type=str,
    required=True,
    help="note cannot be blank"
)

delete_parser = reqparse.RequestParser()
delete_parser.add_argument(
    'id',
    type=str,
    required=True,
    help="id cannot be blank"    
)