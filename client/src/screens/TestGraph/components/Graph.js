import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core";
import moment from "moment";
import PropTypes from "prop-types";
import {
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "2px solid #333",
    padding: theme.spacing(1),
    background: "#fff",
    borderRadius: "10px",
  },
}));

const CustomTooltip = ({ payload }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {payload && payload.length ? (
        <>
          <p className="label">
            {`Date : ${moment(payload[0]?.payload?.lab_dt).format(
              "MMMM Do YYYY, h:mm A"
            )}`}
          </p>
          <p className="label">{`File : ${payload[0]?.payload?.filename}`}</p>
          <p className="label">{`Value : ${payload[0]?.payload?.value}`}</p>
        </>
      ) : null}
    </div>
  );
};

CustomTooltip.propTypes = {
  payload: PropTypes.instanceOf(Array),
};
CustomTooltip.defaultProps = {
  payload: [],
};
CustomTooltip.defaultProps = {
  payload: [],
};

const countDecimals = (value) => {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
};
function roundNumber(num, scale) {
  if (!`${num}`.includes("e")) {
    return +`${Math.round(`${num}e+${scale}`)}e-${scale}`;
  }
  const arr = `${num}`.split("e");
  let sig = "";
  if (+arr[1] + scale > 0) {
    sig = "+";
  }
  return +`${Math.round(`${+arr[0]}e${sig}${+arr[1] + scale}`)}e-${scale}`;
}

const countDecimals = (value) => {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
};
function roundNumber(num, scale) {
  if (!`${num}`.includes("e")) {
    return +`${Math.round(`${num}e+${scale}`)}e-${scale}`;
  }
  const arr = `${num}`.split("e");
  let sig = "";
  if (+arr[1] + scale > 0) {
    sig = "+";
  }
  return +`${Math.round(`${+arr[0]}e${sig}${+arr[1] + scale}`)}e-${scale}`;
}

export const Graph = ({ data, range, conventionalRange }) => {
  const [graphData, setGraphData] = useState([]);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);

  /* eslint-disable */
<<<<<<< HEAD
  useEffect(() => {
    const middle = (conventionalRange?.high + conventionalRange?.low) / 2;
    if (conventionalRange?.high > range?.high) {
      if (
        Math.round(conventionalRange?.high + middle * 0.12) <
        conventionalRange?.high
      ) {
        const newHigh = conventionalRange?.high + middle * 0.12;
        if (countDecimals(newHigh) > 2) {
          setHigh(roundNumber(newHigh.toFixed(2), 1));
        } else {
          setHigh(newHigh);
        }
      } else {
        setHigh(Math.round(conventionalRange?.high + middle * 0.12));
      }
    } else if (range !== true) {
      if (Math.round(range?.high + middle * 0.12) < range?.high) {
        const newHigh = range?.high + middle * 0.12;
        if (countDecimals(newHigh) > 2) {
          setHigh(roundNumber(newHigh.toFixed(2), 1));
        } else {
          setHigh(newHigh);
        }
      } else {
        setHigh(Math.round(range?.high + middle * 0.12));
      }
    } else if (
      Math.round(conventionalRange?.high + middle * 0.12) <
      conventionalRange?.high
    ) {
      const newHigh = conventionalRange?.high + middle * 0.12;
      if (countDecimals(newHigh) > 2) {
        setHigh(roundNumber(newHigh.toFixed(2), 1));
      } else {
        setHigh(newHigh);
      }
    } else {
      setHigh(Math.round(conventionalRange?.high + middle * 0.12));
    }

    if (range !== true) {
      if (conventionalRange?.low < range?.low) {
        if (conventionalRange?.low < 1) {
          setLow(0);
        } else {
          setLow(Math.round(conventionalRange?.low - middle * 0.12));
        }
      } else if (range?.low < 1) {
        setLow(0);
      } else {
        setLow(Math.round(range?.low - middle * 0.12));
      }
    } else if (conventionalRange?.low < 1) {
      setLow(0);
    } else {
      setLow(Math.round(conventionalRange?.low - middle * 0.12));
    }

    if (range.low === conventionalRange.low) {
      setLow(range.low);
    }
    if (range.high === conventionalRange.high) {
      setHigh(range.high);
    }
  }, [conventionalRange]);

  /* eslint-disable */
