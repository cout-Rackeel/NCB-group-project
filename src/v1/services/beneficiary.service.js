const Beneficiary = require( '../database/beneficiary.db')
const AccountService = require( '../services/account.service')
const UserService = require( '../services/user.service')

const getAllBeneficiaries = async() => {
    // Query db for beneficiarys
    const allBeneficiaries = await Beneficiary.getAllAcounts()
    return allBeneficiaries
}

const getBeneficiary = async( id, user) => {
    // Query db for beneficiary
    const beneficiary =  await Beneficiary.getBeneficiary( id)
    return beneficiary
}

const createBeneficiary = async( newBeneficiary, user) => {

    // get beneficiary account to get account id
    const beneficiaryAccount = await AccountService.findAccount({AccNo: newBeneficiary.AccNo})

    // add id to insert
    beneficiaryToInsert = {
        ...newBeneficiary,
        accId: beneficiaryAccount._id
    }
    // save beneficiary to db
    const createdBeneficiary = await Beneficiary.createBeneficiary( beneficiaryToInsert)

    if (createdBeneficiary){
        const userDetails = await UserService.getUser( user)
        userDetails['beneficiaries'].push( createBeneficiary._id)
        userDetails.save()

        return createdBeneficiary
    }

}

const updateBeneficiary = async( id, updates) => {
    // Query db to update record
    const updatedBeneficiary = await Beneficiary.updateBeneficiary(  id, updates)

    return updatedBeneficiary
}

const deleteBeneficiary = async( id) => {
    // Query db to delete record
    const deletedBeneficiary = await Beneficiary.deleteBeneficiary( id)
    return deletedBeneficiary
}

module.exports = { 
    getBeneficiary,
    getAllBeneficiaries,
    createBeneficiary,
    updateBeneficiary,
    deleteBeneficiary
}