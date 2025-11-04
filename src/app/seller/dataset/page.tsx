
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, BrainCircuit, TestTube2, GitMerge, FileJson } from 'lucide-react';
import sellerData from '@/lib/seller-data.json';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function DatasetPage() {
  const trainingData = sellerData.slice(0, 10);
  const testingData = sellerData.slice(10);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex items-center h-16 px-4 border-b bg-primary/10 backdrop-blur-sm">
        <Link href="/seller">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="ml-4 text-xl font-semibold">
          Customer Purchase Dataset
        </h1>
      </header>
      <main className="flex-1 p-4 md:p-10">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Customer Data</CardTitle>
               <CardDescription>
                This is the complete dataset used to train and test our prediction model.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Age</TableHead>
                    <TableHead>Income</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Credit Rating</TableHead>
                    <TableHead className="text-right">Buys Computer?</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sellerData.map((data, index) => (
                    <TableRow key={index} className={cn({'bg-blue-50 dark:bg-blue-900/20': index >= 10})}>
                      <TableCell className="capitalize">{data.age.replace('_', ' ')}</TableCell>
                      <TableCell className="capitalize">{data.income}</TableCell>
                      <TableCell className="capitalize">{data.student}</TableCell>
                      <TableCell className="capitalize">{data.credit_rating}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          className={cn('capitalize', {
                            'bg-destructive/80 text-destructive-foreground':
                              data.buys_computer === 'no',
                            'bg-green-500/80 text-white':
                              data.buys_computer === 'yes',
                          })}
                        >
                          {data.buys_computer}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

           <Separator className="my-8" />

           <Card>
            <CardHeader>
              <CardTitle>How the Model is Trained</CardTitle>
              <CardDescription>
                The model learns from customer data using a process called "supervised learning".
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold flex items-center mb-2">
                  <GitMerge className="w-5 h-5 mr-2 text-primary" />
                  Step 1: Train-Test Split
                </h3>
                <p className="text-muted-foreground mb-4">
                  The dataset is split into two parts: a larger <strong>Training Set</strong> to teach the model, and a smaller <strong>Testing Set</strong> to evaluate its accuracy. The blue rows in the table above represent the testing data.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                    <div className="flex items-center gap-2">
                       <FileJson className="w-8 h-8 text-muted-foreground" />
                       <div>
                         <p className="font-bold">Full Dataset</p>
                         <p className="text-sm">{sellerData.length} records</p>
                       </div>
                    </div>
                    <div className="text-primary font-bold text-2xl transform md:rotate-0 rotate-90">&rarr;</div>
                     <div className="flex items-center gap-4">
                        <div className="p-4 border rounded-lg bg-card">
                          <BrainCircuit className="w-8 h-8 mx-auto text-blue-500" />
                          <p className="font-bold mt-2">Training Set</p>
                          <p className="text-sm">{trainingData.length} records</p>
                        </div>
                        <div className="p-4 border rounded-lg bg-card">
                          <TestTube2 className="w-8 h-8 mx-auto text-green-500" />
                          <p className="font-bold mt-2">Testing Set</p>
                          <p className="text-sm">{testingData.length} records</p>
                        </div>
                     </div>
                </div>
              </div>

              <Separator />

              <div>
                 <h3 className="text-lg font-semibold flex items-center mb-2">
                  <BrainCircuit className="w-5 h-5 mr-2 text-primary" />
                  Step 2: Training the Random Forest
                </h3>
                <p className="text-muted-foreground mb-4">
                  The model is a <strong>Random Forest</strong>, which is a collection of many individual Decision Trees. Each tree is trained on a random subset of the training data and features (like age, income, etc.). When making a prediction, all trees "vote", and the majority outcome becomes the final prediction. This makes the model more accurate and robust for predicting customer behavior.
                </p>
                <div className="flex items-center justify-center flex-wrap gap-4">
                    <div className="text-center p-2 border rounded-lg bg-card w-24">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M12 10v4M18 12h-4M10 12H6M18 6l-2 2M6 18l-2 2M18 18l-2-2M6 6l-2-2"/></svg>
                        <p className="text-xs mt-1">Tree 1</p>
                    </div>
                     <div className="text-center p-2 border rounded-lg bg-card w-24">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M12 10v4M18 12h-4M10 12H6M18 6l-2 2M6 18l-2 2M18 18l-2-2M6 6l-2-2"/></svg>
                        <p className="text-xs mt-1">Tree 2</p>
                    </div>
                     <div className="text-center p-2 border rounded-lg bg-card w-24">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M12 10v4M18 12h-4M10 12H6M18 6l-2 2M6 18l-2 2M18 18l-2-2M6 6l-2-2"/></svg>
                        <p className="text-xs mt-1">Tree 3</p>
                    </div>
                    <div className="p-2 w-24 text-center">
                        <p className="font-bold text-2xl">...</p>
                        <p className="text-xs mt-1">Many Trees</p>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <Link href="/seller/predict">
              <Button size="lg">
                Explore Decision Trees & Predict Customer Purchase
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
