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
import tennisData from '@/lib/tennis-data.json';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function DatasetPage() {
  const formatOutlook = (outlook: string) => {
    switch (outlook) {
      case 'sunny':
      case 's':
        return 'Sunny';
      case 'overcast':
      case 'o':
        return 'Overcast';
      case 'rainy':
      case 'r':
        return 'Rainy';
      default:
        return outlook;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="sticky top-0 z-10 flex items-center h-16 px-4 border-b bg-header-background/80 backdrop-blur-sm" style={{ backgroundColor: '#FF0000' }}>
        <Link href="/coach">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
        </Link>
        <h1 className="ml-4 text-xl font-semibold text-white">
          Tennis Weather Dataset
        </h1>
      </header>
      <main className="flex-1 p-4 md:p-10">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Weather Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Outlook</TableHead>
                    <TableHead>Temp</TableHead>
                    <TableHead>Humidity</TableHead>
                    <TableHead>Wind</TableHead>
                    <TableHead className="text-right">Play Tennis?</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tennisData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{data.day}</TableCell>
                      <TableCell>{formatOutlook(data.outlook)}</TableCell>
                      <TableCell className="capitalize">{data.temp}</TableCell>
                      <TableCell className="capitalize">{data.humid}</TableCell>
                      <TableCell className="capitalize">{data.wind}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          className={cn('capitalize', {
                            'bg-destructive/80 text-destructive-foreground':
                              data.playTennis === 'no',
                            'bg-green-500/80 text-white':
                              data.playTennis === 'yes',
                          })}
                        >
                          {data.playTennis}
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
