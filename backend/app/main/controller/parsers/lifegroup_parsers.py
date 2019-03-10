from flask_restful import reqparse

# Parser for POST create requests
post_parser = reqparse.RequestParser()

post_parser.add_argument(
    'name',
    type=str,
    required=True,
    help="lifegroup name cannot be blank"
)

post_parser.add_argument(
    'password',
    type=str,
    required=True,
    help="password cannot be blank"
)

post_parser.add_argument(
    'confirm_password',
    type=str,
    required=True,
    help="confirm password cannot be blank"
)

post_parser.add_argument(
    'email',
    type=str,
    required=True,
    help="email cannot be blank"
)

put_parser = reqparse.RequestParser()

put_parser.add_argument(
    'name',
    type=str,
    required=True,
    help="lifegroup name cannot be blank"
)

put_parser.add_argument(
    'email',
    type=str,
    required=True,
    help="email cannot be blank"
)

delete_parser = reqparse.RequestParser()

delete_parser.add_argument(
    'name',
    type=str,
    required=True,
    help="lifegroup name cannot be blank"
)