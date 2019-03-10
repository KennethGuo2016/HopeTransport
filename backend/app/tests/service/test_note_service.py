import unittest
import uuid
from unittest.mock import patch
from app import APP, DB
from app.main.model.lifegroup_model import LifegroupModel
from app.main.model.note_model import NoteModel
from app.main.service.note_service import get_lifegroup_notes, add_note, delete_note

class NoteServiceTests(unittest.TestCase):
    ############
    ## Config ##
    ############

    def setUp(self):
        APP.config['TESTING'] = True
        APP.config['DEBUG'] = False
        APP.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/transport_test'

        self.app = APP.test_client()

        DB.drop_all()
        DB.create_all()
        self.lifegoup1 = {'name': 'uq8', 'password': '123', 'email': 'uq8@gmail.com'}
        self.lifegoup2 = {'name': 'uq7', 'password': '123', 'email': 'uq7@gmail.com'}
        DB.session.add(LifegroupModel(**self.lifegoup1))
        DB.session.add(LifegroupModel(**self.lifegoup2))
        DB.session.commit()

        self.note1 = {'id': '1', 'lifegroup': 'uq8', 'text': "A and B stay at the same place"}
        self.note2 = {'id': '2', 'lifegroup': 'uq8', 'text': "C and D stay close to each other"}
        self.note3 = {'id': '3', 'lifegroup': 'uq7', 'text': "E and F want to be in the same car"}
        DB.session.add(NoteModel(**self.note1))
        DB.session.add(NoteModel(**self.note2))
        DB.session.add(NoteModel(**self.note3))
        DB.session.commit()

        self.assertFalse(APP.debug)

    def tearDown(self):
        DB.session.close()

    ###########
    ## Tests ##
    ###########

    def test_get_lifegroup_notes(self):
        notes = get_lifegroup_notes('uq8')[0]
        self.assertEquals(len(notes), 2)

    def test_add_note(self):
        data = {'lifegroup': 'uq8', 'text': 'make sure everyone get home safely'}
        self.assertEquals(add_note(data)[1], 201)

    def test_delete_note(self):
        self.assertEquals(delete_note('1')[1], 201)

    def test_delete_note_404(self):
        self.assertEquals(delete_note('10')[1], 404)