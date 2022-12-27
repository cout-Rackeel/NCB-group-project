const User = require('../models/user.model')
const Account = require("../models/account.model")
const KeyValue = require( "../models/keyValue.model")
const accNoId = "63443741b666aecc3faee5b1"

const getAllAccounts = async( req, res) => {

    try {
        //get all accounts from service
        const allAccounts = await Account.find()

        // return all accounts
        res.status(200).json({
            status: "OK",
            data: allAccounts
        })
    } catch (error) {
        console.error(error);
        res
          .status(error?.status || 500)
          .json({ status: "FAILED", data: { error: error?.message || error } })
    }   
}

const getAccount = async( req, res) => {
    //get id and data from request params and body
    const { params: id, user} = req

    // throw error if id is not present
    if( !id) {
        res.status( 400).json({
            status: "FAILED",
            data: {
                error: "Account not found"
            }
        })
        return
    }

    try {
        // get one account
        const account = await Account.findById(id)

        if( account.userID != user.user){
            res.status( 403).json({
                status: "FAILED",
                data: {
                    error: "You do not have permission to access this account"
                }
            })
            return
        }
        // return account
        res.status( 200).json({
            status: "SUCCESS",
            data: {
                account
            }
        })
    } catch (error) {
        console.error(error);
        res
          .status(error?.status || 500)
          .json({ status: "FAILED", data: { error: error?.message || error } })
    }
    
}

const createAccount = async( req, res) => {
    // get account info from request body
    const { body} = req

    //check if required fields are present
    if(
        !body.userID ||
        !body.accType ||
        !body.currency
    ) {
        res.status( 400).json({
            status: "FAILED",
            data: {
                error: "All fields required"
            }
        })
        return
    }

    // create new account object
    const newAccount = {
        userID: body.userID,
        accType: body.accType,
        currency: body.currency
    }

    try {
        // create account in service
        const accNo = await KeyValue.findById( accNoId)


        //insert account #
        const accountToInsert = {
            ...newAccount,
            accNo: accNo.value
        }
    
        // save account to db
        const createdAccount = await Accountmodel.create( accountToInsert)
    
        // if successful
        if( createdAccount) {
            accNo.value ++
            KeyValue.findByIdAndUpdate( accNoId, accNo,{returnDocument: 'after'})
    

            accountOwner = await User.findById(createdAccount.userID)

            accountOwner['accounts'].push( createdAccount._id)
    
            accountOwner.save()
        }

        res.status( 201).json({
            status: "SUCCESS",
            data: {
                createdAccount
            }
        })
    } catch (error) {
        res
          .status(error?.status || 500)
          .json({ status: "FAILED", data: { error: error?.message || error } })
    }
    
}

const updateAccount = async( req, res) => {
    //get id and data from request params and body
    const { body, params: id, user} = req

    // throw error if id is not present
    if( !id) {
        res.status( 400).json({
            status: "FAILED",
            data: {
                error: "Account not found"
            }
        })
        return
    }

    try {
        // get one account
        const account = await Account.findOne( id)

        if( account.userID != user.user){
            res.status( 403).json({
                status: "FAILED",
                data: {
                    error: "You do not have permission to access this account"
                }
            })
            return
        }
        //update info in the account service
        const updatedAccount = await Account.findByIdAndUpdate( id, body)

        // return updated account
        res.status( 200).json({
            status: "SUCCESS",
            data: {
                updatedAccount
            }
        })
    } catch (error) {
        res
          .status(error?.status || 500)
          .json({ status: "FAILED", data: { error: error?.message || error } })
    }
}

const deleteAccount = async( req, res) => {
    // get id from params
    const { params: id} = req

    // throw error if id is not present
    if( !id) {
        res.status( 400).json({
            status: "FAILED",
            data: {
                error: "Account not found"
            }
        })
        return
    }

    
    try {

        // get one account
        const account = await Account.find( id)

        if( account.userID != user.user){
            res.status( 403).json({
                status: "FAILED",
                data: {
                    error: "You do not have permission to access this account"
                }
            })
            return
        }

        // delete account from service
        await Account.findByIdAndRemove(id)

        res.status( 204).send({
            status: "SUCCESS",
            data: {
                message: "Account deleted successfully"
            }
        })
    } catch (error) {
        res
          .status(error?.status || 500)
          .json({ status: "FAILED", data: { error: error?.message || error } })
    }
}

module.exports = { 
    getAllAccounts,
    getAccount,
    createAccount,
    updateAccount,
    deleteAccount
 }