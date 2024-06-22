import axiosClient from "./axiosCilent"



  class locationApi {
     handleLocation = async (
        url: string,
        data?: any,
    
        method?: 'get' | 'post' | 'put' | 'delete',
      )=>{
        return await axiosClient
    }
}