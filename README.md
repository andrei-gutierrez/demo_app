# This install a small app to be monitored by elastic
## install npm
`brew install npm`
## install smallapp
get to the folder myapp and then
`cd smallapp`
install the app
`npm install`

## run from docker
assuming port 1234 is set for the APM server
```docker run -it --rm -e ELASTIC_APM_SERVER_URL='http://host.docker.internal:1234' -e ELASTIC_APM_SECRET_TOKEN='1234' audreiev/smallapp:1.2.12```
