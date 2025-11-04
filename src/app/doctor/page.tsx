'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, HeartPulse, BrainCircuit, Database } from 'lucide-react';

export default function DoctorPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex items-center h-16 px-4 border-b bg-header-background/80 backdrop-blur-sm">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="ml-4 text-xl font-semibold">Doctor Portal</h1>
      </header>
      <main className="flex-1 p-4 md:p-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div
            className={`transition-all duration-1000 ease-out ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h2 className="text-3xl font-bold tracking-tight text-center md:text-4xl text-foreground">
              Do you face difficulty in predicting whether a patient is prone to
              heart attack or not?
            </h2>
            <p className="mt-4 text-lg text-center text-muted-foreground">
              We have the solution.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 ease-out delay-500 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Card className="w-full shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <BrainCircuit className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Random Forest for Your Aid
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Use our tool to predict heart attack risk based on patient
                  vitals, leveraging the power of the Random Forest algorithm
                  and multiple decision trees.
                </CardDescription>
                <div className="flex justify-end mt-6">
                  <Link href="/doctor/predict">
                    <Button>
                      <HeartPulse className="w-4 h-4 mr-2" />
                      Predict Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Database className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    View Synthetic Dataset
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Explore the synthetic patient data that our Random Forest
                  model uses to make predictions.
                </CardDescription>
                <div className="flex justify-end mt-6">
                  <Link href="/doctor/dataset">
                    <Button variant="outline">
                      <Database className="w-4 h-4 mr-2" />
                      View Dataset
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
