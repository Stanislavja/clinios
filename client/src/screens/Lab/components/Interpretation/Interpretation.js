import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import { orderBy } from "lodash";
import PropTypes from "prop-types";

import { calculateFunctionalRange, calculatePercentage } from "../../../../utils/FunctionalRange";
import { hasValue } from "../../../../utils/helpers";
import MarkerDefinition from "../../../Patient/components/MarkerDefinition";

const Interpretation = (props) => {
  const { labValues, patientData } = props;
  const { gender, age, functionalRange } = patientData;
  const patientAge = Number(age.split(" ")[0]);

  const [labData, setLabData] = useState([]);

  useEffect(() => {
    if (labValues.length) {
      let resData = [];
      labValues.forEach((item) => {
        const id = item?.id;
        const low = item?.range_low;
        const high = item?.range_high;
        const value = item?.value;
        let output;
        if (functionalRange) {
          const funcRange = calculateFunctionalRange(id, gender, patientAge);
          if (hasValue(funcRange.low) && hasValue(funcRange?.low)) {
            output = calculatePercentage(funcRange.low, funcRange.high, value);
          } else if (hasValue(low) && hasValue(high)) {
            output = calculatePercentage(low, high, value);
          }
        } else if (hasValue(low) && hasValue(high)) {
          output = calculatePercentage(low, high, value);
        }
        if (output?.flag.length) {
          output.id = id;
          output.name = item.name;
          resData.push(output);
        }
      })
      resData = orderBy(resData, ["value"], ["desc"]);
      setLabData([...resData])
    }
  }, [labValues, functionalRange, gender, patientAge])

  console.log(labData)

  return (
    <>
      {labData.length && labData.map((item) => (
        <Grid key={item.id}>
          <MarkerDefinition
            data={item}
            showHigh={item.flag === "High"}
            showLow={item.flag === "Low"}
          />
        </Grid>
      ))}
    </>
  )
};

Interpretation.propTypes = {
  patientData: PropTypes.shape({
    gender: PropTypes.string,
    age: PropTypes.string,
  }).isRequired,
  labValues: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    }),
  ).isRequired,
};

export default Interpretation;
