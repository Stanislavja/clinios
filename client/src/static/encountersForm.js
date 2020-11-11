export const EncountersFormFields = [
  {
    name: "title",
    id: "title",
    label: "Title",
    baseType: "input",
    type: "text",
    options: [],
  },
  {
    name: "encounter_type",
    id: "encounter_type",
    label: "Type",
    baseType: "select",
    type: null,
    options: [
      {
        label: "Office Visit",
        value: "O",
      },
      {
        label: "Email",
        value: "E",
      },
      {
        label: "Admin Note",
        value: "A",
      },
      {
        label: "Phone Call",
        value: "P",
      },
      {
        label: "Refill",
        value: "R",
      },
    ],
  },
  {
    name: "date",
    id: "date",
    label: "Date",
    baseType: "input",
    type: "date",
    options: [],
  },
];

export const EncountersCards = [
  {
    title: "Diagnose",
    showActions: false,
    showSearch: false,
    data: [],
    primaryButtonText: "",
    secondaryButtonText: "",
    icon: null,
  },
  {
    title: "Plan",
    showActions: false,
    showSearch: false,
    data: [],
    primaryButtonText: "",
    secondaryButtonText: "",
    icon: "AddIcon",
  },
  {
    title: "Billing",
    showActions: false,
    showSearch: false,
    data: [],
    primaryButtonText: "",
    secondaryButtonText: "",
    icon: "AddIcon",
  },
];
