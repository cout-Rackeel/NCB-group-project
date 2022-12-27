
const { getAllAcounts , getAccount , updateAccount , createAccount , findAccount, deleteAccount} = require( '../apiservices/account.service')

const getAllAccounts = async( req, res) => {

    try {
        //get all accounts from service
        const allAccounts = await getAllAcounts()

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

const getAccountt = async( req, res) => {
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
        const account = await getAccount( id)

        if( userID != user.user){
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

const createAccountt = async( req, res) => {
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
        const createdAccount = await createAccount( newAccount)

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

const updateAccountt = async( req, res) => {
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
        const account = await getAccount( id)

        if( userID != user.user){
            res.status( 403).json({
                status: "FAILED",
                data: {
                    error: "You do not have permission to access this account"
                }
            })
            return
        }
        //update info in the account service
        const updatedAccount = await updateAccount( id, body)

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

const deleteAccountt = async( req, res) => {
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
        const account = await getAccount( id)

        if( userID != user.user){
            res.status( 403).json({
                status: "FAILED",
                data: {
                    error: "You do not have permission to access this account"
                }
            })
            return
        }

        // delete account from service
        await deleteAccount( id)

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
    getAccountt,
    createAccountt,
    updateAccountt,
    deleteAccountt
 }