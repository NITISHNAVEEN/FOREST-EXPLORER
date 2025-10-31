import { Stethoscope, ClipboardCheck, Landmark, User, Utensils, FileText } from 'lucide-react';
import type { Role, DataSet, RoleId, RandomForest, TreeNode } from './types';
import type { ImagePlaceholder } from './placeholder-images';
import placeholderImageData from './placeholder-images.json';

export const ROLES: Role[] = [
  {
    id: 'doctor',
    name: 'Doctor',
    description: 'Predicting patient diagnosis based on clinical data.',
    icon: Stethoscope,
    dataPointIcon: User,
    dataPointImageId: 'patient-data',
    predictionContext: "The model predicts if a patient is likely to have the condition."
  },
  {
    id: 'fssai_manager',
    name: 'FSSAI Manager',
    description: 'Assessing food sample compliance for certification.',
    icon: ClipboardCheck,
    dataPointIcon: Utensils,
    dataPointImageId: 'food-sample',
    predictionContext: "The model predicts if a food sample passes certification."
  },
  {
    id: 'bank_manager',
    name: 'Bank Manager',
    description: 'Evaluating loan applications for credit risk.',
    icon: Landmark,
    dataPointIcon: FileText,
    dataPointImageId: 'loan-application',
    predictionContext: "The model predicts if a loan application should be approved."
  },
];

export const DATASETS: DataSet[] = [
  {
    id: 'heart-disease',
    name: 'Heart Disease Prediction',
    roleId: 'doctor',
    description: 'A dataset for predicting heart disease in patients.',
    features: ['Age', 'Blood Pressure', 'Cholesterol', 'Max Heart Rate'],
    sampleDataPoint: { 'Age': 52, 'Blood Pressure': 125, 'Cholesterol': 212, 'Max Heart Rate': 168 },
    predictionLabel: 'Has Disease',
  },
  {
    id: 'food-safety',
    name: 'Food Safety Compliance',
    roleId: 'fssai_manager',
    description: 'Dataset of food sample tests for safety compliance.',
    features: ['Acidity (pH)', 'Moisture (%)', 'Contaminant (ppm)', 'Processing Temp (°C)'],
    sampleDataPoint: { 'Acidity (pH)': 4.5, 'Moisture (%)': 12, 'Contaminant (ppm)': 0.2, 'Processing Temp (°C)': 85 },
    predictionLabel: 'Compliance',
  },
  {
    id: 'loan-approval',
    name: 'Loan Approval',
    roleId: 'bank_manager',
    description: 'Dataset of loan applications for approval prediction.',
    features: ['Credit Score', 'Income (in 1000s)', 'Loan Amount (in 1000s)', 'Years of Employment'],
    sampleDataPoint: { 'Credit Score': 720, 'Income (in 1000s)': 95, 'Loan Amount (in 1000s)': 200, 'Years of Employment': 10 },
    predictionLabel: 'Approval',
  },
];

const placeholderImagesMap: Record<string, ImagePlaceholder> = placeholderImageData.placeholderImages.reduce((acc, img) => {
    acc[img.id] = img;
    return acc;
}, {} as Record<string, ImagePlaceholder>);

export const placeholderImages = placeholderImagesMap;


const doctorTree: TreeNode = {
    id: 'd-root', type: 'node', feature: 'Age > 50?', samples: 1000, pathId: 'path-1', children: [
        { id: 'd-l1', type: 'node', feature: 'Cholesterol > 200?', samples: 600, pathId: 'path-1-1', children: [
            { id: 'd-l2-1', type: 'leaf', prediction: 'High Risk', predictionValue: 0.8, samples: 450, image: 'doctor-illustration', decision: 'Patient has multiple risk factors.', pathId: 'path-1-1-1'},
            { id: 'd-l2-2', type: 'leaf', prediction: 'Low Risk', predictionValue: 0.2, samples: 150, decision: 'Patient is older but has low cholesterol.', pathId: 'path-1-1-2'}
        ]},
        { id: 'd-r1', type: 'leaf', prediction: 'Low Risk', predictionValue: 0.1, samples: 400, decision: 'Younger patients are generally lower risk.', pathId: 'path-1-2'}
    ]
};

