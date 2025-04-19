import api from "../index.js";
import Constants from "../Constants.js";
import { getToken } from "../../config/index.js";

export const Create = (user_id,cart_id,restaurant_id,table_id,total,piece,notes,cb) =>{
    return api(
        Constants.order.create,
        {user_id,cart_id,restaurant_id,table_id,total,piece,notes},
        'post',
        getToken(),
        (err,data)=>cb(err,data)
    )
}