from flask_restful import reqparse

get_parser = reqparse.RequestParser()

get_parser.add_argument(
    'lifegroup',
    type=str,
    required=True,
    help="lifegroup name cannot be blank",
    location='args'
)

# Parser for POST create requests
post_parser = reqparse.RequestParser()

post_parser.add_argument(
    'name',
    type=str,
    required=True,
    help="lifegroup name cannot be blank"
)

post_parser.add_argument(
    'lifegroup',
    type=str,
    required=True,
    help="lifegroup name cannot be blank"
)

post_parser.add_argument(
    'seats',
    type=int
)

post_parser.add_argument(
    'suburb',
    type=str,
    required=True,
    help="suburb cannot be blank"
)

put_parser = reqparse.RequestParser()

put_parser.add_argument(
    'id',
    type=str,
    required=True,
    help="member id cannot be blank"
)

put_parser.add_argument(
    'seats',
    type=int
)

put_parser.add_argument(
    'suburb',
    type=str
)

delete_parser = reqparse.RequestParser()

delete_parser.add_argument(
    'id',
    type=str,
    required=True,
    help="member id cannot be blank"
)