const fssaiTree: TreeNode = {
    id: 'f-root', type: 'node', feature: 'Contaminant > 0.5ppm?', samples: 5000, pathId: 'path-2', children: [
        { id: 'f-l1', type: 'leaf', prediction: 'Fail', predictionValue: 0.95, samples: 500, image: 'food-inspection', decision: 'Contaminant levels exceed the safety threshold.', pathId: 'path-2-1'},
        { id: 'f-r1', type: 'node', feature: 'Acidity (pH) < 4.6?', samples: 4500, pathId: 'path-2-2', children: [
            { id: 'f-l2-1', type: 'leaf', prediction: 'Pass', predictionValue: 0.9, samples: 4000, decision: 'Low contaminants and sufficient acidity for preservation.', pathId: 'path-2-2-1'},
            { id: 'f-l2-2', type: 'leaf', prediction: 'Fail', predictionValue: 0.7, samples: 500, decision: 'Acidity is not low enough to ensure safety.', pathId: 'path-2-2-2'}
        ]}
    ]
};

const bankTree: TreeNode = {
    id: 'b-root', type: 'node', feature: 'Credit Score > 680?', samples: 10000, pathId: 'path-3', children: [
        { id: 'b-l1', type: 'node', feature: 'Income > $50k?', samples: 7000, pathId: 'path-3-1', children: [
            { id: 'b-l2-1', type: 'leaf', prediction: 'Approve', predictionValue: 0.85, samples: 6500, image: 'bank-loan', decision: 'Applicant has good credit and sufficient income.', pathId: 'path-3-1-1'},
            { id: 'b-l2-2', type: 'leaf', prediction: 'Deny', predictionValue: 0.6, samples: 500, decision: 'Applicant has good credit but low income for the loan.', pathId: 'path-3-1-2'}
        ]},
        { id: 'b-r1', type: 'leaf', prediction: 'Deny', predictionValue: 0.9, samples: 3000, decision: 'Credit score is below the minimum requirement.', pathId: 'path-3-2'}
    ]
};

// Function to clone and prune a tree to a max depth
const pruneTree = (node: TreeNode, maxDepth: number, currentDepth: number = 1): TreeNode => {
  const newNode = { ...node };
  if (currentDepth >= maxDepth || !newNode.children || newNode.children.length === 0) {
    delete newNode.children;
    newNode.type = 'leaf';
    // Simplified logic to make a prediction for a pruned node
    newNode.prediction = (Math.random() > 0.5) ? 'Positive' : 'Negative'; 
    newNode.decision = `Pruned at depth ${currentDepth}.`;
    return newNode;
  }

  newNode.children = newNode.children.map(child => pruneTree(child, maxDepth, currentDepth + 1));
  return newNode;
};


const simplifiedForests: Record<RoleId, RandomForest> = {
    doctor: Array.from({ length: 10 }, (_, i) => ({
      id: `tree${i + 1}`,
      root: { ...doctorTree, id: `d-root-${i + 1}`, children: i % 2 === 0 ? doctorTree.children : doctorTree.children?.slice().reverse() }
    })),
    fssai_manager: Array.from({ length: 10 }, (_, i) => ({
      id: `tree${i + 1}`,
      root: { ...fssaiTree, id: `f-root-${i + 1}`, children: i % 2 === 0 ? fssaiTree.children : fssaiTree.children?.slice().reverse() }
    })),
    bank_manager: Array.from({ length: 10 }, (_, i) => ({
      id: `tree${i + 1}`,
      root: { ...bankTree, id: `b-root-${i + 1}`, children: i % 2 === 0 ? bankTree.children : bankTree.children?.slice().reverse() }
    })),
};

export const getForestForRole = (roleId: RoleId, maxDepth: number = 3): RandomForest => {
    const forest = simplifiedForests[roleId];
    return forest.map(tree => ({
        ...tree,
        root: pruneTree(tree.root, maxDepth),
    }));
};

// A simplified path based on sample data
export const getHighlightedPath = (roleId: RoleId): string[] => {
    switch (roleId) {
        case 'doctor': return ['path-1', 'path-1-1', 'path-1-1-1'];
        case 'fssai_manager': return ['path-2', 'path-2-2', 'path-2-2-1'];
        case 'bank_manager': return ['path-3', 'path-3-1', 'path-3-1-1'];
        default: return [];
    }
}
