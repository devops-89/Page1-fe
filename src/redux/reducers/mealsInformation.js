import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  meals: {},
};

const mealsInformation = createSlice({
  name: "mealsInformation",
  initialState,
  reducers: {
    setMealDetails: (state, action) => {
      // here passengerId is the index, mealsId is the flightId, selected is the selected or clicked meal, passenger type is adult or infant or child
      const { passengerId, mealsId, selected, passengerType } = action.payload;
      console.log(
        "redux meal data:",
        passengerId,
        mealsId,
        selected,
        passengerType
      );
      // generate a unique passenger key
      const uniquePassengerKey = `${passengerType}-${passengerId}`;

      // creating the structure for unique passenger
      if (!state.meals[uniquePassengerKey]) {
        state.meals[uniquePassengerKey] = { meals: [], passengerType };
      }

      const existingMealIndex = state.meals[uniquePassengerKey].meals.findIndex(
        (meal) => meal.flightId === mealsId && meal.meal.Code === selected.Code
      );

      if (existingMealIndex === -1) {
        state.meals[uniquePassengerKey].meals.push({
          flightId: mealsId,
          meal: selected,
        });
      }
    },

    removeMealDetails: (state, action) => {
      const { passengerId, mealsId, mealCode, passengerType } = action.payload;
      const uniquePassengerKey = `${passengerType}-${passengerId}`;

      if (state.meals[uniquePassengerKey]) {
        state.meals[uniquePassengerKey].meals = state.meals[
          uniquePassengerKey
        ].meals.filter(
          (meal) => !(meal.flightId === mealsId && meal.meal.Code === mealCode)
        );

        // If no meals remain, remove the passenger entry
        if (state.meals[uniquePassengerKey].meals.length === 0) {
          delete state.meals[uniquePassengerKey];
        }
      }
    },
    generateMealsForAllPassengers: (state, action) => {
  const { passengerCounts, allMeals } = action.payload;

  // Step 1: Transform meals by FlightNumber
  const mealsByFlight = {};
  allMeals.forEach(meal => {
    const flightId = meal.FlightNumber;
    if (!mealsByFlight[flightId]) mealsByFlight[flightId] = [];
    mealsByFlight[flightId].push(meal);
  });

  // Step 2: Build passenger keys
  const passengerKeys = [];
  const addKeys = (count, type) => {
    for (let i = 0; i < count; i++) {
      passengerKeys.push({ key: `${type}-${i}`, type });
    }
  };
  addKeys(passengerCounts.adult || 0, "adult");
  addKeys(passengerCounts.child || 0, "child");
  addKeys(passengerCounts.infant || 0, "infant");

  // Step 3: Assign one meal per flight per passenger
  passengerKeys.forEach(({ key, type }, index) => {
    if (!state.meals[key]) {
      state.meals[key] = { meals: [], passengerType: type };
    }

    Object.entries(mealsByFlight).forEach(([flightId, meals]) => {
      const meal = meals[0]; // assing first meal to every passenger as they are seperate unlike seat
      if (!meal) return;

      const alreadyAssigned = state.meals[key].meals.some(
        m => m.flightId === flightId && m.meal.Code === meal.Code
      );

      if (!alreadyAssigned) {
        state.meals[key].meals.push({ flightId, meal });
      }
    });
  });
},
    resetMealDetails: (state) => {
      state.meals = {};
    },
  },
});

export const {
  setMealDetails,
  removeMealDetails,
  generateMealsForAllPassengers,
  resetMealDetails,
} = mealsInformation.actions;
export default mealsInformation.reducer;
