"use client";

import { BarChart, Bar, Cell, XAxis, YAxis, LabelList, ResponsiveContainer } from "recharts";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Hall } from "@/lib/api";

export function ResultBarHorizontal({ halls }: { halls: Hall[] }) {
  const isMobile = useMediaQuery("(max-width: 499px)");

  return (
    <ResponsiveContainer height={isMobile ? 300 : 600}>
      <BarChart data={halls} barCategoryGap={0} layout="vertical" margin={{ right: 50 }}>
        <YAxis
          dataKey={isMobile ? "abbreviation" : "name"}
          type="category"
          axisLine={false}
          tickLine={false}
          fontSize={isMobile ? 13 : 18}
          fontFamily="TheNextFont"
          tick={{ fill: "black" }}
          textAnchor="end"
          dx={isMobile ? 0 : -10}
          width={isMobile ? 70 : 400}
        />
        <XAxis hide dataKey="totalPoint" type="number" axisLine={false} tickLine={false} />
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
          {halls.map(({ colourCode }, index) => (
            <Cell key={index} fill={colourCode} stroke={colourCode === "#ffffff" ? "#252527" : undefined} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
