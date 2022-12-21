const transactionService = require( '../apiservices/transaction.service')
const accountService = require( '../apiservices/account.service')

const createTransaction = async( req, res) => {
    // get transaction data from request body
    const { body} = req

    // check if required fields are present
    if( 
        !body.accountId ||
        !body.transactionType ||
        !body.amount ||
        !body.description
    ) {
        // return error if not all required fields are present
        res.status( 400).json({
            status: "FAILED",
            data: {
                error: "All fields are required" 
            }
        })
        return
    }

    // create new transaction object
    const newTransaction = {
        accId: body.accountId,
        type: body.transactionType,
        amount: body.amount,
        description: body.description
    }

    try {
        // Get new transaction from transaction service
        const createdTransaction = await transactionService.createTransaction( newTransaction)

        res.status( 201).json({
            status: "SUCCESS",
            data: createdTransaction
        })
    } catch (error) {
        res
          .status(error?.status || 500)
          .json({ status: "FAILED", data: { error: error?.message || error } });
    }
}

const getTransaction = async( req, res) => {
    //get id from params
    const { params: id, user} = req

    // throw error if Id is not present
    if( !id) {
        res.status( 400).json({
            status: "FAILED",
            data: {
                error: "Account not found"
            }
        })
        return
    }

    try{
        //get transaction
        const transaction = await transactionService.getTransaction( id)
        // Check if the
        const account = await accountService.getAccount( transaction.accId)

        if( account.userID != user.user){
            res.status( 403).json({
                status: "FAILED",
                data: {
                    error: "You do not have permission to access this transaction"
                }
            })
            return
        }

        //return transaction
        res.status( 200).json({
            status: "SUCCESS",
            data: {
                transaction
            }
        })
        
    } catch( error) {
        console.error(error);
        res
          .status(error?.status || 500)
          .json({ status: "FAILED", data: { error: error?.message || error } })
    }
}
module.exports = {
    createTransaction,
    getTransaction
}