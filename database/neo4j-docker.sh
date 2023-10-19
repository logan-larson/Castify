#!/bin/bash

# Check if the container exists
container_exists=$(docker ps -a | grep 'neo4j-castify')
container_running=$(docker ps | grep 'neo4j-castify')

if [ -z "$container_exists" ]; then
    docker run --name neo4j-castify -d -p 7474:7474 -p 7687:7687 -v $HOME/neo4j/data:/data neo4j
else
    if [ -z "$container_running" ]; then
        docker start neo4j-castify
    fi
fi
