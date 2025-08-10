import { create } from 'zustand';

import { CheckupResultData } from '../types';

type CheckupResultStore = {
  resultData: CheckupResultData | null;
  setResultData: (data: CheckupResultData | null) => void;
};

const useCheckupResultStore = create<CheckupResultStore>((set) => ({
  resultData: null,
  setResultData: (data) => set({ resultData: data }),
}));

export default useCheckupResultStore;
