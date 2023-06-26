//Necesarios para inicio del server
const express = require('express');
const server = express();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.SERVER_HOST)
console.log(process.env.SERVER_PORT)