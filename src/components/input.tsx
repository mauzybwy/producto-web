/*****************************************************************************
 * Import
 *****************************************************************************/
import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Fragment } from "react";

import colors from "style/colors";

import { Eye, EyeOff } from "tabler-icons-react";

/*****************************************************************************
 * DefaultComponent
 *****************************************************************************/

export default function DefaultInput ({
  value,
  setValue,
  style,
  inputStyle,
  InputStyle,
  type,
  label,
  placeholder,
} : {
  value: string,
  setValue: Function,
  style?: any,
  inputStyle?: any,
  InputStyle?: any,
  type?: "text" | "password" | "email"
  label?: any,
  placeholder?: any,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const inputType = type === "password" && !passwordVisible ? "password" : "text";
  const EyeIcon = passwordVisible ? Eye : EyeOff;
  
  return (
    <Box
      p="8px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        border: "2px solid",
        borderColor: colors.text,
        boxSizing: "border-box",
        ...style,
      }}
    >
      <TextField
        label={label}
        type={inputType}
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
        style={{ width: "175px", ...InputStyle }}
        inputProps={{
          style: {
            color: "white",
            borderColor: "white",
            fontSize: "1.5rem",
            ...inputStyle,
          }
        }}
        InputProps={{
          disableUnderline: true,
        }}
      />
      {type === "password" && (
        <EyeIcon
          onClick={() => setPasswordVisible(!passwordVisible)}
          style={{ cursor: "pointer" }}
        />
      )}
    </Box>
  );
}

export const StyledTextField = styled(TextField)({
  "& label": {
    color: "white"
  },
  "&:hover label": {
    fontWeight: 700
  },
  "& label.Mui-focused": {
    color: "white"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white"
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white"
    },
    "&:hover fieldset": {
      borderColor: "white",
      borderWidth: 2
    },
    "&.Mui-focused fieldset": {
      borderColor: "white"
    },
  },
  "& .MuiInputBase-input": {
    color: "white"
  }
});
