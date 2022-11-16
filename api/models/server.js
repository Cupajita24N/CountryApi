const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.corsOptions = {
      origin: 'http://localhost:3000',
    };
    this.paths = {
      paisPath: '/api/pais',
    };
    this.connectDb();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use(this.paths.paisPath, require('../routes/routes'));
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors(this.corsOptions));
  }

  async connectDb() {
    await dbConnection();
  }

  startPort() {
    this.app.listen(this.port);
  }
}

module.exports = Server;
