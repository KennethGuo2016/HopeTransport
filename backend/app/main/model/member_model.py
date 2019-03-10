from app import DB, MA

class MemberModel(DB.Model):
    __tablename__ = "members"
    id = DB.Column(DB.String(), primary_key=True)
    lifegroup = DB.Column(DB.String(), DB.ForeignKey('lifegroups.name', ondelete='CASCADE'))
    name = DB.Column(DB.String(), nullable=False)
    seats = DB.Column(DB.Integer(), default=0)
    suburb = DB.Column(DB.String(), nullable=False)

    def __repr__(self):
        return '<Member %r>' % self.name

class MemberSchema(MA.ModelSchema):
    class Meta:
        model = MemberModel
        include_fk = True

member_schema = MemberSchema()
members_schema = MemberSchema(many=True)