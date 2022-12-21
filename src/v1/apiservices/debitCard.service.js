const DebitCard = require( '../database/debitCard.db')
const generator = require('creditcard-generator')

const  createCard = async( newCard) => {
    // generate card Number, exp date and cvv
    const debitCardNo = generator.GenCC("VISA", 1)
    const expDate = new Date(new Date().setFullYear(new Date().getFullYear() + 5))
    const cvv = Math.floor(Math.random()*(999-100+1)+100)

    cardToCreate = {
        ...newCard, 
        cardNumber: debitCardNo[0],
        expDate: expDate,
        cvv: cvv
    }

    const createdDebitCard = await DebitCard.createCard( cardToCreate)
    return createdDebitCard
}

module.exports = {
    createCard
}