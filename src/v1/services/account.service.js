const Account = require("../database/account.db")
const KeyValue = require( "../database/keyValue.db")
const accNoId = "63443741b666aecc3faee5b1"

const getAllAcounts = async() => {
    // Query db for accounts
    const allAccounts = await Account.getAllAcounts()
    return allAccounts
}

const getAccount = async( id, user) => {
    // Query db for account
    const account =  await Account.getAccount( id)
    return account
}

const createAccount = async( newAccount) => {
    // Get acc #
    const accNo = await KeyValue.getOneValue( accNoId)


    //insert account #
    const accountToInsert = {
        ...newAccount,
        accNo: accNo.value
    }

    // save account to db
    const createdAccount = await Account.createAccount( accountToInsert)

    // if successful
    if( createdAccount) {
        accNo.value ++
        KeyValue.updateOneValue( accNoId, accNo)

        return createdAccount
    }
}

const updateAccount = async( id, updates) => {
    // Query db to update record
    const updatedAccount = await Account.updateAccount(  id, updates)

    return updatedAccount
}

const deleteAccount = async( id) => {
    // Query db to delete record
    const deletedAccount = await Account.deleteAccount( id)

    return deletedAccount
}

module.exports = { 
    getAccount,
    getAllAcounts,
    createAccount,
    updateAccount,
    deleteAccount
}