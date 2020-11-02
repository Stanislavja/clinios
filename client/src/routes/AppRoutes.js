import React, { Component } from "react";

import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import { Main } from "../layouts";
import Dashboard from "../layouts/Dashboard";
import { PlainPatientPortal, WithLeftSidebar } from "../layouts/PatientPortal";
import Plain from "../layouts/Plain";
import { AuthProvider } from "../providers/AuthProvider";
import Agreement from "../screens/Agreement";
import Login from "../screens/Auth/Login";
import SignUp from "../screens/Auth/SignUp";
import { Reports, Myself } from "../screens/Client";
import { DoctorHome } from "../screens/Client/Home";
import {
  AccountingSearch,
  EmailPatients,
  Fax,
  MergePatient,
  DeletePatient,
  PatientSearch,
  Support
} from "../screens/Client/Manage";
import {
  AccountingTypes,
  AppointmentTypes,
  ReportFinance,
  AppointmentTypesUser,
  Backup,
  Configuration,
  CTPcodes,
  Drugs,
  Forms,
  Handouts,
  ICDcodes,
  Integrations,
  LabRanges,
  PortalHeader,
  Schedule,
  Users
} from "../screens/Client/Setup";
import Contact from "../screens/Contact";
import EmailConfirmation from "../screens/EmailConfirmation";
import ForgetPassword from "../screens/ForgetPassword";
import Home from "../screens/Home";
import NotFound from "../screens/NotFound";
//Patient_portal
import Patient from "../screens/Patient";
import {
  PatientSignUp,
  PatientLogin,
  PatientForgotPassword,
  PatientHome,
  PatientMessages,
  PatientEncounters,
  PatientHandouts,
  PatientLabs,
  PatientRequisition,
  PatientBilling,
  PaymentMethods,
  Allergies,
  Prescriptions,
  Pharmacies,
  PatientAppointments,
  PatientProfile,
  PatientForms
} from "../screens/patient-portal";
import PatientResetPassword from "../screens/patient-portal/ResetPassword";
import ProcessLab from "../screens/ProcessLab";
import ProcessMessage from "../screens/ProcessMessage";
import ResetPassword from "../screens/ResetPassword";
// import UserSignUp from "../screens/Auth/UserSignUp";
import PrivateRouteWithLayout from "./PrivateRouteWithLayout";
import RouteWithLayout from "./RouteWithLayout";
import ReportFinanceDetail from "../screens/Client/Setup/ReportFinanceDetail/index";

const history = createBrowserHistory();

