"use client";

import { Cpu, Hash, MoveHorizontal, MoveVertical, AlertTriangle, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useScannerData } from "@/hooks/use-scanner";
import { useEffect, useState } from "react";

export function ScannerCards() {
  const { data, isLoading } = useScannerData();
  const { Batch, UPID, Length, Width, Thickness, Consistency } = data;
  const [isConcordance,setIsConcordance] = useState(true);

  useEffect(() => {
    if (Consistency !== undefined) {
      setIsConcordance(Consistency ? true : false);
    }
  }, [Consistency]);

  useEffect(() => {
    if (!isConcordance) {
      const msg = new window.SpeechSynthesisUtterance("Warning: The current online part batch does not match the online part batch, please check.");
      msg.voice = window.speechSynthesis.getVoices().find((v) => v.name == "Google UK English Female");
      window.speechSynthesis.speak(msg);
    }
  }, [isConcordance]);

  const dimensions = [
    {
      name: "Length",
      value: Length,
      unit: "mm",
      expected: `${Length} ±"0.2mm"`,
      status: "success",
      tolerance: 0.05,
      icon: <MoveVertical className="w-8 h-8 text-muted-foreground" />,
    },
    {
      name: "Width",
      value: Width,
      unit: "mm",
      expected: `${Width} ±"0.2mm"`,
      status: "warning",
      tolerance: 0.15,
      icon: <MoveHorizontal className="w-8 h-8 text-muted-foreground" />,
    },
    {
      name: "Thickness",
      value: Thickness,
      unit: "mm",
      expected: `${Thickness} ±"0.2mm"`,
      status: "error",
      tolerance: 0.22,
      icon: <MoveHorizontal className="w-8 h-8 text-muted-foreground" />,
    },
  ];

  return (
    <Card className="col-span-4 border rounded-xl shadow-lg overflow-hidden pb-0">
      {!isConcordance && (
        <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center z-10 border-red-500 border-4 rounded-xl">
          <div className="bg-white p-6 rounded-xl shadow-2xl flex flex-col items-center gap-3 animate-pulse">
            <AlertTriangle className="w-12 h-12 text-yellow-500" strokeWidth={1.5} />
            <div className="text-2xl font-bold text-yellow-600">上线批次不一致!</div>
            <p className="text-center text-gray-700 max-w-md">扫描批次与当前批次号不一致，请检查产品批次信息</p>
          </div>
        </div>
      )}
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between items-start border-b ">
        <div>
          <CardTitle className="text-2xl font-bold flex items-center">
            <span>Scanning Results</span>
          </CardTitle>
          <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm mt-2">
            <span className="font-medium">Production Line</span>
            <span className="hidden sm:block">|</span>
            <span className="flex items-center gap-1">
              <span className="text-green-600 flex items-center">Last Scan:</span>
              <span className="font-medium">Today 14:23</span>
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
            <div className="flex-1 gap-6 flex flex-col">
              <div className="text-xl font-medium  tracking-wider">Batches</div>
              <div className="flex items-center gap-3">
                <Hash className="w-10 h-10 text-(--primary) mr-2" />
                {isLoading ? <Skeleton className="w-24 h-8 rounded animate-pulse" /> : <span className="font-mono text-xl sm:text-5xl font-bold tracking-tight">{Batch}</span>}
              </div>
            </div>

            <div className="hidden sm:block border-2 h-25 self-center"></div>
            <div className="flex-1 gap-6 flex flex-col">
              <div className="text-xl font-medium tracking-wider">Scanner Code</div>
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
                    <span className="text-3xl w-full font-bold text-center ">
                      {item.value} <span className="text-sm">{item.unit}</span>
                    </span>
                  )}
                </div>

                <div className="mt-10">
                  <div className="flex justify-between text-xs  mb-1">
                    <span>Standard Scope</span>
                    <span>{item.expected}</span>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{
                          width: item.status === "warning" ? "98%" : "100%",
                          backgroundColor: item.status === "success" ? "#10B981" : item.status === "warning" ? "#F59E0B" : "#EF4444",
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap justify-center"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
