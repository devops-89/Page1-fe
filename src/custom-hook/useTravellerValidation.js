import { useState, useEffect } from "react";

const useTravellerValidation = ({ adultValue, childValue, infantValue }) => {

    console.log("adult", adultValue);
    console.log("infant", infantValue);
    console.log("child", childValue);
    const [errors, setErrors] = useState({
        maxTravelers: false,
        infantLimit: false,
        adultInfantRatio: false,
    });

    useEffect(() => {
        validateTravelers();
    }, [adultValue, childValue, infantValue]);

    const validateTravelers = () => {
        let newErrors = {
            maxTravelers: adultValue + childValue + infantValue > 9,
            infantLimit: adultValue + childValue < infantValue,
            adultInfantRatio: adultValue <= childValue + infantValue,
        };

        setErrors(newErrors);
        return !Object.values(newErrors).includes(true);
    };

    return { errors, validateTravelers };
};

export default useTravellerValidation;