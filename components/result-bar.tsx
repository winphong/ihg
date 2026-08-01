"use client";

import { BarChart, Bar, Cell, XAxis, LabelList, ResponsiveContainer } from "recharts";
import type { Hall } from "@/lib/api";

export function ResultBar({
  halls,
  dataKey,
  barSize = 20,
  height = 220,
}: {
  halls: Hall[];
  dataKey: "malePoint" | "femalePoint" | "totalPoint";
  barSize?: number;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={halls} margin={{ top: 20 }} barCategoryGap={0}>
        <XAxis
          dataKey="abbreviation"
          axisLine={false}
          tickLine={false}
          interval={0}
          fontFamily="TheNextFont"
          tick={{ fill: "white" }}
        />
        <Bar dataKey={dataKey} barSize={barSize}>
          <LabelList dataKey={dataKey} position="top" fill="white" fontWeight={900} />
          {halls.map(({ colourCode }, index) => (
            <Cell
              key={index}
              fill={colourCode}
              stroke={colourCode === "#ffffff" ? "#252527" : undefined}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
