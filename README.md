# acmevideo
Docker containers (api, db and webui server) that allow searching an actor database and associated movie titles
1. create a folder called acme.
2. clone the acmevideo repo into the acme folder 
3. docker-compose down && sudo  docker-compose build && docker-compose up -d in the created acme folder
4. do a docker ps from the cli to see all three containers are running
5. edit your your /etc/hosts file contains 127.0.0.1 www.acme.com 
6. Browse to https://www.acme.com
7. enjoy your actor search 
 
