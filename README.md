# MIU AirBnB

Project for Software Engineering

1. Run Keycloak
   When we start the server for the first time, we have to set the admin user and the admin password:
   KEYCLOAK_ADMIN=admin KEYCLOAK_ADMIN_PASSWORD=admin ./bin/kc.sh start-dev
   When we start again, it is not necessary to set these variables, again. You can start the server with:
   ./bin/kc.sh start-dev
   start-dev runs the quarkus application in DEV-mode. Do not use this for Produktion.

By default, the Keycloak server is using the following ports. They are only served from the localhost loopback address 127.0.0.1:
8080 for Keycloak using HTTP

2. config server
   first setup configurations
   setup configurations for keycloak in application properties
   realm
   auth-server-url
   resource
   secret

setup configurations for database (postgres)
password
url
username

setup mail configuration
host: smtp.gmail.com
username
password
port: 587

setup server port
port: 8081

setup stripe payment configuration
secret
key:
public:
key:
webhook:
secret:

setup web client:
domain: http://localhost:3000
admin: http://localhost:8082

lastly setup path for public path and file location
upload-dir: ./src/main/resources/static
public: /src/main/resources/static

3. run server

4. run admin

5. run client
