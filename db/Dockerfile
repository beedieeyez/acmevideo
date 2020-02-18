#
# example Dockerfile for https://docs.docker.com/engine/examples/postgresql_service/
#

FROM ubuntu

# Add the PostgreSQL PGP key to verify their Debian packages.
# It should be the same key as https://www.postgresql.org/media/keys/ACCC4CF8.asc
RUN apt-get update -y
RUN apt-get install gnupg2 wget -y
#RUN apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8

# Add PostgreSQL's repository. It contains the most recent stable release
#     of PostgreSQL, ``10``.
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" > /etc/apt/sources.list.d/pgdg.list

# Install ``python-software-properties``, ``software-properties-common`` and PostgreSQL 10
#  There are some warnings (in red) that show up during the build. You can hide
#  them by prefixing each apt-get statement with DEBIAN_FRONTEND=noninteractive
RUN  apt-get install -y gnupg2  software-properties-common postgresql-10 postgresql-client-10 postgresql-contrib-10

# Note: The official Debian and Ubuntu images automatically ``apt-get clean``
# after each ``apt-get``

ENV POSTGRES_URL postgresql://localhost:5432
ENV METRICS_URL http://localhost:9090

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=apples
# Run the rest of the commands as the ``postgres`` user created by the ``postgres-10`` package when it was ``apt-get installed``
USER postgres
# Create a PostgreSQL role named ``docker`` with ``docker`` as the password and
# then create a database `docker` owned by the ``docker`` role.
# Note: here we use ``&&\`` to run commands one after the other - the ``\``
#       allows the RUN command to span multiple lines.
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD apples
COPY ./restore/*.* /tmp/
RUN  /etc/init.d/postgresql start && psql --command "CREATE USER  docker WITH SUPERUSER PASSWORD 'docker123';" && psql --command "CREATE USER  admin WITH SUPERUSER PASSWORD 'docker123';"  &&  createdb -O  docker docker && createdb -O admin dvdrental  && pg_restore   -F t -d dvdrental /tmp/dvdrental.tar && /etc/init.d/postgresql stop





# Adjust PostgreSQL configuration so that remote connections to the
# database are possible.
RUN echo "host all  all    0.0.0.0/0  trust" >> /etc/postgresql/10/main/pg_hba.conf

# And add ``listen_addresses`` to ``/etc/postgresql/10/main/postgresql.conf``
RUN echo "listen_addresses='*'" >> /etc/postgresql/10/main/postgresql.conf

# Expose the PostgreSQL port
EXPOSE 5432

# Add VOLUMEs to allow backup of config, logs and databases
VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

# Set the default command to run when starting the container
CMD ["/usr/lib/postgresql/10/bin/postgres","-D", "/var/lib/postgresql/10/main","-c", "config_file=/etc/postgresql/10/main/postgresql.conf"]


