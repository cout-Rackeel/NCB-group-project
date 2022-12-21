const transferService = require( '../apiservices/transfer.service')


const createTransfer = async( req, res) => {
    // get transfer info from request body
    const { body, user} = req

    //check if required fields are present
    if( !body.fromAccount ||
        !body.amount ||
        !body.toAccount
        ) {
            res.status( 400).json({
                status: "FAILED",
                data: {
                    error: "All fields required"
                }
            })
            return
        }

    //create new transfer object
    const newTransfer = {
        fromAccount: body.fromAccount,
        toAccount: body.toAccount,
        amount: body.amount
    }


    try {
        // create transfer in service
        const createdTransfer = await transferService.createTransfer( newTransfer, user.user)

        res.status( 201).json({
            status: "SUCCESS",
            data: {
                createdTransfer
            }
        })
    } catch (error) {
        res
          .status(error?.status || 500)
          .json({ status: "FAILED", data: { error: error?.message || error } })
    }
}



module.exports = {
    createTransfer
}