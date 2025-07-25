"use client";
import { Warehouse, TrendingUp } from "lucide-react";

import { Badge } from "./ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

export function CacheCard() {
  const data = [
    {
      name: " Chained Cache #1",
      value: "1,250.00",
    },
    {
      name: " Chained Cache #2",
      value: "45,678",
    },
  ];

  return (
    <div className="col-span-2 grid grid-cols-2 gap-6">
      {data.map((item, index) => {
        return (
          <Card key={index}>
            <CardHeader>
              <CardDescription>Current Cache of Front Segment</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{item.value}</CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <Warehouse />
                  {item.name}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start  text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Trend for the month
                <TrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">Current time real-time data</div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
