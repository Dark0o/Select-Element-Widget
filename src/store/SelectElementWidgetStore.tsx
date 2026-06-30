import { create } from "zustand";

export interface ElementItem {
  id: number;
  name: string;
}

interface SelectElementWidgetStore {
  selectedElements: ElementItem[];
  setSelectedElements: (elements: ElementItem[]) => void;
  isPanelOpen: boolean;
  setIsPanelOpen: (isOpen: boolean) => void;
}

export const useSelectElementWidgetStore = create<SelectElementWidgetStore>(
  (set) => ({
    selectedElements: [],
    setSelectedElements: (elements) => set({ selectedElements: elements }),
    isPanelOpen: false,
    setIsPanelOpen: (isOpen) => set({ isPanelOpen: isOpen }),
  }),
);
