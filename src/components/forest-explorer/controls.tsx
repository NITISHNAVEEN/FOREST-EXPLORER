"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DATASETS, ROLES } from "@/lib/data";
import type { Role, DataSet } from "@/lib/types";
import { SidebarGroup, SidebarGroupContent, SidebarSeparator } from "../ui/sidebar";
import { Slider } from "../ui/slider";

interface ControlsProps {
  role: Role;
  dataset: DataSet;
  onRoleChange: (roleId: string) => void;
  onDatasetChange: (datasetId: string) => void;
  numTrees: number;
  onNumTreesChange: (value: number) => void;
  maxDepth: number;
  onMaxDepthChange: (value: number) => void;
}

export function Controls({
  role,
  dataset,
  onRoleChange,
  onDatasetChange,
  numTrees,
  onNumTreesChange,
  maxDepth,
  onMaxDepthChange,
}: ControlsProps) {
  const availableDatasets = DATASETS.filter((d) => d.roleId === role.id);

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role-select">Your Role</Label>
            <Select value={role.id} onValueChange={onRoleChange}>
              <SelectTrigger id="role-select" className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    <div className="flex items-center gap-2">
                      <r.icon className="h-4 w-4" />
                      <span>{r.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dataset-select">Example Dataset</Label>
            <Select value={dataset.id} onValueChange={onDatasetChange}>
              <SelectTrigger id="dataset-select" className="w-full">
                <SelectValue placeholder="Select a dataset" />
              </SelectTrigger>
              <SelectContent>
                {availableDatasets.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarSeparator />
      <SidebarGroup>
        <SidebarGroupContent className="space-y-6 pt-4">
          <div className="space-y-3">
            <Label htmlFor="num-trees-slider" className="flex justify-between">
                <span>Number of Trees</span>
                <span className="text-muted-foreground">{numTrees}</span>
            </Label>
            <Slider
              id="num-trees-slider"
              min={1}
              max={10}
              step={1}
              value={[numTrees]}
              onValueChange={(value) => onNumTreesChange(value[0])}
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="max-depth-slider" className="flex justify-between">
                <span>Max Depth</span>
                <span className="text-muted-foreground">{maxDepth}</span>
            </Label>
            <Slider
              id="max-depth-slider"
              min={1}
              max={5}
              step={1}
              value={[maxDepth]}
              onValueChange={(value) => onMaxDepthChange(value[0])}
            />
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
