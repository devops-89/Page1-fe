import { createSlice } from "@reduxjs/toolkit";

const initialState={
    outgoingMeal:{},
    incomingMeal:{}
}

const roundDomesticMealsInformation=createSlice({
    name:"roundDomesticMealsInformation",
    initialState:initialState,
    reducers:{
          setMealDetails:(state,action)=>{
            const { passengerId, mealsId, selected, passengerType,tabIndex } = action.payload;

            const uniquePassengerKey = `${passengerType}-${passengerId}`; 

            // for outgoing meals
            if(tabIndex===0)
            {

                if (!state.outgoingMeal[uniquePassengerKey]) {
                    state.outgoingMeal[uniquePassengerKey] = { meals: [], passengerType };
                  }
            
                  const existingMealIndex = state.outgoingMeal[uniquePassengerKey].meals.findIndex(
                    (meal) => meal.flightId === mealsId && meal.meal.Code === selected.Code
                  );
            
                  if (existingMealIndex === -1) {
                    state.outgoingMeal[uniquePassengerKey].meals.push({ flightId: mealsId, meal: selected });
                  }
            }
            else if(tabIndex===1){
                if (!state.incomingMeal[uniquePassengerKey]) {
                    state.incomingMeal[uniquePassengerKey] = { meals: [], passengerType };
                  }
            
                  const existingMealIndex = state.incomingMeal[uniquePassengerKey].meals.findIndex(
                    (meal) => meal.flightId === mealsId && meal.meal.Code === selected.Code
                    
                  );
            
                  if (existingMealIndex === -1) {
                    state.incomingMeal[uniquePassengerKey].meals.push({ flightId: mealsId, meal: selected });
                  }
            }
            else{
                console.log("tabIndex is wrong");
            }

            

          },
          removeMealDetails: (state, action) => {
            const { passengerId, mealsId, mealCode, passengerType,tabIndex } = action.payload;
            const uniquePassengerKey = `${passengerType}-${passengerId}`;

            if(tabIndex===0){
                if (state.outgoingMeal[uniquePassengerKey]) {
                    state.outgoingMeal[uniquePassengerKey].meals = state.outgoingMeal[uniquePassengerKey].meals.filter(
                      (meal) => !(meal.flightId === mealsId && meal.meal.Code === mealCode)
                    );
            
                    // If no meals remain, remove the passenger entry
                    if (state.outgoingMeal[uniquePassengerKey].meals.length === 0) {
                      delete state.outgoingMeal[uniquePassengerKey];
                    }
                  }
            }else if(tabIndex===1){
                if (state.incomingMeal[uniquePassengerKey]) {
                    state.incomingMeal[uniquePassengerKey].meals = state.incomingMeal[uniquePassengerKey].meals.filter(
                      (meal) => !(meal.flightId === mealsId && meal.meal.Code === mealCode)
                    );
            
                    // If no meals remain, remove the passenger entry
                    if (state.incomingMeal[uniquePassengerKey].meals.length === 0) {
                      delete state.incomingMeal[uniquePassengerKey];
                    }
                  }

            }
            else{
                console.log("Tab Index is not found!");
            }
      
            
          },

          domesticMealReset:(state)=>{
             state.outgoingMeal={};
             state.incomingMeal={};
          }

    }
});

export const { setMealDetails, removeMealDetails, domesticMealReset } =roundDomesticMealsInformation.actions;
export default roundDomesticMealsInformation.reducer;