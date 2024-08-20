const { response } = require("express");
const role = require("../models/role");


const esAdminRol = ( req, res = response, next) => {

    if ( !req.usuario ){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin valiadr el token primero'
        })    
    }

    const { rol, nombre} = req.usuario

    if ( rol != 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer eso`
        })
    }
    next()

}

const tieneRole = ( ...roles ) => {

    return  (req, res = response, next ) => {
        
        if ( !req.usuario ){
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin valiadr el token primero'
            })    
        }

        if ( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }


        next()
    }



}

module.exports = {
    esAdminRol,
    tieneRole
};
