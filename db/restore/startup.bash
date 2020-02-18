#!/bin/bash
#/usr/lib/postgresql/10/bin/postgres -D /var/lib/postgresql/10/main -c config_file=/etc/postgresql/10/main/postgresql.conf 
#/usr/lib/postgresql/10/bin/postgres -D /var/lib/postgresql/10/main -c config_file=/etc/postgresql/10/main/postgresql.conf 

service postgresql start 
pg_restore   -F t -d dvdrental /tmp/dvdrental.tar  




