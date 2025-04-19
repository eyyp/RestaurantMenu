import api from "../index";
import Constants from "../Constants";
import { getToken } from "../../config";

export const Pull = (restaurant_id,delivery,perPage,cb) =>{
    return api(
        Constants.order.pull + '/' + perPage,
        { restaurant_id: restaurant_id, delivery: delivery },
        'post',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const Delete = (order_id,cb) =>{
    return api(
        Constants.order.delete + '/' + order_id,
        null,
        'post',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const ChangeDelivery = (order_id,delivery,cb) =>{
    console.log(order_id,delivery);
    return api(
        Constants.order.change,
        {
            order_id,
            delivery
        },
        'post',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const FindItem = (order_id,cb) =>{
    return api(
        Constants.order.find + '/' + order_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const FindItemProperty = (order_item_id,cb) =>{
    return api(
        Constants.order.item.property + '/' + order_item_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}


