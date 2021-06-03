# AvonEHR

## Stack

- React.js
- Redux
- Material-UI
- Node + Express
- MySQL

## Database

1. Install MySQL
2. Load file mysql_start.txt

To query the database use MySQL Workbench https://www.mysql.com/products/workbench/

## Frontend

Setup:

1. `cd client`
2. `yarn install`
3. copy `.env.sample` into `.env` and fill in credentials

To run:

1. `yarn start` or `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000)

## Backend

Setup:

1. `cd server`
2. `yarn install`
3. copy `.env.sample` into `.env` and fill in credentials
4. Make sure your database is running on your machine

To run:

1. `yarn dev` or `npm run dev` for development, `yarn start` for production

## Prettier

1. In Visual Studio Code install the Prettier extension.
2. Go to Code -> Settings -> Preferences, search for `editor.formatOnSave`, set to True.

## Doctor Login

1. Login page for doctors/clients http://localhost:3000/login_client
2. Use email dr@test.com password 12345678
3. Use these credentials so you will see the correct demo data.

If you get an error "Client does not support authentication protocol requested by server" then run
    alter user 'root'@'localhost' identified with mysql_native_password by '12345678';
    flush privileges;
    
## Patient Login

1. Login page for patients http://localhost:3000/login/dbw
2. Use email pt@test.com password 12345678
3. Use these credentials so you will see the correct demo data.
    
## Patient Signup

1. Login page for patients http://localhost:3000/signup/dbw

## Email

To test email notifications (only for development):

1. Get `username` and `password` from `https://ethereal.email/create`
2. Check emails on `https://ethereal.email/messages`

## Structure

Our folder and file structure on Client application:

