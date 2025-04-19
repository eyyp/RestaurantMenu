import sagasApi from "../sagasApi";
import Constants from "../Constants";

export const Checks = (user_name, password) =>{

    return sagasApi(
       Constants.user.check,
       {user_name:user_name,password:password},
        'POST',
        null
    )
}
