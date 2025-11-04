
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Stethoscope,
  Dumbbell,
  Computer,
  Zap,
  ShieldCheck,
  BarChart,
  Users,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import placeholderImages from '@/lib/placeholder-images.json';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export default function Home() {
  const roles = [
    {
      name: 'Doctor',
      description: 'Provide medical advice and support.',
      href: '/doctor',
      image: placeholderImages.doctor,
    },
    {
      name: 'Sports Coach',
      description: 'Plans and guides players',
      href: '/coach',
      image: placeholderImages.sports_coach,
    },
    {
      name: 'Computer Seller',
      description: 'Sell computers and accessories.',
      href: '/seller',
      image: placeholderImages.computer_seller,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-12 bg-background">
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Explore RANDOM FOREST
        </h1>
        <p className="mt-4 text-xl font-semibold text-primary">
          Why use Random Forest?
        </p>
        <p className="mt-2 text-lg text-muted-foreground">
          Random Forest can help you predict the accurate and reliable results
          of your daily life situations.
        </p>
      </div>

      <Card className="w-full max-w-5xl mb-12 shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Zap className="w-6 h-6 text-primary" />
            Real-World Applications
          </CardTitle>
          <CardDescription>
            See how different professionals can benefit from this powerful
            algorithm.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card">
            <div className="p-3 rounded-full bg-primary/10">
              <Stethoscope className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold">For Doctors</h3>
            <p className="text-sm text-muted-foreground">
              Predict heart attack risk using random forest rather than
              considering complex numerous features.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card">
            <div className="p-3 rounded-full bg-primary/10">
              <Dumbbell className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold">For Coaches</h3>
            <p className="text-sm text-muted-foreground">
              Decide a good day to play tennis without worrying about the
              factors which influence play.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card">
            <div className="p-3 rounded-full bg-primary/10">
              <Computer className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold">For Sellers</h3>
            <p className="text-sm text-muted-foreground">
              Predict whether the customer will buy a computer or not.
            </p>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-4" />

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Choose Your Role
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Select a persona to interact with the application.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {roles.map((role) => (
          <Card
            key={role.name}
            className="w-full overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={role.image.src}
                  alt={role.name}
                  width={role.image.width}
                  height={role.image.height}
                  data-ai-hint={role.image['data-ai-hint']}
                  className={cn(
                    'object-cover object-center w-full h-full',
                    role.name === 'Sports Coach' && 'object-contain'
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6 text-primary-foreground">
                  <CardTitle className="text-2xl font-bold">
                    {role.name}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardDescription className="text-base">
                {role.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Link href={role.href} className="w-full">
                <Button className="w-full" variant="outline">
                  Select Role
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
