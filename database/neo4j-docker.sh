#!/bin/bash

# Source the .env file if it exists
if [ -f ../.env ]; then
    source ../.env
fi

# Check if the container exists and is listed by Docker
container_exists=$(docker container ls -a --format '{{.Names}}' | grep '^castify-neo4j$')
container_running=$(docker container ls --format '{{.Names}}' | grep '^castify-neo4j$')

if [ -z "$container_exists" ]; then
    echo "Creating new Neo4j container..."
    docker run \
        -p 7474:7474 -p 7687:7687 \
        --name castify-neo4j \
        -e NEO4J_AUTH=neo4j/${NEO4J_PASSWORD:-password} \
        -e NEO4J_apoc_export_file_enabled=true \
        -e NEO4J_apoc_import_file_enabled=true \
        -e NEO4J_apoc_import_file_use__neo4j__config=true \
        -e NEO4J_PLUGINS='["apoc"]' \
        -v $HOME/neo4j/data:/data \
        -d neo4j:5.12
else
    if [ -z "$container_running" ]; then
        echo "Starting existing Neo4j container..."
        if ! docker start castify-neo4j; then
            echo "Error: Failed to start container. Try removing it with 'docker rm castify-neo4j' and run this script again."
            exit 1
        fi
    else
        echo "Neo4j container is already running"
    fi
fi

echo -e "\nContainer status:"
docker ps | grep "castify-neo4j" || echo "No container found"
