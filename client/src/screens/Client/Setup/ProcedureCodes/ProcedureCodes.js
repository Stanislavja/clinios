import React, { useEffect, useState } from "react";

import { CssBaseline, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import ProcedureService from "../../../../services/procedure.service";
import ProcedureForm from "./component/ProcedureForm";
import ProcedureTable from "./component/ProcedureTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
}));

export default function ProcedureCodes() {
  const classes = useStyles();
  const [lebCompanyList, setLabCompanyList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [procedureId, setCptId] = useState("");
  const [procedureDescription, setCptDescription] = useState("");
  const [labCompanyId, setLabCompanyId] = useState("");
  const [favorite, setFavorite] = useState("");
  const [billable, setBillable] = useState("");
  const [self, setSelf] = useState("");
  const [group, setGroup] = useState("");
  const payload = {
    procedureId,
    procedureDescription,
    labCompanyId,
    favorite,
    billable,
    self,
    group,
  };

  const fetchLabCompanyList = () => {
    ProcedureService.getLabCompnayList().then((res) => {
      setLabCompanyList(res.data);
    });
  };

  useEffect(() => {
    fetchLabCompanyList();
  }, []);

  const fetchCptCodeSearch = () => {
    ProcedureService.search(payload).then((res) => {
      setSearchResult(res.data.data);
    });
  };

  const handleChangeOfCptId = (e) => {
    setCptId(e.target.value);
  };
  const handleChangeOfCptDescription = (e) => {
    setCptDescription(e.target.value);
  };
  const handleChangeOfLabCompanyId = (e) => {
    setLabCompanyId(e.target.value);
  };
  const handleChangeOfFavorite = (e) => {
    setFavorite(e.target.checked);
  };
  const handleChangeOfBillable = (e) => {
    setBillable(e.target.checked);
  };
  const handleChangeOfSelf = (e) => {
    setSelf(e.target.checked);
  };
  const handleChangeOfGroup = (e) => {
    setGroup(e.target.checked);
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Typography
          component="h1"
          variant="h2"
          color="textPrimary"
          className={classes.title}
        >
          Procedure Codes
        </Typography>
        <Typography component="p" variant="body2" color="textPrimary">
          This page is used to manage Procedure codes
        </Typography>
        <ProcedureForm
          lebCompanyList={lebCompanyList}
          fetchCptCodeSearch={fetchCptCodeSearch}
          handleChangeOfCptId={handleChangeOfCptId}
          handleChangeOfCptDescription={handleChangeOfCptDescription}
          handleChangeOfLabCompanyId={handleChangeOfLabCompanyId}
          handleChangeOfFavorite={handleChangeOfFavorite}
          handleChangeOfBillable={handleChangeOfBillable}
          handleChangeOfSelf={handleChangeOfSelf}
          handleChangeOfGroup={handleChangeOfGroup}
          labCompanyId={labCompanyId}
        />
        {searchResult.length > 0 && (
          <ProcedureTable
            searchResult={searchResult}
            fetchCptCodeSearch={fetchCptCodeSearch}
          />
        )}
      </div>
    </>
  );
}
