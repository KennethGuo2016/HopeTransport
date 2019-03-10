from flask import Flask
from flask_restful import Resource, Api
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_cors import CORS

# Setup the flask app
application = APP = Flask(__name__)
APP.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/transport_local'
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
APP.config['SECRET_KEY'] = "123"
APP.config['JWT_BLACKLIST_ENABLED'] = True
APP.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access']
CORS(APP)
API = Api(APP)
BCRYPT = Bcrypt(APP)
JWT = JWTManager(APP)
DB = SQLAlchemy(APP)
MA = Marshmallow(APP)
MIGRATE = Migrate(APP, DB)

from .main.service.token_service import is_token_revoked

#check if a token is blacklisted
@JWT.token_in_blacklist_loader
def check_if_token_revoked(token):
    return is_token_revoked(token)

# Import models
from .main.model import LifegroupModel, MemberModel, NoteModel

# Import Controllers
from .main.controller.lifegroup_controller import Lifegroup
from .main.controller.member_controller import Member
from .main.controller.note_controller import Note
from .main.controller.suburb_controller import Suburb
from .main.controller.auth_controller import Login, ResetPassword, Logout
# Set up routes
API.add_resource(Lifegroup, '/lifegroup')
API.add_resource(Member, '/member')
API.add_resource(Note, '/note')
API.add_resource(Suburb, '/suburb')
API.add_resource(Login, '/login')
API.add_resource(Logout, '/logout')
API.add_resource(ResetPassword, '/reset-password')

if __name__ == "__main__":
    APP.run(debug=False)