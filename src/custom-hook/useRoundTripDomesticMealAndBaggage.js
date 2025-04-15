const useRoundTripDomesticMealAndBaggage = (flightDetails) => {

    // console.log('flightDetails---------------',flightDetails)
    const customMealAndBaggage = {
        MealDynamic: [],
        Baggage: [],
    };

    const outGoingMeal = Array.isArray(flightDetails?.[0]?.[1]?.MealDynamic?.[0]) ? flightDetails?.[0]?.[1]?.MealDynamic?.[0] : [flightDetails?.[0]?.[1]?.MealDynamic?.[0]];
    const returnMeal = Array.isArray(flightDetails?.[1]?.[1]?.MealDynamic?.[0]) ? flightDetails?.[1]?.[1]?.MealDynamic?.[0] : [flightDetails?.[1]?.[1]?.MealDynamic?.[0]];
    const outGoingBaggage = Array.isArray(flightDetails?.[0]?.[1]?.Baggage?.[0]) ? flightDetails?.[0]?.[1]?.Baggage?.[0] : [flightDetails?.[0]?.[1]?.Baggage?.[0]];
    const returnBaggage = Array.isArray(flightDetails?.[1]?.[1]?.Baggage?.[0]) ? flightDetails?.[1]?.[1]?.Baggage?.[0] : [flightDetails?.[1]?.[1]?.Baggage?.[0]];

    if (Array.isArray(flightDetails)) {
        customMealAndBaggage.MealDynamic = [
            outGoingMeal ?? [],
            returnMeal ?? [],
        ];

        customMealAndBaggage.Baggage = [
            outGoingBaggage ?? [],
            returnBaggage ?? [],
        ];
    }

    return customMealAndBaggage;
};

export default useRoundTripDomesticMealAndBaggage;
