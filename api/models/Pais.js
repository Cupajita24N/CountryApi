const {Schema, model} = require('mongoose');

const PaisSchema = Schema({
  nombre_completo: {
    type: String,
    required: 'El usuario es requerido',
  },
  country: {
    type: String,
    required: 'El país es requerido'
  },
});
PaisSchema.methods.toJSON = function () {
  const {__v, _id, ...resto} = this.toObject();
  resto.uid = _id;
  return resto;
};

module.exports = model('Pais', PaisSchema);
