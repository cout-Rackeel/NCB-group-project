const User = require( '../database/user.db')
const idVerificationService = require( './idVerification.service')
const accountService = require( './account')
const debitCardService =  require( '../services/debitCard.service')
const creditCardService = require( '../services/creditCard.service')
const bcrypt = require( 'bcryptjs')
const salt = bcrypt.genSaltSync(10)
const { createAccessToken} = require( '../../../utils/token')
const savings = "63443d80b666aecc3faee5bc"
const jmd = "6344c863b666aecc3faee5c2"

const registerUser = async( newUser, password) => {
    //hash password
    encryptedPassword = await bcrypt.hash( password, salt)

    // add hashed password
    const userToCreate = {
        ...newUser,
        password: encryptedPassword
    }

    try {
        //Create user
        const createdUser = await User.createUser( userToCreate)

        await idVerificationService.verifyUser(createdUser.idVerification)
        // generate access token
        const accessToken = createAccessToken({user: createdUser._id})
        // created user account
        const newAccount = await accountService.createAccount( {userID: createdUser._id, accType: savings, currency: jmd})
        // create user debit card
        const debitCard = await debitCardService.createCard({ name: `${createdUser.firstName} ${createdUser.lastName}`})
        // create user credit card
        const creditCard =  await creditCardService.createCard( { name: `${createdUser.firstName} ${createdUser.lastName}`}, createdUser._id)

        createdUser.debitCard = debitCard._id

        createdUser.save()

        console.log( debitCard);

        

        return { createdUser, accessToken}
    } catch (error) {
        throw error
    }
}

const login = async( username, password) => {

    try {
        // get user from username
        const user = await User.findUser({username: username})

        if( user && ( await bcrypt.compare( password, user.password))){
            //generate access token
            accessToken = createAccessToken({ user: user._id})

            return { user, accessToken}
        }
        
        throw{
            status: 401, 
            message: "Invalid Credentials"
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    registerUser,
    login
}