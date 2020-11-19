import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
  createContext,
} from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import logger from "use-reducer-logger";

import Card from "../../components/common/Card";
import Dialog from "../../components/Dialog";
import useAuth from "../../hooks/useAuth";
import PatientReducer from "../../providers/Patient";
import {
  setPatientId,
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
import { isDev } from "../../utils/helpers";
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
    paddingTop: "15px",
    minHeight: "calc(100vh - 163px)",
  },
  noDisplay: {
    display: "none",
  },
}));

export const PatientContext = createContext(null);

const Patient = () => {
  const classes = useStyles();
  const inputFile = useRef(null);
  const reduxDispatch = useDispatch();
  const history = useHistory();
  const { patientId } = useParams();
  const { user } = useAuth();
  const userId = user.id;

  const [state, dispatch] = useReducer(isDev() ? logger(PatientReducer) : PatientReducer, initialState);

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

  // data states
  const [patients, setPatients] = useState([]);
  const patientData = patientInfo.data;
  const patientBalance = billing.balance;
  const patientHistory = patientInfo.history;
  const adminNotesHistory = adminNotes.data;
  const patientAllergies = allergies.data;
  const patientHandouts = handouts.data;
  const patientBillings = billing.data;
  const patientForms = forms.data;
  const patientDocuments = documents.data;
  const patientEncounters = encounters.data;
  const patientMedicalNotes = medicalNotes.data;
  const patientMessages = messages.data;
  const patientDiagnoses = diagnoses.data;
  const patientMedications = medications.data;
  const patientRequisitions = requisitions.data;
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
        reduxDispatch(setSuccess(`Layout updated successfully`));
      }
    });
  };

  const resetCardsLayout = () => {
    PatientService.resetCardsLayout(userId).then((res) => {
      if (res.status === "success") {
        setIsLayoutUpdated(false);
        setLayout([]); // removing the current layout state so the cards layout gets re-rendered
        generateLayout();
        reduxDispatch(setSuccess(`Layout reset successfully`));
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
        dispatch(setPatientData(res.data));
        setHasPatientIderror(false);
      } else {
        reduxDispatch(
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
    dispatch(setPatientId(patientId)); // saving patientId in reducer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId]);


  const fetchPatientHistory = useCallback(() => {
    PatientService.getPatientHistory(patientId).then((res) => {
      dispatch(setPatientHistory(res.data));
    });
  }, [patientId]);

  const fetchAdminNotesHistory = useCallback(() => {
    PatientService.getAdminNotesHistory(patientId).then((res) => {
      dispatch(setAdminNotes(res.data));
    });
  }, [patientId]);

  const fetchAllergies = useCallback(() => {
    PatientService.getAllergies(patientId).then((res) => {
      dispatch(setAllergies(res.data));
    });
  }, [patientId]);

  const fetchPatientHandouts = useCallback(() => {
    PatientService.getPatientHandouts(patientId).then((res) => {
      dispatch(setHandouts(res.data));
    });
  }, [patientId]);

  const fetchForms = useCallback(() => {
    PatientService.getForms(patientId).then((res) => {
      dispatch(setForms(res.data));
    });
  }, [patientId]);

  const fetchBillings = useCallback(() => {
    PatientService.getBillings(patientId).then((res) => {
      dispatch(setBilling(res.data));
    });
  }, [patientId]);

  const fetchPatientBalance = useCallback(() => {
    PatientService.getPatientBalance(patientId).then((res) => {
      dispatch(setBalance(res.data && res.data.length ? res.data[0].amount : ""));
    });
  }, [patientId]);

  const fetchDocuments = useCallback(() => {
    const tab = "All";
    PatientService.getDocuments(patientId, tab).then((res) => {
      dispatch(setDocuments(res.data));
    });
  }, [patientId]);

  const fetchEncounters = useCallback(() => {
    PatientService.getEncounters(patientId).then((res) => {
      dispatch(setEncounters(res.data));
    });
  }, [patientId]);

  const fetchMedicalNotes = useCallback(() => {
    PatientService.getMedicalNotes(patientId).then((res) => {
      dispatch(setMedicalNotes(res.data));
    });
  }, [patientId]);

  const fetchMessages = useCallback(() => {
    PatientService.getMessages(patientId).then((res) => {
      dispatch(setMessages(res.data));
    });
  }, [patientId]);

  const fetchDiagnoses = useCallback((status) => {
    PatientService.getDiagnoses(patientId, status).then((res) => {
      dispatch(setDiagnoses(res.data));
    });
  }, [patientId]);

  const fetchMedications = useCallback(() => {
    PatientService.getMedications(patientId).then((res) => {
      dispatch(setMedications(res.data));
    });
  }, [patientId]);

  const fetchRequisitions = useCallback(() => {
    const encounterId = 1; // static for the time being: discussion required
    PatientService.getRequisitions(patientId, encounterId).then((res) => {
      dispatch(setRequisitions(res.data));
    });
  }, [patientId]);

  const fetchTests = useCallback(() => {
    PatientService.getTests(patientId).then((res) => {
      dispatch(setTests(res.data));
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

  const mapPrimaryButtonHandlers = (value) => {
    switch (value) {
      case "Patient":
        return dispatch(togglePatientHistoryDialog());
      case "Admin Notes":
        return dispatch(toggleAdminHistoryDialog());
      case "Forms":
        return dispatch(toggleFormsViewDialog());
      case "Handouts":
        return dispatch(toggleHandoutsDialog());
      case "Billing":
        return dispatch(toggleNewTransactionDialog());
      case "Allergies":
        return dispatch(toggleAllergyDialog());
      case "Medical Notes":
        return dispatch(toggleMedicalNotesDialog());
      case "Messages":
        return dispatch(toggleMessageDialog());
      case "Medications":
        return dispatch(toggleMedicationDialog());
      case "Diagnoses":
        return dispatch(toggleDiagnosesDialog());
      case "Requisitions":
        return dispatch(toggleRequisitionDialog());
      default:
        return () => { };
    }
  };

  const mapSecondaryButtonHandlers = (value) => {
    switch (value) {
      case "Patient":
        return dispatch(togglePatientInfoDialog());
      case "Admin Notes":
        return dispatch(toggleAdminFormDialog());
      case "Forms":
        return dispatch(toggleFormsExpandDialog());
      case "Handouts":
        return dispatch(toggleHandoutsExpandDialog());
      case "Billing":
        return dispatch(toggleBillngExpandDialog());
      case "Allergies":
        return dispatch(toggleAllergyExpandDialog());
      case "Medical Notes":
        return dispatch(toggleMedicalNotesFormDialog());
      case "Messages":
        return dispatch(toggleMessageExpandDialog());
      case "Medications":
        return dispatch(toggleMedicationExpandDialog());
      case "Diagnoses":
        return dispatch(toggleDiagnosesExpandDialog());
      case "Requisitions":
        return dispatch(toggleRequisitionExpandDialog());
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
              onClose={() => dispatch(toggleAdminFormDialog())}
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
              onClose={() => dispatch(toggleMedicalNotesFormDialog())}
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
        return () => dispatch(togglePaymentDialog());
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
        reduxDispatch(setSuccess(`${response.data.message}`));
        fetchDocuments();
      })
      .catch((error) => {
        const resMessage = (error.response
          && error.response.data
          && error.response.data.message)
          || error.message
          || error.toString();
        const severity = "error";
        reduxDispatch(
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
          reduxDispatch(setSuccess(`${response.data.message}`));
          reduxDispatch(resetEditorText());
          fetchPatientData();
          fetchAdminNotesHistory();
          dispatch(toggleAdminFormDialog());
        })
        .catch((error) => {
          const resMessage = (error.response
            && error.response.data
            && error.response.data.message[0].msg)
            || error.message
            || error.toString();
          const severity = "error";
          reduxDispatch(
            setError({
              severity,
              message: resMessage,
            }),
          );
        });
    } else {
      dispatch(toggleAdminFormDialog());
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
          reduxDispatch(setSuccess(`${response.data.message}`));
          reduxDispatch(resetEditorText());
          fetchPatientData();
          fetchMedicalNotes();
          dispatch(toggleMedicalNotesFormDialog());
        })
        .catch((error) => {
          const resMessage = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString();
          const severity = "error";
          reduxDispatch(
            setError({
              severity,
              message: resMessage,
            }),
          );
        });
    } else {
      dispatch(toggleMedicalNotesFormDialog());
    }
  };

  const mapEditorCancelHandler = (value) => {
    switch (value) {
      case "Admin Notes":
        return dispatch(toggleAdminFormDialog());
      case "Medical Notes":
        return dispatch(toggleMedicalNotesFormDialog());
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
    <PatientContext.Provider value={{ state, dispatch }}>
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
              onClose={() => dispatch(togglePatientInfoDialog())}
            />
          )}
          applyForm={() => dispatch(togglePatientInfoDialog())}
          cancelForm={() => dispatch(togglePatientInfoDialog())}
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
              onClose={() => dispatch(togglePatientHistoryDialog())}
            />
          )}
          applyForm={() => dispatch(togglePatientHistoryDialog())}
          cancelForm={() => dispatch(togglePatientHistoryDialog())}
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
              onClose={() => dispatch(toggleAdminHistoryDialog())}
              data={adminNotesHistory}
            // onLoad={() => fetchPatientHistory()}
            />
          )}
          applyForm={() => dispatch(toggleAdminHistoryDialog())}
          cancelForm={() => dispatch(toggleAdminHistoryDialog())}
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
              onClose={() => dispatch(toggleFormsExpandDialog())}
            />
          )}
          applyForm={() => dispatch(toggleFormsExpandDialog())}
          cancelForm={() => dispatch(toggleFormsExpandDialog())}
          hideActions
          size="md"
        />
      )}

      {!!forms.viewDialog && (
        <Dialog
          open={forms.viewDialog}
          title={" "}
          message={<Form onClose={() => dispatch(toggleFormsViewDialog())} />}
          applyForm={() => dispatch(toggleFormsViewDialog())}
          cancelForm={() => dispatch(toggleFormsViewDialog())}
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
              onClose={() => dispatch(toggleNewTransactionDialog())}
              patientId={patientId}
              reloadData={() => {
                fetchBillings();
                fetchPatientBalance();
              }}
            />
          )}
          applyForm={() => dispatch(toggleNewTransactionDialog())}
          cancelForm={() => dispatch(toggleNewTransactionDialog())}
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
              onClose={() => dispatch(toggleBillngExpandDialog())}
              patientId={patientId}
            />
          )}
          applyForm={() => dispatch(toggleBillngExpandDialog())}
          cancelForm={() => dispatch(toggleBillngExpandDialog())}
          hideActions
          size="lg"
        />
      )}

      {!!billing.newDialog && (
        <Dialog
          open={billing.newDialog}
          title={" "}
          message={<PaymentForm onClose={() => dispatch(togglePaymentDialog())} />}
          applyForm={() => dispatch(togglePaymentDialog())}
          cancelForm={() => dispatch(togglePaymentDialog())}
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
              onClose={() => dispatch(toggleAllergyDialog())}
              patientId={patientId}
              reloadData={() => fetchAllergies()}
            />
          )}
          applyForm={() => dispatch(toggleAllergyDialog())}
          cancelForm={() => dispatch(toggleAllergyDialog())}
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
              onClose={() => dispatch(toggleAllergyExpandDialog())}
              patientId={patientId}
              reloadData={() => fetchAllergies()}
            />
          )}
          applyForm={() => dispatch(toggleAllergyExpandDialog())}
          cancelForm={() => dispatch(toggleAllergyExpandDialog())}
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
              onClose={() => dispatch(toggleHandoutsDialog())}
              reloadData={fetchPatientHandouts}
            />
          )}
          applyForm={() => dispatch(toggleHandoutsDialog())}
          cancelForm={() => dispatch(toggleHandoutsDialog())}
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
              onClose={() => dispatch(toggleHandoutsExpandDialog())}
            />
          )}
          applyForm={() => dispatch(toggleHandoutsExpandDialog())}
          cancelForm={() => dispatch(toggleHandoutsExpandDialog())}
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
              onClose={() => dispatch(toggleEncountersDialog())}
            />
          )}
          applyForm={() => dispatch(toggleEncountersDialog())}
          cancelForm={() => dispatch(toggleEncountersDialog())}
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
              onClose={() => dispatch(toggleEncountersExpandDialog())}
              toggleEncountersDialog={() => dispatch(toggleEncountersDialog())}
              reloadData={fetchEncounters}
            />
          )}
          applyForm={() => dispatch(toggleEncountersExpandDialog())}
          cancelForm={() => dispatch(toggleEncountersExpandDialog())}
          hideActions
          size="lg"
        />
      )}

      {!!medicalNotes.historyDialog && (
        <Dialog
          open={medicalNotes.historyDialog}
          title={" "}
          message={<MedicalNotesDetails data={patientMedicalNotes} />}
          applyForm={() => dispatch(toggleMedicalNotesDialog())}
          cancelForm={() => dispatch(toggleMedicalNotesDialog())}
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
              onClose={() => dispatch(toggleMessageDialog())}
              reloadData={fetchMessages}
              patientId={patientId}
            />
          )}
          applyForm={() => dispatch(toggleMessageDialog())}
          cancelForm={() => dispatch(toggleMessageDialog())}
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
              onClose={() => dispatch(toggleMessageExpandDialog())}
              reloadData={fetchMessages}
              patientId={patientId}
            />
          )}
          applyForm={() => dispatch(toggleMessageExpandDialog())}
          cancelForm={() => dispatch(toggleMessageExpandDialog())}
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
              onClose={() => dispatch(toggleDiagnosesDialog())}
              patientId={patientId}
              reloadData={() => fetchDiagnoses(true)}
            />
          )}
          applyForm={() => dispatch(toggleDiagnosesDialog())}
          cancelForm={() => dispatch(toggleDiagnosesDialog())}
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
              onClose={() => dispatch(toggleDiagnosesExpandDialog())}
              reloadData={() => fetchDiagnoses(diagnoses.status)}
              patientId={patientId}
            />
          )}
          applyForm={() => dispatch(toggleDiagnosesExpandDialog())}
          cancelForm={() => dispatch(toggleDiagnosesExpandDialog())}
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
              onClose={() => dispatch(toggleMedicationDialog())}
              reloadData={fetchMedications}
            />
          )}
          applyForm={() => dispatch(toggleMedicationDialog())}
          cancelForm={() => dispatch(toggleMedicationDialog())}
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
              onClose={() => dispatch(toggleMedicationExpandDialog())}
              reloadData={() => fetchMedications()}
              patientId={patientId}
            />
          )}
          applyForm={() => dispatch(toggleMedicationExpandDialog())}
          cancelForm={() => dispatch(toggleMedicationExpandDialog())}
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
              onClose={() => dispatch(toggleRequisitionDialog())}
              reloadData={fetchRequisitions}
              patientId={patientId}
            />
          )}
          applyForm={() => dispatch(toggleRequisitionDialog())}
          cancelForm={() => dispatch(toggleRequisitionDialog())}
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
              onClose={() => dispatch(toggleRequisitionExpandDialog())}
              patientId={patientId}
              reloadData={fetchRequisitions}
            />
          )}
          applyForm={() => dispatch(toggleRequisitionExpandDialog())}
          cancelForm={() => dispatch(toggleRequisitionExpandDialog())}
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
              onClose={() => dispatch(toggleDocumentsExpandDialog())}
              patientId={patientId}
              reloadData={() => fetchDocuments()}
            />
          )}
          applyForm={() => dispatch(toggleDocumentsExpandDialog())}
          cancelForm={() => dispatch(toggleDocumentsExpandDialog())}
          hideActions
          size="lg"
        />
      )}

      {!!tests.expandDialog && (
        <Dialog
          open={tests.expandDialog}
          title={" "}
          message={
            <TestsCardContent data={patientTests} onClose={() => dispatch(toggleTestsExpandDialog())} />
          }
          applyForm={() => dispatch(toggleTestsExpandDialog())}
          cancelForm={() => dispatch(toggleTestsExpandDialog())}
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
                primaryButtonHandler={() => dispatch(toggleEncountersDialog())}
                secondaryButtonHandler={() => dispatch(toggleEncountersExpandDialog())}
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
                    dispatch(setDiagnosesStatus(value));
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
                secondaryButtonHandler={() => dispatch(toggleDocumentsExpandDialog())}
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
                primaryButtonHandler={() => dispatch(toggleTestsExpandDialog())}
                updateMinHeight={updateMinHeight}
              />
            </Grid>
          </ResponsiveGridLayout>
        )}
      </Grid>
    </PatientContext.Provider>
  );
};

export default Patient;
