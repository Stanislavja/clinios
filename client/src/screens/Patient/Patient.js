import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback
} from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { AuthContext } from "../../providers/AuthProvider";
import Card from "./../../components/common/Card";
import Dialog from "./../../components/Dialog";
import PatientService from "./../../services/patient.service";
import {
  FirstColumnPatientCards,
  ThirdColumnPatientCards,
  FourthColumnPatientCards
} from "./../../static/patient";
import { setError, setSuccess } from "./../../store/common/actions";
import { resetEditorText } from "./../../store/patient/actions";
import {
  AdminNotesForm,
  AdminNotesHistory,
  AdminNotesCardContent
} from "./components/AdminNotes";
import {
  Allergies,
  AllergiesCardContent,
  AllergiesDetails
} from "./components/Allergies";
import {
  BasicInfo,
  PatientCardContent,
  PatientHistoryDetails
} from "./components/BasicInfo";
import {
  NewTransactionForm,
  PaymentForm,
  BillingCardContent,
  BillingDetails
} from "./components/Billing";
import {
  DiagnosesForm,
  DiagnosesCardContent,
  DiagnosesDetails
} from "./components/Diagnoses";
import { DocumentsCardContent } from "./components/Documents";
import {
  HandoutsForm,
  HandoutsCardContent,
  HandoutsDetails
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
import MessagesCardContent from "./Messages/content";
import MessagesDetails from "./Messages/details";
import NewMessageForm from "./Messages/NewMessage";
import RequisitionsForm from "./Requisitions";
import RequisitionsCardContent from "./Requisitions/content";
import RequisitionsDetails from "./Requisitions/details";
import TestsCardContent from "./Tests/content";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "../../reactGridLayout.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Patient() {
  const classes = useStyles();
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  let { patient_id } = useParams();
  const user = useContext(AuthContext)?.user;

  //patient ID authenticity
  const [hasPatientIderror, setHasPatientIderror] = useState(true);

  //grid layout states
  const [layout, setLayout] = useState([]);
  const [layoutToSave, setLayoutToSave] = useState([]);
  const [isLayoutUpdated, setIsLayoutUpdated] = useState(false);
  const [firstCardsSequence, setFirstCardsSequence] = useState([
    ...FirstColumnPatientCards
  ]);
  const [thirdCardsSequence, setThirdCardsSequence] = useState([
    ...ThirdColumnPatientCards
  ]);

  //dialog states
  const [showPatientInfoDialog, setShowPatientInfoDialog] = useState(false);
  const [showPatientHistoryDialog, setShowPatientHistoryDialog] = useState(
    false
  );

  const [showAdminFormDialog, setShowAdminFormDialog] = useState(false);
  const [showAdminHistoryDialog, setShowAdminHistoryDialog] = useState(false);

  const [showFormsExpandDialog, setShowFormsExpandDialog] = useState(false);
  const [showFormsViewDialog, setShowFormsViewDialog] = useState(false);

  const [showBillingExpandDialog, setShowBillingExpandDialog] = useState(false);
  const [showNewTransactionDialog, setShowNewTransactionDialog] = useState(
    false
  );
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const [showAllergyDialog, setShowAllergyDialog] = useState(false);
  const [showAllergyExpandDialog, setShowAllergyExpandDialog] = useState(false);

  const [showHandoutsDialog, setShowHandoutsDialog] = useState(false);
  const [showHandoutsExpandDialog, setShowHandoutsExpandDialog] = useState(
    false
  );

  const [showEncountersDialog, setShowEncountersDialog] = useState(false);
  const [showEncountersExpandDialog, setShowEncountersExpandDialog] = useState(
    false
  );

  const [showMedicalNotesFormDialog, setShowMedicalNotesFormDialog] = useState(
    false
  );
  const [showMedicalNotesDialog, setShowMedicalNotesDialog] = useState(false);

  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showMessageExpandDialog, setShowMessageExpandDialog] = useState(false);

  const [showDiagnosesDialog, setShowDiagnosesDialog] = useState(false);
  const [showDiagnosesExpandDialog, setShowDiagnosesExpandDialog] = useState(
    false
  );

  const [showMedicationDialog, setShowMedicationDialog] = useState(false);
  const [showMedicationExpandDialog, setShowMedicationExpandDialog] = useState(
    false
  );

  const [showRequisitionDialog, setShowRequisitionDialog] = useState(false);
  const [
    showRequisitionExpandDialog,
    setShowRequisitionExpandDialog
  ] = useState(false);

  const [showDocumentsExpandDialog, setShowDocumentsExpandDialog] = useState(
    false
  );

  const [showTestsExpandDialog, setShowTestsExpandDialog] = useState(false);

  //data states
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

  useEffect(() => {
    generateLayout();
    fetchCardsLayout();
    fetchPatientData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient_id]);

  const fetchCardsLayout = () => {
    const user_id = user.id;
    PatientService.getCardsLayout(user_id).then((res) => {
      let layout =
        res.data.length &&
          res.data[0].layout &&
          res.data[0].layout !== "undefined"
          ? JSON.parse(res.data[0].layout)
          : null;
      if (!!layout) {
        setLayout(layout);
        setIsLayoutUpdated(true);
        let _layout = {
          layout: JSON.stringify(layout)
        };
        setLayoutToSave(_layout);
      }
    });
  };

  const updateCardsLayout = () => {
    const user_id = user.id;
    PatientService.updateCardsLayout(user_id, layoutToSave).then((res) => {
      setIsLayoutUpdated(true);
      dispatch(setSuccess(`Layout updated successfully`));
    });
  };

  const resetCardsLayout = () => {
    const user_id = user.id;
    PatientService.resetCardsLayout(user_id).then((res) => {
      setIsLayoutUpdated(false);
      setLayout([]); //removing the current layout state so the cards layout gets re-rendered
      generateLayout();
      dispatch(setSuccess(`Layout reset successfully`));
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
      "static"
    ];
    let updatedLayout = gridLayout.map((obj) => {
      let result = _.omit(obj, [...propsToRemove]);
      return result;
    });
    let layout = {
      layout: JSON.stringify(updatedLayout)
    };
    setLayoutToSave(layout);
  };

  const fetchPatientData = () => {
    PatientService.getPatientData(patient_id).then((res) => {
      //check if patient exists in the database
      //check if patient's client_id is equal to the signed user's client_id
      if (
        !!res.data &&
        res.data.client_id &&
        res.data.client_id === user.client_id
      ) {
        setPatientData(res.data);
        setHasPatientIderror(false);
      } else {
        dispatch(
          setError({
            severity: "error",
            message: "Patient not found"
          })
        );
      }
    });
  };

  const fetchPatientHistory = useCallback(() => {
    PatientService.getPatientHistory(patient_id).then((res) => {
      setPatientHistory(res.data);
    });
  }, [patient_id]);

  const fetchAdminNotesHistory = useCallback(() => {
    PatientService.getAdminNotesHistory(patient_id).then((res) => {
      setAdminNotesHistory(res.data);
    });
  }, [patient_id]);

  const fetchAllergies = useCallback(() => {
    PatientService.getAllergies(patient_id).then((res) => {
      setAllergies(res.data);
    });
  }, [patient_id]);

  const fetchPatientHandouts = useCallback(() => {
    PatientService.getPatientHandouts(patient_id).then((res) => {
      setHandouts(res.data);
    });
  }, [patient_id]);

  const fetchForms = useCallback(() => {
    PatientService.getForms(patient_id).then((res) => {
      setForms(res.data);
    });
  }, [patient_id]);

  const fetchBillings = useCallback(() => {
    PatientService.getBillings(patient_id).then((res) => {
      setBillings(res.data);
    });
  }, [patient_id]);

  const fetchPatientBalance = useCallback(() => {
    PatientService.getPatientBalance(patient_id).then((res) => {
      setPatientBalance(res.data && res.data.length ? res.data[0].amount : "");
    });
  }, [patient_id]);

  const fetchDocuments = useCallback(() => {
    let tab = "All";
    PatientService.getDocuments(patient_id, tab).then((res) => {
      setDocuments(res.data);
    });
  }, [patient_id]);

  const fetchEncounters = useCallback(() => {
    PatientService.getEncounters(patient_id).then((res) => {
      setEncounters(res.data);
    });
  }, [patient_id]);

  const fetchMedicalNotes = useCallback(() => {
    PatientService.getMedicalNotes(patient_id).then((res) => {
      setMedicalNotes(res.data);
    });
  }, [patient_id]);

  const fetchMessages = useCallback(() => {
    PatientService.getMessages(patient_id).then((res) => {
      setMessages(res.data);
    });
  }, [patient_id]);

  const fetchDiagnoses = useCallback((status) => {
    PatientService.getDiagnoses(patient_id, status).then((res) => {
      setDiagnoses(res.data);
    });
  }, [patient_id]);

  const fetchMedications = useCallback(() => {
    PatientService.getMedications(patient_id).then((res) => {
      setMedications(res.data);
    });
  }, [patient_id]);

  const fetchRequisitions = useCallback(() => {
    PatientService.getRequisitions(patient_id).then((res) => {
      setRequisitions(res.data);
    });
  }, [patient_id]);

  const fetchTests = useCallback(() => {
    PatientService.getTests(patient_id).then((res) => {
      setTests(res.data);
    });
  }, [patient_id]);

  const searchPatientHandler = (searchText) => {
    const reqBody = {
      data: {
        text: searchText
      }
    };
    PatientService.searchPatient(patient_id, reqBody).then((res) => {
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

  const mapEditorCancelHandler = (value) => {
    if (value === "Admin Notes") {
      toggleAdminFormDialog();
    } else if (value === "Medical Notes") {
      toggleMedicalNotesFormDialog();
    }
  };

  const mapEditorSaveHandler = (value) => {
    if (value === "Admin Notes") {
      updateAdminNotes();
    } else if (value === "Medical Notes") {
      updateMedicalNotes();
    }
  };

  const mapPrimaryButtonHandlers = (value) => {
    if (value === "Patient") {
      return togglePatientHistoryDialog;
    } else if (value === "Admin Notes") {
      return toggleAdminHistoryDialog;
    } else if (value === "Forms") {
      return toggleFormsViewDialog;
    } else if (value === "Handouts") {
      return toggleHandoutsDialog;
    } else if (value === "Billing") {
      return toggleNewTransactionDialog;
    } else if (value === "Allergies") {
      return toggleAllergyDialog;
    } else if (value === "Medical Notes") {
      return toggleMedicalNotesDialog;
    } else if (value === "Messages") {
      return toggleMessageDialog;
    } else if (value === "Medications") {
      return toggleMedicationDialog;
    } else if (value === "Diagnoses") {
      return toggleDiagnosesDialog;
    } else if (value === "Requisitions") {
      return toggleRequisitionDialog;
    }
  };

  const mapSecondaryButtonHandlers = (value) => {
    if (value === "Patient") {
      return togglePatientInfoDialog;
    } else if (value === "Admin Notes") {
      return toggleAdminFormDialog;
    } else if (value === "Forms") {
      return toggleFormsExpandDialog;
    } else if (value === "Handouts") {
      return toggleHandoutsExpandDialog;
    } else if (value === "Billing") {
      return toggleBillngExpandDialog;
    } else if (value === "Allergies") {
      return toggleAllergyExpandDialog;
    } else if (value === "Medical Notes") {
      return toggleMedicalNotesFormDialog;
    } else if (value === "Messages") {
      return toggleMessageExpandDialog;
    } else if (value === "Diagnoses") {
      return toggleDiagnosesExpandDialog;
    } else if (value === "Medications") {
      return toggleMedicationExpandDialog;
    } else if (value === "Requisitions") {
      return toggleRequisitionExpandDialog;
    }
  };

  const mapCardContentDataHandlers = (value) => {
    if (value === "Patient") {
      return (
        !!patientData && (
          <PatientCardContent data={patientData} patientId={patient_id} />
        )
      );
    } else if (value === "Admin Notes") {
      if (!!patientData) {
        return showAdminFormDialog ? (
          <AdminNotesForm
            patientId={patient_id}
            oldAdminNote={patientData && patientData.admin_note}
            onClose={toggleAdminFormDialog}
            reloadData={() => {
              fetchPatientData();
              fetchAdminNotesHistory();
            }}
          />
        ) : (
          <AdminNotesCardContent data={patientData.admin_note} />
        );
      }
    } else if (value === "Forms") {
      return !!forms && <FormCardContent data={forms} />;
    } else if (value === "Billing") {
      return !!billings && <BillingCardContent data={billings} />;
    } else if (value === "Allergies") {
      return (
        !!allergies && (
          <AllergiesCardContent
            data={allergies}
            reloadData={() => fetchAllergies()}
          />
        )
      );
    } else if (value === "Medical Notes") {
      if (!!patientData) {
        return showMedicalNotesFormDialog ? (
          <MedicalNotesForm
            patientId={patient_id}
            onClose={toggleMedicalNotesFormDialog}
            oldMedicalNote={patientData && patientData.medical_note}
            reloadData={() => {
              fetchPatientData();
              fetchMedicalNotes();
            }}
          />
        ) : (
          <MedicalNotesCardContent data={patientData.medical_note} />
        );
      }
    } else if (value === "Handouts") {
      return !!medicalNotes && <HandoutsCardContent data={handouts} />;
    } else if (value === "Messages") {
      return (
        !!messages && (
          <MessagesCardContent
            data={messages}
            reloadData={() => fetchMessages()}
          />
        )
      );
    } else if (value === "Medications") {
      return !!medications && <MedicationsCardContent data={medications} />;
    } else if (value === "Diagnoses") {
      return !!diagnoses && <DiagnosesCardContent data={diagnoses} />;
    } else if (value === "Requisitions") {
      return !!requisitions && <RequisitionsCardContent data={requisitions} />;
    }
  };

  const redirectToPatientPortal = () => {
    history.push({
      pathname: "/manage/patient-search",
      state: {
        patients
      }
    });
  };

  const mapIconHandlers = (value) => {
    if (value === "Patient") {
      return redirectToPatientPortal;
    } else if (value === "Billing") {
      return togglePaymentDialog;
    }
  };

  const onFilePickerClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const createDocument = (reqBody) => {
    PatientService.createDocuments(patient_id, reqBody)
      .then((response) => {
        dispatch(setSuccess(`${response.data.message}`));
        fetchDocuments();
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        let severity = "error";
        dispatch(
          setError({
            severity: severity,
            message: resMessage
          })
        );
      });
  };

  const handleDocumentsFile = (e) => {
    const { files } = e.target;
    let fd = new FormData();
    fd.append("file", files[0]);
    fd.append("patient_id", patient_id);
    createDocument(fd);
  };

  const editorText = useSelector(
    (state) => state.patient.editorText,
    shallowEqual
  );
  const updateAdminNotes = () => {
    if (editorText !== patientData.admin_note) {
      const reqBody = {
        data: {
          admin_note: editorText, //needs to be updated
          old_admin_note: patientData && patientData.admin_note
        }
      };
      // TODO:: static for the time being - discussion required
      let noteId = 1;
      PatientService.updateAdminNotes(patient_id, reqBody, noteId)
        .then((response) => {
          dispatch(setSuccess(`${response.data.message}`));
          dispatch(resetEditorText());
          fetchPatientData();
          fetchAdminNotesHistory();
          toggleAdminFormDialog();
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message[0].msg) ||
            error.message ||
            error.toString();
          let severity = "error";
          dispatch(
            setError({
              severity: severity,
              message: resMessage
            })
          );
        });
    } else {
      toggleAdminFormDialog();
    }
  };

  const updateMedicalNotes = () => {
    if (editorText !== patientData.medical_note) {
      // TODO:: static for the time being - discussion required
      let noteId = 1;
      const reqBody = {
        data: {
          old_medical_note: patientData && patientData.medical_note,
          medical_note: editorText
        }
      };
      PatientService.updateMedicalNotes(patient_id, reqBody, noteId)
        .then((response) => {
          dispatch(setSuccess(`${response.data.message}`));
          dispatch(resetEditorText());
          fetchPatientData();
          fetchMedicalNotes();
          toggleMedicalNotesFormDialog();
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          let severity = "error";
          dispatch(
            setError({
              severity: severity,
              message: resMessage
            })
          );
        });
    } else {
      toggleMedicalNotesFormDialog();
    }
  };

  const generateLayout = () => {
    const y = 4;
    let firstlayout = FirstColumnPatientCards.map((item, i) => {
      return {
        x: 0,
        y: 0,
        w: 3,
        h: item.title === "Patient" ? 6 : 3.33,
        i: item.title.toString()
      };
    });
    let encounterslayout = {
      x: 3,
      y: 0,
      w: 3,
      h: 16,
      i: "Encounters"
    };
    let thirdlayout = ThirdColumnPatientCards.map((item, i) => {
      let title = item.title;
      return {
        x: 6,
        y: 0,
        w: 3,
        h:
          title === "Allergies" || title === "Requisitions"
            ? 3
            : title === "Messages"
              ? 6
              : y,
        i: item.title.toString()
      };
    });
    let fourthlayout = FourthColumnPatientCards.map((item, i) => {
      return {
        x: 9,
        y: 0,
        w: 3,
        h: 3.2,
        i: item.title.toString()
      };
    });
    let documentslayout = {
      x: 0,
      y: y,
      w: 6,
      h: 6,
      i: "Documents"
    };
    let testslayout = {
      x: 6,
      y: y,
      w: 6,
      h: 6,
      i: "All Tests"
    };
    setLayout([
      ...firstlayout,
      encounterslayout,
      ...thirdlayout,
      ...fourthlayout,
      documentslayout,
      testslayout
    ]);
  };

  const updateMinHeight = (key, newHeight) => {
    let calculatedHeight = newHeight / 40 + 0.5; //40 is the row height, 0.5 is the margin
    let newLayout = layout.map((item) =>
      item.i === key ? { ...item, h: calculatedHeight } : item
    );
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
    fetchTests
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
          message={<BasicInfo formData={patientData} />}
          applyForm={() => togglePatientInfoDialog()}
          cancelForm={() => togglePatientInfoDialog()}
          hideActions={true}
          size={"lg"}
        />
      )}

      {!!showPatientHistoryDialog && (
        <Dialog
          open={showPatientHistoryDialog}
          title={"Patient History"}
          message={
            <PatientHistoryDetails
              data={patientHistory}
              onClose={togglePatientHistoryDialog}
            />
          }
          applyForm={() => togglePatientHistoryDialog()}
          cancelForm={() => togglePatientHistoryDialog()}
          hideActions={true}
          size={"md"}
        />
      )}
      {!!showAdminHistoryDialog && (
        <Dialog
          open={showAdminHistoryDialog}
          title={"Admin Notes History"}
          message={
            <AdminNotesHistory
              onClose={toggleAdminHistoryDialog}
              data={adminNotesHistory}
            //onLoad={() => fetchPatientHistory()}
            />
          }
          applyForm={() => toggleAdminHistoryDialog()}
          cancelForm={() => toggleAdminHistoryDialog()}
          hideActions={true}
          size={"md"}
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
          hideActions={true}
          size={"md"}
        />
      )}

      {!!showFormsViewDialog && (
        <Dialog
          open={showFormsViewDialog}
          title={" "}
          message={<Form onClose={toggleFormsViewDialog} />}
          applyForm={() => toggleFormsViewDialog()}
          cancelForm={() => toggleFormsViewDialog()}
          hideActions={true}
          size={"lg"}
        />
      )}

      {!!showNewTransactionDialog && (
        <Dialog
          open={showNewTransactionDialog}
          title={" "}
          message={
            <NewTransactionForm
              onClose={toggleNewTransactionDialog}
              patientId={patient_id}
              reloadData={fetchBillings}
            />}
          applyForm={() => toggleNewTransactionDialog()}
          cancelForm={() => toggleNewTransactionDialog()}
          hideActions={true}
          size={"md"}
        />
      )}

      {!!showBillingExpandDialog && (
        <Dialog
          open={showBillingExpandDialog}
          title={" "}
          message={
            <BillingDetails
              data={billings}
              onClose={toggleBillngExpandDialog}
              patientId={patient_id}
            />
          }
          applyForm={() => toggleBillngExpandDialog()}
          cancelForm={() => toggleBillngExpandDialog()}
          hideActions={true}
          size={"md"}
        />
      )}

      {!!showPaymentDialog && (
        <Dialog
          open={showPaymentDialog}
          title={" "}
          message={<PaymentForm onClose={togglePaymentDialog} />}
          applyForm={() => togglePaymentDialog()}
          cancelForm={() => togglePaymentDialog()}
          hideActions={true}
          size={"sm"}
        />
      )}

      {!!showAllergyDialog && (
        <Dialog
          open={showAllergyDialog}
          title={" "}
          message={
            <Allergies
              onClose={toggleAllergyDialog}
              patientId={patient_id}
              reloadData={() => fetchAllergies()}
            />
          }
          applyForm={() => toggleAllergyDialog()}
          cancelForm={() => toggleAllergyDialog()}
          hideActions={true}
          size={"md"}
        />
      )}

      {!!showAllergyExpandDialog && (
        <Dialog
          open={showAllergyExpandDialog}
          title={" "}
          message={
            <AllergiesDetails
              data={allergies}
              onClose={toggleAllergyExpandDialog}
              patientId={patient_id}
              reloadData={() => fetchAllergies()}
            />
          }
          applyForm={() => toggleAllergyExpandDialog()}
          cancelForm={() => toggleAllergyExpandDialog()}
          hideActions={true}
          size={"md"}
        />
      )}

      {!!showHandoutsDialog && (
        <Dialog
          open={showHandoutsDialog}
          title={" "}
          message={
            <HandoutsForm
              patientId={patient_id}
              onClose={toggleHandoutsDialog}
              reloadData={fetchPatientHandouts}
            />
          }
          applyForm={() => toggleHandoutsDialog()}
          cancelForm={() => toggleHandoutsDialog()}
          hideActions={true}
          size={"md"}
        />
      )}

      {!!showHandoutsExpandDialog && (
        <Dialog
          open={showHandoutsExpandDialog}
          title={" "}
          message={
            <HandoutsDetails
              patientId={patient_id}
              data={handouts}
              reloadData={fetchPatientHandouts}
              onClose={toggleHandoutsExpandDialog}
            />
          }
          applyForm={() => toggleHandoutsExpandDialog()}
          cancelForm={() => toggleHandoutsExpandDialog()}
          hideActions={true}
          size={"md"}
        />
      )}

      {!!showEncountersDialog && (
        <Dialog
          open={showEncountersDialog}
          title={" "}
          message={<EncountersForm onClose={toggleEncountersDialog} />}
          applyForm={() => toggleEncountersDialog()}
          cancelForm={() => toggleEncountersDialog()}
          hideActions={true}
          size={"lg"}
        />
      )}

      {!!showEncountersExpandDialog && (
        <Dialog
          open={showEncountersExpandDialog}
          title={" "}
          message={
            <EncountersDetails
              data={encounters}
              onClose={toggleEncountersExpandDialog}
              toggleEncountersDialog={toggleEncountersDialog}
            />
          }
          applyForm={() => toggleEncountersExpandDialog()}
          cancelForm={() => toggleEncountersExpandDialog()}
          hideActions={true}
          size={"lg"}
        />
      )}

      {!!showMedicalNotesDialog && (
        <Dialog
          open={showMedicalNotesDialog}
          title={" "}
          message={<MedicalNotesDetails data={medicalNotes} />}
          applyForm={() => toggleMedicalNotesDialog()}
          cancelForm={() => toggleMedicalNotesDialog()}
          hideActions={true}
          size={"md"}
        />
      )}

      {!!showMessageDialog && (
        <Dialog
          open={showMessageDialog}
          title={"New Message"}
          message={
            <NewMessageForm
              onClose={toggleMessageDialog}
              reloadData={fetchMessages}
              patientId={patient_id}
            />
          }
          applyForm={() => toggleMessageDialog()}
          cancelForm={() => toggleMessageDialog()}
          hideActions={true}
          size={"md"}
        />
      )}

      {!!showMessageExpandDialog && (
        <Dialog
          open={showMessageExpandDialog}
          title={" "}
          message={
            <MessagesDetails
              data={messages}
              onClose={toggleMessageDialog}
              reloadData={fetchMessages}
              patientId={patient_id}
            />
          }
          applyForm={() => toggleMessageExpandDialog()}
          cancelForm={() => toggleMessageExpandDialog()}
          hideActions={true}
          size={"lg"}
        />
      )}

      {!!showDiagnosesDialog && (
        <Dialog
          open={showDiagnosesDialog}
          title={" "}
          message={
            <DiagnosesForm
              onClose={toggleDiagnosesDialog}
              patientId={patient_id}
              reloadData={() => fetchDiagnoses(true)}
            />
          }
          applyForm={() => toggleDiagnosesDialog()}
          cancelForm={() => toggleDiagnosesDialog()}
          hideActions={true}
          size={"md"}
        />
      )}

      {!!showDiagnosesExpandDialog && (
        <Dialog
          open={showDiagnosesExpandDialog}
          title={" "}
          message={
            <DiagnosesDetails
              data={diagnoses}
              onClose={toggleDiagnosesExpandDialog}
              reloadData={() => fetchDiagnoses(true)}
              patientId={patient_id}
            />
          }
          applyForm={() => toggleDiagnosesExpandDialog()}
          cancelForm={() => toggleDiagnosesExpandDialog()}
          hideActions={true}
          size={"md"}
        />
      )}

      {!!showMedicationDialog && (
        <Dialog
          open={showMedicationDialog}
          title={" "}
          message={
            <MedicationsForm
              patientId={patient_id}
              onClose={toggleMedicationDialog}
            />
          }
          applyForm={() => toggleMedicationDialog()}
          cancelForm={() => toggleMedicationDialog()}
          hideActions={true}
          size={"md"}
        />
      )}

      {!!showMedicationExpandDialog && (
        <Dialog
          open={showMedicationExpandDialog}
          title={" "}
          message={
            <MedicationsDetails
              data={medications}
              onClose={toggleMedicationExpandDialog}
              reloadData={() => fetchMedications()}
              patientId={patient_id}
            />
          }
          applyForm={() => toggleMedicationExpandDialog()}
          cancelForm={() => toggleMedicationExpandDialog()}
          hideActions={true}
          size={"md"}
        />
      )}

      {!!showRequisitionDialog && (
        <Dialog
          open={showRequisitionDialog}
          title={" "}
          message={<RequisitionsForm onClose={toggleRequisitionDialog} />}
          applyForm={() => toggleRequisitionDialog()}
          cancelForm={() => toggleRequisitionDialog()}
          hideActions={true}
          size={"xl"}
        />
      )}

      {!!showRequisitionExpandDialog && (
        <Dialog
          open={showRequisitionExpandDialog}
          title={" "}
          message={
            <RequisitionsDetails
              data={requisitions}
              onClose={toggleRequisitionExpandDialog}
              patientId={patient_id}
            />
          }
          applyForm={() => toggleRequisitionExpandDialog()}
          cancelForm={() => toggleRequisitionExpandDialog()}
          hideActions={true}
          size={"md"}
        />
      )}

      {!!showDocumentsExpandDialog && (
        <Dialog
          open={showDocumentsExpandDialog}
          title={" "}
          message={
            <DocumentsCardContent
              data={documents}
              onClose={toggleDocumentsExpandDialog}
              patientId={patient_id}
              reloadData={() => fetchDocuments()}
            />
          }
          applyForm={() => toggleDocumentsExpandDialog()}
          cancelForm={() => toggleDocumentsExpandDialog()}
          hideActions={true}
          size={"lg"}
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
          hideActions={true}
          size={"lg"}
        />
      )}

      <Grid className={classes.main}>
        {!hasPatientIderror && (
          <ResponsiveGridLayout
            className={"layout"}
            rowHeight={40}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            layouts={{ lg: layout }}
            onDragStop={(val) => updateLayoutState(val)}
            onResizeStop={(val) => updateLayoutState(val)}
            //onLayoutChange is called always on first render so it fails in our scenario, using above two props for our use case
            compactType={"vertical"}
            containerPadding={[0, 0]}
            margin={[5, 0]}
            measureBeforeMount={true}
            useCSSTransforms={false}
            draggableHandle={".drag-handle"}
          >
            {FirstColumnPatientCards.map((item, index) => {
              return (
                <Grid key={item.title}>
                  <Card
                    key={index}
                    title={item.title}
                    data={mapCardContentDataHandlers(item.title)}
                    showActions={item.showActions}
                    showEditorActions={item.showEditorActions}
                    editorSaveHandler={() => mapEditorSaveHandler(item.title)}
                    editorCancelHandler={() =>
                      mapEditorCancelHandler(item.title)
                    }
                    showSearch={item.showSearch}
                    icon={item.icon}
                    primaryButtonText={item.primaryButtonText}
                    secondaryButtonText={item.secondaryButtonText}
                    primaryButtonHandler={mapPrimaryButtonHandlers(item.title)}
                    secondaryButtonHandler={mapSecondaryButtonHandlers(
                      item.title
                    )}
                    iconHandler={mapIconHandlers(item.title)}
                    searchHandler={(value) => debouncedSearchPatients(value)}
                    updateLayoutHandler={() => updateCardsLayout()}
                    resetLayoutHandler={() => resetCardsLayout()}
                    isLayoutUpdated={isLayoutUpdated}
                    updateMinHeight={updateMinHeight}
                  />
                </Grid>
              );
            })}
            <Grid key={"Encounters"}>
              <Card
                title="Encounters"
                data={
                  !!encounters && <EncountersCardContent data={encounters} />
                }
                showActions={true}
                primaryButtonText={"New"}
                secondaryButtonText={"Expand"}
                primaryButtonHandler={toggleEncountersDialog}
                secondaryButtonHandler={toggleEncountersExpandDialog}
                showSearch={false}
                updateMinHeight={updateMinHeight}
              />
            </Grid>
            {ThirdColumnPatientCards.map((item, index) => {
              return (
                <Grid key={item.title}>
                  <Card
                    key={index}
                    title={item.title}
                    data={mapCardContentDataHandlers(item.title)}
                    showEditorActions={item.showEditorActions}
                    editorSaveHandler={() => mapEditorSaveHandler(item.title)}
                    editorCancelHandler={() =>
                      mapEditorCancelHandler(item.title)
                    }
                    showActions={item.showActions}
                    showSearch={item.showSearch}
                    icon={item.icon}
                    primaryButtonText={item.primaryButtonText}
                    secondaryButtonText={item.secondaryButtonText}
                    primaryButtonHandler={mapPrimaryButtonHandlers(item.title)}
                    secondaryButtonHandler={mapSecondaryButtonHandlers(
                      item.title
                    )}
                    updateMinHeight={updateMinHeight}
                  />
                </Grid>
              );
            })}
            {FourthColumnPatientCards.map((item, index) => {
              return (
                <Grid key={item.title}>
                  <Card
                    key={index}
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
                      item.title
                    )}
                    updateMinHeight={updateMinHeight}
                    cardInfo={
                      item.title === "Billing" && patientBalance !== null
                        ? `Balance $${patientBalance}`
                        : ""
                    }
                    contentToggleHandler={(value) => fetchDiagnoses(value)}
                  />
                </Grid>
              );
            })}
            <Grid key={"Documents"}>
              <Card
                title="Documents"
                data={
                  !!documents && (
                    <DocumentsCardContent
                      data={documents}
                      reloadData={() => fetchDocuments()}
                      patientId={patient_id}
                    />
                  )
                }
                showActions={true}
                primaryButtonText={"New"}
                secondaryButtonText={"Expand"}
                showSearch={false}
                primaryButtonHandler={onFilePickerClick}
                secondaryButtonHandler={toggleDocumentsExpandDialog}
                updateMinHeight={updateMinHeight}
              />
            </Grid>
            <Grid key={"All Tests"}>
              <Card
                title="All Tests"
                data={!!tests && <TestsCardContent data={tests} />}
                showActions={true}
                primaryButtonText={"Expand"}
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

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: "calc(100vh - 163px)"
  },
  noDisplay: {
    display: "none"
  }
}));
