import { create } from "zustand";

interface usePremiumModalInterface {
  open: boolean | undefined;
  setOpen: (open: boolean) => void;
}

const usePremiumModalStore = create<usePremiumModalInterface>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

export { usePremiumModalStore };
