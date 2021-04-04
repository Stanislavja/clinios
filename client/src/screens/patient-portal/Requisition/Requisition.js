import React, {
  useState, useEffect, useCallback, useRef,
} from "react";

import { makeStyles, Typography, Grid } from "@material-ui/core";
import { useReactToPrint } from "react-to-print";

import useAuth from "../../../hooks/useAuth";
import PatientPortalService from "../../../services/patient_portal/patient-portal.service";
import { dateFormat } from "../../../utils/helpers";
import PdfTemplate from "../PdfTemplate";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  btnContainer: {
    margin: theme.spacing(1, 0),
  },
  btn: {
    marginRight: 15,
    minWidth: 120,
  },
  testListContainer: {
    marginTop: 20,
  },
  mt5: {
    marginTop: 5,
  },
  test: {
    cursor: "pointer",
  },
}));

const Encounters = () => {
  const classes = useStyles();
  const { lastVisitedPatient } = useAuth();
  const componentRef = useRef();
  const [testList, setTestList] = useState([]);
  // to get personal information like firstName, lastName
  const [testProfileInfo, setTestProfileInfo] = useState();
  const [profileTests, setProfileTests] = useState();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const fetchTestList = useCallback(() => {
    PatientPortalService.getTestList(lastVisitedPatient).then((res) => {
      setTestList(res.data);
    });
  }, [lastVisitedPatient]);

  useEffect(() => {
    fetchTestList();
  }, [fetchTestList]);

  const fetchReportInformation = async (id) => {
    const testProfileInfoRes = await PatientPortalService.getTestProfileInfo(id);
    const profileTestsRes = await PatientPortalService.getProfileTests(id);
    setTestProfileInfo(testProfileInfoRes.data[0]);
    setProfileTests(profileTestsRes.data);

    handlePrint();
  };

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h2" color="textPrimary" className={classes.title}>
        Lab Requisitions
      </Typography>
      <Typography component="p" color="textPrimary">
        This page is used to view lab requisitions you can take to a Quest Diagnostics Lab
      </Typography>
      <Grid container className={classes.testListContainer}>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Typography variant="h6">Date</Typography>
        </Grid>
        <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
          <Typography variant="h6">Tests</Typography>
        </Grid>
      </Grid>
      {testList.map((list) => (
        <Grid key={list.id} container className={classes.mt5} onClick={() => fetchReportInformation(list.id)}>
          <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
            <Typography component="p">{dateFormat(list.dt)}</Typography>
          </Grid>
          <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
            <Typography component="p" className={classes.test}>
              {list.tests}
            </Typography>
          </Grid>
        </Grid>
      ))}

      {/* <button onClick={handlePrint}>Print this out!!!</button> */}
      <div style={{ display: "none" }}>
        <PdfTemplate testProfileInfo={testProfileInfo} profileTests={profileTests} ref={componentRef} />
      </div>
      {/* <Grid item lg={3} md={4} sm={6} xs={12}>
        <form onSubmit={onFormSubmit}>
          <TextField
            select
            required
            variant="outlined"
            label="Select Lab Requisition"
            margin="dense"
            fullWidth
            value={selectedRequisition}
            onChange={(e) => setSelectedRequisition(e.target.value)}
          >
            {requisitions.length ? (
              requisitions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.lab}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No Requisitions available</MenuItem>
            )}
          </TextField>
        </form>
      </Grid> */}
      {/* <Grow
        in={Boolean(selectedRequisition)}
        style={{ transformOrigin: "0 0 0" }}
        {...(selectedRequisition ? { timeout: 500 } : {})}
      ></Grow> */}
    </div>
  );
};

export default Encounters;
