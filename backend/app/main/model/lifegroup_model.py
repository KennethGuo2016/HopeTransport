from app import DB, MA, BCRYPT
from app.main.model.member_model import MemberModel
from app.main.model.note_model import NoteModel

class LifegroupModel(DB.Model):
    __tablename__ = "lifegroups"

    name = DB.Column(DB.String(20), primary_key=True)
    email = DB.Column(DB.String(120), unique=True, nullable=False)
    password_hash = DB.Column(DB.String(100), nullable=False)
    notes = DB.relationship('NoteModel', backref='lifegroups', cascade="all, delete-orphan", passive_deletes=True)
    members = DB.relationship('MemberModel', backref='lifegroups', cascade="all, delete-orphan", passive_deletes=True)

    reset_password_code = DB.Column(DB.String(5), nullable=True)
    reset_password_timestamp = DB.Column(DB.DateTime, nullable=True)

    @property
    def password(self):
        raise AttributeError('password is a write only field')

    @password.setter
    def password(self, password):
        self.password_hash = BCRYPT.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return BCRYPT.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<Lifegroup %r>' % self.name

class LifegroupSchema(MA.ModelSchema):
    class Meta:
        model = LifegroupModel
        include_fk = True

lifegroup_schema = LifegroupSchema()
lifegroups_schema = LifegroupSchema(many=True)