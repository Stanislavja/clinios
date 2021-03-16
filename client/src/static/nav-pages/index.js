import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AccountBoxSharpIcon from "@material-ui/icons/AccountBoxSharp";
import CodeIcon from "@material-ui/icons/Code";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import GroupIcon from "@material-ui/icons/Group";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import InsertInvitationSharpIcon from "@material-ui/icons/InsertInvitationSharp";
// import PersonAddSharpIcon from "@material-ui/icons/PersonAddSharp";
import PieChartIcon from "@material-ui/icons/PieChart";
import ScheduleIcon from "@material-ui/icons/Schedule";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import TimelineIcon from "@material-ui/icons/Timeline";
import TuneIcon from "@material-ui/icons/Tune";


export const client_pages = [
  {
    id: 1,
    title: "Home",
    href: "/dashboard",
  },
  {
    id: 2,
    title: "Manage",
    href: "/dashboard/manage",
    subMenus: [
      {
        id: 21,
        icon: FindInPageIcon,
        title: "Accounting Search",
        href: "/manage/accounting-search",
      },
      /*
      {
        id: 22,
        icon: MailOutlineIcon,
        title: "Email Patients",
        href: "/manage/email-patients",
      },
      {
        id: 23,
        icon: PrintIcon,
        title: "Fax",
        href: "/manage/fax",
      },
      {
        id: 24,
        icon: PeopleIcon,
        title: "Merge Patient",
        href: "/manage/merge-patient",
      },
      {
        id: 25,
        icon: PersonAddDisabledIcon,
        title: "Delete Patient",
        href: "/manage/delete-patient",
      },
      */
      {
        id: 26,
        icon: GroupAddIcon,
        title: "Patient Search",
        href: "/manage/patient-search",
      },
      /*
      {
        id: 27,
        icon: HelpIcon,
        title: "Support Center",
        href: "/manage/support",
      },
      */
    ],
  },
  {
    id: 23,
    title: "Setup",
    href: "/setup",
    // permission: ["ADMIN"],
    subMenus: [
      {
        id: 31,
        icon: AccountBoxSharpIcon,
        title: "Accounting Types",
        href: "/setup/accounting-types",
      },
      {
        id: 32,
        icon: InsertInvitationSharpIcon,
        title: "Appointment Types",
        href: "/setup/appointment-types",
      },
      /*
      {
        id: 33,
        icon: PersonAddSharpIcon,
        title: "Appointment Types User Assignment",
        href: "/setup/appoinment-user-types",
      },
      */
      /*
      {
        id: 34,
        icon: BackupIcon,
        title: "Backup",
        href: "/setup/backup",
      },
      */
      {
        id: 35,
        icon: TuneIcon,
        title: "Configuration",
        href: "/setup/configuration",
      },
      {
        id: 36,
        icon: CodeIcon,
        title: "CPT Codes",
        href: "/setup/ctp-codes",
      },
      {
        id: 37,
        icon: CodeIcon,
        title: "Drugs",
        href: "/setup/drugs",
      },
      {
        id: 38,
        icon: SettingsEthernetIcon,
        title: "Forms",
        href: "/setup/forms",
      },
      /*
      {
        id: 39,
        icon: CodeIcon,
        title: "Handouts",
        href: "/setup/handouts",
      },
      */
      {
        id: 310,
        icon: CodeIcon,
        title: "ICD Codes",
        href: "/setup/icd-codes",
      },
      {
        id: 311,
        icon: SettingsInputComponentIcon,
        title: "Integrations",
        href: "/setup/integrations",
      },
      {
        id: 312,
        icon: TimelineIcon,
        title: "Lab Ranges",
        href: "/setup/lab-ranges",
      },
      {
        id: 313,
        icon: CodeIcon,
        title: "Patient Portal Header",
        href: "/setup/patient-portal-header",
      },
      {
        id: 314,
        icon: ScheduleIcon,
        title: "Schedule",
        href: "/setup/schedule",
      },
      {
        id: 315,
        icon: GroupIcon,
        title: "Users",
        href: "/setup/users",
      },
      {
        id: 316,
        icon: GroupIcon,
        title: "Contracts",
        href: "/setup/contracts",
      },
    ],
  },
  {
    id: 4,
    icon: PieChartIcon,
    title: "Reports",
    href: "/reports",
  },
  {
    id: 5,
    icon: AccountBoxIcon,
    title: "Myself",
    href: "/myself",
  },
  {
    id: 6,
    icon: ExitToAppIcon,
    title: "Logout",
    href: "/",
    logout: true,
  },
];


export const corporate_pages = [
  {
    id: 1,
    title: "Home",
    href: "/corporate",
  },
  {
    id: 2,
    title: "Clients",
    href: "/corporate/clients",
  },
  {
    id: 3,
    title: "Users",
    href: "/corporate/users",
  },
  {
    id: 4,
    title: "Myself",
    href: "/corporate/myself",
  },
  {
    id: 6,
    title: "Logout",
    href: "/",
    logout: true,
  },
];
