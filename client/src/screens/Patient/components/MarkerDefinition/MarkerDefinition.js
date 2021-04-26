import React, { useMemo } from "react";

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
  mb2: {
    marginBottom: theme.spacing(2),
  },
  main: {
    "& table, th, td": {
      border: "1px solid #37474f",
      borderCollapse: "collapse",
    },
    "& th": {
      whiteSpace: "noWrap",
      fontWeight: 600,
    },
    "& td": {
      verticalAlign: "baseline",
    },
  },
}));

const MarkerDefinition = ({
  data, showTitle, showHigh, showLow,
}) => {
  const classes = useStyles();
  const markerId = data?.cpt_id || data?.id;
  const markerExplanation = getMarkerDefinition(markerId);
  const markerInterpretation = getMarkerInterpretation(markerId);

  // eslint-disable max-len
  const hasHighData = useMemo(() => Boolean(markerInterpretation?.high.length), [markerInterpretation?.high]);
  const hasLowData = useMemo(() => Boolean(markerInterpretation?.low.length), [markerInterpretation?.low]);

  return (
    <Box maxWidth={900}>
      <Grid className={classes.main}>
        {showTitle && (
          <Typography variant="h4" className={classes.mb2}>
            {data.name}
          </Typography>
        )}
        <Typography className={classes.mb2}>
          {markerExplanation}
        </Typography>
        {(showHigh && hasHighData) && (
          <Table size="small" aria-label="elevated-table" className={classes.mb2}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>Elevated</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Condition</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Evidence</TableCell>
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
        )}

        {(showLow && hasLowData) && (
          <Table size="small" aria-label="decreased-table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>Decreased</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Condition</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Evidence</TableCell>
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
        )}
      </Grid>
    </Box>
  );
};

MarkerDefinition.defaultProps = {
  showTitle: true,
  showHigh: true,
  showLow: true,
};

MarkerDefinition.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    cpt_id: PropTypes.number,
  }).isRequired,
  showTitle: PropTypes.bool,
  showHigh: PropTypes.bool,
  showLow: PropTypes.bool,
};

export default MarkerDefinition;
