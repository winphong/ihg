import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  ResponsiveContainer,
  YAxis,
  LabelList
} from "recharts";
import { useMediaQuery } from "react-responsive";

export default function ResultBarHorizontal({ halls }) {
  const isMobile = useMediaQuery({ query: "(max-device-width: 959px)" });

  return (
    <React.Fragment>
      <ResponsiveContainer height={isMobile ? 300 : 600}>
        <BarChart
          data={halls}
          barCategoryGap={0}
          layout="vertical"
          margin={{ right: isMobile ? 50 : 100 }}
        >
          <YAxis
            dataKey={isMobile ? "abbreviation" : "name"}
            type={"category"}
            axisLine={false}
            tickLine={false}
            fontSize={isMobile ? 15 : 25}
            fontFamily={"TheNextFont"}
            tick={{ fill: "black" }}
            textAnchor={"end"}
            dx={isMobile ? 0 : -10}
            width={isMobile ? 70 : 400}
          />
          <XAxis
            hide
            dataKey="totalPoint"
            type="number"
            axisLine={false}
            tickLine={false}
          />
          <Bar dataKey="totalPoint" barSize={isMobile ? 12 : 15}>
            <LabelList
              dataKey="totalPoint"
              position="right"
              fontSize={isMobile ? 13 : 25}
              fill="#958F87"
              fontWeight={900}
              strokeWidth={0}
            />

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
      {/* {!isMobile && (
        <ResponsiveContainer height={600}>
          <BarChart
            data={halls}
            barCategoryGap={0}
            layout="vertical"
            margin={{ right: 100 }}
          >
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              fontSize={25}
              fontFamily="TheNextFont"
              tick={{ fill: "black" }}
              textAnchor="start"
              dx={-350}
              width={400}
            />
            <XAxis
              hide
              dataKey="totalPoint"
              type="number"
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="totalPoint" barSize={15}>
              <LabelList
                dataKey="totalPoint"
                position="right"
                fontSize={25}
                fill="#958F87"
                fontWeight={900}
                strokeWidth={0}
              />

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
      )} */}
    </React.Fragment>
  );
}

const useStyles = makeStyles({});
