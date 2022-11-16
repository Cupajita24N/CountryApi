require('dotenv').config({override:true});
const Server = require('./models/server');

const server = new Server();

server.startPort();


