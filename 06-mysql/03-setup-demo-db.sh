#!/usr/bin/env bash

mysql -h 127.0.0.1 -u root -pddd < ./03-demo-db/schema.sql
mysqlimport -h 127.0.0.1 -u root -pddd --local demo ./03-demo-db/areas.data
mysqlimport -h 127.0.0.1 -u root -pddd --local demo ./03-demo-db/tags.data
mysqlimport -h 127.0.0.1 -u root -pddd --local demo ./03-demo-db/authors.data
mysqlimport -h 127.0.0.1 -u root -pddd --local demo ./03-demo-db/books.data
mysqlimport -h 127.0.0.1 -u root -pddd --local demo ./03-demo-db/author_books.data
