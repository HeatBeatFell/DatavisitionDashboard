"use client";

import { Cpu, Hash, MoveHorizontal, MoveVertical, AlertTriangle, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@radix-ui/themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { useScannerData } from "@h/use-scanner";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function ScannerCards() {
  // const { data:{ Batch, UPID, Length, Width, Thickness, Consistency, LastDate } , isLoading } = useScannerData();
  const [isConcordance, setIsConcordance] = useState(true);
  const t = useTranslations("scannerCard");

  // useEffect(() => {
  //   if (Batch == localStorage.getItem("BatchId")) {
  //     setIsConcordance(true);
  //   } else {
  //     localStorage.setItem("BatchId", Batch);
  //     setIsConcordance(false);
  //   }
  // });

  const Length = 2200;
  const Width = 1300;
  const Thickness = 20;
  const Batch = "BH20240601001";
  const UPID = "UPID1234567890";
  const Date = "2024-06-10 14:30:00";
  const LastDate = "2024-06-10 14:30:00";
  const isLoading = false;

  const dimensions: {
    name?: string;
    value: number | undefined;
    maxValue: number;
    percentage: number;
    unit: string;
    expected: string;
    color: "crimson" | "violet" | "orange";
    icon: JSX.Element;
  }[] = [
    {
      name: t("length"),
      value: Length,
      maxValue: 2800,
      percentage: Length ? (Length / 2800) * 100 : 10,
      unit: "mm",
      expected: "2800 ± 0.2mm",
      color: "crimson",
      icon: <MoveVertical className="w-8 h-8 text-muted-foreground" />,
    },
    {
      name: t("width"),
      value: Width,
      maxValue: 1400,
      percentage: Width ? (Width / 1400) * 100 : 10,
      unit: "mm",
      expected: "1400 ± 0.2mm",
      color: "violet",
      icon: <MoveHorizontal className="w-8 h-8 text-muted-foreground" />,
    },
    {
      name: t("Thicknes"),
      value: Thickness,
      maxValue: 80,
      percentage: Thickness ? (Thickness / 80) * 100 : 10,
      unit: "mm",
      expected: "80 ± 0.2mm",
      color: "orange",
      icon: <MoveHorizontal className="w-8 h-8 text-muted-foreground" />,
    },
  ];

  return (
    <Card className="col-span-4 border rounded-xl shadow-lg overflow-hidden pb-0">
      {!isConcordance && (
        <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center z-10 border-red-500 border-4 rounded-xl">
          <div className="bg-white p-6 rounded-xl shadow-2xl flex flex-col items-center gap-3 animate-pulse">
            <AlertTriangle className="w-12 h-12 text-yellow-500" strokeWidth={1.5} />
            <div className="text-2xl font-bold text-yellow-600">{t("Inconsistency in uploading batches!")}</div>
            <p className="text-center text-gray-700 max-w-md">{t("The scanned batch does not match the current batch number, please check the product batch information")}</p>
          </div>
        </div>
      )}

      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between items-start border-b ">
        <div>
          <CardTitle className="text-2xl font-bold flex items-center">
            <span>{t("Scanning Results")}</span>
          </CardTitle>
          <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm mt-2">
            <span className="font-medium">{t("Production Line")}</span>
            <span className="hidden sm:block">|</span>
            <span className="flex items-center gap-1">
              <span className="text-green-600 flex items-center">{t("Last Scan")}:</span>
              <span className="font-medium">{LastDate}</span>
            </span>
          </CardDescription>
        </div>

        <Badge variant="outline" className="px-3 py-1.5 text-sm shadow-sm">
          <Cpu className="w-4 h-4 mr-2 text-blue-600" />
          <span className="font-semibold">
            HomagChina CCT
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
          </span>
        </Badge>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <div className="space-y-10">
          <div className="flex flex-col sm:flex-row p-7 rounded-xl border shadow-sm sm:gap-8 bg-gray-50 dark:bg-gray-800">
            {Batch && (
              <div className="flex-1 gap-6 flex flex-col">
                <div className="text-xl font-medium  tracking-wider">{t("batch")}</div>
                <div className="flex items-center gap-3">
                  <Hash className="w-10 h-10 text-(--primary) mr-2" />
                  {isLoading ? <Skeleton className="w-24 h-8 rounded animate-pulse" /> : <span className="font-mono text-xl sm:text-5xl font-bold tracking-tight">{Batch}</span>}
                </div>
              </div>
            )}
            {Batch && <div className="hidden sm:block border-2 h-25 self-center"></div>}
            <div className="flex-1 gap-6 flex flex-col">
              <div className="text-xl font-medium tracking-wider">{t("Scanner Code")}</div>
              <div className="flex items-center gap-3">
                <Code className="w-10 h-10  text-(--primary) mr-2" />
                {isLoading ? <Skeleton className="w-32 h-8 rounded animate-pulse" /> : <span className="font-mono text-xl sm:text-5xl font-bold tracking-tight">{UPID}</span>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dimensions.map((item, index) => (
              <div key={index} className="flex flex-col gap-3 p-4 rounded-xl border transition-all duration-300 hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg">{item.icon}</div>
                    <span className="font-medium text-xl">{item.name}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mt-5">
                  {isLoading ? (
                    <Skeleton className="w-16 h-8 rounded animate-pulse" />
                  ) : (
                    <span className="text-5xl w-full font-bold text-center ">
                      {item.value} <span className="text-sm">{item.unit}</span>
                    </span>
                  )}
                </div>

                <div className="mt-10">
                  <div className="flex justify-between text-sm  mb-1">
                    <span>{t("Standard Scope")}</span>
                    <span>{item.expected}</span>
                  </div>
                  <Progress value={item.percentage} color={item.color} size="3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
