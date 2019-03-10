from flask_restful import reqparse

# Parser for POST create requests
login_parser = reqparse.RequestParser()

login_parser.add_argument(
    'lifegroup',
    type=str,
    required=True,
    help="lifegroup name cannot be blank"
)

login_parser.add_argument(
    'password',
    type=str,
    required=True,
    help="password cannot be blank"
)

reset_request_parser = reqparse.RequestParser()

reset_request_parser.add_argument(
    'email',
    type=str,
    required=True,
    help="email cannot be blank",
    location='args'
)

reset_parser = reqparse.RequestParser()

reset_parser.add_argument(
    'password',
    type=str,
    required=True,
    help="password cannot be blank"
)

reset_parser.add_argument(
    'confirm_password',
    type=str,
    required=True,
    help="confirm_password cannot be blank"
)

reset_parser.add_argument(
    'email',
    type=str,
    required=True,
    help="Email cannot be blank"
)
reset_parser.add_argument(
    'reset_code',
    type=str,
    required=True,
    help="Reset code cannot be blank"
)