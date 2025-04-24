   

const useHotelTravellerValidation = () => {
    const validateTravelers = (totalRooms, tempPaxRooms) => {
      let errorMessage = "";
      let errorStatus = false;
  
    
      if (totalRooms > 6) {
         errorMessage = "Maximum 6 rooms allowed per booking.";
         errorStatus = true;
      }
      else {
         const roomWithTooManyAdultsIndex = tempPaxRooms.findIndex(singleRoom => singleRoom.Adults > 6);
         if (roomWithTooManyAdultsIndex !== -1) {
             errorMessage = `Room ${roomWithTooManyAdultsIndex + 1} cannot have more than 6 adults.`;
             errorStatus = true;
         }
         else {
              const roomWithTooManyChildrenIndex = tempPaxRooms.findIndex(singleRoom => singleRoom.Children > 4);
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