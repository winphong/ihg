import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BarChart, Bar, Cell, XAxis, ResponsiveContainer } from "recharts";

export default function ResultBar({ halls, dataKey, barSize }) {
  const classes = useStyles();

  const renderCustomizedLabel = ({ x, y, fill, value }) => {
    return (
      <text
        x={x}
        y={y}
        dx={barSize / 2}
        dy={-8}
        fill="white"
        textAnchor="middle"
      >
        {value}
      </text>
    );
  };

  return (
    <ResponsiveContainer height={barSize * 40}>
      <BarChart
        data={halls}
        margin={{ top: 30 }}
        barCategoryGap="0"
        style={{ width: "100%" }}
      >
        <XAxis dataKey="abbreviation" axisLine={false} tickLine={false} />
        <Bar dataKey={dataKey} label={renderCustomizedLabel} barSize={barSize}>
          {halls.map((entry, index) => {
            return (
              <Cell
                key={index}
                style={{
                  fontWeight: "bold",
                  fontSize: 15
                }}
                fill={entry.colourCode}
              />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

const useStyles = makeStyles({});
