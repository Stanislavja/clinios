import React from "react";

import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";

const MaskInput = (props) => {
  const {
    className, required, type, name, label, margin, variant, value, mask, onChange,
  } = props;

  return (
    <InputMask
      mask={mask}
      value={value}
      onChange={onChange}
    >
      {(inputProps) => (
        <TextField
          {...inputProps}
          required={required}
          name={name}
          label={label}
          margin={margin}
          type={type}
          className={className}
          variant={variant}
        />
      )}
    </InputMask>
  );
};

MaskInput.defaultProps = {
  className: "",
  type: "text",
  name: "",
  label: "Label",
  margin: "normal",
  variant: "outlined",
  value: "",
  mask: "",
  required: false,
};

MaskInput.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  variant: PropTypes.string,
  value: PropTypes.string,
  mask: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default MaskInput;
