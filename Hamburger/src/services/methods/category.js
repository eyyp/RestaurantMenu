import api from "../index.js";
import Constants from "../Constants.js";
import { getToken } from "../../config/index.js";

export const All = (restaurant_id,cb) =>{
    return api(
        Constants.category.all + '/' + restaurant_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}
