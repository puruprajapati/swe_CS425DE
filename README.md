# swe_CS425DE
MIU AirBnB

Project for Software Engineering

When we start the server for the first time, we have to set the admin user and the admin password:

KEYCLOAK_ADMIN=admin KEYCLOAK_ADMIN_PASSWORD=admin ./bin/kc.sh start-dev
When we start again, it is not necessary to set these variables, again. You can start the server with:

./bin/kc.sh start-dev
start-dev runs the quarkus application in DEV-mode. Do not use this for Produktion.

By default, the Keycloak server is using the following ports. They are only served from the localhost loopback address 127.0.0.1:
8080 for Keycloak using HTTP
