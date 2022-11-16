import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  select: {
    "&:before": {
      borderColor: "yellow",
    },
    "&:after": {
      borderColor: "white",
    },
    "&:not(.Mui-disabled):hover::before": {
      borderColor: "white",
    },
  },
  icon: {
    fill: "white",
  },
  root: {
    color: "white",
  },
});

const DropDown = ({
  label,
  name,
  value,
  options,
  error,
  helperText,
  required,
  disabled,
  className,
  onChange,
  tValue,
  minWidth,
  width,
}) => {
  const classes = useStyles();
  // const classes = useStyles();
  console.log("options", options);
  return (
    <div>
      <FormControl
        // color="success"
        sx={{ minWidth: { minWidth }, outlineColor: "white" }}
      >
        <InputLabel
          id="demo-simple-select-helper-label"
          className={classes.select}
          sx={{
            borderColor: "white",
            color: "white",
            classes: {
              icon: classes.icon,
              root: classes.root,
            },
          }}
        >
          {label}
        </InputLabel>
        <Select
          disabled={disabled}
          value={value}
          label={tValue}
          autoFocus
          onChange={onChange}
          // name={name}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
};

// DropDown.propTypes = {
//   label: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       value: PropTypes.string,
//       name: PropTypes.string,
//     })
//   ).isRequired,
//   error: PropTypes.bool,
//   helperText: PropTypes.string,
//   required: PropTypes.bool,
//   disabled: PropTypes.bool,
//   className: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
// };

// DropDown.defaultProps = {
//   error: false,
//   helperText: '',
//   required: true,
//   disabled: false,
//   className: '',
// };

export default DropDown;
