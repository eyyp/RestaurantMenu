import api from "../index";
import Constants from "../Constants";
import { getToken } from "../../config";

export const TypeCreate = (restaurant_id,number_choices,title,difficualty,cb) =>{

    return api(
        Constants.property.type.create,
        {   
            restaurant_id,
            number_choices,
            title,
            difficualty
        },
        'post',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const ItemProperty = (property_id,cb) =>{
    return api(
        Constants.property.item.find + '/' + property_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const TypeAll = (restaurant_id,cb) =>{
    return api(
        Constants.property.type.all + '/' + restaurant_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}