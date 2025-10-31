"use client";

import { getForestForRole, getHighlightedPath } from "@/lib/data";
import type { Role, DataSet, RandomForest } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ForestNodeDisplay } from "./forest-node";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";

interface VisualizationProps {
  role: Role;
  dataset: DataSet;
  isSimulating: boolean;
  numTrees: number;
  maxDepth: number;
}

export function Visualization({ role, dataset, isSimulating, numTrees, maxDepth }: VisualizationProps) {
  const fullForest: RandomForest = getForestForRole(role.id, maxDepth);
  const forest = fullForest.slice(0, numTrees);
  const highlightedPath = isSimulating ? getHighlightedPath(role.id) : [];

  const DataPoint = () => (
    <Card className={cn(
        "mb-6 w-80 mx-auto transition-all duration-500",
        isSimulating ? "shadow-primary/30 shadow-2xl scale-105" : "shadow-md"
    )}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <role.dataPointIcon className="h-6 w-6 text-primary" />
          <span>Sample Data Point</span>
        </CardTitle>
        <CardDescription>An example to be classified.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 text-sm">
        {Object.entries(dataset.sampleDataPoint).map(([key, value]) => (
          <div key={key}>
            <p className="font-medium text-muted-foreground">{key}</p>
            <p className="font-semibold">{value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <TooltipProvider>
      <div className="w-full">
        <DataPoint />
        
        <div className="relative flex justify-center mb-4">
             <ArrowDown className={cn("h-8 w-8 text-muted-foreground transition-all duration-500", isSimulating && "text-primary animate-bounce")} />
        </div>

        <ScrollArea className="w-full whitespace-nowrap rounded-lg border">
          <div className="flex w-max space-x-6 p-4">
            {forest.map((tree, index) => (
              <div key={tree.id} className="flex-shrink-0">
                <Card className="border-none shadow-none bg-transparent">
                  <CardHeader className="p-2 pt-0">
                    <CardTitle className="text-center text-lg font-headline">Tree {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ul className="flex flex-col items-center space-y-2">
                       <ForestNodeDisplay node={tree.root} role={role} highlightedPath={highlightedPath} />
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="mt-6 flex flex-col items-center justify-center gap-2">
            <ArrowDown className={cn("h-8 w-8 text-muted-foreground transition-all duration-500", isSimulating && "text-primary animate-bounce")} />
            <Card className={cn(
                "transition-all duration-500",
                isSimulating ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/30 scale-105" : "bg-card"
            )}>
                <CardContent className="p-4">
                    <p className="text-lg font-bold font-headline">
                        Final Prediction: {isSimulating ? "Positive" : "..."}
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
