const User = require( '../database/user.db')

const getUser = async( id) => {
    const user = await User.getUser( id)
    return user
}

const updateUser = async( id, updates) => {

    const updatedUser =  await User.updateUser( id, updates)
    return updatedUser
}

module.exports = {
    getUser,
    updateUser
}