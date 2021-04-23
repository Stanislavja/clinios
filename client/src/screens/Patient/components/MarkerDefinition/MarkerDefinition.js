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
      border: "1px solid black",
      borderCollapse: "collapse",
    },
  },
}));

const MarkerDefinition = ({ data }) => {
  const classes = useStyles();

  return (
    <Box maxWidth={650}>
      <Grid className={classes.main}>
        <Typography className={classes.mb2}>
          {data.name}
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
            {[1, 2, 3].map((item) => (
              <TableRow key={item}>
                <TableCell>{item}</TableCell>
                <TableCell>{item}</TableCell>
                <TableCell>{item}</TableCell>
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
            {[1, 2, 3].map((item) => (
              <TableRow key={item}>
                <TableCell>{item}</TableCell>
                <TableCell>{item}</TableCell>
                <TableCell>{item}</TableCell>
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
  }).isRequired,
};

export default MarkerDefinition;
