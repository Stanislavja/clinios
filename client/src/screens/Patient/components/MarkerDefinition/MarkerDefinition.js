import React from "react";

import {
  Typography, makeStyles, Grid, Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import PropTypes from "prop-types";

import { getMarkerDefinition } from "../../../../utils/markerDefinition";
import { getMarkerInterpretation } from "../../../../utils/markerInterpretation";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(2, 0),
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  text: {
    fontSize: 14,
  },
  main: {
    "& table, th, td": {
      border: "1px solid #37474f",
      borderCollapse: "collapse",
    },
    "& th": {
      whiteSpace: "noWrap",
    },
  },
}));

const MarkerDefinition = ({ data }) => {
  const classes = useStyles();
  const markerId = data?.cpt_id || data?.id;
  const markerExplanation = getMarkerDefinition(markerId);
  const markerInterpretation = getMarkerInterpretation(markerId);

  return (
    <Box maxWidth={1000}>
      <Grid className={classes.main}>
        <Typography variant="h4" className={classes.mb2}>
          {data.name}
        </Typography>
        <Typography className={classes.mb2}>
          {markerExplanation}
        </Typography>
        <Table size="small" aria-label="elevated-table" className={classes.mb2}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>Elevated</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Condition</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Strength of Evidence</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {markerInterpretation?.high.map((item) => (
              <TableRow key={item.condition}>
                <TableCell>{item.condition}</TableCell>
                <TableCell>{item.comment}</TableCell>
                <TableCell>{item.evidence}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Table size="small" aria-label="decreased-table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>Decreased</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Condition</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Strength of Evidence</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {markerInterpretation?.low.map((item) => (
              <TableRow key={item.condition}>
                <TableCell>{item.condition}</TableCell>
                <TableCell>{item.comment}</TableCell>
                <TableCell>{item.evidence}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Box>
  );
};

MarkerDefinition.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    cpt_id: PropTypes.number,
  }).isRequired,
};

export default MarkerDefinition;
