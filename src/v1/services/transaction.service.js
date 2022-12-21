const Transaction = require( '../database/transaction.db')
const accountService = require( './account')
const creditCardService = require( './creditCard.service')
const KeyValue = require( "../database/keyValue.db")
const transNoId = "634d78842e39785826119048"
const credit = "634d7b782e3978582611904a"

const createTransaction = async( newTransaction) => {
    //get trans id
    const transId = await KeyValue.getOneValue( transNoId)

    // get account to obtain opening balance and closing balance
    const account = await accountService.getAccount( newTransaction.accId)
    
    console.log(account);

    if( !account){
        const card = await creditCardService.getCard( newTransaction.accId)
        console.log(card);

        const openingBalance = card.availableBalance

        const closingBalance = newTransaction.type == credit ? openingBalance + newTransaction.amount : openingBalance - newTransaction.amount

        console.log( openingBalance)

        // add new values to object
        const transactionToInsert ={
            ...newTransaction,
            openingBalance: openingBalance,
            closingBalance: closingBalance,
            transactionId: transId.value
        }

        // save transaction to db
        const createdTransaction = await Transaction.createTransaction( transactionToInsert)

        // if successful
        if( createdTransaction) {
            transId.value ++
            KeyValue.updateOneValue( transNoId, transId)

            card['transactions'].push( createdTransaction._id)
            card.availableBalance = newTransaction.type == credit ? card.availableBalance + newTransaction.amount : card.availableBalance - newTransaction.amount

            card.save()

            return createdTransaction
        }
    }

    const openingBalance = account.balance

    const closingBalance =  newTransaction.type == credit ? openingBalance + newTransaction.amount : openingBalance - newTransaction.amount

    // add new values to object
    const transactionToInsert ={
        ...newTransaction,
        openingBalance: openingBalance,
        closingBalance: closingBalance,
        transactionId: transId.value
    }

    // save transaction to db
    const createdTransaction = await Transaction.createTransaction( transactionToInsert)

    // if successful
    if( createdTransaction) {
        transId.value ++
        KeyValue.updateOneValue( transNoId, transId)

        account['transactions'].push( createdTransaction._id)
        account.balance = newTransaction.type == credit ? account.balance + newTransaction.amount : account.balance - newTransaction.amount

        account.save()

        return createdTransaction
    }
}

const getTransaction = async( id) => {
    // Request transaction from db by id
    const transaction = Transaction.getTransaction( id)
    return transaction
}

module.exports = {
    createTransaction,
    getTransaction
}