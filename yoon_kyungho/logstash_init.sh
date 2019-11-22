#!/bin/bash

cd /usr/share/logstash/bin
./logstash -f logstash-mysql.conf --path.data /usr/share/logstash/data/1
node object_storage.js