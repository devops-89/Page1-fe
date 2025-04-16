import { createSlice } from "@reduxjs/toolkit";

const initialState={
    outgoingBaggage:{},
    incomingBaggage:{}
}

const roundDomesticBaggagesInformation=createSlice({
    name:"roundDomesticlBaggagesInformation",
    initialState:initialState,
    reducers:{
          setBaggageDetails:(state,action)=>{
            const { passengerId, baggageId, selected, passengerType,tabIndex } = action.payload;
            console.log("set baggage seat details");
            const uniquePassengerKey = `${passengerType}-${passengerId}`; 

         
            if(tabIndex==0)
            {

                if (!state.outgoingBaggage[uniquePassengerKey]) {
                    state.outgoingBaggage[uniquePassengerKey] = { baggages: [], passengerType };
                  }
            
                  const existingBaggageIndex = state.outgoingBaggage[uniquePassengerKey].baggages.findIndex(
                    (baggage) => baggage.flightId === baggageId && baggage.baggage.Code === selected.Code
                  );
            
                  if (existingBaggageIndex === -1) {
                    state.outgoingBaggage[uniquePassengerKey].baggages.push({ flightId: baggageId, baggage: selected });
                  }
            }
            else if(tabIndex==1){
                if (!state.incomingBaggage[uniquePassengerKey]) {
                    state.incomingBaggage[uniquePassengerKey] = { baggages: [], passengerType };
                  }
            
                  const existingBaggageIndex = state.incomingBaggage[uniquePassengerKey].baggages.findIndex(
                    (baggage) => baggage.flightId === baggageId && baggage.baggage.Code === selected.Code
                    
                  );
            
                  if (existingBaggageIndex === -1) {
                    state.incomingBaggage[uniquePassengerKey].baggages.push({ flightId:baggageId, baggage: selected });
                  }
            }
            else{
                console.log("tabIndex is wrong");
            }

            

          },
    
          removeBaggageDetails: (state, action) => {
            const { passengerId, baggageId, baggageCode, passengerType,tabIndex } = action.payload;
            const uniquePassengerKey = `${passengerType}-${passengerId}`;

            if(tabIndex==0){
                if (state.outgoingBaggage[uniquePassengerKey]) {
                    state.outgoingBaggage[uniquePassengerKey].baggages = state.outgoingBaggage[uniquePassengerKey].baggages.filter(
                      (baggage) => !(baggage.flightId === baggageId && baggage.baggage.Code === baggageCode)
                    );
            
                   
                    if (state.outgoingBaggage[uniquePassengerKey].baggages.length === 0) {
                      delete state.outgoingBaggage[uniquePassengerKey];
                    }
                  }
            }else if(tabIndex==1){
                if (state.incomingBaggage[uniquePassengerKey]) {
                    state.incomingBaggage[uniquePassengerKey].baggages = state.incomingBaggage[uniquePassengerKey].baggages.filter(
                      (baggage) => !(baggage.flightId === baggageId && baggage.baggage.Code === baggageCode)
                    );
            
                 
                    if (state.incomingBaggage[uniquePassengerKey].baggages.length === 0) {
                      delete state.incomingBaggage[uniquePassengerKey];
                    }
                  }

            }
            else{
                console.log("Tab Index is not found!");
            }
      
            
          },

          resetBaggageDetails:(state,action)=>{
             state.outgoingBaggage={};
             state.incomingBaggage={};
          }

    }
});

export const { setBaggageDetails, removeBaggageDetails, resetBaggageDetails } =roundDomesticBaggagesInformation.actions;
export default roundDomesticBaggagesInformation.reducer;