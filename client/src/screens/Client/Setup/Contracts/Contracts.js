import React, { useState } from "react";

import {
  Button,
  Container,
  CssBaseline,
  makeStyles,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
// import _ from "lodash";

// import useAuth from "../../../../hooks/useAuth";
// import ContractsService from "../../../../services/setup/contracts.service";
import ContractDetailModal from "./components/ContractDetailModal";

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

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  contractListContainer: {
    marginTop: "20px",
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
  // const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

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
                    {`c{client_id}_u{user_id}_YYYY-MM-DD-HHMMSS_contract.pdf`}
                  </Typography>
                </Button>
              ))
              : <Typography>No contracts found...</Typography>
          }
        </div>
      </Container>
      <ContractDetailModal isOpen={isOpen} hendleOnClose={() => setIsOpen(false)} />
    </>
  );
};

export default Contracts;
