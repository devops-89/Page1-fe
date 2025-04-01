import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  meals: [],
};

const mealsInformation = createSlice({
  name: "mealsInformation",
  initialState,
  reducers: {
    setMealDetails: (state, action) => {
      const { mealsId, selected } = action.payload;
      const mealIndex = state.meals.findIndex((meal) => meal.id === mealsId);

      if (mealIndex !== -1) {
        // Replace the selected meal instead of adding to an array
        state.meals[mealIndex].selectedMeals = [{ ...selected }];
      } else {
        state.meals.push({
          id: mealsId,
          selectedMeals: [{ ...selected }],
        });
      }
    },
    removeMealDetails: (state, action) => {
      const { mealsId } = action.payload;
      state.meals = state.meals.filter((meal) => meal.id !== mealsId);
    },
    resetMealDetails: (state) => {
      state.meals = [];
    },
  },
});

export const { setMealDetails, removeMealDetails, resetMealDetails } = mealsInformation.actions;
export default mealsInformation.reducer;
