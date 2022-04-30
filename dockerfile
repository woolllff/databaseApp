FROM ubuntu 

RUN apt-get update 
RUN apt-get install python3 -y
RUN apt-get install python3-pip -y
WORKDIR /app
COPY . .
RUN pip3 install -r requirements.txt
ENTRYPOINT ["python3", "calculator.py"]

