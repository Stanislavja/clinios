import React from "react";

import { Typography, Box } from "@material-ui/core";

const GlucoseInterpretation = ["Diabetes", "Pre Diabetes", "Hyperthyroidism", "High Cortisol"];
const UricAcidInterpretation = ["Cancer", "Acidosis", "Alcoholism", "Kidney Disfunction"];

const Interpretation = () => (
  <>
    <Typography gutterBottom variant="h6">Glucose High</Typography>
    <Box mb={2}>
      {
        GlucoseInterpretation.map((item) => (
          <Typography
            key={item}
            gutterBottom
            variant="body1"
            color="textSecondary"
          >
            {item}
          </Typography>
        ))
      }
    </Box>
    <Typography gutterBottom variant="h6">Uric Acid High</Typography>
    <Box mb={1}>
      {
        UricAcidInterpretation.map((item) => (
          <Typography
            key={item}
            gutterBottom
            variant="body1"
            color="textSecondary"
          >
            {item}
          </Typography>
        ))
      }
    </Box>
  </>
);

export default Interpretation;
