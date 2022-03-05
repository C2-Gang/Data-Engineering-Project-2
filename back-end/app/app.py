import time
from flask import Flask, render_template, request, jsonify, g
import json
from flask_cors import CORS, cross_origin
from detoxify import Detoxify
from prometheus_flask_exporter import PrometheusMetrics
import random
import time

app = Flask(__name__)
CORS(app,  support_credentials=True)

MODEL = Detoxify('original')

metrics = PrometheusMetrics(app)
endpoints = ("toxic")

by_path_counter = metrics.counter(
    'by_path_counter', 'Request count by request paths',
    labels={'path': lambda: request.path}
)

common_counter = metrics.counter(
    'by_endpoint_counter', 'Request count by endpoints',
    labels={'endpoint': lambda: request.endpoint}
)

summary = metrics.summary('requests_by_status', 'Request latencies by status',
                 labels={'status': lambda r: r.status_code})
histogram = metrics.histogram('requests_by_status_and_path', 'Request latencies by status and path',
                   labels={'status': lambda r: r.status_code, 'path': lambda: request.path})

@app.route('/')
def base():
    output = {'output': 'this is an expected output'}
    return jsonify(output)

def predict_toxicity(text:str):
    toxicity = MODEL.predict(text)
    toxicity['global_t'] = sum(toxicity.values())/len(list(toxicity.values()))
    keys_values = toxicity.items()

    toxicity_dict = {str(key): str(float("{:.4f}".format(value))) for key, value in keys_values}

    return toxicity_dict


def predict_text(text: str):
    """This function do toxicity prediction on a text and return the toxicity.

    :param text: text to predict
    :type text: str
    :return: tox
    :rtype: dict
    """
    if ((text == '') or (text == 'None') ):
        toxicity = 'empty ! Try again'
    else:
        toxicity = predict_toxicity(text)
    tox = {
        "text": text,
        "toxicity": toxicity}
    logging.info(tox)
    return tox

@app.route('/toxic',methods=['GET'])
@cross_origin(supports_credentials=True)
@metrics.gauge('in_progress', 'Long running requests in progress')
@by_path_counter
@common_counter
@summary
@histogram
def toxic():
    """This function retrieve the text from the user, apply on it the prediction and return the toxicity.
    :return: jsonify(toxicity)
    :rtype: json
    """
    text = str(request.args["piecetext"])
    return jsonify(predict_text(text))


@app.before_request
def before_request():
    g.start = time.time()


@app.after_request
def after_request(response):
    diff = time.time() - g.start
    g.request_time = diff
    return response


if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000",debug=False)
