// used for sorting and filtering meals
export const mealSortingByPriceAndNoMealFilter = (meals) => {
  // sorting the meals by price
  let sortedMeals = meals?.slice()?.sort((a, b) => a.Price - b.Price);

  // filtering the no-meal
  return sortedMeals.filter((meal) => meal?.Code !== "NoMeal");
};
