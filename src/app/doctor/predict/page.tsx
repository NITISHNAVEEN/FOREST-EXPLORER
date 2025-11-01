'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Sparkles, HeartCrack, HeartPulse } from 'lucide-react';
import { cn } from '@/lib/utils';
import placeholderImages from '@/lib/placeholder-images.json';

type Vitals = {
  bloodPressure: string;
  cholesterol: string;
  heartRate: string;
  bloodSugar: string;
};

type TreeNodeProps = {
  condition: string;
  isPath?: boolean;
  isLeaf?: boolean;
  result?: 'Risky' | 'Not Risky';
  children?: React.ReactNode;
};

const TreeNode = ({
  condition,
  isPath,
  isLeaf,
  result,
  children,
}: TreeNodeProps) => (
  <div className="flex flex-col items-center relative">
    <div
      className={cn(
        'p-2 rounded-lg border-2 bg-card text-card-foreground shadow-sm transition-all duration-500 min-w-[120px] text-center text-xs',
        {
          'border-primary bg-primary/10': isPath,
          'border-destructive bg-destructive/10': isLeaf && result === 'Risky',
          'border-green-500 bg-green-500/10':
            isLeaf && result === 'Not Risky',
        }
      )}
    >
      <p className="font-semibold">{isLeaf ? result : condition}</p>
      {isLeaf && result && <p className="font-bold mt-1">{null}</p>}
    </div>
    {children && (
      <div className="flex justify-center mt-2 space-x-4">{children}</div>
    )}
  </div>
);

type DecisionTreeProps = {
  vitals: Vitals;
  treeId: number;
  isActive: boolean;
};

