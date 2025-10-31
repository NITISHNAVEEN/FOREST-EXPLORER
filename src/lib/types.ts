import type { LucideIcon } from 'lucide-react';
import { placeholderImages } from './data';

export type RoleId = 'doctor' | 'fssai_manager' | 'bank_manager';

export type Role = {
  id: RoleId;
  name: string;
  description: string;
  icon: LucideIcon;
  dataPointIcon: LucideIcon;
  dataPointImageId: keyof typeof placeholderImages;
  predictionContext: string;
};

export type DataSet = {
  id: string;
  name: string;
  description: string;
  roleId: RoleId;
  features: string[];
  sampleDataPoint: Record<string, string | number>;
  predictionLabel: string;
};

export type TreeNode = {
  id: string;
  type: 'node' | 'leaf';
  feature?: string;
  threshold?: number | string;
  decision?: string;
  samples: number;
  prediction?: string;
  predictionValue?: number;
  image?: keyof typeof placeholderImages;
  children?: TreeNode[];
  pathId?: string;
};

export type DecisionTree = {
  id: string;
  root: TreeNode;
};

export type RandomForest = DecisionTree[];
