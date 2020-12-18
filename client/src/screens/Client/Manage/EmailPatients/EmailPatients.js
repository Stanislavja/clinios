import React, { useEffect } from "react";

import { makeStyles, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import { useSnackbar } from "notistack";

import EmailPatient from "../../../../services/manage/emailPatient.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
  status: {
    display: "flex",
    alignItems: "center",
  },
  subject: {
    width: "50%",
  },
  fields: {
    display: "flex",
    flexDirection: "column",
  },
  texArea: {
    width: "75%",
  },
  next: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: "100px",
  },
  historyTop: {
    marginTop: "15px",
  },
  tableContainer: {
    borderRadius: 0,
    marginTop: "5px",
    display: "flex",
    border: "black solid 1px",
    padding: "5px",
    height: "300px",
    flexDirection: "row",
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 13,
  },
}))(Tooltip);


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.grey,
    fontSize: "12px",
    fontWeight: 700,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    fontSize: 14,
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "& th": {
      fontSize: 12,
    },
    "& td": {
      fontSize: 12,
    },
  },
}))(TableRow);

const isLessThan30Minutes = (createdTime) => (moment()
  .subtract(30, "minutes")
  .format()
      < moment(createdTime)
        .format()
);


export default function EmailPatients() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [emailHistory, setEmailHistory] = React.useState([]);
  const [active, setActive] = React.useState(false);
  const [inActive, setInActive] = React.useState(false);


  const fetchEmailHistory = () => {
    EmailPatient.getEmailHistory().then((response) => {
      setEmailHistory(response.data.data);
    });
  };

  useEffect(() => {
    fetchEmailHistory();
  }, []);

  const handleEmailHistoryDeletion = (createdDate) => {
    EmailPatient.deleteEmailHistory(moment(createdDate).format("YYYY-MM-DD HH:mm:ss")).then((response) => {
      enqueueSnackbar(`${response.data.message}`, {
        variant: "success",
      });
      fetchEmailHistory();
    });
  };

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Email Patients
      </Typography>
      <Typography component="p" variant="body2" color="textPrimary">
        This pages send a message to all patients
      </Typography>
      <div className={classes.status}>
        <Typography component="p" variant="body2" color="textPrimary">
          Patient Status:
        </Typography>

        <FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="active"
              control={<Checkbox color="primary" />}
              label="Active"
              labelPlacement="start"
              disabled={inActive}
              onChange={(event) => setActive(event.target.checked)}
            />
            <FormControlLabel
              value="inactive"
              control={<Checkbox color="primary" />}
              label="Inactive"
              labelPlacement="start"
              onChange={(event) => setInActive(event.target.checked)}
              disabled={active}
            />
          </FormGroup>
        </FormControl>
      </div>

      <div className={classes.fields}>
        <TextField
          className={classes.subject}
          value={subject}
          variant="outlined"
          margin="normal"
          id="subject"
          label="Subject"
          name="subject"
          autoComplete="subject"
          autoFocus
          onChange={(event) => setSubject(event.target.value)}
          size="small"
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Message"
          className={classes.texArea}
          InputProps={{
            classes: classes.normalOutline,
            inputComponent: TextareaAutosize,
            rows: 8,
          }}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          size="small"
        />
        <Button
          disabled={!subject || !message}
          variant="contained"
          color="primary"
          className={classes.next}
        >
          Next
        </Button>
      </div>
      <div className={classes.historyTop}>
        <Typography component="p" variant="body2" color="textPrimary">
          History
        </Typography>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table
            size="small"
            className={classes.table}
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell padding="checkbox">Date</StyledTableCell>
                <StyledTableCell padding="checkbox">Subject</StyledTableCell>
                <StyledTableCell padding="checkbox">Message</StyledTableCell>
                <StyledTableCell padding="checkbox">Status</StyledTableCell>
                <StyledTableCell padding="checkbox">Sent By</StyledTableCell>
                <StyledTableCell padding="checkbox">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emailHistory.map((history) => (
                <StyledTableRow key={history.created}>
                  <TableCell
                    style={{ whiteSpace: "nowrap" }}
                    padding="checkbox"
                    component="th"
                    scope="row"
                  >
                    {moment(history.created).format("lll")}
                  </TableCell>
                  <TableCell padding="checkbox" component="th" scope="row">
                    {history.subject}
                  </TableCell>
                  {history.message && history.message.length > 25 ? (
                    <LightTooltip title={history.message}>
                      <TableCell
                        padding="checkbox"
                        className={classes.overFlowControl}
                      >
                        {`${history.message.substring(0, 25)}...`}
                      </TableCell>
                    </LightTooltip>
                  ) : (
                    <TableCell
                      padding="checkbox"
                      className={classes.overFlowControl}
                    >
                      {history.message || ""}
                    </TableCell>
                  )}

                  <TableCell padding="checkbox" component="th" scope="row">
                    {history.status
                      ? history.status === "A" ? "Active" : "InActive"
                      : ""}
                  </TableCell>
                  <TableCell padding="checkbox">
                    {history.created_user}
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.actions}>
                    { isLessThan30Minutes(history.created)
                      ? (
                        <>
                          <IconButton
                            aria-label="edit"
                            className={classes.margin}
                            onClick={() => alert("on Edit click")}
                          >
                            <EditIcon fontSize="default" />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            className={classes.margin}
                            onClick={() => handleEmailHistoryDeletion(history.created)}
                          >
                            <DeleteIcon fontSize="default" />
                          </IconButton>
                        </>
                      )
                      : ""}

                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