```
client/src
├── App.js
├── App.test.js
├── HocRoutes.js
├── Notifier.js
├── assets
│   ├── client
│   │   └── c1_logo.png
│   └── img
│       ├── Logo.jpg
│       └── Logo.png
├── components
│   ├── AdminGuard.js
│   ├── AuthGuard.js
│   ├── ClientPortalGuard.js
│   ├── Dialog
│   │   └── index.js
│   ├── GuestGuard.js
│   ├── LoadingScreen.js
│   ├── SlashScreen.js
│   ├── common
│   │   ├── Card.js
│   │   ├── CountrySelect.js
│   │   ├── CustomTooltip.js
│   │   ├── Dimmer.js
│   │   ├── Error.js
│   │   └── RegionSelect.js
│   └── videos
│       └── Video.js
├── constants.js
├── contexts
│   └── AuthContext.js
├── hooks
│   ├── useAuth.js
│   ├── useDebounce.js
│   ├── useDidMountEffect.js
│   └── usePatientContext.js
├── index.css
├── index.js
├── layouts
│   ├── Dashboard
│   │   ├── Dashboard.js
│   │   ├── components
│   │   │   ├── Footer
│   │   │   │   ├── Footer.js
│   │   │   │   └── index.js
│   │   │   ├── Sidebar
│   │   │   │   ├── components
│   │   │   │   │   ├── Profile
│   │   │   │   │   │   ├── Profile.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── SearchBar
│   │   │   │   │   │   ├── SearchBar.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── SidebarNav
│   │   │   │   │   │   ├── NavItem.js
│   │   │   │   │   │   ├── SidebarNav.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── Topbar
│   │   │   │   ├── Topbar.js
│   │   │   │   ├── components
│   │   │   │   │   ├── MenuWithDropDowns.js
│   │   │   │   │   ├── SearchResults.js
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   └── index.js
│   ├── MainLayout
│   │   ├── MainLayout.js
│   │   ├── components
│   │   │   ├── Footer
│   │   │   │   ├── Footer.js
│   │   │   │   └── index.js
│   │   │   ├── Header
│   │   │   │   ├── Header.js
│   │   │   │   └── index.js
│   │   │   ├── Sidebar
│   │   │   │   ├── Sidebar.js
│   │   │   │   ├── components
│   │   │   │   │   ├── GeneralSidebarNav
│   │   │   │   │   │   ├── GeneralSidebarNav.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── SidebarNav
│   │   │   │   │   │   ├── SidebarNav.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   └── index.js
│   ├── PatientPortal
│   │   ├── Plain
│   │   │   └── index.js
│   │   ├── WithLeftSidebar
│   │   │   └── index.js
│   │   ├── components
│   │   │   ├── Footer
│   │   │   │   ├── Footer.js
│   │   │   │   └── index.js
│   │   │   ├── Sidebar
│   │   │   │   ├── components
│   │   │   │   │   ├── Profile
│   │   │   │   │   │   ├── Profile.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── SearchBar
│   │   │   │   │   │   ├── SearchBar.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── SidebarNav
│   │   │   │   │   │   ├── SidebarNav.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── Topbar
│   │   │   │   ├── Topbar.js
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   └── index.js
│   ├── PlainLayout
│   │   └── index.js
│   └── index.js
├── network-service.js
├── providers
│   └── Patient
│       ├── actions.js
│       ├── index.js
│       ├── initialState.js
│       ├── reducer.js
│       └── types.js
├── reactGridLayout.css
├── routes.js
├── screens
│   ├── Agreement.js
│   ├── Auth
│   │   ├── Login.js
│   │   ├── SignUp.js
│   │   └── components
│   │       ├── PracticeForm.js
│   │       ├── Success.js
│   │       └── TextFieldWithError.js
│   ├── Client
│   │   ├── Home
│   │   │   ├── Home.js
│   │   │   ├── components
│   │   │   │   ├── Calendar
│   │   │   │   │   └── EventCalendar.js
│   │   │   │   ├── Cards
│   │   │   │   │   ├── AppointmentRequests.js
│   │   │   │   │   ├── MessagesUnread.js
│   │   │   │   │   ├── ProviderCards.js
│   │   │   │   │   └── ProviderDetailsCard.js
│   │   │   │   ├── index.js
│   │   │   │   └── modal
│   │   │   │       ├── MessageToPatient.js
│   │   │   │       └── NewOrEditEvent.js
│   │   │   └── index.js
│   │   ├── Manage
│   │   │   ├── AccountingSearch
│   │   │   │   ├── AccountingSearch.js
│   │   │   │   ├── components
│   │   │   │   │   ├── AccountingSearchResults.js
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── DeletePatient
│   │   │   │   ├── DeletePatient.js
│   │   │   │   └── index.js
│   │   │   ├── EmailPatients
│   │   │   │   ├── EmailPatients.js
│   │   │   │   └── index.js
│   │   │   ├── Fax
│   │   │   │   ├── Fax.js
│   │   │   │   └── index.js
│   │   │   ├── MergePatient
│   │   │   │   ├── MergePatient.js
│   │   │   │   └── index.js
│   │   │   ├── PatientSearch
│   │   │   │   ├── PatientSearch.js
│   │   │   │   ├── components
│   │   │   │   │   ├── PatientSearchResults.js
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── Support
│   │   │   │   ├── Support.js
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── Myself
│   │   │   ├── Myself.js
│   │   │   ├── components
│   │   │   │   ├── MyActivityHistory.js
│   │   │   │   ├── MyLogins.js
│   │   │   │   ├── MyProfile.js
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── Reports
│   │   │   ├── Reports.js
│   │   │   └── index.js
│   │   ├── Setup
│   │   │   ├── AccountingTypes
│   │   │   │   ├── AccountingTypes.js
│   │   │   │   ├── component
│   │   │   │   │   └── AccountingTypesTable.js
│   │   │   │   └── index.js
│   │   │   ├── AppointmentTypes
│   │   │   │   ├── AppointmentTypes.js
│   │   │   │   ├── components
│   │   │   │   │   ├── AppointmentType.js
│   │   │   │   │   ├── Appointments.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── modal
│   │   │   │   │       ├── DeleteAppointmentType.js
│   │   │   │   │       └── NewOrEditAppointmentType.js
│   │   │   │   └── index.js
│   │   │   ├── AppointmentTypesUser
│   │   │   │   ├── AppointmentTypesUser.js
│   │   │   │   ├── data.js
│   │   │   │   └── index.js
│   │   │   ├── Backup
│   │   │   │   ├── Backup.js
│   │   │   │   └── index.js
│   │   │   ├── Procedurecodes
│   │   │   │   ├── Procedurecodes.js
│   │   │   │   ├── component
│   │   │   │   │   ├── ProcedureForm.js
│   │   │   │   │   ├── ProcedureTable.js
│   │   │   │   │   └── modal
│   │   │   │   │       ├── ProcedureGroupMembersModal.js
│   │   │   │   │       └── EditProcedureCodeModal.js
│   │   │   │   └── index.js
│   │   │   ├── Configuration
│   │   │   │   ├── Configuration.js
│   │   │   │   ├── data
│   │   │   │   │   └── state.js
│   │   │   │   ├── index.js
│   │   │   │   └── modal
│   │   │   │       └── index.js
│   │   │   ├── Drugs
│   │   │   │   ├── Drugs.js
│   │   │   │   ├── components
│   │   │   │   │   ├── Drugsform.js
│   │   │   │   │   └── Drugstable.js
│   │   │   │   └── index.js
│   │   │   ├── Forms
│   │   │   │   ├── Forms.js
│   │   │   │   └── index.js
│   │   │   ├── Handouts
│   │   │   │   ├── Handouts.js
│   │   │   │   └── index.js
│   │   │   ├── ICDcodes
│   │   │   │   ├── ICDcodes.js
│   │   │   │   ├── components
│   │   │   │   │   ├── ICDcodesform.js
│   │   │   │   │   └── ICDcodestable.js
│   │   │   │   └── index.js
│   │   │   ├── Integrations
│   │   │   │   ├── Integrations.js
│   │   │   │   └── index.js
│   │   │   ├── LabRanges
│   │   │   │   ├── LabRanges.js
│   │   │   │   └── index.js
│   │   │   ├── PortalHeader
│   │   │   │   ├── PortalHeader.js
│   │   │   │   └── index.js
│   │   │   ├── ReportFinance
│   │   │   │   ├── ReportFinance.js
│   │   │   │   ├── components
│   │   │   │   │   ├── Reports.js
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── ReportFinanceDetail
│   │   │   │   ├── ReportFinanceDetail.js
│   │   │   │   ├── component
│   │   │   │   │   └── FinanceDetailTable.js
│   │   │   │   └── index.js
│   │   │   ├── Schedule
│   │   │   │   ├── Schedule.js
│   │   │   │   ├── component
│   │   │   │   │   ├── ScheduleSearchForm.js
│   │   │   │   │   ├── ScheduleSearchResultTable.js
│   │   │   │   │   └── modal
│   │   │   │   │       ├── DeleteSchedule.js
│   │   │   │   │       └── NewOrEditSchedule.js
│   │   │   │   └── index.js
│   │   │   ├── Users
│   │   │   │   ├── Users.js
│   │   │   │   ├── component
│   │   │   │   │   ├── UsersTable.js
│   │   │   │   │   └── modal
│   │   │   │   │       └── NewOrEditUserModal.js
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   └── index.js
│   ├── Contact.js
│   ├── EmailConfirmation
│   │   ├── EmailConfirmation.js
│   │   ├── components
│   │   │   ├── VerificationMessage.js
│   │   │   ├── VerificationSuccess.js
│   │   │   └── index.js
│   │   └── index.js
│   ├── ForgetPassword
│   │   ├── Success.js
│   │   └── index.js
│   ├── Home.js
│   ├── NotFound.js
│   ├── Patient
│   │   ├── Encounters
│   │   │   ├── content.js
│   │   │   ├── details.js
│   │   │   └── index.js
│   │   ├── Form
│   │   │   ├── content.js
│   │   │   ├── details.js
│   │   │   └── index.js
│   │   ├── MedicalNotes
│   │   │   ├── content.js
│   │   │   ├── details.js
│   │   │   └── index.js
│   │   ├── Medications
│   │   │   ├── content.js
│   │   │   ├── details.js
│   │   │   └── index.js
│   │   ├── Messages
│   │   │   ├── content.js
│   │   │   ├── details.js
│   │   │   └── index.js
│   │   ├── Patient.js
│   │   ├── Requisitions
│   │   │   ├── content.js
│   │   │   ├── details.js
│   │   │   └── index.js
│   │   ├── Tests
│   │   │   └── content.js
│   │   ├── components
│   │   │   ├── AdminNotes
│   │   │   │   ├── AdminNotes.js
│   │   │   │   ├── Content.js
│   │   │   │   ├── History.js
│   │   │   │   └── index.js
│   │   │   ├── Allergies
│   │   │   │   ├── Allergies.js
│   │   │   │   ├── Content.js
│   │   │   │   ├── Details.js
│   │   │   │   └── index.js
│   │   │   ├── BasicInfo
│   │   │   │   ├── BasicInfo.js
│   │   │   │   ├── Content.js
│   │   │   │   ├── History.js
│   │   │   │   └── index.js
│   │   │   ├── Billing
│   │   │   │   ├── Content.js
│   │   │   │   ├── Details.js
│   │   │   │   ├── NewTransactionForm.js
│   │   │   │   ├── PaymentForm.js
│   │   │   │   └── index.js
│   │   │   ├── Diagnoses
│   │   │   │   ├── Diagnoses.js
│   │   │   │   ├── content.js
│   │   │   │   ├── details.js
│   │   │   │   └── index.js
│   │   │   ├── Documents
│   │   │   │   ├── Dialog
│   │   │   │   │   └── Lab.js
│   │   │   │   ├── content.js
│   │   │   │   └── index.js
│   │   │   └── Handouts
│   │   │       ├── Handouts.js
│   │   │       ├── content.js
│   │   │       ├── details.js
│   │   │       └── index.js
│   │   └── index.js
│   ├── ProcessLab
│   │   ├── ProcessLab.js
│   │   └── index.js
│   ├── ProcessMessage
│   │   ├── ProcessMessage.js
│   │   └── index.js
│   ├── ResetPassword.js
│   ├── corporate-portal
│   │   ├── Auth
│   │   │   ├── ForgetPassword
│   │   │   │   ├── Success.js
│   │   │   │   └── index.js
│   │   │   ├── Login.js
│   │   │   └── ResetPassword.js
│   │   ├── Clients
│   │   │   └── index.js
│   │   ├── Home
│   │   │   └── index.js
│   │   ├── Myself
│   │   │   ├── Myself.js
│   │   │   ├── components
│   │   │   │   ├── MyActivityHistory.js
│   │   │   │   ├── MyLogins.js
│   │   │   │   ├── MyProfile.js
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   └── Users
│   │       └── index.js
│   ├── errors
│   │   ├── NotFound.js
│   │   └── Restricted.js
│   └── patient-portal
│       ├── Allergies
│       │   ├── Allergies.js
│       │   └── index.js
│       ├── Appointments
│       │   ├── Appointments.js
│       │   ├── Calendar
│       │   │   └── index.js
│       │   └── index.js
│       ├── Billing
│       │   ├── Billing.js
│       │   ├── NewPaymentForm.js
│       │   └── index.js
│       ├── Encounters
│       │   ├── Encounters.js
│       │   └── index.js
│       ├── Forms
│       │   ├── Forms.js
│       │   └── index.js
│       ├── Handouts
│       │   ├── Handouts.js
│       │   └── index.js
│       ├── Home
│       │   └── Home.js
│       ├── Labs
│       │   ├── Labs.js
│       │   └── index.js
│       ├── Messages
│       │   ├── Messages.js
│       │   └── index.js
│       ├── PaymentMethods
│       │   ├── NewTransactionForm.js
│       │   ├── PaymentMethods.js
│       │   ├── ViewTransactionDetails.js
│       │   └── index.js
│       ├── Pharmacies
│       │   ├── Pharmacies.js
│       │   └── index.js
│       ├── Prescriptions
│       │   ├── Prescriptions.js
│       │   └── index.js
│       ├── Profile
│       │   ├── Form
│       │   │   └── index.js
│       │   ├── Profile.js
│       │   └── index.js
│       ├── Requisition
│       │   ├── Requisition.js
│       │   └── index.js
│       ├── ResetPassword.js
│       ├── auth
│       │   ├── ForgotPassword
│       │   │   ├── ForgotPassword.js
│       │   │   ├── Success.js
│       │   │   └── index.js
│       │   ├── Login.js
│       │   ├── Signup.js
│       │   └── components
│       │       ├── SignupForm.js
│       │       └── index.js
│       └── index.js
├── serviceWorker.js
├── services
│   ├── DashboardHome.service.js
│   ├── accountingSearch.service.js
│   ├── accountingTypes.service.js
│   ├── appointmentType.service.js
│   ├── appointments.service.js
│   ├── auth-header.js
│   ├── auth.service.js
│   ├── configuration.service.js
│   ├── corporate_portal
│   │   ├── auth.service.js
│   │   ├── email.service.js
│   │   ├── home.service.js
│   │   └── myself.service.js
│   ├── procedure.service.js
│   ├── drugs.service.js
│   ├── email.service.js
│   ├── icdcodes.service.js
│   ├── integrations.service.js
│   ├── message-to-patient.service.js
│   ├── myself.service.js
│   ├── patient.service.js
│   ├── patientPortalHeader.service.js
│   ├── patientSearch.service.js
│   ├── patient_portal
│   │   ├── auth.service.js
│   │   ├── home.service.js
│   │   ├── messages.service.js
│   │   └── patient-portal.service.js
│   ├── reportFinance.service.js
│   ├── reportFinanceDetail.service.js
│   ├── schedule.service.js
│   ├── supportStatus.service.js
│   └── users.service.js
├── setupTests.js
├── static
│   ├── encountersForm.js
│   ├── expandForm.js
│   ├── nav-pages
│   │   └── index.js
│   ├── patient-portal
│   │   └── appointments.js
│   ├── patient.js
│   ├── patientBasicInfoForm.js
│   ├── requisitionform.js
│   └── transactionForm.js
├── store
│   ├── common
│   │   ├── actions.js
│   │   ├── index.js
│   │   ├── reducer.js
│   │   └── types.js
│   ├── configureStore.js
│   ├── enhancers
│   │   └── monitorReducer.js
│   ├── middleware
│   │   └── logger.js
│   ├── notifications
│   │   ├── actions.js
│   │   ├── index.js
│   │   └── reducer.js
│   ├── patient
│   │   ├── actions.js
│   │   ├── index.js
│   │   ├── reducer.js
│   │   └── types.js
│   └── reducers.js
├── styles
│   └── SelectCustomStyles.js
├── theme
│   ├── colors.js
│   ├── index.js
│   ├── overrides
│   │   ├── MuiButton.js
│   │   ├── MuiIconButton.js
│   │   ├── MuiRadio.js
│   │   ├── MuiTab.js
│   │   └── index.js
│   ├── palette.js
│   └── typography.js
└── utils
    ├── API.js
    ├── API_BASE.js
    ├── axios.js
    └── helpers.js
```

