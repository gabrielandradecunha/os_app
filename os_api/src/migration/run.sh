#!/bin/bash

CONTAINER_NAME="os_app"
SQL_SCRIPT_PATH="./init.sql"
DB_USER="postgres"
DB_NAME="postgres"

docker exec -i "$CONTAINER_NAME" psql -U "$DB_USER" -d "$DB_NAME" < "$SQL_SCRIPT_PATH"

if [ $? -eq 0 ]; then
    echo "BANCO MIGRADO"
else
    echo "ERRO"
    exit 1
fi
