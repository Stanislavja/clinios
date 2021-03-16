import React, { useState } from "react";

import {
  Button,
  Container,
  CssBaseline,
  makeStyles,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import ContractDetailModal from "./components/ContractDetailModal";

// TODO: Remove the localContracts dummy data if dynamic data is in use.
const localContracts = [
  {
    signed: "Jan 1 2020 1:00:00PM",
    name: "John Doe",
    ipAddress: "192.168.100.100",
    company: "ultrawideness",
    userId: "967021",
  },
  {
    signed: "Jan 1 2020 1:00:00PM",
    name: "John Doe",
    ipAddress: "192.168.100.100",
    company: "ultrawideness",
    userId: "967021",
  },
  {
    signed: "Jan 1 2020 1:00:00PM",
    name: "John Doe",
    ipAddress: "192.168.100.100",
    company: "ultrawideness",
    userId: "967021",
  },
  {
    signed: "Jan 1 2020 1:00:00PM",
    name: "John Doe",
    ipAddress: "192.168.100.100",
    company: "ultrawideness",
    userId: "967021",
  },
  {
    signed: "Jan 1 2020 1:00:00PM",
    name: "John Doe",
    ipAddress: "192.168.100.100",
    company: "ultrawideness",
    userId: "967021",
  },
  {
    signed: "Jan 1 2020 1:00:00PM",
    name: "John Doe",
    ipAddress: "192.168.100.100",
    company: "ultrawideness",
    userId: "967021",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  contractListContainer: {
    marginTop: theme.spacing(2),
  },
  contractLink: {
    display: "block",
  },
  contractText: {
    display: "inline-block",
    padding: "4px",
    cursor: "pointer",
    "&:hover": {
      background: "#eee",
    },
  },
}));

const Contracts = () => {
  const classes = useStyles();

  // TODO: Please uncomment the code to get user data
  // const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // TODO: Please uncomment the code to use dynamic data for contracts
  // const [contracs, setContracts] = useState([]);

  // const fetchContracts = useCallback(() => {
  //   ContractsService.getContracts().then((response) => {
  //     setContracts(response.data.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   fetchContracts();
  // }, [fetchContracts]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} className={classes.root}>
        <Typography component="h1" variant="h2" color="textPrimary" m>
          Contracts
        </Typography>

        <div className={classes.contractListContainer}>
          { // TODO: Replace that with API later.
            localContracts.length
              ? localContracts.map((item) => (
                <Button key={item.signed} className={classes.contractLink}>
                  <Typography spacing={10} className={classes.contractText} onClick={() => setIsOpen(true)}>
                    {/* TODO: Replace it with dynamic text */}
                    {`c{client_id}_u{user_id}_YYYY-MM-DD-HHMMSS_contract.pdf`}
                  </Typography>
                </Button>
              ))
              : <Typography>No contracts found...</Typography>
          }
        </div>
      </Container>
      <ContractDetailModal
        // TODO: ADD (filePath) necessary props
        isOpen={isOpen}
        hendleOnClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Contracts;