const DecisionTree = ({ vitals, treeId, isActive }: DecisionTreeProps) => {
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    if (isActive) {
      const { bloodPressure, cholesterol, heartRate, bloodSugar } = vitals;
      const bpSys = parseInt(bloodPressure.split('/')[0]);
      const chol = parseInt(cholesterol);
      const hr = parseInt(heartRate);
      const bs = parseInt(bloodSugar);
      let currentPath: string[] = [];

      if (treeId === 1) {
        currentPath.push('root');
        if (bpSys > 140) {
          currentPath.push('bp>140');
          if (chol > 240) {
            currentPath.push('bp>140_chol>240');
          } else {
            currentPath.push('bp>140_chol<=240');
          }
        } else {
          currentPath.push('bp<=140');
          if (hr > 90) {
            currentPath.push('bp<=140_hr>90');
          } else {
            currentPath.push('bp<=140_hr<=90');
          }
        }
      } else if (treeId === 2) {
        currentPath.push('root');
        if (chol > 220) {
          currentPath.push('chol>220');
          if (bs > 125) {
            currentPath.push('chol>220_bs>125');
          } else {
            currentPath.push('chol>220_bs<=125');
          }
        } else {
          currentPath.push('chol<=220');
          if (bpSys > 130) {
            currentPath.push('chol<=220_bp>130');
          } else {
            currentPath.push('chol<=220_bp<=130');
          }
        }
      } else {
        currentPath.push('root');
        if (hr > 85) {
          currentPath.push('hr>85');
          if (bs > 110) {
            currentPath.push('hr>85_bs>110');
          } else {
            currentPath.push('hr>85_bs<=110');
          }
        } else {
          currentPath.push('hr<=85');
          if (chol > 200) {
            currentPath.push('hr<=85_chol>200');
          } else {
            currentPath.push('hr<=85_chol<=200');
          }
        }
      }

      const timeout = setTimeout(() => setPaths(currentPath), 1000);
      return () => clearTimeout(timeout);
    } else {
      setPaths([]);
    }
  }, [isActive, vitals, treeId]);

  const isPath = (id: string) => isActive && paths.includes(id);

  if (treeId === 1) {
    return (
      <TreeNode condition="Pressure > 140?" isPath={isPath('root')}>
        <div className="flex flex-col items-center">
          <span className="text-xs mb-1">Yes</span>
          <TreeNode condition="Chol > 240?" isPath={isPath('bp>140')}>
            <div className="flex flex-col items-center">
              <span className="text-xs mb-1">Yes</span>
              <TreeNode
                condition="Risky"
                isLeaf
                result="Risky"
                isPath={isPath('bp>140_chol>240')}
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs mb-1">No</span>
              <TreeNode
                condition="Risky"
                isLeaf
                result="Risky"
                isPath={isPath('bp>140_chol<=240')}
              />
            </div>
          </TreeNode>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs mb-1">No</span>
          <TreeNode condition="HR > 90?" isPath={isPath('bp<=140')}>
            <div className="flex flex-col items-center">
              <span className="text-xs mb-1">Yes</span>
              <TreeNode
                condition="Risky"
                isLeaf
                result="Risky"
                isPath={isPath('bp<=140_hr>90')}
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs mb-1">No</span>
              <TreeNode
                condition="Not Risky"
                isLeaf
                result="Not Risky"
                isPath={isPath('bp<=140_hr<=90')}
              />
            </div>
          </TreeNode>
        </div>
      </TreeNode>
    );
  }

  if (treeId === 2) {
    return (
      <TreeNode condition="Chol > 220?" isPath={isPath('root')}>
        <div className="flex flex-col items-center">
          <span className="text-xs mb-1">Yes</span>
          <TreeNode condition="Sugar > 125?" isPath={isPath('chol>220')}>
            <div className="flex flex-col items-center">
              <span className="text-xs mb-1">Yes</span>
              <TreeNode
                condition="Risky"
                isLeaf
                result="Risky"
                isPath={isPath('chol>220_bs>125')}
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs mb-1">No</span>
              <TreeNode
                condition="Not Risky"
                isLeaf
                result="Not Risky"
                isPath={isPath('chol>220_bs<=125')}
              />
            </div>
          </TreeNode>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs mb-1">No</span>
          <TreeNode condition="Pressure > 130?" isPath={isPath('chol<=220')}>
            <div className="flex flex-col items-center">
              <span className="text-xs mb-1">Yes</span>
              <TreeNode
                condition="Risky"
                isLeaf
                result="Risky"
                isPath={isPath('chol<=220_bp>130')}
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs mb-1">No</span>
              <TreeNode
                condition="Not Risky"
                isLeaf
                result="Not Risky"
                isPath={isPath('chol<=220_bp<=130')}
              />
            </div>
          </TreeNode>
        </div>
      </TreeNode>
    );
  }

  return (
    <TreeNode condition="HR > 85?" isPath={isPath('root')}>
      <div className="flex flex-col items-center">
        <span className="text-xs mb-1">Yes</span>
        <TreeNode condition="Sugar > 110?" isPath={isPath('hr>85')}>
          <div className="flex flex-col items-center">
            <span className="text-xs mb-1">Yes</span>
            <TreeNode
              condition="Risky"
              isLeaf
              result="Risky"
              isPath={isPath('hr>85_bs>110')}
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs mb-1">No</span>
            <TreeNode
              condition="Not Risky"
              isLeaf
              result="Not Risky"
              isPath={isPath('hr>85_bs<=110')}
            />
          </div>
        </TreeNode>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs mb-1">No</span>
        <TreeNode condition="Chol > 200?" isPath={isPath('hr<=85')}>
          <div className="flex flex-col items-center">
            <span className="text-xs mb-1">Yes</span>
            <TreeNode
              condition="Risky"
              isLeaf
              result="Risky"
              isPath={isPath('hr<=85_chol>200')}
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs mb-1">No</span>
            <TreeNode
              condition="Not Risky"
              isLeaf
              result="Not Risky"
              isPath={isPath('hr<=85_chol<=200')}
            />
          </div>
        </TreeNode>
      </div>
    </TreeNode>
  );
};

