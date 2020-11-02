import React, { useState } from "react";

import {
  makeStyles,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
  FormControlLabel
} from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import { useDispatch } from "react-redux";

import icdcodesService from "../../../../../services/icdcodes.service";
import { setSuccess } from "../../../../../store/common/actions";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    minWidth: 450,
    marginTop: theme.spacing(2)
  },
  actions: {
    textAlign: "center",
    display: "flex",
    border: "none",
    "& button": {
      fontSize: "12px"
    }
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.grey,
    fontSize: "12px",
    fontWeight: 700
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    fontSize: 14,
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    },
    "& th": {
      fontSize: 12
    },
    "& td": {
      fontSize: 12,
      height: "50px"
    }
  }
}))(TableRow);

const GreenSwitch = withStyles({
  switchBase: {
    color: grey[400],
    "&$checked": {
      color: green[500]
    },
    "&$checked + $track": {
      backgroundColor: green[500],
      // color: grey[500]
      "&$checked": {
        color: grey[500]
      }
    }
  },
  checked: {},
  track: {}
})(Switch);

const ICDcodestable = ({ user, result, fetchSearchIcdCodes }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let [state, setState] = useState(result);
  const [errors, setErrors] = useState([]);

  const changeHandler = (event, icdcode_id) => {
    const payload = {
      icd_id: icdcode_id
    };
    let checked = event.target.checked;
    setState(
      result.map((item) => {
        if (icdcode_id === item.id) {
          item.favorite = checked;
        }
        return state;
      })
    );
    if (checked === true) {
      icdcodesService.addFavorite(icdcode_id, user.id, payload).then(
        (response) => {
          setTimeout(() => {
            dispatch(setSuccess(`${response.data.message}`));
          }, 300);
        },
        (error) => {
          setTimeout(() => {
            setErrors(error.response.error);
          }, 300);
        }
      );
    } else {
      icdcodesService.deleteFavorite(icdcode_id).then(
        (response) => {
          setTimeout(() => {
            dispatch(setSuccess(`${response.data.message}`));
          }, 300);
        },
        (error) => {
          setTimeout(() => {
            setErrors(error.response.error);
          }, 300);
        }
      );
    }
  };

  return (
    <div>
      {errors &&
        errors.map((error, index) => (
          <Alert severity="error" key={index}>
            {error.msg}
          </Alert>
        ))}
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table
          size="small"
          className={classes.table}
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox">Code</StyledTableCell>
              <StyledTableCell padding="checkbox">Description</StyledTableCell>
              <StyledTableCell padding="checkbox">Favorites</StyledTableCell>
              <StyledTableCell padding="checkbox">Updated</StyledTableCell>
              <StyledTableCell padding="checkbox">Updated By</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((code) => (
              <StyledTableRow key={code.id}>
                <TableCell padding="checkbox" component="th" scope="row">
                  {code.id}
                </TableCell>
                <TableCell padding="checkbox">{code.name}</TableCell>
                <TableCell padding="checkbox">
                  <FormControlLabel
                    control={
                      <GreenSwitch
                        size="small"
                        checked={Boolean(code.favorite)}
                        name="switchBox"
                        onChange={(e) => {
                          changeHandler(e, code.id);
                          setTimeout(() => {
                            fetchSearchIcdCodes();
                          }, 200);
                        }}
                      />
                    }
                  />
                </TableCell>
                <TableCell padding="checkbox">
                  {code.updated ? moment(code.updated).format("lll") : ""}
                </TableCell>
                <TableCell padding="checkbox">{code.updated_name}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ICDcodestable;
