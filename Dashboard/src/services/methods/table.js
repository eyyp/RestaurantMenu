import api from "../index";
import Constants from "../Constants";
import { getToken } from "../../config";

export const Create = (title,restaurant_id,cb) =>{
    return api(
        Constants.tables.create,
        {title,restaurant_id},
        'post',
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

