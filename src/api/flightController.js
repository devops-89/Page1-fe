import { flightPublicApi,securedFlightApi } from "./config";

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
      throw error;
    }
  },

 
  oneWayBookingNonLLC:async(data)=>{
    try{
     let result=await securedFlightApi.post("flight-booking/non_LCC_booking",data);
    //  console.log("result nonLLC", result)
     return result;
    }
    catch(error){
      // console.log("error nonLLC", error)
      throw Error;
     
    }
  },

  oneWayBookingLLC:async(data)=>{
    try{
     let result=await flightPublicApi.post("flight-booking/booking",data);
    //  console.log("result LLC", result)
     return result;
    }
    catch(error){
      // console.log("error LLC", error)
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
