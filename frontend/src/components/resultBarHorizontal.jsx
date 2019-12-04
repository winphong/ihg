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
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function ResultBarHorizontal({ halls }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
    </React.Fragment>
  );
}

const useStyles = makeStyles({});
