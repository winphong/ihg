import React from "react";
import { BarChart, Bar, Cell, XAxis, ResponsiveContainer } from "recharts";
import { useMediaQuery } from "react-responsive";

export default function ResultBar({ halls, dataKey, barSize }) {
  const isScrollable = useMediaQuery({
    maxWidth: 959
  });
  const isIphoneXLandscape = useMediaQuery({
    minWidth: 810,
    maxWidth: 820,
    orientation: "landscape"
  });
  const isIpadPotrait = useMediaQuery({
    minWidth: 760,
    maxWidth: 770,
    orientation: "portrait"
  });

  let width = barSize * 30;
  // if (isIphoneXLandscape) width = barSize * 32;
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
              tick={{ fill: "grey" }}
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
          height={barSize * 40}
          width={width}
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
            tick={{ fill: "grey" }}
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
