   

const useHotelTravellerValidation = () => {
    const validateTravelers = (totalRooms, tempPaxRooms) => {
      let errorMessage = "";
      let errorStatus = false;
  
    
      if (totalRooms > 5) {
         errorMessage = "Maximum 6 rooms allowed per booking.";
         errorStatus = true;
      }
      else {
         const roomWithTooManyAdultsIndex = tempPaxRooms.findIndex(singleRoom => singleRoom.Adults > 7);
         if (roomWithTooManyAdultsIndex !== -1) {
             errorMessage = `Room ${roomWithTooManyAdultsIndex + 1} cannot have more than 8 adults.`;
             errorStatus = true;
         }
         else {
              const roomWithTooManyChildrenIndex = tempPaxRooms.findIndex(singleRoom => singleRoom.Children > 3);
              if (roomWithTooManyChildrenIndex !== -1) {
                  errorMessage = `Room ${roomWithTooManyChildrenIndex + 1} cannot have more than 4 children.`;
                  errorStatus = true;
              }
         }
      }
   
  
      return { errorStatus, errorMessage };
    };
  
    return validateTravelers;
  };
  
  export default useHotelTravellerValidation;