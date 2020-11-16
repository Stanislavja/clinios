import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { CountryRegionData } from "react-country-region-selector";

function CountryRegionMUISelectors(props) {
  const {
    country, size, handleChange, outlined,
  } = props;
  return (
    <TextField
      size={size}
      id="country"
      label="Country"
      value={country}
      select
      onChange={(e) => handleChange("country", e.target.value)}
      fullWidth
      variant={outlined ? "outlined" : "standard"}
    >
      {CountryRegionData.map((option) => (
        <MenuItem key={option[0]} value={option}>
          {option[0]}
        </MenuItem>
      ))}
    </TextField>
  );
}

CountryRegionMUISelectors.defaultProps = {
  size: "medium",
  country: null,
  outlined: true,
};

CountryRegionMUISelectors.propTypes = {
  size: PropTypes.string,
  country: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  outlined: PropTypes.bool,
};

export default CountryRegionMUISelectors;
