#!/bin/bash

# Check if the container exists
container_exists=$(docker ps -a | grep 'castify-neo4j-1')
container_running=$(docker ps | grep 'castify-neo4j-1')

if [ -z "$container_exists" ]; then
    docker run --name neo4j -d -p 7474:7474 -p 7687:7687 -v $HOME/neo4j/data:/data castify-neo4j-1
else if [ -z "$container_running" ]; then
    docker start castify-neo4j-1
fi