export default function PredictPage() {
  const [vitals, setVitals] = useState<Vitals>({
    bloodPressure: '120/80',
    cholesterol: '200',
    heartRate: '75',
    bloodSugar: '99',
  });
  const [isMounted, setIsMounted] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [prediction, setPrediction] = useState<'Risky' | 'Not Risky' | null>(
    null
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (field: keyof Vitals, value: string) => {
    setVitals((prev) => ({ ...prev, [field]: value }));
  };

  const handlePredict = () => {
    setIsPredicting(true);

    const results: ('Risky' | 'Not Risky')[] = [];
    const { bloodPressure, cholesterol, heartRate, bloodSugar } = vitals;
    const bpSys = parseInt(bloodPressure.split('/')[0]);
    const chol = parseInt(cholesterol);
    const hr = parseInt(heartRate);
    const bs = parseInt(bloodSugar);

    // Tree 1 logic
    if (bpSys > 140) results.push('Risky');
    else if (hr > 90) results.push('Risky');
    else results.push('Not Risky');

    // Tree 2 logic
    if (chol > 220 && bs > 125) results.push('Risky');
    else if (chol <= 220 && bpSys > 130) results.push('Risky');
    else results.push('Not Risky');

    // Tree 3 logic
    if (hr > 85 && bs > 110) results.push('Risky');
    else if (hr <= 85 && chol > 200) results.push('Risky');
    else results.push('Not Risky');

    const riskyCount = results.filter((r) => r === 'Risky').length;
    const finalPrediction = riskyCount >= 2 ? 'Risky' : 'Not Risky';
    
    setTimeout(() => {
      setPrediction(finalPrediction);
      setShowResultDialog(true);
    }, 4000); // Wait for animations to play
  };

  const reset = () => {
    setIsPredicting(false);
    setShowResultDialog(false);
    setPrediction(null);
  };

  const allFieldsFilled =
    vitals.bloodPressure &&
    vitals.cholesterol &&
    vitals.heartRate &&
    vitals.bloodSugar;

  if (!isMounted) {
    return null;
  }

  const renderParticles = (isPredicting: boolean) => {
    const positions = [
      { top: '0%', right: '0%', id: 'bp' },
      { top: '0%', left: '0%', id: 'chol' },
      { bottom: '0%', left: '0%', id: 'hr' },
      { bottom: '0%', right: '0%', id: 'bs' },
    ];

    return positions.map((pos) =>
      Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`${pos.id}-${i}`}
          className={cn(
            'absolute w-2 h-2 bg-primary rounded-full z-20',
            'transition-all ease-in-out duration-[1500ms]',
            isPredicting
              ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-50 opacity-0'
              : 'scale-100 opacity-100'
          )}
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            bottom: pos.bottom,
            transitionDelay: `${i * 100}ms`,
          }}
        />
      ))
    );
  };

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
      <main className="flex-1 p-4 md:p-6 flex flex-col items-center">
        {!isPredicting && !prediction ? (
          <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Patient Vitals Input
              </h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Enter the patient's vitals to predict the risk of a heart
                attack.
              </p>
            </div>
            <div
              className="relative flex justify-center items-center"
              style={{ minHeight: '300px' }}
            >
              <Image
                src={placeholderImages.human_body_scan.src}
                alt="Human Body"
                width={200}
                height={300}
                data-ai-hint={placeholderImages.human_body_scan['data-ai-hint']}
                className="object-contain"
              />
              {renderParticles(isPredicting)}
              <div className="absolute top-0 right-0">
                <Card className="w-36 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:shadow-xl">
                  <CardHeader className="p-3">
                    <CardTitle className="text-base">Blood Pressure</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <Input
                      id="bp"
                      value={vitals.bloodPressure}
                      onChange={(e) =>
                        handleInputChange('bloodPressure', e.target.value)
                      }
                      placeholder="e.g. 120/80"
                      className="text-xs h-8"
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="absolute top-0 left-0">
                <Card className="w-36 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:shadow-xl">
                  <CardHeader className="p-3">
                    <CardTitle className="text-base">Cholesterol</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <Input
                      id="chol"
                      value={vitals.cholesterol}
                      onChange={(e) =>
                        handleInputChange('cholesterol', e.target.value)
                      }
                      placeholder="e.g. 200"
                      className="text-xs h-8"
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="absolute bottom-0 left-0">
                <Card className="w-36 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:shadow-xl">
                  <CardHeader className="p-3">
                    <CardTitle className="text-base">Heart Rate</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <Input
                      id="hr"
                      value={vitals.heartRate}
                      onChange={(e) =>
                        handleInputChange('heartRate', e.target.value)
                      }
                      placeholder="e.g. 75"
                      className="text-xs h-8"
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="absolute bottom-0 right-0">
                <Card className="w-36 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:shadow-xl">
                  <CardHeader className="p-3">
                    <CardTitle className="text-base">Blood Sugar</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <Input
                      id="bs"
                      value={vitals.bloodSugar}
                      onChange={(e) =>
                        handleInputChange('bloodSugar', e.target.value)
                      }
                      placeholder="e.g. 99"
                      className="text-xs h-8"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
            {allFieldsFilled && (
              <div className="flex justify-center mt-8">
                <Button size="lg" onClick={handlePredict}>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Predict
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center w-full mt-8">
            <h2 className="text-2xl font-bold mb-4">
              {prediction ? 'Prediction Result' : 'Analyzing Patient Data...'}
            </h2>

            {prediction && (
              <Card className="mb-8 w-full max-w-md shadow-lg">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  {prediction === 'Risky' ? (
                    <>
                      <HeartCrack className="w-16 h-16 text-destructive animate-pulse" />
                      <p className="mt-4 text-3xl font-bold text-destructive">
                        RISKY
                      </p>
                      <p className="text-muted-foreground mt-2">
                        Based on the Random Forest model, the patient is at high risk.
                      </p>
                    </>
                  ) : (
                    <>
                      <HeartPulse className="w-16 h-16 text-green-500" />
                      <p className="mt-4 text-3xl font-bold text-green-500">
                        NOT RISKY
                      </p>
                      <p className="text-muted-foreground mt-2">
                        Based on the Random Forest model, the patient is at low risk.
                      </p>
                    </>
                  )}
                   <Button onClick={reset} className="mt-6">
                      Run New Prediction
                    </Button>
                </CardContent>
              </Card>
            )}

            <div
              className={cn(
                'flex flex-col md:flex-row justify-around w-full gap-8 transition-opacity duration-1000',
                isPredicting ? 'opacity-100' : 'opacity-0'
              )}
            >
              <div className="flex flex-col items-center space-y-2">
                 <h3 className="font-semibold">Tree 1</h3>
                <DecisionTree vitals={vitals} treeId={1} isActive={isPredicting} />
              </div>
              <div className="flex flex-col items-center space-y-2">
                 <h3 className="font-semibold">Tree 2</h3>
                <DecisionTree vitals={vitals} treeId={2} isActive={isPredicting} />
              </div>
               <div className="flex flex-col items-center space-y-2">
                 <h3 className="font-semibold">Tree 3</h3>
                <DecisionTree vitals={vitals} treeId={3} isActive={isPredicting} />
              </div>
            </div>
          </div>
        )}

        <AlertDialog open={showResultDialog} onOpenChange={setShowResultDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl text-center">
                Prediction Result
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Based on the Random Forest model, the patient is classified as:
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col items-center justify-center p-6">
              {prediction === 'Risky' ? (
                <>
                  <HeartCrack className="w-16 h-16 text-destructive animate-pulse" />
                  <p className="mt-4 text-2xl font-bold text-destructive">
                    RISKY
                  </p>
                </>
              ) : (
                <>
                  <HeartPulse className="w-16 h-16 text-green-500" />
                  <p className="mt-4 text-2xl font-bold text-green-500">
                    NOT RISKY
                  </p>
                </>
              )}
            </div>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowResultDialog(false)}>
                View Details
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
