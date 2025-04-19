import api from "../api.js";
import Constants from "../Constants.js";

export const Checks = (user_name,password) =>{
    return api(
        Constants.user.check,
        {user_name,password},
        'post',
        null
    )
}