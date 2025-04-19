import api from "../index.js";
import ImageApi from "../imageApi.js";
import Constants from "../Constants.js";
import { getToken } from "../../config/index.js";

export const All = (restaurant_id,cb) =>{
    return api(
        Constants.product.all + '/' + restaurant_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const Category = (category_id,restaurant_id,cb) =>{
    return api(
        Constants.product.category,
        {restaurant_id,category_id},
        'post',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const Find = (product_id,cb) =>{
    return api(
        Constants.product.find + '/' + product_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}


export const GetImage = (product_id,page,cb) =>{
    return ImageApi(
        Constants.product.getImage + '/' + product_id + '/' + page,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}