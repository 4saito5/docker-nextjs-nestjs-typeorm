init:
	docker-compose -f ./prov/docker/docker-compose.yml up -d --build
	docker exec client yarn
	docker exec client cp -pf ./config/local.env .env
	docker exec server yarn
	docker exec server cp -pf ./config/local.env .env
#	docker compose -f ./prov/docker/docker-compose.yml exec -d client pwd
	@make migrate
	@make fresh
up:
	docker-compose -f ./prov/docker/docker-compose.yml up -d
down:
#	docker-compose -f ./prov/docker/docker-compose.yml down --rmi all --volumes --remove-orphans
	docker-compose -f ./prov/docker/docker-compose.yml down --volumes --remove-orphans
migrate:
	docker exec server yarn typeorm migration:run
drop:
	docker exec server yarn typeorm schema:drop
fresh:
	@make drop
	@make seed
seed:
	docker exec server yarn seed:run
client-dev:
	docker exec client yarn dev -H 0.0.0.0
	docker compose -f ./prov/docker/docker-compose.yml exec client yarn dev -H 0.0.0.0
#	docker compose -f ./prov/docker/docker-compose.yml exec -d client yarn dev -H 0.0.0.0
server-dev:
	docker exec server yarn start:dev
# client:
# 	docker exec -it client /bin/ash
# server:
# 	docker exec -it server /bin/ash
# $(CONTAINER)-shell:
# 	docker exec -it $(CONTAINER) /bin/ash

delete:
	docker exec client rm -rf .next
	docker exec client rm -rf node_modules
	docker exec server rm -rf dist
	docker exec server rm -rf node_modules



# define _echo3
# 	echo $1
# 	echo "test ${foo}"
# endef

# test:
# 	@$(call _echo3,x)

# docker build --no-cache --progress=plain --build-arg ENV="${ARG_ENV}" --build-arg RPAY_REGION="${ARG_RPAY_REGION}" \
#     -f ./provisioning/docker/${ARG_CONTAINER}/Dockerfile . --pull=true -t ${IMAGE_NAME}:${VERSION}
# docker tag ${IMAGE_NAME}:${VERSION} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_NAME}:${VERSION}






# up:
# 	docker-compose up -d
# build:
# 	docker-compose build --no-cache --force-rm
# laravel-install:
# 	docker exec app composer create-project --prefer-dist laravel/laravel .
# create-project:
# 	mkdir -p backend
# 	@make build
# 	@make up
# 	@make laravel-install
# 	docker exec app php artisan key:generate
# 	docker exec app php artisan storage:link
# 	docker exec app chmod -R 777 storage bootstrap/cache
# 	@make fresh
# install-recommend-packages:
# 	docker exec app composer require doctrine/dbal
# 	docker exec app composer require --dev ucan-lab/laravel-dacapo
# 	docker exec app composer require --dev barryvdh/laravel-ide-helper
# 	docker exec app composer require --dev beyondcode/laravel-dump-server
# 	docker exec app composer require --dev barryvdh/laravel-debugbar
# 	docker exec app composer require --dev roave/security-advisories:dev-master
# 	docker exec app php artisan vendor:publish --provider="BeyondCode\DumpServer\DumpServerServiceProvider"
# 	docker exec app php artisan vendor:publish --provider="Barryvdh\Debugbar\ServiceProvider"
# init:
# 	docker-compose up -d --build
# 	docker exec app composer install
# 	docker exec app cp .env.example .env
# 	docker exec app php artisan key:generate
# 	docker exec app php artisan storage:link
# 	docker exec app chmod -R 777 storage bootstrap/cache
# 	@make fresh
# remake:
# 	@make destroy
# 	@make init
# stop:
# 	docker-compose stop
# down:
# 	docker-compose down --remove-orphans
# restart:
# 	@make down
# 	@make up
# destroy:
# 	docker-compose down --rmi all --volumes --remove-orphans
# destroy-volumes:
# 	docker-compose down --volumes --remove-orphans
# ps:
# 	docker-compose ps
# logs:
# 	docker-compose logs
# logs-watch:
# 	docker-compose logs --follow
# log-web:
# 	docker-compose logs web
# log-web-watch:
# 	docker-compose logs --follow web
# log-app:
# 	docker-compose logs app
# log-app-watch:
# 	docker-compose logs --follow app
# log-db:
# 	docker-compose logs db
# log-db-watch:
# 	docker-compose logs --follow db
# web:
# 	docker exec web ash
# app:
# 	docker exec app bash
# migrate:
# 	docker exec app php artisan migrate
# fresh:
# 	docker exec app php artisan migrate:fresh --seed
# seed:
# 	docker exec app php artisan db:seed
# dacapo:
# 	docker exec app php artisan dacapo
# rollback-test:
# 	docker exec app php artisan migrate:fresh
# 	docker exec app php artisan migrate:refresh
# tinker:
# 	docker exec app php artisan tinker
# test:
# 	docker exec app php artisan test
# optimize:
# 	docker exec app php artisan optimize
# optimize-clear:
# 	docker exec app php artisan optimize:clear
# cache:
# 	docker exec app composer dump-autoload -o
# 	@make optimize
# 	docker exec app php artisan event:cache
# 	docker exec app php artisan view:cache
# cache-clear:
# 	docker exec app composer clear-cache
# 	@make optimize-clear
# 	docker exec app php artisan event:clear
# npm:
# 	@make npm-install
# npm-install:
# 	docker exec web npm install
# npm-dev:
# 	docker exec web npm run dev
# npm-watch:
# 	docker exec web npm run watch
# npm-watch-poll:
# 	docker exec web npm run watch-poll
# npm-hot:
# 	docker exec web npm run hot
# yarn:
# 	docker exec web yarn
# yarn-install:
# 	@make yarn
# yarn-dev:
# 	docker exec web yarn dev
# yarn-watch:
# 	docker exec web yarn watch
# yarn-watch-poll:
# 	docker exec web yarn watch-poll
# yarn-hot:
# 	docker exec web yarn hot
# db:
# 	docker exec db bash
# sql:
# 	docker exec db bash -c 'mysql -u $$MYSQL_USER -p$$MYSQL_PASSWORD $$MYSQL_DATABASE'
# redis:
# 	docker exec redis redis-cli
# ide-helper:
# 	docker exec app php artisan clear-compiled
# 	docker exec app php artisan ide-helper:generate
# 	docker exec app php artisan ide-helper:meta
# 	docker exec app php artisan ide-helper:models --nowrite
