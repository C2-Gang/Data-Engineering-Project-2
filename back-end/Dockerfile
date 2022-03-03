FROM python:3.7
RUN mkdir /app
COPY app/app.py /app
COPY requirements.txt /app
WORKDIR /app
RUN pip --no-cache-dir install torch
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000:5000

CMD [ "python", "app.py"]