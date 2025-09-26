   

const useHotelTravellerValidation = () => {
    const validateTravelers = (totalRooms, tempPaxRooms) => {
      let errorMessage = "";
      let errorStatus = false;
  
    
      if (totalRooms > 4) {
         errorMessage = "Maximum 4 rooms allowed per booking.";
         errorStatus = true;
      }
      else {
         const roomWithTooManyAdultsIndex = tempPaxRooms.findIndex(singleRoom => singleRoom.Adults > 2);
         if (roomWithTooManyAdultsIndex !== -1) {
             errorMessage = `Room ${roomWithTooManyAdultsIndex + 1} cannot have more than 2 adults.`;
             errorStatus = true;
         }
         else {
              const roomWithTooManyChildrenIndex = tempPaxRooms.findIndex(singleRoom => singleRoom.Children > 2);
              if (roomWithTooManyChildrenIndex !== -1) {
                  errorMessage = `Room ${roomWithTooManyChildrenIndex + 1} cannot have more than 2 children.`;
                  errorStatus = true;
              }
         }
      }
   
  
      return { errorStatus, errorMessage };
    };
  
    return validateTravelers;
  };
  
  export default useHotelTravellerValidation;