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
    pageStyle: `
    @media print
    {
     
      footer#footer-sections a {
        background-image: unset;
      }

      @page {
        margin-top: 0;
        
        @bottom-center {
          content: "Page " counter(page) " of " counter(pages);
        }
      }

      @page{
        @bottom-center {
          content: "Page " counter(page) " of " counter(pages);
        }
      }
      
      
       body  {
        
       }
    } `,
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
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Typography variant="h6">Date</Typography>
        </Grid>
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
          <Typography variant="h6">Tests</Typography>
        </Grid>
      </Grid>
      {testList.map((list) => (
        <Grid key={list.id} container className={classes.mt5}>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <Typography component="p">{dateFormat(list.dt)}</Typography>
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8} onClick={() => fetchReportInformation(list.id)}>
            <Typography component="p" className={classes.test}>
              {list.tests}
            </Typography>
          </Grid>
        </Grid>
      ))}

      {testProfileInfo && profileTests && (
        <div style={{ display: "none" }}>
          <PdfTemplate testProfileInfo={testProfileInfo} profileTests={profileTests} ref={componentRef} />
        </div>
      )}
    </div>
  );
};

export default Encounters;
