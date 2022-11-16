const {response, request } = require('express');
const Pais = require('../models/Pais');

const createPais = async( req, resp = response ) => {
    const { nombre_completo, country } = req.body;
    const pais = new Pais({nombre_completo, country});
    await pais.save();
    resp.json({
        msg: 'Exito',
        pais
    })
}

const getUsuarios = async (req = request, resp = response) => {
    const {limite = 25, desde = 0} = req.query;
    const response = await  Pais.find().limit(limite).skip(desde);
    resp.json(response);
  };

module.exports = {createPais, getUsuarios}