export const getAcronym = (str) => {
  if (!str || typeof str === undefined) {
    return;
  }
  const matches = str.match(/\b(\w)/g);
  return matches.join("");
};

export const removeEmpty = (obj) => {
  Object.keys(obj).forEach(function (key) {
    if (obj[key] && typeof obj[key] === "object") removeEmpty(obj[key]);
    else if (obj[key] === "" || obj[key] === null) delete obj[key];
  });
  return obj;
};

function getFullDate(x) {
  switch (x) {
    case 0:
      return 31;
    case 1:
      return 28;
    case 2:
      return 31;
    case 3:
      return 30;
    case 4:
      return 31;
    case 5:
      return 30;
    case 6:
      return 31;
    case 7:
      return 31;
    case 8:
      return 30;
    case 9:
      return 31;
    case 10:
      return 30;
    case 11:
      return 31;
    default:
      return 30;
  }
}

export const calculateAge = (date) => {
  let now = new Date();
  let dob = new Date(date);
  let year = now.getYear() - dob.getYear();
  let month = now.getMonth() - dob.getMonth();
  if (month < 0) {
    month = now.getMonth() + 12 - dob.getMonth();
    year = year - 1;
  }
  let day = now.getDate() - dob.getDate();
  if (day < 0) {
    let monthNumber = dob.getMonth();
    let fullDate = getFullDate(monthNumber);
    day = now.getDate() + fullDate - dob.getDate();
    month = month - 1;
  }

  return year > 0 ? year + " yrs" : month + " mo";
};

export const formatPhoneNumber = (phoneNumber) => {
  let cleaned = ("" + phoneNumber).replace(/\D/g, "");
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return match[1] + " " + match[2] + " " + match[3];
  }
  return null;
};

export const formatDate = (date) => {
  let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const DateDiff = {
  inDays: function (d1, d2) {
    let t2 = d2.getTime();
    let t1 = d1.getTime();

    return parseInt((t2 - t1) / (24 * 3600 * 1000));
  },

  inWeeks: function (d1, d2) {
    const t2 = d2.getTime();
    const t1 = d1.getTime();

    return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
  },

  inMonths: function (d1, d2) {
    let d1Y = d1.getFullYear();
    let d2Y = d2.getFullYear();
    let d1M = d1.getMonth();
    let d2M = d2.getMonth();

    return d2M + 12 * d2Y - (d1M + 12 * d1Y);
  },

  inYears: function (d1, d2) {
    return d2.getFullYear() - d1.getFullYear();
  }
};

export const statusToColorCode = (status) => {
  switch (status) {
    case "D":
      return "#ffab40";
    case "A":
      return "#008B00";
    default:
      return "#2196f3";
  }
};

export const encounterTypeToLetterConversion = (encounter) => {
  switch (encounter) {
    case "Office Visit":
      return "O";
    case "Email":
      return "E";
    case "Admin Note":
      return "A";
    case "Phone Call":
      return "P";
    case "Refill":
      return "R";
    default:
      return "";
  }
};

export const encounterLetterToTypeConversion = (encounter) => {
  switch (encounter) {
    case "O":
      return "Office Visit";
    case "E":
      return "Email";
    case "A":
      return "Admin Note";
    case "P":
      return "Phone Call";
    case "R":
      return "Refill";
    default:
      return "";
  }
};
