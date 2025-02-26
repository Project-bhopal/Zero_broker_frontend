
import api from "./axios.interceptor";



export async function LoginRequest (url, request) {
    try {
        const res = await api(url, request)
        return res
    } catch (error) {
        return error
    }
}

export async function ApiRequest(url, request){
    try {
        const res = await api(url, request)
        return res
    } catch (error) {
        if(error.response && error.response.status == 401){
            window.location.href("/login")
        } else {
            return error
        }
    }
}