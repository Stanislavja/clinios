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

  if (payload && payload.length) {
    return (
      <div className={classes.root}>
        <p className="label">
          {`Date : ${moment(payload[0]?.payload?.lab_dt).format(
            "MMMM Do YYYY, h:mm A"
          )}`}
        </p>
        <p className="label">{`File : ${payload[0]?.payload?.filename}`}</p>
        <p className="label">{`Value : ${payload[0]?.payload?.value}`}</p>
      </div>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  payload: PropTypes.instanceOf(Array),
};
CustomTooltip.defaultProps = {
  payload: [],
};

export const Graph = ({ data, range, conventionalRange }) => {
  const [graphData, setGraphData] = useState([]);

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
          domain={[
            parseInt(conventionalRange.low, 10),
            Math.round(conventionalRange.high) < conventionalRange.high
              ? conventionalRange.high
              : Math.round(conventionalRange.high),
          ]}
          interval={0}
          tickCount={6}
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
        {range.high && (
          <ReferenceLine
            y={range?.high}
            label={{
              position: "insideBottomLeft",
              value: "Functional range",
              fontSize: "0.6rem",
              fill: "#477fc9",
            }}
            stroke="#477fc9"
          />
        )}
        {range.low && (
          <ReferenceLine
            y={range?.low}
            label={{
              position: "insideTopLeft",
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
  data: PropTypes.oneOfType([PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      lab_dt: PropTypes.string,
      filename: PropTypes.string,
      value: PropTypes.number,
    })
  ).isRequired,
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
