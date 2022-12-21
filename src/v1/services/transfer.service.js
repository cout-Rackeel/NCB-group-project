const Transfer = require( '../database/transfer.db')
const transactionService = require( './transaction.service')
const KeyValue = require( '../database/keyValue.db')
const accountService = require( './account.service')
const transNoId = "634d78842e39785826119048"
const credit = "634d7b782e3978582611904a"
const debit = "634d7b882e3978582611904b"

const createTransfer = async( newTransfer, user) => {

    // Get new transaction ID from key value table
    const transId = await KeyValue.getOneValue( transNoId)

    const fromAccount = await accountService.getAccount( newTransfer.fromAccount)
    const toAccount = await accountService.getAccount( newTransfer.toAccount)

    // Create the transactions for the sender and recipient
    const fromTransactionObject = {
        accId: newTransfer.fromAccount,
        type: debit,
        amount: newTransfer.amount,
        description: `Transfer to ${toAccount.accNo}`
    }

    const toTransactionObject = {
        accId: newTransfer.toAccount,
        type: credit,
        amount: newTransfer.amount,
        description: `Transfer from ${fromAccount.accNo}`
    }

    const fromTransaction = await transactionService.createTransaction( fromTransactionObject)

    const toTransaction = await transactionService.createTransaction( toTransactionObject)

    // Update transaction ID to match on both sender and recipent transactions
    fromTransaction.transactionId = transId.value
    fromTransaction.save()

    toTransaction.transactionId = transId.value
    toTransaction.save()

    // Add sender and recipient transaction to transfer object
    const transferToCreate = {
        ...newTransfer,
        fromTransaction: fromTransaction._id,
        toTransaction: toTransaction._id
    }

    // Create and return the created transfer
    const createdTransfer = await Transfer.createTransfer( transferToCreate)

    return createdTransfer
}


module.exports = { 
    createTransfer
}