=======
>>>>>>> c79083ef (Generic graph)
  useEffect(() => {
    const middle = (conventionalRange?.high + conventionalRange?.low) / 2;
    if (conventionalRange?.high > range?.high) {
      if (
        Math.round(conventionalRange?.high + middle * 0.12) <
        conventionalRange?.high
      ) {
        const newHigh = conventionalRange?.high + middle * 0.12;
        if (countDecimals(newHigh) > 2) {
          setHigh(roundNumber(newHigh.toFixed(2), 1));
        } else {
          setHigh(newHigh);
        }
      } else {
        setHigh(Math.round(conventionalRange?.high + middle * 0.12));
      }
    } else if (range !== true) {
      if (Math.round(range?.high + middle * 0.12) < range?.high) {
        const newHigh = range?.high + middle * 0.12;
        if (countDecimals(newHigh) > 2) {
          setHigh(roundNumber(newHigh.toFixed(2), 1));
        } else {
          setHigh(newHigh);
        }
      } else {
        setHigh(Math.round(range?.high + middle * 0.12));
      }
    } else if (
      Math.round(conventionalRange?.high + middle * 0.12) <
      conventionalRange?.high
    ) {
      const newHigh = conventionalRange?.high + middle * 0.12;
      if (countDecimals(newHigh) > 2) {
        setHigh(roundNumber(newHigh.toFixed(2), 1));
      } else {
        setHigh(newHigh);
      }
    } else {
      setHigh(Math.round(conventionalRange?.high + middle * 0.12));
    }

    if (range !== true) {
      if (conventionalRange?.low < range?.low) {
        if (conventionalRange?.low < 1) {
          setLow(0);
        } else {
          setLow(Math.round(conventionalRange?.low - middle * 0.12));
        }
      } else if (range?.low < 1) {
        setLow(0);
      } else {
        setLow(Math.round(range?.low - middle * 0.12));
      }
    } else if (conventionalRange?.low < 1) {
      setLow(0);
    } else {
      setLow(Math.round(conventionalRange?.low - middle * 0.12));
    }
  }, [conventionalRange]);

  useEffect(() => {
    if (data) {
      const hash = Object.create(null);
      const result = data.map((d) => {
        if (
          !moment(d.lab_dt).format("YYYY") ||
          hash[moment(d.lab_dt).format("YYYY")]
        ) {
          return null;
        }
        hash[moment(d.lab_dt).format("YYYY")] = true;
        return moment(d.lab_dt).format("YYYY");
      });
      const tempData = data.map((d, index) => ({
        id: d.id,
        lab_dt: d.lab_dt,
        filename: d.filename,
        value: d.value,
        year: moment(d.lab_dt).format("MMM-YYYY"),
      }));
      setGraphData(tempData);
    }
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={550}>
      <LineChart
        width={1100}
        height={550}
        data={graphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="year"
          interval={0}
          style={{
            fontSize: "0.8rem",
            margin: "2px",
          }}
        />
        <YAxis
          type="number"
          domain={[low, high]}
          interval={0}
          tickCount={8}
          style={{
            fontSize: "0.8rem",
            margin: "2px",
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          y={conventionalRange?.high}
          label={{
            position: "insideTopLeft",
            value: "Conventional range",
            fontSize: "0.6rem",
            fill: "#477fc9",
          }}
          stroke="#477fc9"
        />
        {range !== true && (
          <ReferenceLine
            y={range?.high}
            label={{
              position: "insideTopRight",
              value: "Functional range",
              fontSize: "0.6rem",
              fill: "#477fc9",
            }}
            stroke="#477fc9"
          />
        )}
        {range !== true && (
          <ReferenceLine
            y={range?.low}
            label={{
<<<<<<< HEAD
              position: "insideBottomLeft",
=======
              position: "insideBottomRight",
>>>>>>> c79083ef (Generic graph)
              value: "Functional range",
              fontSize: "0.6rem",
              fill: "#477fc9",
            }}
            stroke="#477fc9"
          />
        )}
        <ReferenceLine
          y={conventionalRange?.low}
          label={{
            position: "insideBottomLeft",
            value: "Conventional range",
            fontSize: "0.6rem",
            fill: "#477fc9",
          }}
          stroke="#477fc9"
        />
        <Line
          animationDuration={0}
          strokeWidth={2}
          type="monotone"
          dataKey="value"
          fill="#477fc9"
          stroke="#477fc9"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

Graph.propTypes = {
<<<<<<< HEAD
  data: PropTypes.oneOfType([PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      lab_dt: PropTypes.string,
      filename: PropTypes.string,
      value: PropTypes.number,
    })
  ).isRequired,
=======
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        lab_dt: PropTypes.string,
        filename: PropTypes.string,
        value: PropTypes.number,
      })
    ),
    PropTypes.any,
  ]),
>>>>>>> c79083ef (Generic graph)
  range: PropTypes.oneOfType([
    PropTypes.shape({
      high: PropTypes.number,
      low: PropTypes.number,
    }),
    PropTypes.bool,
  ]).isRequired,
  conventionalRange: PropTypes.oneOfType([
    PropTypes.shape({
      high: PropTypes.number,
      low: PropTypes.number,
    }),
    PropTypes.bool,
  ]).isRequired,
};

Graph.defaultProps = {
  data: [],
};
