const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWt, esAdminRol } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorID } = require('../helpers/db-validator');

const router = Router()

// Obtener todas las categorias - público
router.get('/', obtenerCategorias )

// Obtener una categoria por id - público
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorID),    
    validarCampos
], obtenerCategoria)

// Crear una categoria - cualquier persona con un token valido
router.post('/', [ 
    validarJWt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

// Actualizar una categoria - cualquier persona con un token valido
router.put('/:id', [
    validarJWt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorID),
    validarCampos   

],actualizarCategoria)

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWt,
    esAdminRol,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorID),
    validarCampos
    
],borrarCategoria)

module.exports = router ;
