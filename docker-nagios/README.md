## Docker-Nagios  [![Docker Build Status](http://72.14.176.28/cpuguy83/nagios)](https://registry.hub.docker.com/u/cpuguy83/nagios)

Basic Docker image for running Nagios.<br />
This is running Nagios 3.5.1

You should either link a mail container in as "mail" or set MAIL_SERVER, otherwise
mail will not work.

### Knobs ###
- NAGIOSADMIN_USER=nagiosadmin
- NAGIOSAMDIN_PASS=nagios

### Building ###
sudo docker build --force-rm=true -t bpradipt/nagios_ipmi .

### Running ###
Nagios container mapped to the host IP (0.0.0.0) and port no (80)

$sudo docker run -d -t -p 80:80 image

#Configuration
sudo docker exec -it container_id bash


### Web UI ###
The Nagios Web UI is available on port 80 of the container<br />




