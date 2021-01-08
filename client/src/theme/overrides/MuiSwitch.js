import { green } from "@material-ui/core/colors";

export default {

  colorPrimary: {
    color: green[200],
    "&$checked + $track": {
      backgroundColor: green[600],
    },
    "&$checked": {
      color: green[600],
    },
  },
};
