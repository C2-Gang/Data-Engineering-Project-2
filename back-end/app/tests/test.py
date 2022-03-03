import unittest
from flask import g
from app import app
import ast


# Unit tests are in the form of testing the functionality of each function of your program (when applicable).

#  Integration testing will be testing combinations of functions, like clicking a button on the interface should trigger a submit function.

#  End-to-end testing would be testing the entire functionality of the system, from frontend to backend. Example: inserting toxic text into the input form and clicking the submit button returns the statistics of the toxicity of the provided text.

#class TestToxic(unittest.TestCase):
# tester toxicity


class TestApp(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.appctx = self.app.app_context()
        self.appctx.push()
        self.client = self.app.test_client()

    def tearDown(self):
        self.appctx.pop()
        self.app = None
        self.appctx = None
        self.client = None

    def test_home_page_200(self):
        """This function tests if the site is working: a test that calls the API's url and confirms a code reply of 200.
        """
        response = self.client.get('/', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    def test_text_toxic(self):
        """This function tests if the site output is correct: a test that sends a GET request to the website
        and confirms that the API returns the correct answer.
        """
        response = self.client.get('/toxic?piecetext=')
        expected_result = {"text":"","toxicity":"empty ! Try again"}
        assert ast.literal_eval(response.data.decode("utf-8")) == expected_result

        text = 'fuck you'
        response = self.client.get('/toxic?piecetext=fuck+you')
        expected_result = {"text":"fuck you",
                            "toxicity":{
                                    "identity_attack":"0.01562795",
                                    "insult":"0.953166",
                                    "obscene":"0.9929531",
                                    "severe_toxicity":"0.4578004",
                                    "threat":"0.003706825",
                                    "toxicity":"0.9977558"}}

        assert ast.literal_eval(response.data.decode("utf-8")) == expected_result


if __name__ == '__main__':
    unittest.main()