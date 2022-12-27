const express = require( 'express')
require( 'dotenv').config()

const morgan = require( 'morgan')
const { morganLogs } = require('./middlewares/morgan')

const v1Router = require( './v1/routes/index')
const v1AccountRouter = require( './v1/routes/account.routes')
const v1AuthRouter = require( './v1/routes/auth.routes')
const v1TransactionRouter = require( './v1/routes/transaction.routes')
const v1BeneficiaryRouter = require( './v1/routes/beneficiary.routes')
const v1TransferRouter = require( './v1/routes/transfer.routes')
const v1UserRouter = require( './v1/routes/user.routes')
// const v101AccountRouter = require( './v1.0.1/routes/account.routes')

const app = express()

/**
 * MIDDLEWARES
 */
app.use( morgan('dev'))
app.use( morganLogs)
app.use( express.urlencoded({extended: true}))
app.use(express.json())

/**
 * APP ROUTING
 */
 app.use( "/api/v1", v1Router);
 app.use( "/api/v1/auth", v1AuthRouter)
 app.use( '/api/v1/accounts', v1AccountRouter)
 app.use( '/api/v1/transactions', v1TransactionRouter)
 app.use( '/api/v1/beneficiaries', v1BeneficiaryRouter)
 app.use( '/api/v1/transfers', v1TransferRouter)
 app.use( '/api/v1/users', v1UserRouter)
//  app.use( '/api/v1.0.1/accounts', v101AccountRouter)

module.exports =  app