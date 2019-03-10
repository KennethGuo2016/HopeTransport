import uuid
from sqlalchemy import exc
from app import DB
from ..model.note_model import NoteModel, note_schema, notes_schema

def get_lifegroup_notes(lifegroup):
    notes = NoteModel.query.filter_by(lifegroup=lifegroup)
    return notes_schema.dump(notes)[0], 200

def add_note(data):
    note = NoteModel(**data)
    note.id = str(uuid.uuid1())
    try:
        DB.session.add(note)
        DB.session.commit()
    except exc.SQLAlchemyError as e:
        return 'Something is wrong with the database. Please try again or contact support', 500

    res = note_schema.dump(note)
    return res[0], 201

def delete_note(id):
    note = NoteModel.query.get(id)
    if note is None:
        return "cannot find the note", 404
    try:
        DB.session.delete(note)
        DB.session.commit()
    except exc.SQLAlchemyError as e:
        return 'Something is wrong with the database. Please try again or contact support', 500
    return "note deleted", 201    