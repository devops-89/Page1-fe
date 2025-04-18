export const phoneNumberRegex =
  "/^+?d{1,3}?[- .]?(?d{1,3})?[- .]?d{1,4}[- .]?d{4}$/";

export const handleClose = ({ toast, setToast }) => {
  setToast({ ...toast, open: false });
};


export const customFilter = (options, { inputValue }) => {
  const query = inputValue.toLowerCase();
  return options.filter((option) => 
    option.airport_name.toLowerCase().startsWith(query) ||
    option.city_code.toLowerCase().startsWith(query) ||
    option.city_name.toLowerCase().startsWith(query) ||
    option.country_code.toLowerCase().startsWith(query) ||
    option.iata_code.toLowerCase().startsWith(query)
  );
};

