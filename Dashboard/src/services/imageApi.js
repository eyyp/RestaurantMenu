import Constants from "./Constants";
import axios from "axios";
const ImageApi = async (path, params, methodP, token,cb) => {
    const headersOptions = {
        Accept: "multipart/form-data",
        'Content-type':'multipart/form-data',
        "responseType":"text",
        ...(token && { "Authorization": `Bearer ${token}`})
    }

    const options = {
        headers:headersOptions,
        method: methodP,
        ...(params && { data: params}),
    }
    return axios(Constants.BASE_URL + path, options).
    then(res =>cb(null,res)).
    catch(error =>{console.log(Constants.BASE_URL + path + error);cb(error,null)});
}   
export default ImageApi;