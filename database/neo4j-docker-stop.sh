#!/bin/bash

echo "Checking Neo4j container status..."
container_running=$(docker container ls --format '{{.Names}}' | grep '^castify-neo4j$')

if [ -z "$container_running" ]; then
    echo "Neo4j container is not running"
else
    echo "Stopping Neo4j container..."
    if docker stop castify-neo4j; then
        echo "Neo4j container stopped successfully"
    else
        echo "Error: Failed to stop Neo4j container"
        exit 1
    fi
fi

echo -e "\nContainer status:"
docker ps | grep "castify-neo4j" || echo "No running container found"