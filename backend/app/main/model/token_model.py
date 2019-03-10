from app import DB, MA

class TokenModel(DB.Model):
    __tablename__ = "tokens"

    id = DB.Column(DB.String(), primary_key=True)
    jti = DB.Column(DB.String(36), nullable=False)
    lifegroup = DB.Column(DB.String(20), nullable=False)
    expired_on = DB.Column(DB.DateTime, nullable=False)
    created_on = DB.Column(DB.DateTime)

class TokenSchema(MA.ModelSchema):
    class Meta:
        model = TokenModel

token_schema = TokenSchema()
tokens_schema = TokenSchema(many=True)