class AppRouter extends Component {
  render() {
    return (
      <Router history={history}>
        <AuthProvider>
          <Switch>
            <RouteWithLayout layout={Main} path="/" component={Home} exact />
            <RouteWithLayout
              layout={Main}
              path="/agreement"
              component={Agreement}
            />
            <RouteWithLayout
              layout={Main}
              path="/contact"
              component={Contact}
            />
            <RouteWithLayout
              layout={Main}
              path="/forgot-password"
              component={ForgetPassword}
              exact
            />
            <RouteWithLayout
              layout={Main}
              path="/password/reset/:userId/:token"
              component={ResetPassword}
              exact
            />
            <RouteWithLayout
              layout={Main}
              path="/email/confirmation/:userId/:token"
              component={EmailConfirmation}
              exact
            />
            <RouteWithLayout
              layout={Main}
              path="/signup_client"
              component={SignUp}
            />
            {/*         <RouteWithLayout
              layout={Main}
              path="/signup"
              component={UserSignUp}
            /> */}
            <RouteWithLayout
              layout={Main}
              path="/login_client"
              component={Login}
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/dashboard"
              component={DoctorHome}
              exact
            />
            <PrivateRouteWithLayout
              layout={Plain}
              path="/patients/:patient_id"
              component={Patient}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/manage/accounting-search"
              component={AccountingSearch}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/manage/email-patients"
              component={EmailPatients}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/manage/fax"
              component={Fax}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/manage/merge-patient"
              component={MergePatient}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/manage/delete-patient"
              component={DeletePatient}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/manage/patient-search"
              component={PatientSearch}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/manage/support"
              component={Support}
              exact
            />
            {/* Setup/... */}
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/setup/accounting-types"
              component={AccountingTypes}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/setup/appointment-types"
              component={AppointmentTypes}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/reports/report-finance"
              component={ReportFinance}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/reports/report-finance-detail/:dateFrom/:dateTo"
              component={ReportFinanceDetail}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/setup/integrations"
              component={Integrations}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/setup/appoinment-user-types"
              component={AppointmentTypesUser}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/setup/backup"
              component={Backup}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/setup/configuration"
              component={Configuration}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/setup/ctp-codes"
              component={CTPcodes}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/setup/drugs"
              component={Drugs}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/setup/forms"
              component={Forms}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/setup/handouts"
              component={Handouts}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/setup/icd-codes"
              component={ICDcodes}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/setup/integrations"
              component={Integrations}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/setup/lab-ranges"
              component={LabRanges}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/setup/patient-portal-header"
              component={PortalHeader}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/setup/schedule"
              component={Schedule}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/setup/users"
              component={Users}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/reports"
              component={Reports}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/myself"
              component={Myself}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/process-lab/:user_id"
              component={ProcessLab}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/process-message/:user_id"
              component={ProcessMessage}
              exact
            />
            {/* Patient_portal */}
            <RouteWithLayout
              layout={PlainPatientPortal}
              path="/signup/:clientCode"
              component={PatientSignUp}
            />
            <RouteWithLayout
              layout={PlainPatientPortal}
              path="/login/:clientCode"
              component={PatientLogin}
            />
            <RouteWithLayout
              layout={PlainPatientPortal}
              path="/forgot/:clientCode"
              component={PatientForgotPassword}
            />
            <RouteWithLayout
              layout={PlainPatientPortal}
              path="/patient/password/reset/:patientId/:token"
              component={PatientResetPassword}
              exact
            />
            <PrivateRouteWithLayout
              layout={WithLeftSidebar}
              path="/patient"
              component={PatientHome}
              exact
            />
            <PrivateRouteWithLayout
              layout={WithLeftSidebar}
              path="/patient/messages"
              component={PatientMessages}
            />
            <PrivateRouteWithLayout
              layout={WithLeftSidebar}
              path="/patient/encounters"
              component={PatientEncounters}
            />
            <PrivateRouteWithLayout
              layout={WithLeftSidebar}
              path="/patient/handouts"
              component={PatientHandouts}
            />
            <PrivateRouteWithLayout
              layout={WithLeftSidebar}
              path="/patient/labs"
              component={PatientLabs}
            />
            <PrivateRouteWithLayout
              layout={WithLeftSidebar}
              path="/patient/labs-requisition"
              component={PatientRequisition}
            />
            <PrivateRouteWithLayout
              layout={WithLeftSidebar}
              path="/patient/billing"
              component={PatientBilling}
            />
            <PrivateRouteWithLayout
              layout={WithLeftSidebar}
              path="/patient/payment-methods"
              component={PaymentMethods}
            />
            <PrivateRouteWithLayout
              layout={WithLeftSidebar}
              path="/patient/allergies"
              component={Allergies}
            />
            <PrivateRouteWithLayout
              layout={WithLeftSidebar}
              path="/patient/prescriptions"
              component={Prescriptions}
            />
            <PrivateRouteWithLayout
              layout={WithLeftSidebar}
              path="/patient/pharmacies"
              component={Pharmacies}
            />
            <PrivateRouteWithLayout
              layout={WithLeftSidebar}
              path="/patient/appointments"
              component={PatientAppointments}
            />
            <PrivateRouteWithLayout
              layout={WithLeftSidebar}
              path="/patient/profile"
              component={PatientProfile}
            />
            <PrivateRouteWithLayout
              layout={WithLeftSidebar}
              path="/patient/forms"
              component={PatientForms}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </AuthProvider>
      </Router>
    );
  }
}

export default AppRouter;
