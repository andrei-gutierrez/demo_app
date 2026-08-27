# This a
## install npm
`brew install npm`
get to the folder myapp and then
`cd smallapp`
## install
`npm install`

## run from docker
`docker run -it --rm -e ELASTIC_APM_SERVER_URL='http://host.docker.internal:1234' -e ELASTIC_APM_SECRET_TOKEN='1234' audreiev/smallapp:1.2.12`
