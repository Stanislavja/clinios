import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Card from "../../components/common/Card";
import Dialog from "../../components/Dialog";
import useAuth from "../../hooks/useAuth";
import PatientService from "../../services/patient.service";
import {
  FirstColumnPatientCards,
  ThirdColumnPatientCards,
  FourthColumnPatientCards,
} from "../../static/patient";
import { setError, setSuccess } from "../../store/common/actions";
import { resetEditorText } from "../../store/patient/actions";
import {
  AdminNotesForm,
  AdminNotesHistory,
  AdminNotesCardContent,
} from "./components/AdminNotes";
import {
  Allergies,
  AllergiesCardContent,
  AllergiesDetails,
} from "./components/Allergies";
import {
  BasicInfo,
  PatientCardContent,
  PatientHistoryDetails,
} from "./components/BasicInfo";
import {
  NewTransactionForm,
  PaymentForm,
  BillingCardContent,
  BillingDetails,
} from "./components/Billing";
import {
  DiagnosesForm,
  DiagnosesCardContent,
  DiagnosesDetails,
} from "./components/Diagnoses";
import { DocumentsCardContent } from "./components/Documents";
import {
  HandoutsForm,
  HandoutsCardContent,
  HandoutsDetails,
} from "./components/Handouts";
import EncountersForm from "./Encounters";
import EncountersCardContent from "./Encounters/content";
import EncountersDetails from "./Encounters/details";
import Form from "./Form";
import FormCardContent from "./Form/content";
import FormDetails from "./Form/details";
import MedicalNotesForm from "./MedicalNotes";
import MedicalNotesCardContent from "./MedicalNotes/content";
import MedicalNotesDetails from "./MedicalNotes/details";
import MedicationsForm from "./Medications";
import MedicationsCardContent from "./Medications/content";
import MedicationsDetails from "./Medications/details";
import NewMessageForm from "./Messages";
import MessagesCardContent from "./Messages/content";
import MessagesDetails from "./Messages/details";
import RequisitionsForm from "./Requisitions";
import RequisitionsCardContent from "./Requisitions/content";
import RequisitionsDetails from "./Requisitions/details";
import TestsCardContent from "./Tests/content";

import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
import "../../reactGridLayout.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const useStyles = makeStyles(() => ({
  main: {
    minHeight: "calc(100vh - 163px)",
  },
  noDisplay: {
    display: "none",
  },
}));

