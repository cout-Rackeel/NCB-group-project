const idVerification = require( '../database/idVerification.db')
/**
 * 
 * @param {Object} newId 
 * @returns ID saved to DB
 */
const saveNewId = async( newId) => {
        // Query db to save id
        const savedId = await idVerification.saveId( newId)
        return savedId
    
}
const findId = async( queryObject) => {
        //query db to find id
        const id = await idVerification.findId( queryObject)
        return id
}

/**
 * 
 * @param {Object} queryObject An object with mongo query
 * @returns {Object} the deleted document
 */
const deleteIdonFail = async( queryObject) => {
        //query db to delete id
        const deletedId = await idVerification.deleteId( queryObject)
        return deletedId
}

const verifyUser = async( id) => {
        const userId = await idVerification.updateId( id, { userCreated: true})
        return userId
}

module.exports = { saveNewId, deleteIdonFail, findId, verifyUser}