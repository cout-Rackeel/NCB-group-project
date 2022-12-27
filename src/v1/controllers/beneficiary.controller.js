const beneficiaryService = require( '../services/beneficiary.service')

const getBeneficiary = async( req, res) => {
    const { params: id, user} = req

        // throw error if id is not present
    if( !id) {
        res.status( 400).json({
            status: "FAILED",
            data: {
                error: "Beneficiary not found"
            }
        })
        return
    }

    try{
        const beneficiary = await beneficiaryService.getBeneficiary( id, user)

        // return beneficiary
        res.status( 200).json({
            status: "SUCCESS",
            data: {
                beneficiary
            }
        })

    } catch{
        res
          .status(error?.status || 500)
          .json({ status: "FAILED", data: { error: error?.message || error } })
    }
}

const createBeneficiary = async( req, res) => {
    // get beneficiary info from request body
    const { body, user} = req

    //check if required fields are present
    if(
        !body.name ||
        !body.accNo
    ) {
        res.status( 400).json({
            status: "FAILED",
            data: {
                error: "All fields required"
            }
        })
        return
    }

    // create new beneficiary object
    const newBeneficiary = {
        name: body.name,
        accNo: body.accNo
    }

    try {
        // create beneficiary in service
        const createdBeneficiary = await beneficiaryService.createBeneficiary( newBeneficiary, user.user)

        res.status( 201).json({
            status: "SUCCESS",
            data: {
                createdBeneficiary
            }
        })
    } catch (error) {
        res
          .status(error?.status || 500)
          .json({ status: "FAILED", data: { error: error?.message || error } })
    }
}

const updateBeneficiary = async( req, res) => {
    //get id and data from request params and body
    const { body, params: id, user} = req

    // throw error if id is not present
    if( !id) {
        res.status( 400).json({
            status: "FAILED",
            data: {
                error: "Beneficiary not found"
            }
        })
        return
    }

    try {
       
        //update info in the beneficiary service
        const updatedBeneficiary = await beneficiaryService.updateBeneficiary( id, body)

        // return updated beneficiary
        res.status( 200).json({
            status: "SUCCESS",
            data: {
                updatedBeneficiary
            }
        })
    } catch (error) {
        res
          .status(error?.status || 500)
          .json({ status: "FAILED", data: { error: error?.message || error } })
    }
}

const deleteBeneficiary = async( req, res) => {
    // get id from params
    const { params: id} = req

    // throw error if id is not present
    if( !id) {
        res.status( 400).json({
            status: "FAILED",
            data: {
                error: "Beneficiary not found"
            }
        })
        return
    }

    
    try {
        // delete beneficiary from service
        await beneficiaryService.deleteBeneficiary( id)

        res.status( 204).send({
            status: "SUCCESS",
            data: {
                message: "Beneficiary deleted successfully"
            }
        })
    } catch (error) {
        res
          .status(error?.status || 500)
          .json({ status: "FAILED", data: { error: error?.message || error } })
    }
}

module.exports = {
    getBeneficiary,
    createBeneficiary,
    updateBeneficiary,
    deleteBeneficiary
}