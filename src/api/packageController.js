import { packagePublicApi } from "./config";

export const packageController={
    getPackageList:async (limit, page)=>{
        try{
            const queryParams=new URLSearchParams({
                limit:String(limit),
                page:String(page)
            });

            const result=await packagePublicApi.get(`/list?${queryParams.toString()}`);
            return result;

        }
        catch(error){
            console.error("Error in fetching the package list details.",error);
            throw error;
        }

    },
    getPackageDetails:async (id)=>{
        try{
            const result=await packagePublicApi.get(`/details/${id}`);
            return result;
        }
        catch(error){
            console.error("Error in fetching the package details api: ",error);
            throw error;
        }

    }

    
}