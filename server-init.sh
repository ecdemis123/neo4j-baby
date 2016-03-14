#!/bin/bash
wget http://dist.neo4j.org/neo4j-community-3.0.0-M02-unix.tar.gz
tar -xf neo4j-community-3.0.0-M02-unix.tar.gz

sudo add-apt-repository ppa:openjdk-r/ppa
sudo apt-get update
sudo -y apt-get install openjdk-8-jdk
java -version

cd ~/neo4j-community-3.0.0-M02/
bin/neo4j start
