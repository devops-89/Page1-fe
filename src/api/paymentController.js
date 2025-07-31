import { securedPaymentUrl,securedHotelPaymentUrl } from "./config";


export const paymentController={
    paymentInit:async (data)=>{
        try{
          let result=await securedPaymentUrl.post("razorpay/payment-init",data);
          console.log("Payment API Response:",result);
          return result;
        }
        catch(error){
            throw error;
        }
    },
    hotelPaymentInit:async (data)=>{
        try{
          let result=await securedHotelPaymentUrl.post("razorpay/hotel-payment-init",data);
          console.log("Hotel Payment API Response: ",result);
          return result;
        }
        catch(error){
            throw error;
        }
    }
}

