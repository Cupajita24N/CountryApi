const mongoose = require('mongoose');
const opt = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const dbConnection = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_CNN, opt);
      console.log('Base de datos conectada');
    } catch (error) {
      console.log(error);
      throw new Error('Error en la conexion');
    }
  };


  module.exports = {dbConnection}