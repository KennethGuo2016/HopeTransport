import unittest
import uuid
from unittest.mock import patch

from app import APP, DB

from app.main.model.lifegroup_model import LifegroupModel
from app.main.service.lifegroup_service import get_all_lifegroups, create_lifegroup, delete_lifegroup
from app.main.service.auth_service import login, reset_password, reset_password_request

class AuthServiceTests(unittest.TestCase):
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

        self.assertFalse(APP.debug)

    def tearDown(self):
        DB.session.close()

    ###########
    ## Tests ##
    ###########

    def test_login_404(self):
        data = {'lifegroup': 'uq10', 'password':'123'}
        self.assertEquals(login(data)[1], 404)

    def test_login_401(self):
        data = {'lifegroup': 'uq1', 'password':'321'}
        self.assertEquals(login(data)[1], 401)

    def test_reset_password(self):
        data = {'lifegroup': 'uq1', 'password':'321'}
        self.assertEquals(reset_password(data)[1], 200)

    def test_reset_password_404(self):
        data = {'lifegroup': 'uq10', 'password':'321'}
        self.assertEquals(reset_password(data)[1], 404)

    def test_reset_password_request_404(self):
        data = {'lifegroup': 'uq10'}
        self.assertEquals(reset_password(data)[1], 404)