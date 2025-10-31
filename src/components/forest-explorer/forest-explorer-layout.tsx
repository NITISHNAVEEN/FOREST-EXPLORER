"use client";

import { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DATASETS, ROLES } from "@/lib/data";
import type { Role, DataSet } from "@/lib/types";
import { Visualization } from "./visualization";
import { Controls } from "./controls";
import { ExplanationSection } from "./explanation-section";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ForestExplorerLayout() {
  const [role, setRole] = useState<Role>(ROLES[0]);
  const [dataset, setDataset] = useState<DataSet>(
    DATASETS.find((d) => d.roleId === ROLES[0].id)!
  );
  const [isSimulating, setIsSimulating] = useState(false);
  const { toast } = useToast();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const handleRoleChange = (roleId: string) => {
    const newRole = ROLES.find((r) => r.id === roleId)!;
    const newDataset = DATASETS.find((d) => d.roleId === roleId)!;
    setRole(newRole);
    setDataset(newDataset);
    setIsSimulating(false);
  };

  const handleDatasetChange = (datasetId: string) => {
    const newDataset = DATASETS.find((d) => d.id === datasetId)!;
    setDataset(newDataset);
    setIsSimulating(false);
  };

  const handleUploadClick = () => {
    setIsUploadDialogOpen(true);
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <svg
              className="size-6 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 11.55C12 10.12 12.87 9 14 9h1.5a2.5 2.5 0 1 0 0-5H14" />
              <path d="M12 11.55a4.5 4.5 0 0 1-4.5 4.5h-3" />
              <path d="M12 11.55a4.5 4.5 0 0 0 4.5 4.5h3" />
              <path d="m14 9-2 2.55" />
              <path d="M10 16h.5a2.5 2.5 0 0 0 0-5H10" />
              <path d="m14 14-2-2.5" />
              <path d="M18 16h.5a2.5 2.5 0 0 0 0-5H18" />
            </svg>
            <h1 className="font-headline text-lg font-semibold">Forest Explorer</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Controls
            role={role}
            dataset={dataset}
            onRoleChange={handleRoleChange}
            onDatasetChange={handleDatasetChange}
          />
        </SidebarContent>
        <SidebarFooter>
          <Button variant="outline" onClick={handleUploadClick}>
            <Upload className="mr-2" />
            Upload Data
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h2 className="font-headline text-xl font-bold">{role.name}</h2>
            <p className="text-sm text-muted-foreground">
              {role.description}
            </p>
          </div>
          <Button
            onClick={() => setIsSimulating(true)}
            disabled={isSimulating}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {isSimulating ? "Analyzing..." : "Simulate Prediction"}
          </Button>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <Visualization
            role={role}
            dataset={dataset}
            isSimulating={isSimulating}
          />
          <Separator className="my-8" />
          <ExplanationSection
            role={role}
            dataset={dataset}
          />
        </div>
      </SidebarInset>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Custom Data</DialogTitle>
            <DialogDescription>
              This feature allows you to upload your own CSV file to train and visualize a Random Forest model.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-center">
            <p className="text-muted-foreground">This feature is not yet implemented.</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsUploadDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
