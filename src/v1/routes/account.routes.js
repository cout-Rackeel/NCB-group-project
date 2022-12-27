const router = require( 'express').Router()
const accountController = require( '../controllers/account.controller')
const { validateToken } = require( '../../middlewares/auth')

router.route( '/').get(accountController.getAllAccounts)
                    .post( validateToken, accountController.createAccount)

router.route( '/:_id').get( validateToken, accountController.getAccount)
                        .patch( validateToken, accountController.updateAccount)
                        .delete( validateToken, accountController.deleteAccount)

module.exports = router