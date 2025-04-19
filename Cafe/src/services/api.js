import Constants from "./Constants";
import axios from "axios";

const api = async (path, params, methodP, token) => {    
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

    return axios(options).
    then(res =>res).
    catch(error => error);
}   
export default api;