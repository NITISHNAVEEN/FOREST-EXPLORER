"use client";

import { useState } from "react";
import { getExplanation } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Wand2 } from "lucide-react";
import type { Role, DataSet } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface ExplanationSectionProps {
  role: Role;
  dataset: DataSet;
}

export function ExplanationSection({ role, dataset }: ExplanationSectionProps) {
  const [explanation, setExplanation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateExplanation = async () => {
    setIsLoading(true);
    setError(null);
    setExplanation("");

    const predictionDetails = `
      The Random Forest model was used to make a prediction for a ${role.name}.
      The dataset is for ${dataset.name}.
      The sample data point being considered has the following features: ${JSON.stringify(dataset.sampleDataPoint)}.
      The final (simulated) prediction was 'Positive'.
      ${role.predictionContext}
    `;

    const result = await getExplanation({
      role: role.id,
      predictionDetails: predictionDetails,
    });

    if ("error" in result) {
      setError(result.error);
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      setExplanation(result.explanation);
    }

    setIsLoading(false);
  };

  return (
    <section id="explanation" className="scroll-m-20">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
                <CardTitle className="font-headline text-2xl">How it Works</CardTitle>
                <CardDescription>A step-by-step explanation tailored to you.</CardDescription>
            </div>
            <Button onClick={handleGenerateExplanation} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Explanation
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Generation Failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {isLoading && (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="h-4 w-1/4 rounded-full bg-muted animate-pulse"></div>
                        <div className="h-4 w-full rounded-full bg-muted animate-pulse"></div>
                        <div className="h-4 w-3/4 rounded-full bg-muted animate-pulse"></div>
                    </div>
                     <div className="space-y-2">
                        <div className="h-4 w-1/3 rounded-full bg-muted animate-pulse"></div>
                        <div className="h-4 w-full rounded-full bg-muted animate-pulse"></div>
                    </div>
                </div>
            )}
          {explanation && (
            <div className="prose prose-sm max-w-none text-foreground">
              {explanation.split('\n').map((paragraph, index) => (
                paragraph.trim() && <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}
          {!isLoading && !explanation && !error && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Click the button to generate a personalized explanation.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
