import unittest

from app import APP, DB

from app.main.model import NoteModel

class LifegroupModelTests(unittest.TestCase):
    ############
    ## Config ##
    ############

    def setUp(self):
        APP.config['TESTING'] = True
        APP.config['DEBUG'] = False
        APP.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/transport_test'

        self.app = APP.test_client()

        self.note = {'id': '1', 'lifegroup': 'uq8', 'body': 'Haha make sure everyone can go home safely'}

        DB.drop_all()
        DB.create_all()

        self.assertFalse(APP.debug)

    def tearDown(self):
        DB.drop_all()

    ###########
    ## Tests ##
    ###########

    def test_note_object(self):
        note = NoteModel(**self.note)
        self.assertEqual(note.id, '1')
        self.assertEqual(note.lifegroup, 'uq8')
        self.assertEqual(note.body, "Haha make sure everyone can go home safely")

    def test_note_print(self):
        note = NoteModel(**self.note)
        self.assertEqual(str(note), '<Note %r>' % note.id)