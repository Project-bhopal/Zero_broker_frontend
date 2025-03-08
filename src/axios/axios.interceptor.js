import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create({
    baseURL : "apiurl"
})

api.interceptors.request.use((config)=>{
    const cookiesStore = cookies();
    const accessToken = cookiesStore.get("accessToken").value;

    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

export default api