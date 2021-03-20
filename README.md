[![Build Status](https://travis-ci.org/tim-br/code_challenge.svg?branch=master)](https://travis-ci.org/tim-br/code_challenge)

### Instructions

```shell
$ docker-compose up
```

The app can be accessed on http://localhost:5000 on Chrome and Firefox. The app has not been fully tested on Safari -- YMMV.

### Sql Queries

Open a new terminal (or run `docker-compose` in the background) to run the sql queries.

_The db container needs to be running for these queries. Check that the containers are running with_ `docker-compose ps` _._

```shell
# gets total request count
$ docker-compose exec db /sql_queries/get_request_count.sh 
# gets request count by ip_address
$ docker-compose exec db /sql_queries/get_request_count_by_ip.sh 
```

### Tests

```shell
docker-compose exec web python manage.py test 
```