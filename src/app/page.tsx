import Image from 'next/image';
import Link from 'next/link';
import { Stethoscope, Dumbbell, Carrot } from 'lucide-react';

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

export default function Home() {
  const roles = [
    {
      name: 'Doctor',
      description: 'Provide medical advice and support.',
      icon: <Stethoscope className="h-10 w-10" />,
      href: '/doctor',
      image: placeholderImages.doctor,
    },
    {
      name: 'Sports Coach',
      description: 'Create workout plans and provide fitness advice.',
      icon: <Dumbbell className="h-10 w-10" />,
      href: '/coach',
      image: placeholderImages.sports_coach,
    },
    {
      name: 'Vegetable Vendor',
      description: 'Offer fresh produce and recipes.',
      icon: <Carrot className="h-10 w-10" />,
      href: '/vendor',
      image: placeholderImages.vegetable_vendor,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Choose Your Role
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Select a persona to interact with the application.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {roles.map((role) => (
          <Card
            key={role.name}
            className="w-full max-w-sm overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={role.image.src}
                  alt={role.name}
                  width={role.image.width}
                  height={role.image.height}
                  data-ai-hint={role.image['data-ai-hint']}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6 text-primary-foreground">
                   <div className="p-2 bg-primary/80 rounded-full mb-2 w-fit">
                    {role.icon}
                   </div>
                  <CardTitle className="text-2xl font-bold">{role.name}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardDescription className="text-base">{role.description}</CardDescription>
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
