#!/bin/bash

# Check if the container exists
container_exists=$(docker ps -a | grep 'castify-neo4j')
container_running=$(docker ps | grep 'castify-neo4j')

if [ -z "$container_exists" ]; then
    docker run \             
    -p 7474:7474 -p 7687:7687 \
    --name castify-neo4j \  
    -e NEO4J_apoc_export_file_enabled=true \
    -e NEO4J_apoc_import_file_enabled=true \
    -e NEO4J_apoc_import_file_use__neo4j__config=true \
    -e NEO4J_PLUGINS=\[\"apoc\"\] \
    -v $HOME/neo4j/data:/data \
    -d neo4j 
else
    if [ -z "$container_running" ]; then
        docker start castify-neo4j
    fi
fi
