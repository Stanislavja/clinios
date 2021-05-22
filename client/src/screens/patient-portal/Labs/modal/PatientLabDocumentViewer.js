import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const useStyles = makeStyles((theme) => ({
  appBar: {
    textAlign: "right",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    justifyContent: "space-between",
  },
  PDFViewer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    display: "grid",
    gridTemplateColumns: "max-content",
    justifyContent: "center",
    alignContent: "center",
  },
  PaginationWrap: {
    display: "flex",
    justifyContent: "center",
  },
  documentPage: {
    background: "red",
    textAlign: "center",
  },
  "my-doc-viewer-style": {
    background: "#fff !important",
  },
}));

const PatientLabDocumentViewer = ({
  documentName, patientId,
}) => {
  const classes = useStyles();
  const [file, setFile] = useState("");

  useEffect(() => {
    const filePath = `${process.env.REACT_APP_API_URL}static/patient/pid${patientId}_${documentName}`;
    setFile(filePath);
  }, [documentName, patientId]);

  return (
    <>
      <DocViewer
        className={classes["my-doc-viewer-style"]}
        config={{
          header: {
            disableHeader: true,
            disableFileName: true,
            retainURLParams: true,
          },
        }}
        pluginRenderers={DocViewerRenderers}
        documents={[
          { uri: file },
        ]}
      />
    </>
  );
};

PatientLabDocumentViewer.propTypes = {
  patientId: PropTypes.string.isRequired,
  documentName: PropTypes.string.isRequired,
};
export default PatientLabDocumentViewer;
