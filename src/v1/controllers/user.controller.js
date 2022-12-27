const userService = require( '../services/user.service')

const updateUser = async( req, res) => {
    //get id and data from request params and body
    const { body, params: id, user} = req

    // throw error if id is not present
    if( !id) {
        res.status( 400).json({
            status: "FAILED",
            data: {
                error: "User not found"
            }
        })
        return
    }

    // check if user is authorized
    if( id._id != user.user){
        res.status( 403).json({
            status: "FAILED",
            data: {
                error: "You do not have permission to access this account"
            }
        })
        return
    }

    try {
        const updatedUser = await userService.updateUser( id, body)
        
        // return updated user
        res.status( 200).json({
            status: "SUCCESS",
            data: {
                updatedUser
            }
        })
    } catch (error) {
        res
          .status(error?.status || 500)
          .json({ status: "FAILED", data: { error: error?.message || error } })
    }

}

module.exports = {
    updateUser
}