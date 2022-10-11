const User = require( '../models/user.model')
const{ find, createOne} = require( '../../../db/db.utils')

const createUser = async( newUser) => {
    //check for existing user by username or email
    const existingUser = await find(User, { email: newUser.email, username: newUser.email})
    
    if( existingUser) {
        // throw error if user already exists
        throw {
            status: 409,
            message: 'User already exists'
        }
    }

    try{
        return createOne( User, newUser)
    } catch ( error){
        throw { status: 500, message: error?.message || error}
    }
}

const findUser = async( queryObject, options=[]) => {
    // Query db for user
    const user = await find( User, queryObject, options)

    if( !user ) {
        throw {
            status: 409,
            message: "User not found"
        }
    }

    try{
        return user
    } catch ( error) {
        throw { status: 500, message: error?.message || error}
    }

}
module.exports = { 
    createUser,
    findUser
}