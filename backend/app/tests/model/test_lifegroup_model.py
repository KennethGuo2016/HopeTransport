import unittest

from app import APP, DB

from app.main.model import LifegroupModel

class LifegroupModelTests(unittest.TestCase):
    ############
    ## Config ##
    ############

    def setUp(self):
        APP.config['TESTING'] = True
        APP.config['DEBUG'] = False
        APP.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/transport_test'

        self.app = APP.test_client()

        self.lifegroup = {'name': 'uq8', 'password': '123', 'email': 'test@gmail.com'}

        DB.drop_all()
        DB.create_all()

        self.assertFalse(APP.debug)

    def tearDown(self):
        DB.drop_all()

    ###########
    ## Tests ##
    ###########

    def test_lifegroup_object(self):
        lg = LifegroupModel(**self.lifegroup)
        self.assertEqual(lg.name, 'uq8')

    def test_lifegroup_print(self):
        lg = LifegroupModel(**self.lifegroup)
        self.assertEqual(str(lg), '<Lifegroup %r>' % lg.name)

        