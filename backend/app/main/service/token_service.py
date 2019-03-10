import uuid
from datetime import datetime
from flask_jwt_extended import get_jwt_identity, decode_token, get_raw_jwt
from sqlalchemy import exc
from app import DB, JWT
from ..model.token_model import TokenModel, token_schema, tokens_schema

def revoke_token():
    decoded_token = get_raw_jwt()
    token_data = TokenModel()

    token_data.id = str(uuid.uuid1())
    token_data.jti = decoded_token['jti']
    token_data.lifegroup = get_jwt_identity()

    token_data.expired_on = datetime.fromtimestamp(decoded_token['exp'])
    token_data.created_on = datetime.utcnow()

    DB.session.add(token_data)
    DB.session.commit()

def is_token_revoked(decoded_token):
    jti = decoded_token['jti']

    try:
        token = TokenModel.query.filter_by(jti=jti).one()

        return True
    except exc.SQLAlchemyError:
        return False