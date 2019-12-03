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
  const barSize = 20;

  return (
    <ResponsiveContainer height={barSize * 20}>
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
          textAnchor="end"
          dx={-10}
          width={335}
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
          barSize={barSize}
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
