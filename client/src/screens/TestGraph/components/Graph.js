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

import ReferenceLabel from "./ReferenceLabel";

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
            "MMMM Do YYYY, h:mm A",
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
  payload: PropTypes.instanceOf(Array).isRequired,
};

const countDecimals = (value) => {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
};

const Graph = ({
  data, range, graphSize, conventionalRange,
}) => {
  const [graphData, setGraphData] = useState([]);
  const [scaling, setScaling] = useState([]);
  const [high, setHigh] = useState();
  const [low, setLow] = useState();
  const [middle, setMiddle] = useState();

  useEffect(() => {
    if (data) {
      const hash = Object.create(null);
      const result = data.map((d) => {
        if (
          !moment(d.lab_dt).format("YYYY")
          || hash[moment(d.lab_dt).format("YYYY")]
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
        year: result[index],
      }));
      setGraphData(tempData);
    }
  }, [data]);

  useEffect(() => {
    if (typeof range === "boolean") {
      setHigh(conventionalRange.high);
      setLow(conventionalRange.low);
      setMiddle((conventionalRange.high + conventionalRange.low) / 2);
    }
    if (range?.high && conventionalRange?.high) {
      let highT = 0;
      let lowT = 0;
      if (conventionalRange?.high > range.high) {
        highT = conventionalRange?.high;
      } else {
        highT = range?.high;
      }
      if (conventionalRange?.low < range.low) {
        lowT = conventionalRange?.low;
      } else {
        lowT = range?.low;
      }
      setHigh(highT);
      setLow(lowT);
      setMiddle((highT + lowT) / 2);
    }
  }, [range, conventionalRange]);

  useEffect(() => {
    const tempScaling = [
      high + middle * 0.2,
      high + middle * 0.15,
      high + middle * 0.1,
      high + middle * 0.05,
      high,
      middle,
      low,
      low - middle * 0.05,
      low - middle * 0.1,
      low - middle * 0.15,
      low - middle * 0.2,
    ];
    const checkScaling = tempScaling.map((val) => {
      if (val) {
        if (countDecimals(val) > 2) {
          return parseFloat(val.toFixed(2));
        }
      }
      return val;
    });
    setScaling(checkScaling);
  }, [high, low, middle]);

  return (
    <ResponsiveContainer width="100%" height={graphSize.height}>
      <LineChart
        width={graphSize.width}
        height={graphSize.height}
        data={graphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="year" tickLine={false} />
        <YAxis
          type="number"
          domain={[low - middle * 0.2, high + middle * 0.2]}
          interval={0}
          ticks={scaling}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          y={conventionalRange?.high}
          label={<ReferenceLabel value="Conventional range" fill="#477fc9" />}
          stroke="#477fc9"
        />
        <ReferenceLine
          y={range?.high}
          label={<ReferenceLabel value="Functional range" fill="#477fc9" />}
          stroke="#477fc9"
        />
        <ReferenceLine
          y={range?.low}
          label={<ReferenceLabel value="Functional range" fill="#477fc9" />}
          stroke="#477fc9"
        />
        <ReferenceLine
          y={conventionalRange?.low}
          label={<ReferenceLabel value="Conventional range" fill="#477fc9" />}
          stroke="#477fc9"
        />
        <Line
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      lab_dt: PropTypes.string,
      filename: PropTypes.string,
      value: PropTypes.number,
    }),
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
  graphSize: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
};

export default Graph;
