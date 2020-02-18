FROM ubuntu

RUN apt-get update -y
RUN apt-get install gnupg2 wget -y
#RUN apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8

RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" > /etc/apt/sources.list.d/pgdg.list

RUN  apt-get install -y gnupg2  software-properties-common postgresql-10 postgresql-client-10 postgresql-contrib-10


ENV POSTGRES_URL postgresql://localhost:5432
ENV METRICS_URL http://localhost:9090

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=apples
USER postgres
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD apples
COPY ./restore/*.* /tmp/
RUN  /etc/init.d/postgresql start && psql --command "CREATE USER  docker WITH SUPERUSER PASSWORD 'docker123';" && psql --command "CREATE USER  admin WITH SUPERUSER PASSWORD 'docker123';"  &&  createdb -O  docker docker && createdb -O admin dvdrental  && pg_restore   -F t -d dvdrental /tmp/dvdrental.tar && /etc/init.d/postgresql stop





RUN echo "host all  all    0.0.0.0/0  trust" >> /etc/postgresql/10/main/pg_hba.conf

RUN echo "listen_addresses='*'" >> /etc/postgresql/10/main/postgresql.conf

EXPOSE 5432

VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

CMD ["/usr/lib/postgresql/10/bin/postgres","-D", "/var/lib/postgresql/10/main","-c", "config_file=/etc/postgresql/10/main/postgresql.conf"]


