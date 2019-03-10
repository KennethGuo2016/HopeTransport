from app import DB, MA

class NoteModel(DB.Model):
    __tablename__ = "notes"
    id = DB.Column(DB.String(), primary_key=True)
    lifegroup = DB.Column(DB.String(20), DB.ForeignKey('lifegroups.name', ondelete='CASCADE'), nullable=False)
    text = DB.Column(DB.String(), nullable=False)

    def __repr__(self):
        return '<Note %r>' % self.id

class NoteSchema(MA.ModelSchema):
    class Meta:
        model = NoteModel
        include_fk = True

note_schema = NoteSchema()
notes_schema = NoteSchema(many=True)