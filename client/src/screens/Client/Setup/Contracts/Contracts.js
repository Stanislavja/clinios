import React, { useEffect, useState, useCallback } from "react";

import {
  Button,
  Container,
  CssBaseline,
  makeStyles,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import userService from "../../../../services/users.service";
import ContractDetailModal from "./components/ContractDetailModal";

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

  const [isOpen, setIsOpen] = useState(false);
  const [contracs, setContracts] = useState([]);
  const [selectedFilepath, setSelectedFilepath] = useState(null);

  const fetchContracts = useCallback(() => {
    userService.getContractlists().then((response) => {
      setContracts(response.data.data);
    });
  }, []);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  const handleOnClick = (_, fileName) => {
    setSelectedFilepath(`${process.env.REACT_APP_API_URL}static/client/${fileName}`);
    setIsOpen(true);
  };
  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} className={classes.root}>
        <Typography component="h1" variant="h2" color="textPrimary" m>
          Contracts
        </Typography>

        <div className={classes.contractListContainer}>
          {
            contracs.length
              ? contracs.map((item) => (
                <Button
                  key={item.id}
                  className={classes.contractLink}
                  onClick={(_) => handleOnClick(_, item.contract_file_name)}
                >
                  <Typography spacing={10} className={classes.contractText}>
                    {item.contract_file_name}
                  </Typography>
                </Button>
              ))
              : <Typography>No contracts found...</Typography>
          }
        </div>
      </Container>
      <ContractDetailModal
        filePath={selectedFilepath}
        isOpen={isOpen}
        hendleOnClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Contracts;
