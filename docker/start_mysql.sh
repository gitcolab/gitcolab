#!/bin/bash

/usr/bin/mysqld_safe > /dev/null 2>&1 &

RET=1
while [[ RET -ne 0 ]]; do
    sleep 1;
    mysql -e 'exit' > /dev/null 2>&1; RET=$?
done