Our server folder and file structure:

```
├── client
│   ├── c1_logo.png
├── controllers
│   ├── accounting-search.controller.js
│   ├── accounting-types.controller.js
│   ├── appointment-type-user.controller.js
│   ├── appointment-type.controller.js
│   ├── auth-email.controller.js
│   ├── client-agreement.controller.js
│   ├── config.controller.js
│   ├── corporate
│   │   ├── case.controller.js
│   │   ├── index.controller.js
│   │   ├── login.controller.js
│   │   ├── myself.controller.js
│   │   └── password-reset.controller.js
│   ├── procedure.controller.js
│   ├── drug.controller.js
│   ├── email-patient.controller.js
│   ├── forms.controller.js
│   ├── home.controller.js
│   ├── icd.controller.js
│   ├── index.controller.js
│   ├── integrations.controller.js
│   ├── login.controller.js
│   ├── message-to-patient.controller.js
│   ├── myself.controller.js
│   ├── password-reset.controller.js
│   ├── patient
│   │   ├── allergy.controller.js
│   │   ├── appointment.controller.js
│   │   ├── billings.controller.js
│   │   ├── invoice.controller.js
│   │   ├── encounters.controller.js
│   │   ├── handouts.controller.js
│   │   ├── home.controller.js
│   │   ├── lab_requisitions.controller.js
│   │   ├── labs.controller.js
│   │   ├── login.controller.js
│   │   ├── messages.controller.js
│   │   ├── password-reset.controller.js
│   │   ├── paymentMethod.controller.js
│   │   ├── pharmacy.controller.js
│   │   ├── prescription.controller.js
│   │   ├── profile.controller.js
│   │   └── signup.controller.js
│   ├── patient-portal-header.controller.js
│   ├── patient-search.controller.js
│   ├── patient.controller.js
│   ├── process-lab.controller.js
│   ├── report-finance-detail.controller.js
│   ├── report-finance.controller.js
│   ├── schedule.controller.js
│   ├── search.controller.js
│   ├── setup.controller.js
│   ├── signup.controller.js
│   ├── support.controller.js
│   └── users.controller.js
├── db
│   └── db.js
├── helpers
│   ├── email.js
│   ├── fieldValidation.js
│   ├── password-helper.js
│   ├── signupPDF.js
│   ├── status.js
│   ├── validations
│   │   └── patient.js
│   └── validations.js
├── middlewares
│   ├── authJwt.js
│   ├── authorization.js
│   └── index.js
├── patient
│   └── signature
│       ├── signature_10.png
└── routes
    ├── accounting-search.routes.js
    ├── accounting-types.routes.js
    ├── appointment-type-user.routes.js
    ├── appointment-type.routes.js
    ├── auth-email.routes.js
    ├── client-agreement.routes.js
    ├── config.routes.js
    ├── corporate
    │   ├── case.routes.js
    │   ├── index.routes.js
    │   ├── login.routes.js
    │   ├── myself.routes.js
    │   └── password-reset.routes.js
    ├── procedure.routes.js
    ├── drug.routes.js
    ├── email-patient.routes.js
    ├── forms.routes.js
    ├── home.routes.js
    ├── icd.routes.js
    ├── index.routes.js
    ├── integrations.routes.js
    ├── login.routes.js
    ├── message-to-patient.routes.js
    ├── myself.routes.js
    ├── password-reset.routes.js
    ├── patient
    │   ├── allergy.routes.js
    │   ├── appointment.routes.js
    │   ├── billings.routes.js
    │   ├── encounters.routes.js
    │   ├── handouts.routes.js
    │   ├── home.routes.js
    │   ├── invoice.routes.js
    │   ├── lab_requisitions.routes.js
    │   ├── labs.routes.js
    │   ├── login.routes.js
    │   ├── messages.routes.js
    │   ├── password-reset.routes.js
    │   ├── payment-method.routes.js
    │   ├── pharmacy.routes.js
    │   ├── prescription.routes.js
    │   ├── profile.routes.js
    │   └── signup.routes.js
    ├── patient-portal-header.routes.js
    ├── patient-search.routes.js
    ├── patient.routes.js
    ├── process-lab.routes.js
    ├── report-finance-detail.routes.js
    ├── report-finance.routes.js
    ├── schedule.routes.js
    ├── search.routes.js
    ├── setup.routes.js
    ├── signup.routes.js
    ├── support.routes.js
    └── users.routes.js
```
