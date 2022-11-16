const {Router} = require('express');
const {check} = require('express-validator');
const { createPais, getUsuarios } = require('../controller/PaisController');
const { validarCampos } = require('../middleware/validarCampos');

const router = Router();

router.post(
  '/',
  [
    check('nombre_completo', 'El nombre es obligatorio').not().isEmpty(),
    check('country', 'El pais es obligatorio').not().isEmpty(),
    validarCampos
  ],
  createPais,
);

router.get('/', getUsuarios);

module.exports = router;
