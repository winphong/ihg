import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  ResponsiveContainer,
  YAxis,
  LabelList,
} from "recharts";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function ResultBarHorizontal({ halls }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <React.Fragment>
      <ResponsiveContainer height={isMobile ? 300 : 600}>
        <BarChart
          data={halls}
          barCategoryGap={0}
          layout="vertical"
          margin={{ right: 50 }}
        >
          <YAxis
            dataKey={isMobile ? "abbreviation" : "name"}
            type={"category"}
            axisLine={false}
            tickLine={false}
            fontSize={isMobile ? 13 : 18}
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
              fontSize={isMobile ? 11 : 16}
              fill="#958F87"
              fontWeight={900}
              strokeWidth={0}
              dx={10}
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
    </React.Fragment>
  );
}
