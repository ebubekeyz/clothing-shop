const CustomError = require('../errors')
const {isTokenValid} = require('../utils')

const authenticateUser = async(req, res, next) => {
    const token = req.signedCookies.token

    if(!token){
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
    } 
    try{
        const {name, email, state, country, street, phone, userId, role} = isTokenValid({token})
        req.user = {name, email, state, country, street, phone, userId, role}
        next()

    } catch(error){
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }
    
}

// const authenticatePermissions = (req, res, next) => {
//     if(req.user.role !== 'admin'){
//         throw new CustomError.UnauthorizedError('Not Permitted')
//     }
//     next()
// }


const authorizePermissions = (...role) => {
    return (req, res, next) => {
        if(!role.includes(req.user.role)){
            throw new CustomError.UnauthorizedError('Not Permitted')
        }
        next()
    }
}
module.exports = {
    authenticateUser,
    authorizePermissions
}