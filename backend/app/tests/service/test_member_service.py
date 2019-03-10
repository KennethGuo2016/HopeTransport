import unittest
import uuid
from unittest.mock import patch
from app import APP, DB
from app.main.model.lifegroup_model import LifegroupModel
from app.main.model.member_model import MemberModel
from app.main.service.member_service import get_lifegroup_members, create_member, edit_member, delete_member


class MemberServiceTests(unittest.TestCase):
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
        self.lifegoup2 = {'name': 'uq6', 'password': 'abc', 'email': 'uq6@gmail.com'}
        self.member1 = {'id': '1', 'lifegroup': 'uq8', 'name': 'Kenneth Guo', 'suburb': 'Sunnybank QLD, 4109'}
        self.member2 = {'id': '2', 'lifegroup': 'uq8', 'name': 'Ezmond Cheung', 'seats': 4, 'suburb': 'Taringa QLD, 1234'}
        self.member3 = {'id': '3', 'lifegroup': 'uq6', 'name': 'Bruno Cheung',  'suburb': 'xxxx QLD, 4321'}  
        
        DB.session.add(LifegroupModel(**self.lifegoup1))
        DB.session.add(LifegroupModel(**self.lifegoup2))
        DB.session.commit()
        DB.session.add(MemberModel(**self.member1))
        DB.session.add(MemberModel(**self.member2))
        DB.session.add(MemberModel(**self.member3))
        DB.session.commit()

        self.assertFalse(APP.debug)

    def tearDown(self):
        DB.session.close()

    ###########
    ## Tests ##
    ###########

    def test_get_lifegroup_members(self):
        members = get_lifegroup_members('uq8')
        self.assertEqual(len(members), 2)

    def test_create_member(self):
        data = {'lifegroup': 'uq8', 'name': 'Daniel',  'suburb': 'xxxx QLD, 4321'}
        res = create_member(data)
        self.assertEquals(res[1], 201)

    def test_create_member_422(self):
        data = {'lifegroup': 'uq8', 'name': 'Daniel',  'suburb': 'xxxx QLD, 4321'}
        create_member(data)
        data = {'lifegroup': 'uq8', 'name': 'Daniel',  'suburb': 'AAAA QLD, 1111'}
        res = create_member(data)
        self.assertEquals(res[1], 422)

    def test_edit_member_seats(self):
        data = {'id': '1', 'seats': 4, 'suburb': None}
        member = edit_member(data)[0]
        self.assertEquals(member['seats'], 4)

    def test_edit_member_suburb(self):
        data = {'id': '1', 'suburb': 'Brisbane', 'seats': None}
        member = edit_member(data)[0]
        self.assertEquals(member['suburb'], 'Brisbane')

    def test_edit_member_seats_suburb(self):
        data = {'id': '1', 'seats': 4, 'suburb': 'Brisbane'}
        member = edit_member(data)[0]
        self.assertEquals(member['suburb'], 'Brisbane')
        self.assertEquals(member['seats'], 4)
      
    def test_edit_member_404(self):
        data = {'id': '10', 'seats': 4}
        self.assertTrue(edit_member(data)[1], 404)

    def test_delete_member(self):
        self.assertEquals(delete_member('1')[1], 202)

    def test_delete_member_404(self):
        self.assertEquals(delete_member('10')[1], 404)


