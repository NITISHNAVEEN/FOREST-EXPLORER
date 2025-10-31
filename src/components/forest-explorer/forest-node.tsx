"use client";

import Image from "next/image";
import { placeholderImages } from "@/lib/data";
import type { Role, TreeNode } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ArrowDown, HelpCircle, Users, CheckCircle, XCircle } from "lucide-react";

interface ForestNodeDisplayProps {
  node: TreeNode;
  role: Role;
  highlightedPath: string[];
}

export function ForestNodeDisplay({ node, role, highlightedPath }: ForestNodeDisplayProps) {
  const isHighlighted = node.pathId ? highlightedPath.includes(node.pathId) : false;

  const cardClasses = cn(
    "w-72 text-center transition-all duration-500 ease-in-out",
    isHighlighted ? 'animate-path-highlight border-primary' : 'border-dashed'
  );

  const NodeContent = () => (
    <>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-center gap-2 text-base font-semibold">
          {node.type === 'leaf' ? (
            <>
              {node.prediction === 'High Risk' || node.prediction === 'Fail' || node.prediction === 'Deny' ? <XCircle className="text-destructive"/> : <CheckCircle className="text-green-500" />}
              Prediction: {node.prediction}
            </>
          ) : (
            <>
              {node.feature}
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>This feature splits the data.</p>
                  <p className="font-bold">Importance: High</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-4 pt-0">
        {node.type === 'leaf' && node.image && placeholderImages[node.image] && (
            <Image
              src={placeholderImages[node.image].imageUrl}
              alt={placeholderImages[node.image].description}
              data-ai-hint={placeholderImages[node.image].imageHint}
              width={100}
              height={75}
              className="rounded-md mb-2 object-cover"
            />
        )}
        {node.type === 'leaf' && node.decision && <p className="text-sm text-muted-foreground">{node.decision}</p>}
      </CardContent>
      <CardFooter className="flex justify-center text-xs text-muted-foreground p-2 pt-0">
        <Users className="h-3 w-3 mr-1" /> {node.samples} Samples
      </CardFooter>
    </>
  );

  return (
    <li>
      <Card className={cardClasses}>
        <NodeContent />
      </Card>
      {node.children && node.children.length > 0 && (
        <>
          <div className="my-2 flex justify-center">
            <ArrowDown className="h-6 w-6 text-muted-foreground/50" />
          </div>
          <div className="relative">
            {/* Drawing lines would be complex; using horizontal layout instead */}
            <ul className="flex items-start justify-center gap-4">
              {node.children.map((child) => (
                <ForestNodeDisplay key={child.id} node={child} role={role} highlightedPath={highlightedPath} />
              ))}
            </ul>
          </div>
        </>
      )}
    </li>
  );
}
