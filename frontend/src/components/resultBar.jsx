import React from "react";
import { BarChart, Bar, Cell, XAxis, ResponsiveContainer } from "recharts";
import { useMediaQuery } from "react-responsive";

export default function ResultBar({ halls, dataKey, barSize }) {
  const isScrollable = useMediaQuery({
    maxWidth: 959
  });

  const mate10Potrait = useMediaQuery({
    minWidth: 360,
    maxWidth: 360,
    minHeight: 570,
    maxHeight: 575,
    orientation: "portrait"
  });
  const mate10Landscape = useMediaQuery({
    minWidth: 565,
    maxWidth: 570,
    orientation: "landscape"
  });
  const isIphoneXLandscape = useMediaQuery({
    minWidth: 810,
    maxWidth: 820,
    orientation: "landscape"
  });
  // const isIpadPotrait = useMediaQuery({
  //   minWidth: 760,
  //   maxWidth: 770,
  //   orientation: "portrait"
  // });
  const upLg = useMediaQuery({
    minWidth: 1280
  });
  const md = useMediaQuery({
    minWidth: 960,
    maxWidth: 1279
  });

  let multiplier = 25;
  if (mate10Potrait) {
    multiplier = 17;
  } else if (mate10Landscape) {
    multiplier = 20;
  } else if (md) {
    multiplier = 30;
  } else if (upLg) {
    multiplier = 35;
  }

  let width = barSize * 30;
  if (isIphoneXLandscape) width = barSize * 32;
  // if (isIpadPotrait) width = barSize * 35;

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
      {!isScrollable && (
        <ResponsiveContainer height={barSize * multiplier}>
          <BarChart
            data={halls}
            margin={{ top: 20 }}
            barCategoryGap="0"
            style={{ width: "100%" }}
          >
            <XAxis
              dataKey="abbreviation"
              axisLine={false}
              tickLine={false}
              fontFamily={"TheNextFont"}
              tick={{ fill: "white" }}
              interval={0}
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
      {isScrollable && (
        <BarChart
          height={barSize * multiplier}
          width={width}
          data={halls}
          margin={{ top: 20 }}
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
