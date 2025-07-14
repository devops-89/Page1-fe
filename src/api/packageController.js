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

    }
    
}