import React, { useState, useEffect, useRef } from "react";

import { Grid, makeStyles, Button, Typography } from "@material-ui/core";
import { mdiArrowLeftBold, mdiArrowRightBold } from "@mdi/js";
import Icon from "@mdi/react";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import useAuth from "../../hooks/useAuth";
import Patient from "../../services/patient.service";
import Tests from "../../services/test.service";
import { calculateFunctionalRange } from "../../utils/FunctionalRange";
import { Graph } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: "10px",
    height: "100%",
  },
  filterbutton: {
    marginRight: "10px",
  },
  testGraphContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexDirection: "column",
    marginTop: "20px",
  },
  testGraph: {
    alignSelf: "center",
    width: 1000,
  },
  graphArrowIconContainer: {
    width: "70px",
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    marginBottom: "20px",
  },
  graphArrowIcon: {
    marginBottom: theme.spacing(1 / 3),
    marginLeft: theme.spacing(1),
    color: "#2979ffdb",
  },
  filterButtonContainer: {
    display: "flex",
    maxHeight: "55px",
    marginTop: "15px",
    paddingBottom: "15px",
    justifyContent: "flex-end",
  },
  rangeContainer: {
    marginRight: "50px",
    marginLeft: "50px",
  },
  inRange: {
    color: "#008000",
  },
  outOfRange: {
    color: "#FFA500",
  },
}));

