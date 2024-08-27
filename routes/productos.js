const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWt, esAdminRol } = require('../middlewares');
const { crearProducto, 
        obtenerProductos, 
        obtenerProducto, 
        actualizarProducto, 
        borrarProducto } = require('../controllers/productos');

const { existeCategoriaPorID, existeProductoPorID } = require('../helpers/db-validator');

const router = Router()

// Obtener todas las categorias - público
router.get('/', obtenerProductos )

// Obtener una categoria por id - público
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeProductoPorID),    
    validarCampos
], obtenerProducto)

// Crear una categoria - cualquier persona con un token valido
router.post('/', [ 
    validarJWt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorID ),
    validarCampos
], crearProducto)

// Actualizar una categoria - cualquier persona con un token valido
router.put('/:id', [
    validarJWt,
    // check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom( existeProductoPorID ),
    validarCampos    
],actualizarProducto)

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWt,
    esAdminRol,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeProductoPorID ),
    validarCampos
    
],borrarProducto)

module.exports = router ;
