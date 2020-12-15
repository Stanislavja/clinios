import React, { useEffect, useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import { pdfjs, Document, Page } from "react-pdf";

pdfjs
  .GlobalWorkerOptions
  .workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const useStyles = makeStyles((theme) => ({
  appBar: {
    textAlign: "right",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    justifyContent: "flex-end",
  },
  PDFViewer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));


const Lab = ({ open, handleClose }) => {
  const classes = useStyles();
  const [file, setFile] = useState("");
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line global-require
    setFile(require("./2018.06.22_Labcorp_CMP.pdf"));
  }, []);

  const onDocumentLoadSuccess = ({ totalPage }) => {
    setNumPages(totalPage);
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.title}>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.PDFViewer}>
        <Document
          file={(file)}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {
            Array.from(
              new Array(numPages),
              (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                />
              ),
            )
          }
        </Document>
      </div>
    </Dialog>
  );
};

Lab.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default Lab;
