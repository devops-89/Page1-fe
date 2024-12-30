import { COLORS } from "./colors";
import { nunito } from "./fonts";

export const loginTextField = {
  "& label.Mui-focused": {
    color: "#000000",
  },
  "& label": {
    fontSize: "15px",
    fontFamily: nunito.style,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #d7d7d7",
    },
    "&:hover fieldset": {
      borderColor: COLORS.PRIMARY,
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #f2940c",
    },
    
  },

  "& .Mui-error": {
    "& fieldset": {
      border: "1px solid #d32f2f",
    },
    "&:hover fieldset": {
      border: "1px solid #d32f2f",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #d32f2f",
    },
    "& label.Mui-focused": {
      color: "#d32f2f",
    },
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "#d32f2f",
  },
};

export const phonetextField = {
  "& label.Mui-focused": {
    color: "#000000",
  },
  "& label": {
    fontSize: "15px",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #d7d7d7",
    },
    "&:hover fieldset": {
      borderColor: COLORS.PRIMARY,
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #f2940c",
    },
  },

  "& .Mui-error": {
    "& fieldset": {
      border: "1px solid #d32f2f",
    },
    "&:hover fieldset": {
      border: "1px solid #d32f2f",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #d32f2f",
    },
    "& label.Mui-focused": {
      color: "#d32f2f",
    },
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "#d32f2f",
  },
};
