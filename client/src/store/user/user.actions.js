const USER_ACTION_TYPES = require("./user.actionTypes")


const FETCH_USER_START = () => {
    return {type:USER_ACTION_TYPES.SET_USER_START}
}

const FETCH_USER_SUCCESS = (user) =>{
    return {type:USER_ACTION_TYPES.SET_USER_SUCCESS,payload:user}
}

const FETCH_USER_FAILED = (err) => {
    return {type:USER_ACTION_TYPES.SET_USER_FAILED,payload:err}
}



module.exports = {
    FETCH_USER_START,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILED
}