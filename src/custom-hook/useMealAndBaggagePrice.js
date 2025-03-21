const useMealAndBaggagePrice = (MealAndBaggage) => {
  if (!MealAndBaggage || typeof MealAndBaggage !== "object") {
    return []; 
  }
  return Object.values(MealAndBaggage).map(item => item?.Price || 0);
};

export default useMealAndBaggagePrice;
