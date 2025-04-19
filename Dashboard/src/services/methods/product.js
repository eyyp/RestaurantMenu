import api from "../index";
import ImageApi from "../imageApi";
import Constants from "../Constants";
import { getToken } from "../../config";

export const All = (restaurant_id,page,cb) =>{
    return api(
        Constants.product.all + '/' + restaurant_id + '/' + page,
        null,
        'get',
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

export const Delete = (product_id,cb) =>{
    return api(
        Constants.product.delete + '/' + product_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const Create = (title,exp,price,summary,restaurant_id,video_url,category_id,property,cb) =>{
    return api(
        Constants.product.create,
        {
            title,
            exp,
            price,
            summary,
            restaurant_id,
            video_url,
            category_id,
            property
        },
        'post',
        getToken(),
        (err,data)=>cb(err,data)
    )

}

export const SetImage = (product_id,file,cb) =>{
    return ImageApi(
        Constants.product.setImage + '/' + product_id,
        file,
        'post',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

export const GetImage = (product_id,cb) =>{
    return ImageApi(
        Constants.product.getImage + '/' + product_id,
        null,
        'get',
        getToken(),
        (err,data)=>cb(err,data)
    )
}

