import React, { useState, useEffect, useCallback } from "react";

import {
  makeStyles,
  Grid,
  Button,
  Switch,
  Typography,
  TextField,
  FormControlLabel,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";
import moment from "moment";
import { useSnackbar } from "notistack";

import Alert from "../../../../components/Alert";
import DropDown from "../../../../components/common/DropDown";
import { StyledTableCellLg, StyledTableRowLg } from "../../../../components/common/StyledTable";
import LabRangeService from "../../../../services/setup/labrange.service";
import { AgeOptions, GenderOptions } from "../../../../static/setup/labRange";
import Counter from "./components/Counter";
import NewLabRange from "./components/NewLabRange";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  w100: {
    minWidth: 100,
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  labelContainer: {
    pointerEvents: "none",
  },
  label: {
    fontSize: 16,
    marginRight: theme.spacing(1),
  },
  pointerEnable: {
    pointerEvents: "auto",
  },
  table: {
    "& button": {
      padding: 6,
      minWidth: 40,
      lineHeight: 1.5,
    },
    "& input": {
      width: 50,
    },
  },
}));

const LabRanges = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [selectedRange, setSelectedRange] = useState({});
  const [showNewRangeDialog, setShowNewRangeDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [useFuncRange, setUseFuncRange] = useState(true);
  const [labRanges, setLabRanges] = useState([]);

  const openResetDialog = () => {
    setShowResetDialog((prevstate) => !prevstate);
  };

  const closeResetDialog = () => {
    setShowResetDialog((prevstate) => !prevstate);
  };

  const fetchLabs = useCallback(() => {
    LabRangeService.getLabRanges().then((res) => {
      setLabRanges(res.data);
    });
  }, []);

  useEffect(() => {
    fetchLabs();
  }, [fetchLabs]);

  const handleChangeFuncRange = () => {
    setUseFuncRange((prevState) => !prevState);
  };

  const deleteItemHandler = (index) => {
    const labsDataClone = [...labRanges];
    labsDataClone.splice(index, 1);
    setLabRanges([...labsDataClone]);
  };

  const editItemHandler = (item) => {
    setSelectedRange(item);
    setShowNewRangeDialog(true);
  };

  const dropdownChangeHandler = (index, name, value) => {
    const labsDataClone = [...labRanges];
    labsDataClone[index][name] = value;
    setLabRanges([...labsDataClone]);
  };

  const applyResetHandler = () => {
    LabRangeService.resetLabRanges().then((res) => {
      enqueueSnackbar(`${res.message}`, { variant: "success" });
    });
  };

  return (
    <>
      <Alert
        open={showResetDialog}
        title="Confirm Reset"
        message="Are you sure you want to reset all custom lab ranges to the original values?"
        applyButtonText="Reset"
        cancelButtonText="Cancel"
        applyForm={applyResetHandler}
        cancelForm={closeResetDialog}
      />
      <NewLabRange
        isOpen={showNewRangeDialog}
        onClose={() => setShowNewRangeDialog(false)}
        reloadData={fetchLabs}
        selectedItem={selectedRange}
      />
      <div className={classes.root}>
        <Grid item lg={10}>
          <Grid
            container
            justify="space-between"
            className={classes.mb2}
          >
            <Grid item lg={6}>
              <Grid container justify="space-between">
                <Typography
                  component="h1"
                  variant="h2"
                  color="textPrimary"
                  className={classes.title}
                >
                  Functional Lab Ranges
                </Typography>
                <Button
                  variant="outlined"
                  className={classes.w100}
                  onClick={() => setShowNewRangeDialog(true)}
                >
                  New
                </Button>
                <FormControlLabel
                  control={(
                    <Switch
                      checked={useFuncRange}
                      color="primary"
                      size="medium"
                      name="switchBox"
                      onChange={handleChangeFuncRange}
                      inputProps={{ "aria-label": "secondary checkbox" }}
                      className={classes.pointerEnable} // enable clicking on switch only
                    />
                  )}
                  label="Use Functional Range"
                  labelPlacement="start"
                  classes={{
                    label: classes.label,
                    root: classes.labelContainer, // to disable clicking of label
                  }}
                />
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                component="label"
                className={classes.w100}
                onClick={() => openResetDialog()}
              >
                Reset Values
              </Button>
            </Grid>
          </Grid>

          <TableContainer className={classes.mb2}>
            <Table size="small" className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCellLg>Lab Test</StyledTableCellLg>
                  <StyledTableCellLg colSpan={3}>Item</StyledTableCellLg>
                  <StyledTableCellLg>Low</StyledTableCellLg>
                  <StyledTableCellLg>High</StyledTableCellLg>
                  <StyledTableCellLg>Delete</StyledTableCellLg>
                  <StyledTableCellLg>Created</StyledTableCellLg>
                  <StyledTableCellLg>Updated</StyledTableCellLg>
                  <StyledTableCellLg>Differences from original</StyledTableCellLg>
                </TableRow>
              </TableHead>
              <TableBody>
                {labRanges && labRanges.length
                  ? labRanges.map((item, index) => (
                    <StyledTableRowLg key={item.title}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>
                        <DropDown
                          options={AgeOptions}
                          name="age"
                          label="Age"
                          value={item.age}
                          onSelectChange={(value) => dropdownChangeHandler(index, "age", value)}
                        />
                      </TableCell>
                      <TableCell>
                        <DropDown
                          options={GenderOptions}
                          name="gender"
                          label="Gender"
                          value={item.gender}
                          onSelectChange={(value) => dropdownChangeHandler(index, "gender", value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Counter />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={item.high}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={item.low}
                        />
                      </TableCell>
                      <TableCell>
                        <Button variant="outlined" onClick={() => deleteItemHandler(index)}>
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="outlined" onClick={() => editItemHandler(item)}>
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        {item.created ? moment(item.created).format("MMM D YYYY") : ""}
                      </TableCell>
                      <TableCell>
                        {item.updated ? moment(item.updated).format("MMM D YYYY") : ""}
                      </TableCell>
                      <TableCell>{item.created_by}</TableCell>
                    </StyledTableRowLg>
                  ))
                  : (
                    <StyledTableRowLg>
                      <TableCell colSpan={10}>
                        <Typography align="center" variant="body1">
                          No Records Found...
                        </Typography>
                      </TableCell>
                    </StyledTableRowLg>
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </div>
    </>
  );
};

export default LabRanges;
