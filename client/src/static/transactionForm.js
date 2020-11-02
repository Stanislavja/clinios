export const TransactionFormFields = [
  {
    name: "date",
    id: "date",
    label: "Date",
    baseType: "input",
    type: "date",
    options: []
  },
  {
    name: "type",
    id: "type",
    label: "Type",
    baseType: "select",
    type: null,
    options: [
      {
        label: "Service",
        value: 1
      },
      {
        label: "Refund",
        value: 2
      },
      {
        label: "Payment",
        value: 3
      },
      {
        label: "Credit",
        value: 4
      }
    ]
  },
  {
    name: "amount",
    id: "amount",
    label: "Amount",
    baseType: "input",
    type: "number",
    options: []
  },
  {
    name: "accountNum",
    id: "accountNum",
    label: "Account Number",
    baseType: "input",
    type: "number",
    options: []
  },
  {
    name: "paymentType",
    id: "paymentType",
    label: "Payment Type",
    baseType: "select",
    type: null,
    options: [
      {
        label: "Advance",
        value: "A"
      },
      {
        label: "Credit",
        value: "C"
      }
    ]
  }
];
