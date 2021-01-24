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

import DropDown from "../../../../components/common/DropDown";
import { StyledTableCellLg, StyledTableRowLg } from "../../../../components/common/StyledTable";
import useDebounce from "../../../../hooks/useDebounce";
import LabRangeService from "../../../../services/setup/labrange.service";
import { AgeOptions, GenderOptions } from "../../../../static/setup/labRange";
import Counter from "./components/counter";

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

  const [labSearch, setLabSearch] = useState("");
  const [labSearchResults, setLabSearchResults] = useState([]); // live search results
  const [useFuncRange, setUseFuncRange] = useState(false);
  const [labs, setLabs] = useState([]);

  const fetchLabs = useCallback(() => {
    LabRangeService.getLabRanges().then((res) => {
      setLabs(res.data);
    });
  }, []);

  useEffect(() => {
    fetchLabs();
  }, [fetchLabs]);

  const debouncedSearchTerm = useDebounce(labSearch, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const reqBody = {
        data: {
          text: debouncedSearchTerm,
        },
      };
      LabRangeService.searchLabs(reqBody).then((res) => {
        setLabSearchResults(res.data);
      });
    }
  }, [debouncedSearchTerm]);

  const handleChangeFuncRange = () => {
    setUseFuncRange((prevState) => !prevState);
  };

  const deleteItemHandler = (index) => {
    const labsDataClone = [...labs];
    labsDataClone.splice(index, 1);
    setLabs([...labsDataClone]);
  };

  const dropdownChangeHandler = (index, name, value) => {
    const labsDataClone = [...labs];
    labsDataClone[index][name] = value;
    setLabs([...labsDataClone]);
  };

  return (
    <div className={classes.root}>
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
            >
              Save
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
          >
            Reset
          </Button>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={9} xs={12}>
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
                {!!labSearch && labSearchResults.length
                  ? labSearchResults.map((item, index) => (
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
                        {item.created ? moment(item.created).format("MMM D YYYY") : ""}
                      </TableCell>
                      <TableCell>
                        {item.updated ? moment(item.updated).format("MMM D YYYY") : ""}
                      </TableCell>
                      <TableCell>{item.created_by}</TableCell>
                    </StyledTableRowLg>
                  ))
                  : labs && labs.length
                    ? labs.map((item, index) => (
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
      </Grid>
      <TextField
        name="labSearch"
        label="Search Lab Tests"
        value={labSearch}
        onChange={(e) => setLabSearch(e.target.value)}
      />
    </div>
  );
};

export default LabRanges;
