"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { useAnalytics } from "@/hooks/use-analytics";
import { useParams } from "next/navigation";

const chartConfig = {
  activity: {
    label: "Activity",
    color: "hsl(var(--chart-1))",
  },
};

const Chart = () => {
  const params = useParams();
  const { data: analytics, isLoading } = useAnalytics(params.slug as string);

  if (isLoading) {
    return (
      <Card className="border-none p-0">
        <CardContent className="p-0">
          <ResponsiveContainer height={300} width={"100%"}>
            <AreaChart
              data={Array.from({ length: 7 }, (_, i) => ({
                date: `Day ${i + 1}`,
                activity: Math.random() * 50 + 25,
              }))}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Area
                dataKey="activity"
                type="natural"
                fill="hsl(var(--muted))"
                fillOpacity={0.4}
                stroke="hsl(var(--muted))"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none p-0">
      <CardContent className="p-0">
        <ResponsiveContainer height={300} width={"100%"}>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={analytics?.data?.chartData || []}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="activity"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
