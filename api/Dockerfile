FROM python:2.7

RUN set -ex && mkdir /app
WORKDIR /app 


COPY ./*.* /app/


#RUN pip install --trusted-host pypi.python.org -r requirements.txt
RUN  pip install --upgrade pip && pip install pip-tools && pip install -r requirements.txt
 


EXPOSE 9099 

ENV NAME webserver
ENV DBHOST acmedb 
ENV DB dvdrental
ENV DBUSER admin
ENV DBPASSWORD Apples123    

CMD ["python","webserver.py"]
