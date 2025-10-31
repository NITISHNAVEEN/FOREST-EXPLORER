'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

export default function PredictPage() {
  const [bloodPressure, setBloodPressure] = useState('');
  const [cholesterol, setCholesterol] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Initialize state on the client to avoid hydration mismatch
    setBloodPressure('120/80');
    setCholesterol('200');
    setHeartRate('75');
    setBloodSugar('99');
  }, []);

  if (!isMounted) {
    // Render nothing on the server to avoid hydration mismatch
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-30 flex items-center h-16 px-4 border-b bg-background/80 backdrop-blur-sm">
        <Link href="/doctor">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="ml-4 text-xl font-semibold">
          Heart Attack Prediction
        </h1>
      </header>
      <main className="flex-1 p-4 md:p-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Patient Vitals Input
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Enter the patient's vitals to predict the risk of a heart attack.
            </p>
          </div>
          <div className="relative flex justify-center items-center" style={{minHeight: '600px'}}>
            <Image
              src="https://images.medicinenet.com/images/article/main_image/circulatory-system-pulmonary-hypertension-heart-illustration-rendering.jpg?output-quality=75"
              alt="Human Body"
              width={267}
              height={200}
              data-ai-hint="circulatory system"
              className="object-contain"
            />
            <div className="absolute top-0 right-0">
              <Card className="w-72 shadow-lg animate-path-highlight">
                <CardHeader>
                  <CardTitle>Blood Pressure</CardTitle>
                  <CardDescription>
                    Enter systolic/diastolic value.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="bp">Blood Pressure (mmHg)</Label>
                      <Input
                        id="bp"
                        value={bloodPressure}
                        onChange={(e) => setBloodPressure(e.target.value)}
                        placeholder="e.g. 120/80"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="absolute top-0 left-0">
              <Card className="w-72 shadow-lg">
                <CardHeader>
                  <CardTitle>Cholesterol</CardTitle>
                  <CardDescription>
                    Enter total cholesterol level.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="chol">Cholesterol (mg/dL)</Label>
                      <Input
                        id="chol"
                        value={cholesterol}
                        onChange={(e) => setCholesterol(e.target.value)}
                        placeholder="e.g. 200"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="absolute bottom-0 left-0">
              <Card className="w-72 shadow-lg">
                <CardHeader>
                  <CardTitle>Heart Rate</CardTitle>
                  <CardDescription>
                    Enter resting heart rate.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="hr">Heart Rate (bpm)</Label>
                      <Input
                        id="hr"
                        value={heartRate}
                        onChange={(e) => setHeartRate(e.target.value)}
                        placeholder="e.g. 75"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
             <div className="absolute bottom-0 right-0">
              <Card className="w-72 shadow-lg">
                <CardHeader>
                  <CardTitle>Blood Sugar</CardTitle>
                  <CardDescription>
                    Enter fasting blood sugar level.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="bs">Blood Sugar (mg/dL)</Label>
                      <Input
                        id="bs"
                        value={bloodSugar}
                        onChange={(e) => setBloodSugar(e.target.value)}
                        placeholder="e.g. 99"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
