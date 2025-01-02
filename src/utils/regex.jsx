export const phoneNumberRegex =
  "/^+?d{1,3}?[- .]?(?d{1,3})?[- .]?d{1,4}[- .]?d{4}$/";

export const handleClose = ({ toast, setToast }) => {
  setToast({ ...toast, open: false });
};


export const customFilter = (options, { inputValue }) => {
    return options.filter((option) => {
      const query = inputValue.toLowerCase();
      return (
        option.airport_name.toLowerCase().includes(query) ||
        option.city_code.toLowerCase().includes(query) ||
        option.city_name.toLowerCase().includes(query) ||
        option.country_code.toLowerCase().includes(query) ||
        option.iata_code.toLowerCase().includes(query)
      );
    });
  };
