import unittest
import uuid
from unittest.mock import patch

from app import APP, DB

from app.main.model import LifegroupModel, MemberModel, NoteModel
from app.main.service.lifegroup_service import get_all_lifegroups, create_lifegroup, delete_lifegroup, change_email_address


class LifegroupServiceTests(unittest.TestCase):
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

        self.lifegoup1 = {'name': 'uq1', 'password': '123', 'email': 'uq1@gmail.com'}
        self.lifegoup2 = {'name': 'uq2', 'password': 'abc', 'email': 'uq2@gmail.com'}
        self.lifegoup3 = {'name': 'uq3', 'password': '321', 'email': 'uq3@gmail.com'}

        DB.session.add(LifegroupModel(**self.lifegoup1))
        DB.session.add(LifegroupModel(**self.lifegoup2))
        DB.session.add(LifegroupModel(**self.lifegoup3))
        DB.session.commit()

        self.member1 = {'id': '1', 'lifegroup': 'uq1', 'name': 'Kenneth Guo', 'suburb': 'Sunnybank QLD, 4109'}
        self.member2 = {'id': '2', 'lifegroup': 'uq2', 'name': 'Ken Guo', 'suburb': 'Sunnybank QLD, 4109'}
        self.note1 = {'id': '1', 'lifegroup': 'uq1', 'text': "A and B stay at the same place"}
        self.note2 = {'id': '2', 'lifegroup': 'uq2', 'text': "C and D stay at the same place"}
        DB.session.add(MemberModel(**self.member1))
        DB.session.add(MemberModel(**self.member2))
        DB.session.add(NoteModel(**self.note1))
        DB.session.add(NoteModel(**self.note2))
        DB.session.commit()
        self.assertFalse(APP.debug)

    def tearDown(self):
        DB.session.close()

    ###########
    ## Tests ##
    ###########

    def test_get_all_lifegroups(self):
        lifegroups = get_all_lifegroups()[0]
        self.assertEqual(len(lifegroups), 3)
    
    def test_create_lifegroup(self):
        lifegroup = {'name': 'uq4', 'password': '888', 'confirm_password':'888', 'email': 'uq4@gmail.com'}
        res = create_lifegroup(lifegroup)
        self.assertEquals(res[1], 201)

    def test_create_lifegroup_400(self):
        lifegroup = {'name': 'uq4', 'password': '888', 'confirm_password':'778', 'email': 'uq4@gmail.com'}
        res = create_lifegroup(lifegroup)
        self.assertEquals(res[1], 400)

    def test_create_lifegroup_422_email(self):
        lifegroup = {'name': 'uq4', 'password': '888', 'confirm_password':'888', 'email': 'uq1@gmail.com'}
        res = create_lifegroup(lifegroup)
        self.assertEquals(res[1], 422)

    def test_create_lifegroup_422_name(self):
        lifegroup = {'name': 'uq3', 'password': '888', 'confirm_password':'888', 'email': 'test@gmail.com'}
        res = create_lifegroup(lifegroup)
        self.assertEquals(res[1], 422)

    def test_delete_lifegroup(self):
        self.assertEquals(delete_lifegroup('uq1')[1], 202)
        

    def test_delete_lifegroup_cascade_member(self):
        lg = LifegroupModel.query.get('uq1')
        DB.session.delete(lg)
        DB.session.commit()
        self.assertEquals(MemberModel.query.get('1'), None)
        self.assertTrue(MemberModel.query.get('2') is not None)

    def test_delete_lifegroup_cascade_note(self):
        lg = LifegroupModel.query.get('uq1')
        DB.session.delete(lg)
        DB.session.commit()
        self.assertEquals(NoteModel.query.get('1'), None)
        self.assertTrue(NoteModel.query.get('2') is not None)
        

    def test_delete_lifegroup_404(self):
        self.assertEquals(delete_lifegroup('uq10')[1], 404)

    def test_change_email_address(self):
        data = {'name': 'uq3', 'email': '3@gmail.com'}
        self.assertEquals(change_email_address(data)[1], 200)

    def test_change_email_address_404(self):
        data = {'name': 'uq30', 'email': '3@gmail.com'}
        self.assertEquals(change_email_address(data)[1], 404)
        
    

    