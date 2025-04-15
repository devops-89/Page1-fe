import { hotelPublicApi } from "./config";

export const hotelController={
    searchHotel:async (data)=>{
     try{
        let result=hotelPublicApi.post("/hotel/search",data);
        return result;
     }
     catch(error){
        throw error;
     }

    }
}