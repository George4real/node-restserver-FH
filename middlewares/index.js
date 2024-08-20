const validaCampos = require('../middlewares/validar-campos');
const validarJWt = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validaCampos,
    ...validarJWt,
    ...validaRoles
};
