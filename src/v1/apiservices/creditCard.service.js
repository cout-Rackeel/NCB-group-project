const CreditCard = require( '../database/creditCard.db')
const UserService = require( './user.service')
const generator = require('creditcard-generator')

const  createCard = async( newCard, user) => {
    // generate card Number, exp date and cvv
    const creditCardNo = generator.GenCC("VISA", 1)
    const expDate = new Date(new Date().setFullYear(new Date().getFullYear() + 5))
    const cvv = Math.floor(Math.random()*(999-100+1)+100)
    const creditLimit = Math.floor(Math.random() * 999999) + 500000


    cardToCreate = {
        ...newCard, 
        cardNumber: creditCardNo[0],
        expDate: expDate,
        cvv: cvv,
        creditLimit,
        availableBalance: creditLimit
    }

    const createdCreditCard = await CreditCard.createCard( cardToCreate)

    if( createdCreditCard) {
        // Save new credit card to user
        const userDetails = await UserService.getUser( user)
        userDetails['creditCards'].push( createdCreditCard._id)
        userDetails.save()
        
        return createdCreditCard
    }
}

const getCard = async( id) => {
    const card = await CreditCard.getCard( id)
    return card
}

const updateCard = async( id, updates) => {
    const updatedCard = await CreditCard.updateCard( id, updates)
    return updatedCard
}

module.exports = {
    createCard,
    getCard,
    updateCard
}