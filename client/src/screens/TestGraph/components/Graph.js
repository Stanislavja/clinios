import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core";
import moment from "moment";
import PropTypes from "prop-types";
import { LineChart, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Line } from "recharts";

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
          {`Date : ${moment(payload[0]?.payload?.lab_dt).format("MMMM Do YYYY, h:mm A")}`}
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

var countDecimals = function (value) {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
};

const Graph = ({ data, range, graphSize }) => {
  const middle = (range?.low + range?.high) / 2;
  const [graphData, setgraphData] = useState(null);
  const [scaling, setScaling] = useState([]);

  useEffect(() => {
    if(range.high){
      const tempScaling = [
        range?.high + middle * 0.2,
        range?.high + middle * 0.15,
        range?.high + middle * 0.1,
        range?.high + middle * 0.05,
        range?.high,
        middle,
        range?.low,
        range?.low - middle * 0.05,
        range?.low - middle * 0.1,
        range?.low - middle * 0.15,
        range?.low - middle * 0.2,
      ];
      const checkScaling = tempScaling.map((val) => {
        if (val)
          if (countDecimals(val) > 2) {
            return parseFloat(val.toFixed(2));
          }
        return val;
      });
      setScaling(checkScaling);
    }
    else setScaling([]);
   
  }, [range]);

  useEffect(() => {
    if (data) {
      const dx = data.map((d) => {
        if (d.value >= range.low && d.value <= range.high) {
          return {
            lab_id: d.lab_id,
            lab_dt: d.lab_dt,
            cpt_id: d.cpt_id,
            range_low: d.range_low,
            range_high: d.range_high,
            unit: d.unit,
            filename: d.filename,
            client_id: d.client_id,
            value:d.value,
            green: d.value,
            orange: null,
          };
        }
        return {
          lab_id: d.lab_id,
          lab_dt: d.lab_dt,
          cpt_id: d.cpt_id,
          range_low: d.range_low,
          range_high: d.range_high,
          unit: d.unit,
          filename: d.filename,
          client_id: d.client_id,
          value:d.value,
          green: null,
          orange: d.value,
        };
      });
      for (var i = 0; i < dx.length; i++) {
        if (i > 0)
          if (!dx[i].orange && !dx[i - 1].green) {
            let date = new Date(dx[i].lab_dt);
            let pre_date = new Date(dx[i - 1].lab_dt);
            let midX = new Date((date.getTime() + pre_date.getTime()) / 2);
            let midY = (dx[i - 1].orange + dx[i].green) / 2;

            dx.splice(i, 0, {
              lab_id: dx[i].lab_id,
              lab_dt: midX,
              cpt_id: dx[i].cpt_id,
              range_low: dx[i].range_low,
              range_high: dx[i].range_high,
              unit: dx[i].unit,
              filename: dx[i].filename,
              client_id: dx[i].client_id,
              value:midY,
              green: midY,
              orange: midY,
            });
            i = i + 1;
          }

        if (i > 0)
          if (!dx[i].green && !dx[i - 1].orange) {
            let date = new Date(dx[i].lab_dt);
            let pre_date = new Date(dx[i - 1].lab_dt);
            let midX = new Date((date.getTime() + pre_date.getTime()) / 2);
            let midY = (dx[i - 1].green + dx[i].orange) / 2;

            dx.splice(i, 0, {
              lab_id: dx[i].lab_id,
              lab_dt: midX,
              cpt_id: dx[i].cpt_id,
              range_low: dx[i].range_low,
              range_high: dx[i].range_high,
              unit: dx[i].unit,
              filename: dx[i].filename,
              client_id: dx[i].client_id,
              value:midY,
              green: midY,
              orange: midY,
            });
            i = i + 1;
          }
      }
      setgraphData(dx);
    }
  }, [data]);
  
  return (
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
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={(v) => moment(v?.lab_dt).format("YYYY")} /> 
      <YAxis
        type="number"
        domain={[range?.low - middle * 0.2, range?.high + middle * 0.2]}
        interval={0} 
        ticks={scaling}
        tick={{ stroke: "grey", strokeWidth: 0.5 }} 
      />
      <Tooltip content={<CustomTooltip />} /> 
      <ReferenceLine
        y={range?.high + middle * 0.05}
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
        y={range?.low - middle * 0.05}
        label={<ReferenceLabel value="Conventional range" fill="#477fc9" />}
        stroke="#477fc9"
      />
      <Line strokeWidth={2} type="monotone" dataKey={"orange"} fill="orange" stroke="orange" />
      <Line strokeWidth={2} type="monotone" dataKey={"green"} fill="green" stroke="green" />
    </LineChart>
  );
};

Graph.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    lab_dt: PropTypes.string,
    filename: PropTypes.string,
    value: PropTypes.number,
  }),
  range: PropTypes.shape({
    high: PropTypes.number,
    low: PropTypes.number,
  }) || PropTypes.bool,
  graphSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

export default Graph;
