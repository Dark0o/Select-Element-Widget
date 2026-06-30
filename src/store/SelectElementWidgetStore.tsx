import { create } from "zustand";

export interface ElementItem {
  id: number;
  name: string;
}

interface SelectElementWidgetStore {
  elements: ElementItem[];
  selectedElements: ElementItem[];
  setSelectedElements: (elements: ElementItem[]) => void;
  isPanelOpen: boolean;
  setIsPanelOpen: (isOpen: boolean) => void;
}

export const useSelectElementWidgetStore = create<SelectElementWidgetStore>(
  (set) => ({
    elements: Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      name: `Element ${i + 1}`,
    })),
    selectedElements: [],
    setSelectedElements: (elements) => set({ selectedElements: elements }),
    isPanelOpen: false,
    setIsPanelOpen: (isOpen) => set({ isPanelOpen: isOpen }),
  }),
);
