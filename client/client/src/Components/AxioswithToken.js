import axios from "axios";
let token=sessionStorage.getItem('Token')
export let axiosWithToken=axios.create(
    {
        headers:{Authorization:`Bearer ${token}`}
    }
)