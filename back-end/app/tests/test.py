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


    """
    Stress testing will be writing a user simulation to prove
    that your application can handle 100 requests per minute.
    """

    def test_request_time(self):
        """This function calculates if the average response time of the site is below 100 ms per request.
        """
        self.test_text_toxic()
        assert g.request_time <= 100

    def test_request_time_100(self):
        """This function tests if the site can handle stress: the average response time of the site should
        be below 100 ms per request, when 1000 requests are sent per second.
        """
        request_time = []
        for i in range(60):
            self.test_text_toxic()
            request_time.append(g.request_time)
        average = sum(request_time) / len(request_time)
        assert average <= 100


if __name__ == '__main__':
    unittest.main()