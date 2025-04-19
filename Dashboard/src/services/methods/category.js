import api from "../index";
import Constants from "../Constants";
import { getToken } from "../../config";

export const Create = (title,category_id,cb) =>{
    return api(
        Constants.category.create,
        {
            title,
            category_id
        },
        'post',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const All = (restaurant_id,cb) =>{
    return api(
        Constants.category.all + '/' + restaurant_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const Find = (category_id,cb) =>{
    return api(
        Constants.category.find + '/' + category_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}
