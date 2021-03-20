[![Build Status](https://travis-ci.org/tim-br/code_challenge.svg?branch=master)](https://travis-ci.org/tim-br/code_challenge)

### Instructions

```shell
$ docker-compose up
```

The app can be accessed on http://localhost:3000 on Chrome and Firefox. The app has not been fully tested on Safari -- YMMV.

### Sql Queries

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