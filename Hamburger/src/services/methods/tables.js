import api from "../index.js";
import Constants from "../Constants.js";
import { getToken } from "../../config/index.js";

export const All = (restaurant_id,cb) =>{
    return api(
        Constants.tables.all + '/' + restaurant_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const Find = (table_id,cb) =>{
    return api(
        Constants.tables.find + '/' + table_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

