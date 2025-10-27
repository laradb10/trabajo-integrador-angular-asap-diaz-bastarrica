import { Dino } from "@app/dino/interfaces/dino.interface";

export interface Analysis extends Dino {
  id?: string;
  notes?: string;
  habitat?: string;
  diet?: string;
  era?: string;
  customFields?: {
    label: string;
    value: string;
  }[];
}
