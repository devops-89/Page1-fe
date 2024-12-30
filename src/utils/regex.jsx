export const phoneNumberRegex =
  "/^+?d{1,3}?[- .]?(?d{1,3})?[- .]?d{1,4}[- .]?d{4}$/";

export const handleClose = ({ toast, setToast }) => {
  setToast({ ...toast, open: false });
};
