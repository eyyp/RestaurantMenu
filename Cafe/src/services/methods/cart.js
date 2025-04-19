import api from "../index.js";
import Constants from "../Constants.js";
import { getToken } from "../../config/index.js";

export const Create = (user_id,restaurant_id,table_id,cb) =>{
    return api(
        Constants.cart.create,
        {user_id,restaurant_id,table_id},
        'post',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const Add = (product_id,cart_id,property,cb) =>{
    return api(
        Constants.cart.add,
        {product_id,cart_id,property},
        'post',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const User = (cart_id,cb) =>{
    return api(
        Constants.cart.user + '/' + cart_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const Count = (cart_id,cb) =>{
    return api(
        Constants.cart.count + '/' + cart_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const DeleteItem = (cart_item_id,cb) =>{
    return api(
        Constants.cart.delete.item + '/' + cart_item_id,
        null,
        'post',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const Delete = (cart_id,cb) =>{
    return api(
        Constants.cart.delete.cart + '/' + cart_id,
        null,
        'post',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const Total = (cart_id,cb) =>{
    return api(
        Constants.cart.total + '/' + cart_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const ItemProperty = (cart_item_id,cb) =>{
    return api(
        Constants.cart.item.property + '/' + cart_item_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}