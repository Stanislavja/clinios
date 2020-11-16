import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  useReducer,
} from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Card from "../../components/common/Card";
import Dialog from "../../components/Dialog";
import { AuthContext } from "../../providers/AuthProvider";
import PatientReducer from "../../providers/Patient";
import {
  setPatientData,
  setPatientHistory,
  setAdminNotes,
  setForms,
  setHandouts,
  setDocuments,
  setEncounters,
  setMedicalNotes,
  setAllergies,
  setMessages,
  setRequisitions,
  setTests,
  setDiagnoses,
  setMedications,
  setBilling,
  setBalance,
  togglePatientInfoDialog,
  togglePatientHistoryDialog,
  toggleAdminHistoryDialog,
  toggleAdminFormDialog,
  toggleFormsViewDialog,
  toggleFormsExpandDialog,
  toggleHandoutsDialog,
  toggleHandoutsExpandDialog,
  toggleDocumentsExpandDialog,
  toggleEncountersDialog,
  toggleEncountersExpandDialog,
  toggleMedicalNotesDialog,
  toggleMedicalNotesFormDialog,
  toggleAllergyDialog,
  toggleAllergyExpandDialog,
  toggleMessageDialog,
  toggleMessageExpandDialog,
  toggleRequisitionDialog,
  toggleRequisitionExpandDialog,
  toggleTestsExpandDialog,
  toggleDiagnosesDialog,
  toggleDiagnosesExpandDialog,
  setDiagnosesStatus,
  toggleMedicationDialog,
  toggleMedicationExpandDialog,
  toggleBillngExpandDialog,
  toggleNewTransactionDialog,
  togglePaymentDialog,
} from "../../providers/Patient/actions";
import initialState from "../../providers/Patient/initialState";
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
  const user = useContext(AuthContext)?.user;
  const userId = user.id;

  const [state, _dispatch] = useReducer(PatientReducer, initialState);

  const {
    patientInfo, adminNotes, forms, handouts, documents, encounters, medicalNotes,
    allergies, messages, requisitions, tests, diagnoses, medications, billing,
  } = state;

  // patient ID authenticity
  const [hasPatientIderror, setHasPatientIderror] = useState(true);

  // grid layout states
  const [layout, setLayout] = useState([]);
  const [layoutToSave, setLayoutToSave] = useState([]);
  const [isLayoutUpdated, setIsLayoutUpdated] = useState(false);
  // const [firstCardsSequence, setFirstCardsSequence] = useState([
  //   ...FirstColumnPatientCards,
  // ]);
  // const [thirdCardsSequence, setThirdCardsSequence] = useState([
  //   ...ThirdColumnPatientCards,
  // ]);

  // dialog states
  // const [showPatientInfoDialog, setShowPatientInfoDialog] = useState(false);
  // const [showPatientHistoryDialog, setShowPatientHistoryDialog] = useState(
  //   false,
  // );

  // const [showAdminFormDialog, setShowAdminFormDialog] = useState(false);
  // const [showAdminHistoryDialog, setShowAdminHistoryDialog] = useState(false);

  // const [showFormsExpandDialog, setShowFormsExpandDialog] = useState(false);
  // const [showFormsViewDialog, setShowFormsViewDialog] = useState(false);

  // const [showBillingExpandDialog, setShowBillingExpandDialog] = useState(false);
  // const [showNewTransactionDialog, setShowNewTransactionDialog] = useState(
  //   false,
  // );
  // const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  // const [showAllergyDialog, setShowAllergyDialog] = useState(false);
  // const [showAllergyExpandDialog, setShowAllergyExpandDialog] = useState(false);

  // const [showHandoutsDialog, setShowHandoutsDialog] = useState(false);
  // const [showHandoutsExpandDialog, setShowHandoutsExpandDialog] = useState(
  //   false,
  // );

  // const [showEncountersDialog, setShowEncountersDialog] = useState(false);
  // const [showEncountersExpandDialog, setShowEncountersExpandDialog] = useState(
  //   false,
  // );

  // const [showMedicalNotesFormDialog, setShowMedicalNotesFormDialog] = useState(
  //   false,
  // );
  // const [showMedicalNotesDialog, setShowMedicalNotesDialog] = useState(false);

  // const [showMessageDialog, setShowMessageDialog] = useState(false);
  // const [showMessageExpandDialog, setShowMessageExpandDialog] = useState(false);

  // const [fetchDiagnosesStatus, setFetchDiagnosesStatus] = useState(true);
  // const [showDiagnosesDialog, setShowDiagnosesDialog] = useState(false);
  // const [showDiagnosesExpandDialog, setShowDiagnosesExpandDialog] = useState(
  //   false,
  // );

  // const [showMedicationDialog, setShowMedicationDialog] = useState(false);
  // const [showMedicationExpandDialog, setShowMedicationExpandDialog] = useState(
  //   false,
  // );

  // const [showRequisitionDialog, setShowRequisitionDialog] = useState(false);
  // const [
  //   showRequisitionExpandDialog,
  //   setShowRequisitionExpandDialog,
  // ] = useState(false);

  // const [showDocumentsExpandDialog, setShowDocumentsExpandDialog] = useState(
  //   false,
  // );

  // const [showTestsExpandDialog, setShowTestsExpandDialog] = useState(false);

  // data states
  // const [patientData, setPatientData] = useState(null);
  const patientData = patientInfo.data;
  // const [patientBalance, setPatientBalance] = useState(null);
  const patientBalance = billing.balance;
  // const [patientHistory, setPatientHistory] = useState([]);
  const patientHistory = patientInfo.history;
  // const [adminNotesHistory, setAdminNotesHistory] = useState([]);
  const adminNotesHistory = adminNotes.data;
  const [patients, setPatients] = useState([]);
  // const [patientAllergies, setPatientAllergies] = useState([]);
  const patientAllergies = allergies.data;
  // const [patientHandouts, setPatientHandouts] = useState([]);
  const patientHandouts = handouts.data;
  // const [patientBillings, setPatientBillings] = useState([]);
  const patientBillings = billing.data;
  // const [patientForms, setPatientForms] = useState([]);
  const patientForms = forms.data;
  // const [patientDocuments, setPatientDocuments] = useState([]);
  const patientDocuments = documents.data;
  // const [patientEncounters, setPatientEncounters] = useState([]);
  const patientEncounters = encounters.data;
  // const [patientMedicalNotes, setPatientMedicalNotes] = useState([]);
  const patientMedicalNotes = medicalNotes.data;
  // const [patientMessages, setPatientMessages] = useState([]);
  const patientMessages = messages.data;
  // const [patientDiagnoses, setPatientDiagnoses] = useState([]);
  const patientDiagnoses = diagnoses.data;
  // const [patientMedications, setPatientMedications] = useState([]);
  const patientMedications = medications.data;
  // const [patientRequisitions, setPatientRequisitions] = useState([]);
  const patientRequisitions = requisitions.data;
  // const [patientTests, setPatientTests] = useState([]);
  const patientTests = tests.data;

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
        _dispatch(setPatientData(res.data));
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
      _dispatch(setPatientHistory(res.data));
    });
  }, [patientId]);

  const fetchAdminNotesHistory = useCallback(() => {
    PatientService.getAdminNotesHistory(patientId).then((res) => {
      // setAdminNotesHistory(res.data);
      _dispatch(setAdminNotes(res.data));
    });
  }, [patientId]);

  const fetchAllergies = useCallback(() => {
    PatientService.getAllergies(patientId).then((res) => {
      // setPatientAllergies(res.data);
      _dispatch(setAllergies(res.data));
    });
  }, [patientId]);

  const fetchPatientHandouts = useCallback(() => {
    PatientService.getPatientHandouts(patientId).then((res) => {
      // setPatientHandouts(res.data);
      _dispatch(setHandouts(res.data));
    });
  }, [patientId]);

  const fetchForms = useCallback(() => {
    PatientService.getForms(patientId).then((res) => {
      // setPatientForms(res.data);
      _dispatch(setForms(res.data));
    });
  }, [patientId]);

  const fetchBillings = useCallback(() => {
    PatientService.getBillings(patientId).then((res) => {
      // setPatientBillings(res.data);
      _dispatch(setBilling(res.data));
    });
  }, [patientId]);

  const fetchPatientBalance = useCallback(() => {
    PatientService.getPatientBalance(patientId).then((res) => {
      // setPatientBalance(res.data && res.data.length ? res.data[0].amount : "");
      _dispatch(setBalance(res.data && res.data.length ? res.data[0].amount : ""));
    });
  }, [patientId]);

  const fetchDocuments = useCallback(() => {
    const tab = "All";
    PatientService.getDocuments(patientId, tab).then((res) => {
      // setPatientDocuments(res.data);
      _dispatch(setDocuments(res.data));
    });
  }, [patientId]);

  const fetchEncounters = useCallback(() => {
    PatientService.getEncounters(patientId).then((res) => {
      // setPatientEncounters(res.data);
      _dispatch(setEncounters(res.data));
    });
  }, [patientId]);

  const fetchMedicalNotes = useCallback(() => {
    PatientService.getMedicalNotes(patientId).then((res) => {
      // setPatientMedicalNotes(res.data);
      _dispatch(setMedicalNotes(res.data));
    });
  }, [patientId]);

  const fetchMessages = useCallback(() => {
    PatientService.getMessages(patientId).then((res) => {
      // setPatientMessages(res.data);
      _dispatch(setMessages(res.data));
    });
  }, [patientId]);

  const fetchDiagnoses = useCallback((status) => {
    PatientService.getDiagnoses(patientId, status).then((res) => {
      // setPatientDiagnoses(res.data);
      _dispatch(setDiagnoses(res.data));
    });
  }, [patientId]);

  const fetchMedications = useCallback(() => {
    PatientService.getMedications(patientId).then((res) => {
      // setPatientMedications(res.data);
      _dispatch(setMedications(res.data));
    });
  }, [patientId]);

  const fetchRequisitions = useCallback(() => {
    const encounterId = 1; // static for the time being: discussion required
    PatientService.getRequisitions(patientId, encounterId).then((res) => {
      // setPatientRequisitions(res.data);
      _dispatch(setRequisitions(res.data));
    });
  }, [patientId]);

  const fetchTests = useCallback(() => {
    PatientService.getTests(patientId).then((res) => {
      // setPatientTests(res.data);
      _dispatch(setTests(res.data));
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

  // const togglePatientInfoDialog = () => {
  //   setShowPatientInfoDialog((prevState) => !prevState);
  // };

  // const togglePatientHistoryDialog = () => {
  //   setShowPatientHistoryDialog((prevState) => !prevState);
  // };

  // const toggleAdminFormDialog = () => {
  //   firstCardsSequence[1].showEditorActions = !firstCardsSequence[1]
  //     .showEditorActions;
  //   setFirstCardsSequence([...firstCardsSequence]);
  //   setShowAdminFormDialog((prevState) => !prevState);
  // };

  // const toggleAdminHistoryDialog = () => {
  //   setShowAdminHistoryDialog((prevState) => !prevState);
  // };

  // const toggleFormsExpandDialog = () => {
  //   setShowFormsExpandDialog((prevState) => !prevState);
  // };

  // const toggleFormsViewDialog = () => {
  //   setShowFormsViewDialog((prevState) => !prevState);
  // };

  // const toggleNewTransactionDialog = () => {
  //   setShowNewTransactionDialog((prevState) => !prevState);
  // };

  // const togglePaymentDialog = () => {
  //   setShowPaymentDialog((prevState) => !prevState);
  // };

  // const toggleBillngExpandDialog = () => {
  //   setShowBillingExpandDialog((prevState) => !prevState);
  // };

  // const toggleAllergyDialog = () => {
  //   setShowAllergyDialog((prevState) => !prevState);
  // };

  // const toggleAllergyExpandDialog = () => {
  //   setShowAllergyExpandDialog((prevState) => !prevState);
  // };

  // const toggleHandoutsDialog = () => {
  //   setShowHandoutsDialog((prevState) => !prevState);
  // };

  // const toggleHandoutsExpandDialog = () => {
  //   setShowHandoutsExpandDialog((prevState) => !prevState);
  // };

  // const toggleEncountersDialog = () => {
  //   setShowEncountersDialog((prevState) => !prevState);
  // };

  // const toggleEncountersExpandDialog = () => {
  //   setShowEncountersExpandDialog((prevState) => !prevState);
  // };

  // const toggleMedicalNotesDialog = () => {
  //   setShowMedicalNotesDialog((prevState) => !prevState);
  // };

  // const toggleMedicalNotesFormDialog = () => {
  //   thirdCardsSequence[0].showEditorActions = !thirdCardsSequence[0]
  //     .showEditorActions;
  //   setThirdCardsSequence([...thirdCardsSequence]);
  //   setShowMedicalNotesFormDialog((prevState) => !prevState);
  // };

  // const toggleMessageDialog = () => {
  //   setShowMessageDialog((prevState) => !prevState);
  // };

  // const toggleMessageExpandDialog = () => {
  //   setShowMessageExpandDialog((prevState) => !prevState);
  // };

  // const toggleMedicationDialog = () => {
  //   setShowMedicationDialog((prevState) => !prevState);
  // };

  // const toggleMedicationExpandDialog = () => {
  //   setShowMedicationExpandDialog((prevState) => !prevState);
  // };

  // const toggleDiagnosesDialog = () => {
  //   setShowDiagnosesDialog((prevState) => !prevState);
  // };

  // const toggleDiagnosesExpandDialog = () => {
  //   setShowDiagnosesExpandDialog((prevState) => !prevState);
  // };

  // const toggleRequisitionDialog = () => {
  //   setShowRequisitionDialog((prevState) => !prevState);
  // };

  // const toggleRequisitionExpandDialog = () => {
  //   setShowRequisitionExpandDialog((prevState) => !prevState);
  // };

  // const toggleDocumentsExpandDialog = () => {
  //   setShowDocumentsExpandDialog((prevState) => !prevState);
  // };

  // const toggleTestsExpandDialog = () => {
  //   setShowTestsExpandDialog((prevState) => !prevState);
  // };

  const mapPrimaryButtonHandlers = (value) => {
    switch (value) {
      case "Patient":
        return _dispatch(togglePatientHistoryDialog());
      case "Admin Notes":
        return _dispatch(toggleAdminHistoryDialog());
      case "Forms":
        return _dispatch(toggleFormsViewDialog());
      case "Handouts":
        return _dispatch(toggleHandoutsDialog());
      case "Billing":
        return _dispatch(toggleNewTransactionDialog());
      case "Allergies":
        return _dispatch(toggleAllergyDialog());
      case "Medical Notes":
        return _dispatch(toggleMedicalNotesDialog());
      case "Messages":
        return _dispatch(toggleMessageDialog());
      case "Medications":
        return _dispatch(toggleMedicationDialog());
      case "Diagnoses":
        return _dispatch(toggleDiagnosesDialog());
      case "Requisitions":
        return _dispatch(toggleRequisitionDialog());
      default:
        return () => { };
    }
  };

  const mapSecondaryButtonHandlers = (value) => {
    switch (value) {
      case "Patient":
        return _dispatch(togglePatientInfoDialog());
      case "Admin Notes":
        return _dispatch(toggleAdminFormDialog());
      case "Forms":
        return _dispatch(toggleFormsExpandDialog());
      case "Handouts":
        return _dispatch(toggleHandoutsExpandDialog());
      case "Billing":
        return _dispatch(toggleBillngExpandDialog());
      case "Allergies":
        return _dispatch(toggleAllergyExpandDialog());
      case "Medical Notes":
        return _dispatch(toggleMedicalNotesFormDialog());
      case "Messages":
        return _dispatch(toggleMessageExpandDialog());
      case "Medications":
        return _dispatch(toggleMedicationExpandDialog());
      case "Diagnoses":
        return _dispatch(toggleDiagnosesExpandDialog());
      case "Requisitions":
        return _dispatch(toggleRequisitionExpandDialog());
      default:
        return () => { };
    }
  };

  const mapCardContentDataHandlers = (value) => {
    switch (value) {
      case "Patient":
        return <PatientCardContent data={patientData} patientId={patientId} />;
      case "Admin Notes":
        if (adminNotes.editForm) {
          return (
            <AdminNotesForm
              patientId={patientId}
              oldAdminNote={patientData && patientData.admin_note}
              onClose={() => _dispatch(toggleAdminFormDialog())}
              reloadData={() => {
                fetchPatientData();
                fetchAdminNotesHistory();
              }}
            />
          );
        }
        return <AdminNotesCardContent data={patientData.admin_note} />;

      case "Forms":
        return <FormCardContent data={patientForms} />;
      case "Billing":
        return <BillingCardContent data={patientBillings} />;
      case "Allergies":
        return (
          <AllergiesCardContent
            data={patientAllergies}
            reloadData={() => fetchAllergies()}
          />
        );
      case "Medical Notes":
        if (medicalNotes.editForm) {
          return (
            <MedicalNotesForm
              patientId={patientId}
              onClose={() => _dispatch(toggleMedicalNotesFormDialog())}
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
        return <HandoutsCardContent data={patientHandouts} />;
      case "Messages":
        return (
          <MessagesCardContent
            data={patientMessages}
            reloadData={() => fetchMessages()}
          />
        );
      case "Medications":
        return <MedicationsCardContent data={patientMedications} />;
      case "Diagnoses":
        return <DiagnosesCardContent data={patientDiagnoses} />;
      case "Requisitions":
        return <RequisitionsCardContent data={patientRequisitions} />;
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
        return () => _dispatch(togglePaymentDialog());
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
    (store) => store.patient.editorText,
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
          _dispatch(toggleAdminFormDialog());
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
      _dispatch(toggleAdminFormDialog());
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
          _dispatch(toggleMedicalNotesFormDialog());
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
      _dispatch(toggleMedicalNotesFormDialog());
    }
  };

  const mapEditorCancelHandler = (value) => {
    switch (value) {
      case "Admin Notes":
        return _dispatch(toggleAdminFormDialog());
      case "Medical Notes":
        return _dispatch(toggleMedicalNotesFormDialog());
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
      {!!patientInfo.editDialog && (
        <Dialog
          open={patientInfo.editDialog}
          title={" "}
          message={(
            <BasicInfo
              formData={patientData}
              patientId={patientId}
              reloadData={fetchPatientData}
              onClose={() => _dispatch(togglePatientInfoDialog())}
            />
          )}
          applyForm={() => _dispatch(togglePatientInfoDialog())}
          cancelForm={() => _dispatch(togglePatientInfoDialog())}
          hideActions
          size="lg"
        />
      )}

      {!!patientInfo.historyDialog && (
        <Dialog
          open={patientInfo.historyDialog}
          title="Patient History"
          message={(
            <PatientHistoryDetails
              data={patientHistory}
              onClose={() => _dispatch(togglePatientHistoryDialog())}
            />
          )}
          applyForm={() => _dispatch(togglePatientHistoryDialog())}
          cancelForm={() => _dispatch(togglePatientHistoryDialog())}
          hideActions
          size="md"
        />
      )}
      {!!adminNotes.historyDialog && (
        <Dialog
          open={adminNotes.historyDialog}
          title="Admin Notes History"
          message={(
            <AdminNotesHistory
              onClose={() => _dispatch(toggleAdminHistoryDialog())}
              data={adminNotesHistory}
            // onLoad={() => fetchPatientHistory()}
            />
          )}
          applyForm={() => _dispatch(toggleAdminHistoryDialog())}
          cancelForm={() => _dispatch(toggleAdminHistoryDialog())}
          hideActions
          size="md"
        />
      )}

      {!!forms.expandDialog && (
        <Dialog
          open={forms.expandDialog}
          title={" "}
          message={(
            <FormDetails
              data={patientForms}
              onClose={() => _dispatch(toggleFormsExpandDialog())}
            />
          )}
          applyForm={() => _dispatch(toggleFormsExpandDialog())}
          cancelForm={() => _dispatch(toggleFormsExpandDialog())}
          hideActions
          size="md"
        />
      )}

      {!!forms.viewDialog && (
        <Dialog
          open={forms.viewDialog}
          title={" "}
          message={<Form onClose={() => _dispatch(toggleFormsViewDialog())} />}
          applyForm={() => _dispatch(toggleFormsViewDialog())}
          cancelForm={() => _dispatch(toggleFormsViewDialog())}
          hideActions
          size="lg"
        />
      )}

      {!!billing.newTransactionDialog && (
        <Dialog
          open={billing.newTransactionDialog}
          title={" "}
          message={(
            <NewTransactionForm
              onClose={() => _dispatch(toggleNewTransactionDialog())}
              patientId={patientId}
              reloadData={() => {
                fetchBillings();
                fetchPatientBalance();
              }}
            />
          )}
          applyForm={() => _dispatch(toggleNewTransactionDialog())}
          cancelForm={() => _dispatch(toggleNewTransactionDialog())}
          hideActions
          size="md"
        />
      )}

      {!!billing.expandDialog && (
        <Dialog
          open={billing.expandDialog}
          title={" "}
          message={(
            <BillingDetails
              data={patientBillings}
              onClose={() => _dispatch(toggleBillngExpandDialog())}
              patientId={patientId}
            />
          )}
          applyForm={() => _dispatch(toggleBillngExpandDialog())}
          cancelForm={() => _dispatch(toggleBillngExpandDialog())}
          hideActions
          size="md"
        />
      )}

      {!!billing.newDialog && (
        <Dialog
          open={billing.newDialog}
          title={" "}
          message={<PaymentForm onClose={() => _dispatch(togglePaymentDialog())} />}
          applyForm={() => _dispatch(togglePaymentDialog())}
          cancelForm={() => _dispatch(togglePaymentDialog())}
          hideActions
          size="sm"
        />
      )}

      {!!allergies.newDialog && (
        <Dialog
          open={allergies.newDialog}
          title={" "}
          message={(
            <Allergies
              onClose={() => _dispatch(toggleAllergyDialog())}
              patientId={patientId}
              reloadData={() => fetchAllergies()}
            />
          )}
          applyForm={() => _dispatch(toggleAllergyDialog())}
          cancelForm={() => _dispatch(toggleAllergyDialog())}
          hideActions
          size="md"
        />
      )}

      {!!allergies.expandDialog && (
        <Dialog
          open={allergies.expandDialog}
          title={" "}
          message={(
            <AllergiesDetails
              data={patientAllergies}
              onClose={() => _dispatch(toggleAllergyExpandDialog())}
              patientId={patientId}
              reloadData={() => fetchAllergies()}
            />
          )}
          applyForm={() => _dispatch(toggleAllergyExpandDialog())}
          cancelForm={() => _dispatch(toggleAllergyExpandDialog())}
          hideActions
          size="md"
        />
      )}

      {!!handouts.newDialog && (
        <Dialog
          open={handouts.newDialog}
          title={" "}
          message={(
            <HandoutsForm
              patientId={patientId}
              onClose={() => _dispatch(toggleHandoutsDialog())}
              reloadData={fetchPatientHandouts}
            />
          )}
          applyForm={() => _dispatch(toggleHandoutsDialog())}
          cancelForm={() => _dispatch(toggleHandoutsDialog())}
          hideActions
          size="md"
        />
      )}

      {!!handouts.expandDialog && (
        <Dialog
          open={handouts.expandDialog}
          title={" "}
          message={(
            <HandoutsDetails
              patientId={patientId}
              data={patientHandouts}
              reloadData={fetchPatientHandouts}
              onClose={() => _dispatch(toggleHandoutsExpandDialog())}
            />
          )}
          applyForm={() => _dispatch(toggleHandoutsExpandDialog())}
          cancelForm={() => _dispatch(toggleHandoutsExpandDialog())}
          hideActions
          size="md"
        />
      )}

      {!!encounters.newDialog && (
        <Dialog
          open={encounters.newDialog}
          title={" "}
          message={(
            <EncountersForm
              patientId={patientId}
              reloadData={fetchEncounters}
              onClose={() => _dispatch(toggleEncountersDialog())}
            />
          )}
          applyForm={() => _dispatch(toggleEncountersDialog())}
          cancelForm={() => _dispatch(toggleEncountersDialog())}
          hideActions
          size="lg"
        />
      )}

      {!!encounters.expandDialog && (
        <Dialog
          open={encounters.expandDialog}
          title={" "}
          message={(
            <EncountersDetails
              patientId={patientId}
              data={patientEncounters}
              onClose={() => _dispatch(toggleEncountersExpandDialog())}
              toggleEncountersDialog={() => _dispatch(toggleEncountersDialog())}
              reloadData={fetchEncounters}
            />
          )}
          applyForm={() => _dispatch(toggleEncountersExpandDialog())}
          cancelForm={() => _dispatch(toggleEncountersExpandDialog())}
          hideActions
          size="lg"
        />
      )}

      {!!medicalNotes.historyDialog && (
        <Dialog
          open={medicalNotes.historyDialog}
          title={" "}
          message={<MedicalNotesDetails data={patientMedicalNotes} />}
          applyForm={() => _dispatch(toggleMedicalNotesDialog())}
          cancelForm={() => _dispatch(toggleMedicalNotesDialog())}
          hideActions
          size="md"
        />
      )}

      {!!messages.newDialog && (
        <Dialog
          open={messages.newDialog}
          title="New Message"
          message={(
            <NewMessageForm
              onClose={() => _dispatch(toggleMessageDialog())}
              reloadData={fetchMessages}
              patientId={patientId}
            />
          )}
          applyForm={() => _dispatch(toggleMessageDialog())}
          cancelForm={() => _dispatch(toggleMessageDialog())}
          hideActions
          size="md"
        />
      )}

      {!!messages.expandDialog && (
        <Dialog
          open={messages.expandDialog}
          title={" "}
          message={(
            <MessagesDetails
              data={patientMessages}
              onClose={() => _dispatch(toggleMessageExpandDialog())}
              reloadData={fetchMessages}
              patientId={patientId}
            />
          )}
          applyForm={() => _dispatch(toggleMessageExpandDialog())}
          cancelForm={() => _dispatch(toggleMessageExpandDialog())}
          hideActions
          size="lg"
        />
      )}

      {!!diagnoses.newDialog && (
        <Dialog
          open={diagnoses.newDialog}
          title={" "}
          message={(
            <DiagnosesForm
              onClose={() => _dispatch(toggleDiagnosesDialog())}
              patientId={patientId}
              reloadData={() => fetchDiagnoses(true)}
            />
          )}
          applyForm={() => _dispatch(toggleDiagnosesDialog())}
          cancelForm={() => _dispatch(toggleDiagnosesDialog())}
          hideActions
          size="md"
        />
      )}

      {!!diagnoses.expandDialog && (
        <Dialog
          open={diagnoses.expandDialog}
          title={`${diagnoses.status ? "Active" : "In-Active"} Diagnoses`}
          message={(
            <DiagnosesDetails
              data={patientDiagnoses}
              onClose={() => _dispatch(toggleDiagnosesExpandDialog())}
              reloadData={() => fetchDiagnoses(diagnoses.status)}
              patientId={patientId}
            />
          )}
          applyForm={() => _dispatch(toggleDiagnosesExpandDialog())}
          cancelForm={() => _dispatch(toggleDiagnosesExpandDialog())}
          hideActions
          size="md"
        />
      )}

      {!!medications.newDialog && (
        <Dialog
          open={medications.newDialog}
          title={" "}
          message={(
            <MedicationsForm
              patientId={patientId}
              onClose={() => _dispatch(toggleMedicationDialog())}
              reloadData={fetchMedications}
            />
          )}
          applyForm={() => _dispatch(toggleMedicationDialog())}
          cancelForm={() => _dispatch(toggleMedicationDialog())}
          hideActions
          size="md"
        />
      )}

      {!!medications.expandDialog && (
        <Dialog
          open={medications.expandDialog}
          title={" "}
          message={(
            <MedicationsDetails
              data={patientMedications}
              onClose={() => _dispatch(toggleMedicationExpandDialog())}
              reloadData={() => fetchMedications()}
              patientId={patientId}
            />
          )}
          applyForm={() => _dispatch(toggleMedicationExpandDialog())}
          cancelForm={() => _dispatch(toggleMedicationExpandDialog())}
          hideActions
          size="md"
        />
      )}

      {!!requisitions.newDialog && (
        <Dialog
          open={requisitions.newDialog}
          title={" "}
          message={(
            <RequisitionsForm
              onClose={() => _dispatch(toggleRequisitionDialog())}
              reloadData={fetchRequisitions}
              patientId={patientId}
            />
          )}
          applyForm={() => _dispatch(toggleRequisitionDialog())}
          cancelForm={() => _dispatch(toggleRequisitionDialog())}
          hideActions
          size="xl"
        />
      )}

      {!!requisitions.expandDialog && (
        <Dialog
          open={requisitions.expandDialog}
          title={" "}
          message={(
            <RequisitionsDetails
              data={patientRequisitions}
              onClose={() => _dispatch(toggleRequisitionExpandDialog())}
              patientId={patientId}
              reloadData={fetchRequisitions}
            />
          )}
          applyForm={() => _dispatch(toggleRequisitionExpandDialog())}
          cancelForm={() => _dispatch(toggleRequisitionExpandDialog())}
          hideActions
          size="md"
        />
      )}

      {!!documents.expandDialog && (
        <Dialog
          open={documents.expandDialog}
          title={" "}
          message={(
            <DocumentsCardContent
              data={patientDocuments}
              onClose={() => _dispatch(toggleDocumentsExpandDialog())}
              patientId={patientId}
              reloadData={() => fetchDocuments()}
            />
          )}
          applyForm={() => _dispatch(toggleDocumentsExpandDialog())}
          cancelForm={() => _dispatch(toggleDocumentsExpandDialog())}
          hideActions
          size="lg"
        />
      )}

      {!!tests.expandDialog && (
        <Dialog
          open={tests.expandDialog}
          title={" "}
          message={
            <TestsCardContent data={patientTests} onClose={() => _dispatch(toggleTestsExpandDialog())} />
          }
          applyForm={() => _dispatch(toggleTestsExpandDialog())}
          cancelForm={() => _dispatch(toggleTestsExpandDialog())}
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
                  showEditorActions={item.title === "Admin Notes" && !!adminNotes.editForm}
                  editorSaveHandler={() => mapEditorSaveHandler(item.title)}
                  editorCancelHandler={() => mapEditorCancelHandler(item.title)}
                  showSearch={item.showSearch}
                  icon={item.icon}
                  primaryButtonText={item.primaryButtonText}
                  secondaryButtonText={item.secondaryButtonText}
                  primaryButtonHandler={() => mapPrimaryButtonHandlers(item.title)}
                  secondaryButtonHandler={() => mapSecondaryButtonHandlers(
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
                  !!patientEncounters && <EncountersCardContent data={patientEncounters} />
                }
                showActions
                primaryButtonText="New"
                secondaryButtonText="Expand"
                primaryButtonHandler={() => _dispatch(toggleEncountersDialog())}
                secondaryButtonHandler={() => _dispatch(toggleEncountersExpandDialog())}
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
                  showEditorActions={item.title === "Medical Notes" && !!medicalNotes.editForm}
                  editorSaveHandler={() => mapEditorSaveHandler(item.title)}
                  editorCancelHandler={() => mapEditorCancelHandler(item.title)}
                  showActions={item.showActions}
                  showSearch={item.showSearch}
                  icon={item.icon}
                  primaryButtonText={item.primaryButtonText}
                  secondaryButtonText={item.secondaryButtonText}
                  primaryButtonHandler={() => mapPrimaryButtonHandlers(item.title)}
                  secondaryButtonHandler={() => mapSecondaryButtonHandlers(
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
                  primaryButtonHandler={() => mapPrimaryButtonHandlers(item.title)}
                  secondaryButtonHandler={() => mapSecondaryButtonHandlers(
                    item.title,
                  )}
                  updateMinHeight={updateMinHeight}
                  cardInfo={
                    item.title === "Billing" && patientBalance !== null
                      ? `Balance $${patientBalance}`
                      : ""
                  }
                  contentToggleHandler={(value) => {
                    // setFetchDiagnosesStatus(value);
                    _dispatch(setDiagnosesStatus(value));
                    fetchDiagnoses(value);
                  }}
                />
              </Grid>
            ))}
            <Grid key="Documents">
              <Card
                title="Documents"
                data={
                  !!patientDocuments && (
                    <DocumentsCardContent
                      data={patientDocuments}
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
                secondaryButtonHandler={() => _dispatch(toggleDocumentsExpandDialog())}
                updateMinHeight={updateMinHeight}
              />
            </Grid>
            <Grid key="All Tests">
              <Card
                title="All Tests"
                data={!!patientTests && <TestsCardContent data={patientTests} />}
                showActions
                primaryButtonText="Expand"
                secondaryButtonText={null}
                showSearch={false}
                primaryButtonHandler={() => _dispatch(toggleTestsExpandDialog())}
                updateMinHeight={updateMinHeight}
              />
            </Grid>
          </ResponsiveGridLayout>
        )}
      </Grid>
    </>
  );
}
