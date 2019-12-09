import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BarChart, Bar, Cell, XAxis, ResponsiveContainer } from "recharts";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function ResultBar({ halls, dataKey, barSize }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
    <React.Fragment>
      {!isMobile && (
        <ResponsiveContainer height={barSize * 40}>
          <BarChart
            data={halls}
            margin={{ top: 30 }}
            barCategoryGap="0"
            style={{ width: "100%" }}
          >
            <XAxis dataKey="abbreviation" axisLine={false} tickLine={false} />
            <Bar
              dataKey={dataKey}
              label={renderCustomizedLabel}
              barSize={barSize}
            >
              {halls.map(({ colourCode }, index) => {
                return (
                  <Cell
                    key={index}
                    fill={colourCode}
                    stroke={colourCode === "#ffffff" ? "#252527" : ""}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
      {isMobile && (
        <ResponsiveContainer height={barSize * 40} width={barSize * 30}>
          <BarChart
            data={halls}
            margin={{ top: 30 }}
            barCategoryGap="0"
            style={{ width: "100%" }}
          >
            <XAxis dataKey="abbreviation" axisLine={false} tickLine={false} />
            <Bar
              dataKey={dataKey}
              label={renderCustomizedLabel}
              barSize={barSize}
            >
              {halls.map(({ colourCode }, index) => {
                return (
                  <Cell
                    key={index}
                    fill={colourCode}
                    stroke={colourCode === "#ffffff" ? "#252527" : ""}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </React.Fragment>
  );
}

const useStyles = makeStyles({});
