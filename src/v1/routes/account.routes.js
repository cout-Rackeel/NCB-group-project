const router = require( 'express').Router()
const accountController = require( '../controllers/account.controller')
const { validateToken } = require( '../../middlewares/auth')

router.route( '/').get(accountController.getAllAccounts)
                    .post( validateToken, accountController.createAccountt)

router.route( '/:_id').get( validateToken, accountController.getAccountt)
                        .patch( validateToken, accountController.updateAccountt)
                        .delete( validateToken, accountController.deleteAccountt)

module.exports = router