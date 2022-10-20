const mongoose = require( 'mongoose')

const beneficiarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, " Name must be specified"]
    },
    accNo: {
        type: String,
        required: [ true, " Account number must be specified"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model( 'Beneficiary', beneficiarySchema)