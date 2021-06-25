#!/bin/sh

set -a
source .env
set +a

PROJECT_FOLDER=$(cd "$(dirname "$0")";pwd);

envsubst < "$PROJECT_FOLDER/template/api-config-custom.template" > "$PROJECT_FOLDER/apis/config/custom.js";
envsubst < "$PROJECT_FOLDER/template/docker-compose.traefik.template" > "$PROJECT_FOLDER/docker-compose.traefik.yml";
envsubst < "$PROJECT_FOLDER/template/nginx.template" > "$PROJECT_FOLDER/nginx.conf";
