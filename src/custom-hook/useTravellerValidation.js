

const useTravellerValidation = () => {
   
    const validateTravelers = (adultValue, childValue, infantValue ) => {
        let errorMessage="";
        let errorStatus=false;
      
        let total=adultValue+childValue+infantValue;

        if (total > 9) {
            errorMessage= "Total Passengers should be Less Than or equal to 9!";
            errorStatus=true;

        }
        else if(infantValue>adultValue){
            errorMessage="Adult should be Greater Than or Equal To Infant!";
            errorStatus=true;
        }

      

       return {errorStatus,errorMessage};
        
    };

    // Return the values so the component using the hook can access them
    return validateTravelers;
};
export default useTravellerValidation;
