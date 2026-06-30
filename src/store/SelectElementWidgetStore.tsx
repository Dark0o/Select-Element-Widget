import { create } from "zustand";

export interface ElementItem {
  id: number;
  name: string;
}

interface SelectElementWidgetStore {
  selectedElements: ElementItem[];
  setSelectedElements: (elements: ElementItem[]) => void;
}

export const useSelectElementWidgetStore = create<SelectElementWidgetStore>(
  (set) => ({
    selectedElements: [],
    setSelectedElements: (elements) => set({ selectedElements: elements }),
  }),
);
