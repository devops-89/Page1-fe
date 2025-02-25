import { flightPublicApi } from "./config";

export const flightController = {
  getAllAirports: async () => {
    try {
      let result = await flightPublicApi.get("flight/all-airport");
      return result;
    } catch (Error) {
      throw Error;
    }
  },
  searchFlight: async (data) => {
    try {
      let result = await flightPublicApi.post("flight/search-flight", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  flightDetails:async(data)=>{
    try{
     let result=await flightPublicApi.post("flightdetail/flightdetail",data);
    //  console.log("result",result);
     return result;
    }
    catch(error){
      throw Error;
    }
  },

  oneWayBookingNonLLC:async(data)=>{
    try{
     let result=await flightPublicApi.post("flight-booking/non_LCC_booking",data);
     return result;
    }
    catch(error){
      throw Error;
    }
  },


  roundTrip:async(data)=>{
    try{
     let result=await flightPublicApi.post("flight/search-flight",data);
    //  console.log("result",result);
     return result;
    }
    catch(error){
      throw Error;
    }
},

roundflightDetails:async(data)=>{
  try{
   let result=await flightPublicApi.post("flightdetail/flightdetail",data);
   return result;
  }
  catch(error){
    throw Error;
  }
},

}