export default function Patient() {
  const classes = useStyles();
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { patientId } = useParams();
  const { user } = useAuth();
  const userId = user.id;

  // patient ID authenticity
  const [hasPatientIderror, setHasPatientIderror] = useState(true);

  // grid layout states
  const [layout, setLayout] = useState([]);
  const [layoutToSave, setLayoutToSave] = useState([]);
  const [isLayoutUpdated, setIsLayoutUpdated] = useState(false);
  const [firstCardsSequence, setFirstCardsSequence] = useState([
    ...FirstColumnPatientCards,
  ]);
  const [thirdCardsSequence, setThirdCardsSequence] = useState([
    ...ThirdColumnPatientCards,
  ]);

  // dialog states
  const [showPatientInfoDialog, setShowPatientInfoDialog] = useState(false);
  const [showPatientHistoryDialog, setShowPatientHistoryDialog] = useState(
    false,
  );

  const [showAdminFormDialog, setShowAdminFormDialog] = useState(false);
  const [showAdminHistoryDialog, setShowAdminHistoryDialog] = useState(false);

  const [showFormsExpandDialog, setShowFormsExpandDialog] = useState(false);
  const [showFormsViewDialog, setShowFormsViewDialog] = useState(false);

  const [showBillingExpandDialog, setShowBillingExpandDialog] = useState(false);
  const [showNewTransactionDialog, setShowNewTransactionDialog] = useState(
    false,
  );
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const [showAllergyDialog, setShowAllergyDialog] = useState(false);
  const [showAllergyExpandDialog, setShowAllergyExpandDialog] = useState(false);

  const [showHandoutsDialog, setShowHandoutsDialog] = useState(false);
  const [showHandoutsExpandDialog, setShowHandoutsExpandDialog] = useState(
    false,
  );

  const [showEncountersDialog, setShowEncountersDialog] = useState(false);
  const [showEncountersExpandDialog, setShowEncountersExpandDialog] = useState(
    false,
  );

  const [showMedicalNotesFormDialog, setShowMedicalNotesFormDialog] = useState(
    false,
  );
  const [showMedicalNotesDialog, setShowMedicalNotesDialog] = useState(false);

  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showMessageExpandDialog, setShowMessageExpandDialog] = useState(false);

  const [fetchDiagnosesStatus, setFetchDiagnosesStatus] = useState(true);
  const [showDiagnosesDialog, setShowDiagnosesDialog] = useState(false);
  const [showDiagnosesExpandDialog, setShowDiagnosesExpandDialog] = useState(
    false,
  );

  const [showMedicationDialog, setShowMedicationDialog] = useState(false);
  const [showMedicationExpandDialog, setShowMedicationExpandDialog] = useState(
    false,
  );

  const [showRequisitionDialog, setShowRequisitionDialog] = useState(false);
  const [
    showRequisitionExpandDialog,
    setShowRequisitionExpandDialog,
  ] = useState(false);

  const [showDocumentsExpandDialog, setShowDocumentsExpandDialog] = useState(
    false,
  );

  const [showTestsExpandDialog, setShowTestsExpandDialog] = useState(false);

  // data states
  const [patientData, setPatientData] = useState(null);
  const [patientBalance, setPatientBalance] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [adminNotesHistory, setAdminNotesHistory] = useState([]);
  const [patients, setPatients] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [handouts, setHandouts] = useState([]);
  const [billings, setBillings] = useState([]);
  const [forms, setForms] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [encounters, setEncounters] = useState([]);
  const [medicalNotes, setMedicalNotes] = useState([]);
  const [messages, setMessages] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);
  const [medications, setMedications] = useState([]);
  const [requisitions, setRequisitions] = useState([]);
  const [tests, setTests] = useState([]);

  const fetchCardsLayout = () => {
    PatientService.getCardsLayout(userId).then((res) => {
      const layoutResponse = res.data.length
        && res.data[0].layout
        && res.data[0].layout !== "undefined"
        ? JSON.parse(res.data[0].layout)
        : null;
      if (layoutResponse) {
        setLayout(layoutResponse);
        setIsLayoutUpdated(true);
        const tempLayout = {
          layout: JSON.stringify(layoutResponse),
        };
        setLayoutToSave(tempLayout);
      }
    });
  };

  const getThirdColumnHeight = (title) => {
    let height = 0;
    if (title === "Allergies" || title === "Requisitions") {
      height = 3;
    } else if (title === "Messages") {
      height = 6;
    } else {
      height = 4;
    }
    return height;
  };

  const generateLayout = () => {
    const y = 4;
    const firstlayout = FirstColumnPatientCards.map((item) => ({
      x: 0,
      y: 0,
      w: 3,
      h: item.title === "Patient" ? 6 : 3.33,
      i: item.title.toString(),
    }));
    const encounterslayout = {
      x: 3,
      y: 0,
      w: 3,
      h: 16,
      i: "Encounters",
    };
    const thirdlayout = ThirdColumnPatientCards.map((item) => {
      const { title } = item;
      return {
        x: 6,
        y: 0,
        w: 3,
        h: getThirdColumnHeight(title),
        i: item.title.toString(),
      };
    });
    const fourthlayout = FourthColumnPatientCards.map((item) => ({
      x: 9,
      y: 0,
      w: 3,
      h: 3.2,
      i: item.title.toString(),
    }));
    const documentslayout = {
      x: 0,
      y,
      w: 6,
      h: 6,
      i: "Documents",
    };
    const testslayout = {
      x: 6,
      y,
      w: 6,
      h: 6,
      i: "All Tests",
    };
    setLayout([
      ...firstlayout,
      encounterslayout,
      ...thirdlayout,
      ...fourthlayout,
      documentslayout,
      testslayout,
    ]);
  };

  const updateCardsLayout = () => {
    PatientService.updateCardsLayout(userId, layoutToSave).then((res) => {
      if (res.status === "success") {
        setIsLayoutUpdated(true);
        dispatch(setSuccess(`Layout updated successfully`));
      }
    });
  };

  const resetCardsLayout = () => {
    PatientService.resetCardsLayout(userId).then((res) => {
      if (res.status === "success") {
        setIsLayoutUpdated(false);
        setLayout([]); // removing the current layout state so the cards layout gets re-rendered
        generateLayout();
        dispatch(setSuccess(`Layout reset successfully`));
      }
    });
  };

  const updateLayoutState = (gridLayout) => {
    const propsToRemove = [
      "isBounded",
      "isDraggable",
      "isResizable",
      "resizeHandles",
      "maxH",
      "minH",
      "maxW",
      "minW",
      "moved",
      "static",
    ];
    const updatedLayout = gridLayout.map((obj) => {
      const result = _.omit(obj, [...propsToRemove]);
      return result;
    });
    const tempLayout = {
      layout: JSON.stringify(updatedLayout),
    };
    setLayoutToSave(tempLayout);
  };

  const fetchPatientData = () => {
    PatientService.getPatientData(patientId).then((res) => {
      // check if patient exists in the database
      // check if patient's client_id is equal to the signed user's client_id
      if (
        !!res.data
        && res.data.client_id
        && res.data.client_id === user.client_id
      ) {
        setPatientData(res.data);
        setHasPatientIderror(false);
      } else {
        dispatch(
          setError({
            severity: "error",
            message: "Patient not found",
          }),
        );
      }
    });
  };

  useEffect(() => {
    generateLayout();
    fetchCardsLayout();
    fetchPatientData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId]);


  const fetchPatientHistory = useCallback(() => {
    PatientService.getPatientHistory(patientId).then((res) => {
      setPatientHistory(res.data);
    });
  }, [patientId]);

  const fetchAdminNotesHistory = useCallback(() => {
    PatientService.getAdminNotesHistory(patientId).then((res) => {
      setAdminNotesHistory(res.data);
    });
  }, [patientId]);

  const fetchAllergies = useCallback(() => {
    PatientService.getAllergies(patientId).then((res) => {
      setAllergies(res.data);
    });
  }, [patientId]);

  const fetchPatientHandouts = useCallback(() => {
    PatientService.getPatientHandouts(patientId).then((res) => {
      setHandouts(res.data);
    });
  }, [patientId]);

  const fetchForms = useCallback(() => {
    PatientService.getForms(patientId).then((res) => {
      setForms(res.data);
    });
  }, [patientId]);

  const fetchBillings = useCallback(() => {
    PatientService.getBillings(patientId).then((res) => {
      setBillings(res.data);
    });
  }, [patientId]);

  const fetchPatientBalance = useCallback(() => {
    PatientService.getPatientBalance(patientId).then((res) => {
      setPatientBalance(res.data && res.data.length ? res.data[0].amount : "");
    });
  }, [patientId]);

  const fetchDocuments = useCallback(() => {
    const tab = "All";
    PatientService.getDocuments(patientId, tab).then((res) => {
      setDocuments(res.data);
    });
  }, [patientId]);

  const fetchEncounters = useCallback(() => {
    PatientService.getEncounters(patientId).then((res) => {
      setEncounters(res.data);
    });
  }, [patientId]);

  const fetchMedicalNotes = useCallback(() => {
    PatientService.getMedicalNotes(patientId).then((res) => {
      setMedicalNotes(res.data);
    });
  }, [patientId]);

  const fetchMessages = useCallback(() => {
    PatientService.getMessages(patientId).then((res) => {
      setMessages(res.data);
    });
  }, [patientId]);

  const fetchDiagnoses = useCallback((status) => {
    PatientService.getDiagnoses(patientId, status).then((res) => {
      setDiagnoses(res.data);
    });
  }, [patientId]);

  const fetchMedications = useCallback(() => {
    PatientService.getMedications(patientId).then((res) => {
      setMedications(res.data);
    });
  }, [patientId]);

  const fetchRequisitions = useCallback(() => {
    const encounterId = 1; // static for the time being: discussion required
    PatientService.getRequisitions(patientId, encounterId).then((res) => {
      setRequisitions(res.data);
    });
  }, [patientId]);

  const fetchTests = useCallback(() => {
    PatientService.getTests(patientId).then((res) => {
      setTests(res.data);
    });
  }, [patientId]);

  const searchPatientHandler = (searchText) => {
    const reqBody = {
      data: {
        text: searchText,
      },
    };
    PatientService.searchPatient(patientId, reqBody).then((res) => {
      setPatients(res.data);
    });
  };

  const debouncedSearchPatients = _.debounce((query) => {
    searchPatientHandler(query);
  }, 1000);

  const togglePatientInfoDialog = () => {
    setShowPatientInfoDialog((prevState) => !prevState);
  };

  const togglePatientHistoryDialog = () => {
    setShowPatientHistoryDialog((prevState) => !prevState);
  };

  const toggleAdminFormDialog = () => {
    firstCardsSequence[1].showEditorActions = !firstCardsSequence[1]
      .showEditorActions;
    setFirstCardsSequence([...firstCardsSequence]);
    setShowAdminFormDialog((prevState) => !prevState);
  };

  const toggleAdminHistoryDialog = () => {
    setShowAdminHistoryDialog((prevState) => !prevState);
  };

  const toggleFormsExpandDialog = () => {
    setShowFormsExpandDialog((prevState) => !prevState);
  };

  const toggleFormsViewDialog = () => {
    setShowFormsViewDialog((prevState) => !prevState);
  };

  const toggleNewTransactionDialog = () => {
    setShowNewTransactionDialog((prevState) => !prevState);
  };

  const togglePaymentDialog = () => {
    setShowPaymentDialog((prevState) => !prevState);
  };

  const toggleBillngExpandDialog = () => {
    setShowBillingExpandDialog((prevState) => !prevState);
  };

  const toggleAllergyDialog = () => {
    setShowAllergyDialog((prevState) => !prevState);
  };

  const toggleAllergyExpandDialog = () => {
    setShowAllergyExpandDialog((prevState) => !prevState);
  };

  const toggleHandoutsDialog = () => {
    setShowHandoutsDialog((prevState) => !prevState);
  };

  const toggleHandoutsExpandDialog = () => {
    setShowHandoutsExpandDialog((prevState) => !prevState);
  };

  const toggleEncountersDialog = () => {
    setShowEncountersDialog((prevState) => !prevState);
  };

  const toggleEncountersExpandDialog = () => {
    setShowEncountersExpandDialog((prevState) => !prevState);
  };

  const toggleMedicalNotesDialog = () => {
    setShowMedicalNotesDialog((prevState) => !prevState);
  };

  const toggleMedicalNotesFormDialog = () => {
    thirdCardsSequence[0].showEditorActions = !thirdCardsSequence[0]
      .showEditorActions;
    setThirdCardsSequence([...thirdCardsSequence]);
    setShowMedicalNotesFormDialog((prevState) => !prevState);
  };

  const toggleMessageDialog = () => {
    setShowMessageDialog((prevState) => !prevState);
  };

  const toggleMessageExpandDialog = () => {
    setShowMessageExpandDialog((prevState) => !prevState);
  };

  const toggleMedicationDialog = () => {
    setShowMedicationDialog((prevState) => !prevState);
  };

  const toggleMedicationExpandDialog = () => {
    setShowMedicationExpandDialog((prevState) => !prevState);
  };

  const toggleDiagnosesDialog = () => {
    setShowDiagnosesDialog((prevState) => !prevState);
  };

  const toggleDiagnosesExpandDialog = () => {
    setShowDiagnosesExpandDialog((prevState) => !prevState);
  };

  const toggleRequisitionDialog = () => {
    setShowRequisitionDialog((prevState) => !prevState);
  };

  const toggleRequisitionExpandDialog = () => {
    setShowRequisitionExpandDialog((prevState) => !prevState);
  };

  const toggleDocumentsExpandDialog = () => {
    setShowDocumentsExpandDialog((prevState) => !prevState);
  };

  const toggleTestsExpandDialog = () => {
    setShowTestsExpandDialog((prevState) => !prevState);
  };

  const mapPrimaryButtonHandlers = (value) => {
    switch (value) {
      case "Patient":
        return togglePatientHistoryDialog;
      case "Admin Notes":
        return toggleAdminHistoryDialog;
      case "Forms":
        return toggleFormsViewDialog;
      case "Handouts":
        return toggleHandoutsDialog;
      case "Billing":
        return toggleNewTransactionDialog;
      case "Allergies":
        return toggleAllergyDialog;
      case "Medical Notes":
        return toggleMedicalNotesDialog;
      case "Messages":
        return toggleMessageDialog;
      case "Medications":
        return toggleMedicationDialog;
      case "Diagnoses":
        return toggleDiagnosesDialog;
      case "Requisitions":
        return toggleRequisitionDialog;
      default:
        return () => { };
    }
  };

  const mapSecondaryButtonHandlers = (value) => {
    switch (value) {
      case "Patient":
        return togglePatientInfoDialog;
      case "Admin Notes":
        return toggleAdminFormDialog;
      case "Forms":
        return toggleFormsExpandDialog;
      case "Handouts":
        return toggleHandoutsExpandDialog;
      case "Billing":
        return toggleBillngExpandDialog;
      case "Allergies":
        return toggleAllergyExpandDialog;
      case "Medical Notes":
        return toggleMedicalNotesFormDialog;
      case "Messages":
        return toggleMessageExpandDialog;
      case "Medications":
        return toggleMedicationExpandDialog;
      case "Diagnoses":
        return toggleDiagnosesExpandDialog;
      case "Requisitions":
        return toggleRequisitionExpandDialog;
      default:
        return () => { };
    }
  };

  const mapCardContentDataHandlers = (value) => {
    switch (value) {
      case "Patient":
        return <PatientCardContent data={patientData} patientId={patientId} />;
      case "Admin Notes":
        if (showAdminFormDialog) {
          return (
            <AdminNotesForm
              patientId={patientId}
              oldAdminNote={patientData && patientData.admin_note}
              onClose={toggleAdminFormDialog}
              reloadData={() => {
                fetchPatientData();
                fetchAdminNotesHistory();
              }}
            />
          );
        }
        return <AdminNotesCardContent data={patientData.admin_note} />;

      case "Forms":
        return <FormCardContent data={forms} />;
      case "Billing":
        return <BillingCardContent data={billings} />;
      case "Allergies":
        return (
          <AllergiesCardContent
            data={allergies}
            reloadData={() => fetchAllergies()}
          />
        );
      case "Medical Notes":
        if (showMedicalNotesFormDialog) {
          return (
            <MedicalNotesForm
              patientId={patientId}
              onClose={toggleMedicalNotesFormDialog}
              oldMedicalNote={patientData && patientData.medical_note}
              reloadData={() => {
                fetchPatientData();
                fetchMedicalNotes();
              }}
            />
          );
        }
        return <MedicalNotesCardContent data={patientData.medical_note} />;

      case "Handouts":
        return <HandoutsCardContent data={handouts} />;
      case "Messages":
        return (
          <MessagesCardContent
            data={messages}
            reloadData={() => fetchMessages()}
          />
        );
      case "Medications":
        return <MedicationsCardContent data={medications} />;
      case "Diagnoses":
        return <DiagnosesCardContent data={diagnoses} />;
      case "Requisitions":
        return <RequisitionsCardContent data={requisitions} />;
      default:
        return <div />;
    }
  };

  const redirectToPatientPortal = () => {
    history.push({
      pathname: "/manage/patient-search",
      state: {
        patients,
      },
    });
  };

  const mapIconHandlers = (value) => {
    switch (value) {
      case "Patient":
        return redirectToPatientPortal;
      case "Billing":
        return togglePaymentDialog;
      default:
        return () => { };
    }
  };

  const onFilePickerClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const createDocument = (reqBody) => {
    PatientService.createDocuments(patientId, reqBody)
      .then((response) => {
        dispatch(setSuccess(`${response.data.message}`));
        fetchDocuments();
      })
      .catch((error) => {
        const resMessage = (error.response
          && error.response.data
          && error.response.data.message)
          || error.message
          || error.toString();
        const severity = "error";
        dispatch(
          setError({
            severity,
            message: resMessage,
          }),
        );
      });
  };

  const handleDocumentsFile = (e) => {
    const { files } = e.target;
    const fd = new FormData();
    fd.append("file", files[0]);
    fd.append("patient_id", patientId);
    createDocument(fd);
  };

  const editorText = useSelector(
    (state) => state.patient.editorText,
    shallowEqual,
  );
  const updateAdminNotes = () => {
    if (editorText !== patientData.admin_note) {
      const reqBody = {
        data: {
          admin_note: editorText, // needs to be updated
          old_admin_note: patientData && patientData.admin_note,
        },
      };
      // TODO:: static for the time being - discussion required
      const noteId = 1;
      PatientService.updateAdminNotes(patientId, reqBody, noteId)
        .then((response) => {
          dispatch(setSuccess(`${response.data.message}`));
          dispatch(resetEditorText());
          fetchPatientData();
          fetchAdminNotesHistory();
          toggleAdminFormDialog();
        })
        .catch((error) => {
          const resMessage = (error.response
            && error.response.data
            && error.response.data.message[0].msg)
            || error.message
            || error.toString();
          const severity = "error";
          dispatch(
            setError({
              severity,
              message: resMessage,
            }),
          );
        });
    } else {
      toggleAdminFormDialog();
    }
  };

  const updateMedicalNotes = () => {
    if (editorText !== patientData.medical_note) {
      // TODO:: static for the time being - discussion required
      const noteId = 1;
      const reqBody = {
        data: {
          old_medical_note: patientData && patientData.medical_note,
          medical_note: editorText,
        },
      };
      PatientService.updateMedicalNotes(patientId, reqBody, noteId)
        .then((response) => {
          dispatch(setSuccess(`${response.data.message}`));
          dispatch(resetEditorText());
          fetchPatientData();
          fetchMedicalNotes();
          toggleMedicalNotesFormDialog();
        })
        .catch((error) => {
          const resMessage = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString();
          const severity = "error";
          dispatch(
            setError({
              severity,
              message: resMessage,
            }),
          );
        });
    } else {
      toggleMedicalNotesFormDialog();
    }
  };

  const mapEditorCancelHandler = (value) => {
    switch (value) {
      case "Admin Notes":
        return toggleAdminFormDialog();
      case "Medical Notes":
        return toggleMedicalNotesFormDialog();
      default:
        return () => { };
    }
  };

  const mapEditorSaveHandler = (value) => {
    switch (value) {
      case "Admin Notes":
        return updateAdminNotes();
      case "Medical Notes":
        return updateMedicalNotes();
      default:
        return () => { };
    }
  };

  const updateMinHeight = (key, newHeight) => {
    const calculatedHeight = newHeight / 40 + 0.5;
    // 40 is the row height, 0.5 is the margin
    const newLayout = layout.map((item) => (item.i === key
      ? { ...item, h: calculatedHeight } : item));
    setLayout([...newLayout]);
  };

  useEffect(() => {
    if (!hasPatientIderror) {
      fetchPatientHistory();
      fetchPatientBalance();
      fetchAdminNotesHistory();
      fetchAllergies();
      fetchPatientHandouts();
      fetchForms();
      fetchBillings();
      fetchDocuments();
      fetchEncounters();
      fetchMedicalNotes();
      fetchMessages();
      fetchDiagnoses(true);
      fetchMedications();
      fetchRequisitions();
      fetchTests();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [
    hasPatientIderror,
    fetchPatientHistory,
    fetchPatientBalance,
    fetchAdminNotesHistory,
    fetchAllergies,
    fetchPatientHandouts,
    fetchForms,
    fetchBillings,
    fetchDocuments,
    fetchEncounters,
    fetchMedicalNotes,
    fetchMessages,
    fetchDiagnoses,
    fetchMedications,
    fetchRequisitions,
    fetchTests,
  ]);

  return (
    <>
      <input
        type="file"
        id="file"
        accept=".pdf, .txt"
        multiple
        ref={inputFile}
        className={classes.noDisplay}
        onChange={(e) => handleDocumentsFile(e)}
      />
      {!!showPatientInfoDialog && (
        <Dialog
          open={showPatientInfoDialog}
          title={" "}
          message={(
            <BasicInfo
              formData={patientData}
              patientId={patientId}
              reloadData={fetchPatientData}
              onClose={togglePatientInfoDialog}
            />
          )}
          applyForm={() => togglePatientInfoDialog()}
          cancelForm={() => togglePatientInfoDialog()}
          hideActions
          size="lg"
        />
      )}

      {!!showPatientHistoryDialog && (
        <Dialog
          open={showPatientHistoryDialog}
          title="Patient History"
          message={(
            <PatientHistoryDetails
              data={patientHistory}
              onClose={togglePatientHistoryDialog}
            />
          )}
          applyForm={() => togglePatientHistoryDialog()}
          cancelForm={() => togglePatientHistoryDialog()}
          hideActions
          size="md"
        />
      )}
      {!!showAdminHistoryDialog && (
        <Dialog
          open={showAdminHistoryDialog}
          title="Admin Notes History"
          message={(
            <AdminNotesHistory
              onClose={toggleAdminHistoryDialog}
              data={adminNotesHistory}
            // onLoad={() => fetchPatientHistory()}
            />
          )}
          applyForm={() => toggleAdminHistoryDialog()}
          cancelForm={() => toggleAdminHistoryDialog()}
          hideActions
          size="md"
        />
      )}

      {!!showFormsExpandDialog && (
        <Dialog
          open={showFormsExpandDialog}
          title={" "}
          message={
            <FormDetails data={forms} onClose={toggleFormsExpandDialog} />
          }
          applyForm={() => toggleFormsExpandDialog()}
          cancelForm={() => toggleFormsExpandDialog()}
          hideActions
          size="md"
        />
      )}

      {!!showFormsViewDialog && (
        <Dialog
          open={showFormsViewDialog}
          title={" "}
          message={<Form onClose={toggleFormsViewDialog} />}
          applyForm={() => toggleFormsViewDialog()}
          cancelForm={() => toggleFormsViewDialog()}
          hideActions
          size="lg"
        />
      )}

      {!!showNewTransactionDialog && (
        <Dialog
          open={showNewTransactionDialog}
          title={" "}
          message={(
            <NewTransactionForm
              onClose={toggleNewTransactionDialog}
              patientId={patientId}
              reloadData={() => {
                fetchBillings();
                fetchPatientBalance();
              }}
            />
          )}
          applyForm={() => toggleNewTransactionDialog()}
          cancelForm={() => toggleNewTransactionDialog()}
          hideActions
          size="md"
        />
      )}

      {!!showBillingExpandDialog && (
        <Dialog
          open={showBillingExpandDialog}
          title={" "}
          message={(
            <BillingDetails
              data={billings}
              onClose={toggleBillngExpandDialog}
              patientId={patientId}
            />
          )}
          applyForm={() => toggleBillngExpandDialog()}
          cancelForm={() => toggleBillngExpandDialog()}
          hideActions
          size="md"
        />
      )}

      {!!showPaymentDialog && (
        <Dialog
          open={showPaymentDialog}
          title={" "}
          message={<PaymentForm onClose={togglePaymentDialog} />}
          applyForm={() => togglePaymentDialog()}
          cancelForm={() => togglePaymentDialog()}
          hideActions
          size="sm"
        />
      )}

      {!!showAllergyDialog && (
        <Dialog
          open={showAllergyDialog}
          title={" "}
          message={(
            <Allergies
              onClose={toggleAllergyDialog}
              patientId={patientId}
              reloadData={() => fetchAllergies()}
            />
          )}
          applyForm={() => toggleAllergyDialog()}
          cancelForm={() => toggleAllergyDialog()}
          hideActions
          size="md"
        />
      )}

      {!!showAllergyExpandDialog && (
        <Dialog
          open={showAllergyExpandDialog}
          title={" "}
          message={(
            <AllergiesDetails
              data={allergies}
              onClose={toggleAllergyExpandDialog}
              patientId={patientId}
              reloadData={() => fetchAllergies()}
            />
          )}
          applyForm={() => toggleAllergyExpandDialog()}
          cancelForm={() => toggleAllergyExpandDialog()}
          hideActions
          size="md"
        />
      )}

      {!!showHandoutsDialog && (
        <Dialog
          open={showHandoutsDialog}
          title={" "}
          message={(
            <HandoutsForm
              patientId={patientId}
              onClose={toggleHandoutsDialog}
              reloadData={fetchPatientHandouts}
            />
          )}
          applyForm={() => toggleHandoutsDialog()}
          cancelForm={() => toggleHandoutsDialog()}
          hideActions
          size="md"
        />
      )}

      {!!showHandoutsExpandDialog && (
        <Dialog
          open={showHandoutsExpandDialog}
          title={" "}
          message={(
            <HandoutsDetails
              patientId={patientId}
              data={handouts}
              reloadData={fetchPatientHandouts}
              onClose={toggleHandoutsExpandDialog}
            />
          )}
          applyForm={() => toggleHandoutsExpandDialog()}
          cancelForm={() => toggleHandoutsExpandDialog()}
          hideActions
          size="md"
        />
      )}

      {!!showEncountersDialog && (
        <Dialog
          open={showEncountersDialog}
          title={" "}
          message={(
            <EncountersForm
              patientId={patientId}
              reloadData={fetchEncounters}
              onClose={toggleEncountersDialog}
            />
          )}
          applyForm={() => toggleEncountersDialog()}
          cancelForm={() => toggleEncountersDialog()}
          hideActions
          size="lg"
        />
      )}

      {!!showEncountersExpandDialog && (
        <Dialog
          open={showEncountersExpandDialog}
          title={" "}
          message={(
            <EncountersDetails
              patientId={patientId}
              data={encounters}
              onClose={toggleEncountersExpandDialog}
              toggleEncountersDialog={toggleEncountersDialog}
              reloadData={fetchEncounters}
            />
          )}
          applyForm={() => toggleEncountersExpandDialog()}
          cancelForm={() => toggleEncountersExpandDialog()}
          hideActions
          size="lg"
        />
      )}

      {!!showMedicalNotesDialog && (
        <Dialog
          open={showMedicalNotesDialog}
          title={" "}
          message={<MedicalNotesDetails data={medicalNotes} />}
          applyForm={() => toggleMedicalNotesDialog()}
          cancelForm={() => toggleMedicalNotesDialog()}
          hideActions
          size="md"
        />
      )}

      {!!showMessageDialog && (
        <Dialog
          open={showMessageDialog}
          title="New Message"
          message={(
            <NewMessageForm
              onClose={toggleMessageDialog}
              reloadData={fetchMessages}
              patientId={patientId}
            />
          )}
          applyForm={() => toggleMessageDialog()}
          cancelForm={() => toggleMessageDialog()}
          hideActions
          size="md"
        />
      )}

      {!!showMessageExpandDialog && (
        <Dialog
          open={showMessageExpandDialog}
          title={" "}
          message={(
            <MessagesDetails
              data={messages}
              onClose={toggleMessageDialog}
              reloadData={fetchMessages}
              patientId={patientId}
            />
          )}
          applyForm={() => toggleMessageExpandDialog()}
          cancelForm={() => toggleMessageExpandDialog()}
          hideActions
          size="lg"
        />
      )}

      {!!showDiagnosesDialog && (
        <Dialog
          open={showDiagnosesDialog}
          title={" "}
          message={(
            <DiagnosesForm
              onClose={toggleDiagnosesDialog}
              patientId={patientId}
              reloadData={() => fetchDiagnoses(true)}
            />
          )}
          applyForm={() => toggleDiagnosesDialog()}
          cancelForm={() => toggleDiagnosesDialog()}
          hideActions
          size="md"
        />
      )}

      {!!showDiagnosesExpandDialog && (
        <Dialog
          open={showDiagnosesExpandDialog}
          title={`${fetchDiagnosesStatus ? "Active" : "In-Active"} Diagnoses`}
          message={(
            <DiagnosesDetails
              data={diagnoses}
              onClose={toggleDiagnosesExpandDialog}
              reloadData={() => fetchDiagnoses(fetchDiagnosesStatus)}
              patientId={patientId}
            />
          )}
          applyForm={() => toggleDiagnosesExpandDialog()}
          cancelForm={() => toggleDiagnosesExpandDialog()}
          hideActions
          size="md"
        />
      )}

      {!!showMedicationDialog && (
        <Dialog
          open={showMedicationDialog}
          title={" "}
          message={(
            <MedicationsForm
              patientId={patientId}
              onClose={toggleMedicationDialog}
              reloadData={fetchMedications}
            />
          )}
          applyForm={() => toggleMedicationDialog()}
          cancelForm={() => toggleMedicationDialog()}
          hideActions
          size="md"
        />
      )}

      {!!showMedicationExpandDialog && (
        <Dialog
          open={showMedicationExpandDialog}
          title={" "}
          message={(
            <MedicationsDetails
              data={medications}
              onClose={toggleMedicationExpandDialog}
              reloadData={() => fetchMedications()}
              patientId={patientId}
            />
          )}
          applyForm={() => toggleMedicationExpandDialog()}
          cancelForm={() => toggleMedicationExpandDialog()}
          hideActions
          size="md"
        />
      )}

      {!!showRequisitionDialog && (
        <Dialog
          open={showRequisitionDialog}
          title={" "}
          message={(
            <RequisitionsForm
              onClose={toggleRequisitionDialog}
              reloadData={fetchRequisitions}
              patientId={patientId}
            />
          )}
          applyForm={() => toggleRequisitionDialog()}
          cancelForm={() => toggleRequisitionDialog()}
          hideActions
          size="xl"
        />
      )}

      {!!showRequisitionExpandDialog && (
        <Dialog
          open={showRequisitionExpandDialog}
          title={" "}
          message={(
            <RequisitionsDetails
              data={requisitions}
              onClose={toggleRequisitionExpandDialog}
              patientId={patientId}
              reloadData={fetchRequisitions}
            />
          )}
          applyForm={() => toggleRequisitionExpandDialog()}
          cancelForm={() => toggleRequisitionExpandDialog()}
          hideActions
          size="md"
        />
      )}

      {!!showDocumentsExpandDialog && (
        <Dialog
          open={showDocumentsExpandDialog}
          title={" "}
          message={(
            <DocumentsCardContent
              data={documents}
              onClose={toggleDocumentsExpandDialog}
              patientId={patientId}
              reloadData={() => fetchDocuments()}
            />
          )}
          applyForm={() => toggleDocumentsExpandDialog()}
          cancelForm={() => toggleDocumentsExpandDialog()}
          hideActions
          size="lg"
        />
      )}

      {!!showTestsExpandDialog && (
        <Dialog
          open={showTestsExpandDialog}
          title={" "}
          message={
            <TestsCardContent data={tests} onClose={toggleTestsExpandDialog} />
          }
          applyForm={() => toggleTestsExpandDialog()}
          cancelForm={() => toggleTestsExpandDialog()}
          hideActions
          size="lg"
        />
      )}

      <Grid className={classes.main}>
        {!hasPatientIderror && (
          <ResponsiveGridLayout
            className="layout"
            rowHeight={40}
            cols={{
              lg: 12, md: 10, sm: 6, xs: 4, xxs: 2,
            }}
            breakpoints={{
              lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0,
            }}
            layouts={{ lg: layout }}
            onDragStop={(val) => updateLayoutState(val)}
            onResizeStop={(val) => updateLayoutState(val)}
            // onLayoutChange is called always on first render so it fails
            // in our scenario, using above two props for our use case
            compactType="vertical"
            containerPadding={[0, 0]}
            margin={[5, 0]}
            measureBeforeMount
            useCSSTransforms={false}
            draggableHandle=".drag-handle"
          >
            {FirstColumnPatientCards.map((item) => (
              <Grid key={item.title}>
                <Card
                  key={item.title}
                  title={item.title}
                  data={mapCardContentDataHandlers(item.title)}
                  showActions={item.showActions}
                  showEditorActions={item.showEditorActions}
                  editorSaveHandler={() => mapEditorSaveHandler(item.title)}
                  editorCancelHandler={() => mapEditorCancelHandler(item.title)}
                  showSearch={item.showSearch}
                  icon={item.icon}
                  primaryButtonText={item.primaryButtonText}
                  secondaryButtonText={item.secondaryButtonText}
                  primaryButtonHandler={mapPrimaryButtonHandlers(item.title)}
                  secondaryButtonHandler={mapSecondaryButtonHandlers(
                    item.title,
                  )}
                  iconHandler={mapIconHandlers(item.title)}
                  searchHandler={(value) => debouncedSearchPatients(value)}
                  updateLayoutHandler={() => updateCardsLayout()}
                  resetLayoutHandler={() => resetCardsLayout()}
                  isLayoutUpdated={isLayoutUpdated}
                  updateMinHeight={updateMinHeight}
                />
              </Grid>
            ))}
            <Grid key="Encounters">
              <Card
                title="Encounters"
                data={
                  !!encounters && <EncountersCardContent data={encounters} />
                }
                showActions
                primaryButtonText="New"
                secondaryButtonText="Expand"
                primaryButtonHandler={toggleEncountersDialog}
                secondaryButtonHandler={toggleEncountersExpandDialog}
                showSearch={false}
                updateMinHeight={updateMinHeight}
              />
            </Grid>
            {ThirdColumnPatientCards.map((item) => (
              <Grid key={item.title}>
                <Card
                  key={item.title}
                  title={item.title}
                  data={mapCardContentDataHandlers(item.title)}
                  showEditorActions={item.showEditorActions}
                  editorSaveHandler={() => mapEditorSaveHandler(item.title)}
                  editorCancelHandler={() => mapEditorCancelHandler(item.title)}
                  showActions={item.showActions}
                  showSearch={item.showSearch}
                  icon={item.icon}
                  primaryButtonText={item.primaryButtonText}
                  secondaryButtonText={item.secondaryButtonText}
                  primaryButtonHandler={mapPrimaryButtonHandlers(item.title)}
                  secondaryButtonHandler={mapSecondaryButtonHandlers(
                    item.title,
                  )}
                  updateMinHeight={updateMinHeight}
                />
              </Grid>
            ))}
            {FourthColumnPatientCards.map((item) => (
              <Grid key={item.title}>
                <Card
                  key={item.title}
                  title={item.title}
                  data={mapCardContentDataHandlers(item.title)}
                  showActions={item.showActions}
                  showSearch={item.showSearch}
                  icon={item.icon}
                  primaryButtonText={item.primaryButtonText}
                  secondaryButtonText={item.secondaryButtonText}
                  iconHandler={mapIconHandlers(item.title)}
                  primaryButtonHandler={mapPrimaryButtonHandlers(item.title)}
                  secondaryButtonHandler={mapSecondaryButtonHandlers(
                    item.title,
                  )}
                  updateMinHeight={updateMinHeight}
                  cardInfo={
                    item.title === "Billing" && patientBalance !== null
                      ? `Balance $${patientBalance}`
                      : ""
                  }
                  contentToggleHandler={(value) => {
                    setFetchDiagnosesStatus(value);
                    fetchDiagnoses(value);
                  }}
                />
              </Grid>
            ))}
            <Grid key="Documents">
              <Card
                title="Documents"
                data={
                  !!documents && (
                    <DocumentsCardContent
                      data={documents}
                      reloadData={() => fetchDocuments()}
                      patientId={patientId}
                    />
                  )
                }
                showActions
                primaryButtonText="New"
                secondaryButtonText="Expand"
                showSearch={false}
                primaryButtonHandler={onFilePickerClick}
                secondaryButtonHandler={toggleDocumentsExpandDialog}
                updateMinHeight={updateMinHeight}
              />
            </Grid>
            <Grid key="All Tests">
              <Card
                title="All Tests"
                data={!!tests && <TestsCardContent data={tests} />}
                showActions
                primaryButtonText="Expand"
                secondaryButtonText={null}
                showSearch={false}
                primaryButtonHandler={toggleTestsExpandDialog}
                updateMinHeight={updateMinHeight}
              />
            </Grid>
          </ResponsiveGridLayout>
        )}
      </Grid>
    </>
  );
}
