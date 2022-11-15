const { Schema ,model} = require('mongoose');

const userCountrySchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    id_country: {
        type: Number,
        required: true,
    }
});


module.exports = model('User',userCountrySchema);