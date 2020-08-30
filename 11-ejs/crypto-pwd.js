#!/usr/bin/env node

const {cryptoPwd} = require('./service/admins.js');

const pwd = process.argv[2];

console.log(cryptoPwd(pwd));
