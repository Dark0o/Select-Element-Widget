import { create } from "zustand";

export interface ElementItemType {
  id: number;
  name: string;
}

interface SelectElementWidgetStore {
  elements: ElementItemType[];
  selectedElements: ElementItemType[];
  setSelectedElements: (elements: ElementItemType[]) => void;
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
