# Keycloak

To get help configuring Keycloak via the CLI, run:

on Linux/Unix:

    $ bin/kc.sh

on Windows:

    $ bin\kc.bat

To try Keycloak out in development mode, run:

on Linux/Unix:

    $ bin/kc.sh start-dev

on Windows:

    $ bin\kc.bat start-dev

After the server boots, open http://localhost:8080 in your web browser. The welcome page will indicate that the server is running.

To get started, check out the [configuration guides](https://www.keycloak.org/guides#server).

kc.bat -Djboss.socket.binding.port-offset=100

kc.bat start-dev

Create realm :
Pmp-realm

Create client:
// spring boot app
id: pmp-client
protocol: openid
root url: http://localhost:8081

Create role:
ROLE_ADMIN
ROLE_LANDLORD
ROLE_TENANT

Create user:
username: keycloak-admin
password: keycloak-admin

map role:

https://www.keycloak.org/docs/latest/securing_apps/#_spring_boot_adapter

Go to realmsettings:
click on OpenID Endpoint Configuration

https://codersee.com/how-to-set-up-keycloak-admin-client-with-spring-boot-and-kotlin/

https://www.tutorialsbuddy.com/keycloak-secure-spring-boot-rest-api
