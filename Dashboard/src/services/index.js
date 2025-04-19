import Constants from "./Constants";
import axios from "axios";

const api = async (path, params, methodP, token,cb) => {    
    const headersOptions = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token && { "Authorization": `Bearer ${token}`})
    }

    const options = {
        headers:headersOptions,
        method: methodP,
        url:Constants.BASE_URL + path,
        ...(params && { data: params}),
    }

    console.log(options.url)

    return axios(options).
    then(res =>cb(null,res)).
    catch(error =>{console.log(error);console.log(options.url);cb(error,null)});
}   
export default api;