const TestGraph = ({ changeTitle }) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { user } = useAuth();
  const [cptName, setCptName] = useState("");
  const [functionalRange, setFunctionalRange] = useState({});
  const [conventionalRange, setConventionalRange] = useState({});
  const [labCpt, setLabCpt] = useState([]);
  const [graph, setGraph] = useState(null);
  const [graphFilterData, setGraphFilterData] = useState(null);
  const [testId, setTestId] = useState("");
  const [cptIdCount, setCptIdCount] = useState(0);
  const [range, setRange] = useState({});
  const ref = useRef(null);

  /* eslint-disable */
  useEffect(() => {
    if (cptName[0]?.name) {
      changeTitle(cptName[0].name);
    }
  }, [cptName]);

  /* eslint-disable */
  useEffect(() => {
    if (testId) {
      Tests.getTestCptName(testId).then(
        (res) => {
          const data = res?.data?.data;
          setCptName(data);
        },
        () => {
          enqueueSnackbar(`Unable to fetch test by id ${testId}.`, {
            variant: "error",
          });
        }
      );
    }
    if (testId) {
      Tests.getConventionalRange(user.id, testId).then(
        (res) => {
          const data = res?.data?.data;
          const cRange = {
            high: data[data.length - 1].range_high,
            low: data[data.length - 1].range_low,
          };
          const graphData = res?.data.data.map((d) => ({
            id: d.cpt_id,
            lab_dt: d.lab_dt,
            filename: d.filename,
            value: d.value,
          }));
          setGraph(graphData);
          setGraphFilterData(graphData);
          setConventionalRange(cRange);
        },
        () => {
          enqueueSnackbar("Unable to fetch Activity history.", {
            variant: "error",
          });
        }
      );
    }
    Patient.getFunctionalRange(user.id).then(
      (res) => {
        const data = res?.data;
        setFunctionalRange(data);
      },
      () => {
        enqueueSnackbar("Unable to fetch Activity history.", {
          variant: "error",
        });
      }
    );
    Tests.getLabCpt(user.id).then(
      (res) => {
        const data = res?.data;
        setLabCpt(data);
      },
      () => {
        enqueueSnackbar("Unable to fetch Activity history.", {
          variant: "error",
        });
      }
    );
  }, [testId]);

  useEffect(() => {
    if (functionalRange?.functional_range && graph) {
      if (functionalRange?.functional_range[0]?.functional_range !== 0) {
        const data = calculateFunctionalRange(
          testId,
          functionalRange?.gender,
          functionalRange?.age
        );
        setRange(data);
      }
    }
  }, [functionalRange, graph, testId]);

  useEffect(() => {
    if (labCpt?.data?.length > 0 && labCpt.data[cptIdCount]) {
      setTestId(labCpt.data[cptIdCount].id);
    }
  }, [labCpt, cptIdCount]);

  const previousCpt = () => {
    if (cptIdCount > 0) {
      setCptIdCount(cptIdCount - 1);
    }
  };
  const nextCpt = () => {
    if (labCpt?.data?.length > cptIdCount) {
      setCptIdCount(cptIdCount + 1);
    }
  };

  const filterDate = (filer) => {
    const endDate = moment();
    let startDate;
    if (filer === "month_6") {
      startDate = moment().subtract(6, "M");
    }
    if (filer === "month_3") {
      startDate = moment().subtract(3, "M");
    }
    if (filer === "year_1") {
      startDate = moment().subtract(12, "M");
    }
    if (filer === "year_2") {
      startDate = moment().subtract(24, "M");
    }
    if (filer === "year_3") {
      startDate = moment().subtract(36, "M");
    }
    if (filer === "year_4") {
      startDate = moment().subtract(48, "M");
    }

    const filterData = [];

    if (filer === "all") {
      setGraphFilterData(graph);
    } else {
      for (let i = 0; i < graph.length; i += 1) {
        const compareDate = moment(graph[i].lab_dt);
        const com = compareDate.isBetween(startDate, endDate);
        if (com) {
          filterData.push(graph[i]);
        }
      }
      setGraphFilterData(filterData);
    }
  };

  return (
    <div className={classes.root} ref={ref}>
      <div className={classes.graphArrowIconContainer}>
        <Button
          disabled={cptIdCount <= 0}
          onClick={previousCpt}
          color="default"
          className={classes.graphArrowIcon}
        >
          <Icon
            path={mdiArrowLeftBold}
            size={1.3}
            horizontal
            vertical
            rotate={180}
          />
        </Button>
        <Button
          disabled={cptIdCount >= labCpt?.data?.length}
          onClick={nextCpt}
          color="default"
          className={classes.graphArrowIcon}
          target="_blank"
        >
          <Icon
            path={mdiArrowRightBold}
            size={1.3}
            horizontal
            vertical
            rotate={180}
          />
        </Button>
      </div>

      {graph && (
        <Graph
          data={graphFilterData}
          range={range}
          conventionalRange={conventionalRange}
        />
      )}
      <Grid item className={classes.filterButtonContainer}>
        <Button
          size="medium"
          type="submit"
          variant="contained"
          color="default"
          className={classes.filterbutton}
          onClick={() => filterDate("month_3")}
        >
          3 Months
        </Button>
        <Button
          size="medium"
          type="submit"
          variant="contained"
          color="default"
          className={classes.filterbutton}
          onClick={() => filterDate("month_6")}
        >
          6 Months
        </Button>
        <Button
          size="medium"
          type="submit"
          variant="contained"
          color="default"
          className={classes.filterbutton}
          onClick={() => filterDate("year_1")}
        >
          1 Years
        </Button>
        <Button
          size="medium"
          type="submit"
          variant="contained"
          color="default"
          className={classes.filterbutton}
          onClick={() => filterDate("year_2")}
        >
          2 Years
        </Button>
        <Button
          size="medium"
          type="submit"
          variant="contained"
          color="default"
          className={classes.filterbutton}
          onClick={() => filterDate("year_3")}
        >
          3 Years
        </Button>
        <Button
          size="medium"
          type="submit"
          variant="contained"
          color="default"
          className={classes.filterbutton}
          onClick={() => filterDate("year_4")}
        >
          4 Years
        </Button>
        <Button
          size="medium"
          type="submit"
          variant="contained"
          color="default"
          className={classes.filterbutton}
          onClick={() => filterDate("all")}
        >
          All
        </Button>
        <Grid
          direction="column"
          justify="center"
          alignItems="flex-end"
          className={classes.rangeContainer}
        >
          <Typography className={classes.inRange} variant="h5">
            --- Within range
          </Typography>
          <Typography className={classes.outOfRange} variant="h5">
            --- Out of range
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
TestGraph.propTypes = {
  changeTitle: PropTypes.func.isRequired,
};
export default TestGraph;
