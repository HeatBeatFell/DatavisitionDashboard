"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useIsMobile } from '@h/use-mobile';

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const chartData = [
  { date: "2024-04-01", program: 222, practice: 150 },
  { date: "2024-04-02", program: 97, practice: 180 },
  { date: "2024-04-03", program: 167, practice: 120 },
  { date: "2024-04-04", program: 242, practice: 260 },
  { date: "2024-04-05", program: 373, practice: 290 },
  { date: "2024-04-06", program: 301, practice: 340 },
  { date: "2024-04-07", program: 245, practice: 180 },
  { date: "2024-04-08", program: 409, practice: 320 },
  { date: "2024-04-09", program: 59, practice: 110 },
  { date: "2024-04-10", program: 261, practice: 190 },
  { date: "2024-04-11", program: 327, practice: 350 },
  { date: "2024-04-12", program: 292, practice: 210 },
  { date: "2024-04-13", program: 342, practice: 380 },
  { date: "2024-04-14", program: 137, practice: 220 },
  { date: "2024-04-15", program: 120, practice: 170 },
  { date: "2024-04-16", program: 138, practice: 190 },
  { date: "2024-04-17", program: 446, practice: 360 },
  { date: "2024-04-18", program: 364, practice: 410 },
  { date: "2024-04-19", program: 243, practice: 180 },
  { date: "2024-04-20", program: 89, practice: 150 },
  { date: "2024-04-21", program: 137, practice: 200 },
  { date: "2024-04-22", program: 224, practice: 170 },
  { date: "2024-04-23", program: 138, practice: 230 },
  { date: "2024-04-24", program: 387, practice: 290 },
  { date: "2024-04-25", program: 215, practice: 250 },
  { date: "2024-04-26", program: 75, practice: 130 },
  { date: "2024-04-27", program: 383, practice: 420 },
  { date: "2024-04-28", program: 122, practice: 180 },
  { date: "2024-04-29", program: 315, practice: 240 },
  { date: "2024-04-30", program: 454, practice: 380 },
  { date: "2024-05-01", program: 165, practice: 220 },
  { date: "2024-05-02", program: 293, practice: 310 },
  { date: "2024-05-03", program: 247, practice: 190 },
  { date: "2024-05-04", program: 385, practice: 420 },
  { date: "2024-05-05", program: 481, practice: 390 },
  { date: "2024-05-06", program: 498, practice: 520 },
  { date: "2024-05-07", program: 388, practice: 300 },
  { date: "2024-05-08", program: 149, practice: 210 },
  { date: "2024-05-09", program: 227, practice: 180 },
  { date: "2024-05-10", program: 293, practice: 330 },
  { date: "2024-05-11", program: 335, practice: 270 },
  { date: "2024-05-12", program: 197, practice: 240 },
  { date: "2024-05-13", program: 197, practice: 160 },
  { date: "2024-05-14", program: 448, practice: 490 },
  { date: "2024-05-15", program: 473, practice: 380 },
  { date: "2024-05-16", program: 338, practice: 400 },
  { date: "2024-05-17", program: 499, practice: 420 },
  { date: "2024-05-18", program: 315, practice: 350 },
  { date: "2024-05-19", program: 235, practice: 180 },
  { date: "2024-05-20", program: 177, practice: 230 },
  { date: "2024-05-21", program: 82, practice: 140 },
  { date: "2024-05-22", program: 81, practice: 120 },
  { date: "2024-05-23", program: 252, practice: 290 },
  { date: "2024-05-24", program: 294, practice: 220 },
  { date: "2024-05-25", program: 201, practice: 250 },
  { date: "2024-05-26", program: 213, practice: 170 },
  { date: "2024-05-27", program: 420, practice: 460 },
  { date: "2024-05-28", program: 233, practice: 190 },
  { date: "2024-05-29", program: 78, practice: 130 },
  { date: "2024-05-30", program: 340, practice: 280 },
  { date: "2024-05-31", program: 178, practice: 230 },
  { date: "2024-06-01", program: 178, practice: 200 },
  { date: "2024-06-02", program: 470, practice: 410 },
  { date: "2024-06-03", program: 103, practice: 160 },
  { date: "2024-06-04", program: 439, practice: 380 },
  { date: "2024-06-05", program: 88, practice: 140 },
  { date: "2024-06-06", program: 294, practice: 250 },
  { date: "2024-06-07", program: 323, practice: 370 },
  { date: "2024-06-08", program: 385, practice: 320 },
  { date: "2024-06-09", program: 438, practice: 480 },
  { date: "2024-06-10", program: 155, practice: 200 },
  { date: "2024-06-11", program: 92, practice: 150 },
  { date: "2024-06-12", program: 492, practice: 420 },
  { date: "2024-06-13", program: 81, practice: 130 },
  { date: "2024-06-14", program: 426, practice: 380 },
  { date: "2024-06-15", program: 307, practice: 350 },
  { date: "2024-06-16", program: 371, practice: 310 },
  { date: "2024-06-17", program: 475, practice: 520 },
  { date: "2024-06-18", program: 107, practice: 170 },
  { date: "2024-06-19", program: 341, practice: 290 },
  { date: "2024-06-20", program: 408, practice: 450 },
  { date: "2024-06-21", program: 169, practice: 210 },
  { date: "2024-06-22", program: 317, practice: 270 },
  { date: "2024-06-23", program: 480, practice: 530 },
  { date: "2024-06-24", program: 132, practice: 180 },
  { date: "2024-06-25", program: 141, practice: 190 },
  { date: "2024-06-26", program: 434, practice: 380 },
  { date: "2024-06-27", program: 448, practice: 490 },
  { date: "2024-06-28", program: 149, practice: 200 },
  { date: "2024-06-29", program: 103, practice: 160 },
  { date: "2024-06-30", program: 446, practice: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  program: {
    label: "program",
    color: "var(--chart-2)",
  },
  practice: {
    label: "practice",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function TotalProductionCard() {
  const ispractice = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (ispractice) {
      setTimeRange("7d");
    }
  }, [ispractice]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card m-5 mt-0 mb-0 ">
      <CardHeader>
        <CardTitle>Total Production</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">Total for the last 3 months</span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup type="single" value={timeRange} onValueChange={setTimeRange} variant="outline" className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex">
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden" size="sm" aria-label="Select a value">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-130 w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillprogram" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillpractice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                return value.toLocaleString("en-US", {
                  notation: "compact",
                  compactDisplay: "short",
                });
              }}
            />

            <Area dataKey="practice" type="natural" fill="url(#fillpractice)" stroke="var(--primary)" stackId="a" />
            <Area dataKey="program" type="natural" fill="url(#fillprogram)" stroke="var(--chart-2)" stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
