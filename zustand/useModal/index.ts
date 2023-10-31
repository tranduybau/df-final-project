import { create } from 'zustand';

interface GPTMessageDialog {
  selectedFile: string;
  actionSelectedFileChange: (fileName: string) => void;
}

// eslint-disable-next-line import/prefer-default-export
export const useGPTMessageDialog = create<GPTMessageDialog>((set): GPTMessageDialog => ({
  selectedFile: '',
  actionSelectedFileChange: (fileName) => set(({ selectedFile: fileName })),
}));
