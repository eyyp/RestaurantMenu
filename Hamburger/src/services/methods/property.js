import api from "../index.js";
import Constants from "../Constants.js";
import { getToken } from "../../config/index.js";

export const Type = (restaurnat_id,cb) =>{
    return api(
        Constants.property.type + '/' + restaurnat_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const Product = (product_id,product_property_type_id,cb) =>{
    return api(
        Constants.property.product + '/' + product_id + '/' + product_property_type_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const Find = (property_id,cb) =>{
    return api(
        Constants.property.find + '/' + property_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

