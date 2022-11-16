import { TextField } from "@mui/material";
import React from "react";

const TextFieldComponent = ({
  name,
  id,
  classes,
  type,
  value,
  label,
  onChange,
  width,
  disabled,
}) => {
  return (
    <TextField
      margin="normal"
      id={id}
      className={classes}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      autoComplete="false"
      color="secondary"
      disabled={disabled}
      sx={{
        height: "-10px",
        width: { width },
        "& label": {
          marginTop: "-15px",
          marginLeft: "10px",
          "&.Mui-focused": {
            marginTop: "-20px",
          },
          color: "black",
        },
        input: {
          color: "black",
          margin: "2px 10px",
        },
      }}
      autoFocus
      variant="standard"
      InputProps={{
        disableUnderline: true,
      }}
    />
  );
};

export default TextFieldComponent;
