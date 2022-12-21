const idVerification = require( '../models/idVerification.model')
const {find, createOne, findAndDelete, getOne, updateOne} = require( '../../../db/db.utils');

const saveId = async( newId) => {
    //check for existing Id
    const existingId = await find( idVerification, {number: newId.number})

    if( existingId.length != 0){  
        // Throw error if id already exists
        throw {
            status: 409,
            message: 'Id already exists'
        }
    }

    try {
        //save id to db
        return createOne( idVerification, newId)
    } catch (error) {
        throw { status: 500, message: error?.message || error}
    }
}

const deleteId = async( queryObject) => {
    try {
        return findAndDelete( idVerification, queryObject)
    } catch (error) {
        throw { status: 500, message: error?.message || error}
    }
}

// const deleteId = async( id) => {
//     try {
//         return deleteOne( idVerification, id)
//     } catch (error) {
//         throw { status: 500, message: error?.message || error}
//     }
// }

const findId = async( queryObject) => {
    return find( idVerification, queryObject)
}

const updateId = async( id, updates) => {
    const existingId = await getOne( idVerification, id)

    if( !existingId){
        throw {
            status: 404,
            message: 'Id not found'
        }
    }

    try {
        return updateOne( idVerification, existingId, updates)
    } catch (error) {
        throw { status: 500, message: error?.message || error}
    }
}

module.exports = { saveId, deleteId, findId, updateId}