import { create } from 'zustand';

interface GPTMessageDialog {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// eslint-disable-next-line import/prefer-default-export
export const useGPTMessageDialog = create<GPTMessageDialog>()(
  (set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
  }),
);
