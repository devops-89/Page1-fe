import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  meals: {},
};

const mealsInformation = createSlice({
  name: "mealsInformation",
  initialState,
  reducers: {
    setMealDetails: (state, action) => {
      const { passengerId, mealsId, selected, passengerType } = action.payload;
      const uniquePassengerKey = `${passengerType}-${passengerId}`; // Unique key

      if (!state.meals[uniquePassengerKey]) {
        state.meals[uniquePassengerKey] = { meals: [], passengerType };
      }

      const existingMealIndex = state.meals[uniquePassengerKey].meals.findIndex(
        (meal) => meal.flightId === mealsId && meal.meal.Code === selected.Code
      );

      if (existingMealIndex === -1) {
        state.meals[uniquePassengerKey].meals.push({ flightId: mealsId, meal: selected });
      }
    },

    removeMealDetails: (state, action) => {
      const { passengerId, mealsId, mealCode, passengerType } = action.payload;
      const uniquePassengerKey = `${passengerType}-${passengerId}`;

      if (state.meals[uniquePassengerKey]) {
        state.meals[uniquePassengerKey].meals = state.meals[uniquePassengerKey].meals.filter(
          (meal) => !(meal.flightId === mealsId && meal.meal.Code === mealCode)
        );

        // If no meals remain, remove the passenger entry
        if (state.meals[uniquePassengerKey].meals.length === 0) {
          delete state.meals[uniquePassengerKey];
        }
      }
    },

    resetMealDetails: (state) => {
      state.meals = {};
    }
  },
});

export const { setMealDetails, removeMealDetails, resetMealDetails } = mealsInformation.actions;
export default mealsInformation.reducer;
