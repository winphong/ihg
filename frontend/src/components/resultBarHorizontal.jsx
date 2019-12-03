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

export default function ResultBarHorizontal({ halls }) {
  return (
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

        <Bar
          dataKey="totalPoint"
          barSize={15}
          //   label={renderCustomizedLabel}
        >
          <LabelList
            dataKey="totalPoint"
            position="right"
            fontSize={25}
            fill="#958F87"
            fontWeight={900}
            // fillOpacity={0.2}
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
  );
}

const useStyles = makeStyles({});
