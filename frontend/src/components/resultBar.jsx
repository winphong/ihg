import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BarChart, Bar, Cell, XAxis, ResponsiveContainer } from "recharts";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function ResultBar({ halls, dataKey, barSize }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
            <XAxis
              dataKey="abbreviation"
              axisLine={false}
              tickLine={false}
              fontFamily={"TheNextFont"}
              tick={{ fill: "white" }}
            />
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
        <BarChart
          height={barSize * 40}
          width={barSize * 30}
          data={halls}
          margin={{ top: 30 }}
          barCategoryGap="0"
          style={{ width: "100%" }}
        >
          <XAxis
            dataKey="abbreviation"
            axisLine={false}
            tickLine={false}
            fontFamily={"TheNextFont"}
            tick={{ fill: "white" }}
          />
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
      )}
    </React.Fragment>
  );
}

const useStyles = makeStyles({});
