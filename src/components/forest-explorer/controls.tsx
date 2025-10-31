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
import { SidebarGroup, SidebarGroupContent } from "../ui/sidebar";

interface ControlsProps {
  role: Role;
  dataset: DataSet;
  onRoleChange: (roleId: string) => void;
  onDatasetChange: (datasetId: string) => void;
}

export function Controls({
  role,
  dataset,
  onRoleChange,
  onDatasetChange,
}: ControlsProps) {
  const availableDatasets = DATASETS.filter((d) => d.roleId === role.id);

  return (
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
  );
}
