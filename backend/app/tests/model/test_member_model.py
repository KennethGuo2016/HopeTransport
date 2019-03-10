import unittest

from app import APP, DB

from app.main.model import MemberModel

class MemberModelTests(unittest.TestCase):
    ############
    ## Config ##
    ############

    def setUp(self):
        APP.config['TESTING'] = True
        APP.config['DEBUG'] = False
        APP.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/transport_test'

        self.app = APP.test_client()

        self.member = {'id': '123', 'name': 'Kenneth', 'suburb': 'Sunnybank, QLD 4109'}

        DB.drop_all()
        DB.create_all()

        self.assertFalse(APP.debug)

    def tearDown(self):
        DB.drop_all()

    ###########
    ## Tests ##
    ###########

    def test_member_object(self):
        member = MemberModel(**self.member)
        self.assertEqual(member.id, '123')

    def test_member_print(self):
        member = MemberModel(**self.member)
        self.assertEqual(str(member), '<Member %r>' % member.name)

        