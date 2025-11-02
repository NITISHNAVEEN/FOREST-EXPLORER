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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import patientData from '@/lib/synthetic-patient-data.json';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function DatasetPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex items-center h-16 px-4 border-b bg-background/80 backdrop-blur-sm">
        <Link href="/doctor">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="ml-4 text-xl font-semibold">
          Synthetic Patient Dataset
        </h1>
      </header>
      <main className="flex-1 p-4 md:p-10">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Patient Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Blood Pressure</TableHead>
                    <TableHead>Cholesterol</TableHead>
                    <TableHead>Heart Rate</TableHead>
                    <TableHead>Blood Sugar</TableHead>
                    <TableHead className="text-right">Risk</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientData.map((patient, index) => (
                    <TableRow key={index}>
                      <TableCell>{patient.bloodPressure}</TableCell>
                      <TableCell>{patient.cholesterol}</TableCell>
                      <TableCell>{patient.heartRate}</TableCell>
                      <TableCell>{patient.bloodSugar}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          className={cn({
                            'bg-destructive/80 text-destructive-foreground':
                              patient.target === 'risky',
                            'bg-green-500/80 text-white':
                              patient.target === 'risk less',
                          })}
                        >
                          {patient.target}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
