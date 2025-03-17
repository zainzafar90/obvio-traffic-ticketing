import { create } from "zustand";

import { IVehicleInfo } from "@/types/interfaces/resources";

import { LicensePlateVerificationStatus } from "../types/enums";

interface LicensePlateState {
  // State
  isLicensePlateExpanded: boolean;
  licensePlateNumber: string;
  licensePlateVerificationStatus: LicensePlateVerificationStatus;
  vehicleInfo: IVehicleInfo | null;

  // Actions
  setLicensePlateNumber: (number: string) => void;
  setVerificationStatus: (status: LicensePlateVerificationStatus) => void;
  toggleLicensePlateExpanded: () => void;
  setVehicleInfo: (info: IVehicleInfo) => void;
  resetStore: () => void;
}

export const useLicensePlateStore = create<LicensePlateState>((set) => ({
  isLicensePlateExpanded: false,
  licensePlateNumber: "",
  licensePlateVerificationStatus: LicensePlateVerificationStatus.PENDING,
  vehicleInfo: null,

  toggleLicensePlateExpanded: () =>
    set((state) => ({
      isLicensePlateExpanded: !state.isLicensePlateExpanded,
    })),
  setLicensePlateNumber: (number: string) =>
    set({ licensePlateNumber: number }),

  setVerificationStatus: (status) =>
    set({
      licensePlateVerificationStatus: status,
    }),
  setVehicleInfo: (info: IVehicleInfo) => set({ vehicleInfo: info }),
  resetStore: () =>
    set({
      isLicensePlateExpanded: false,
      licensePlateNumber: "",
      licensePlateVerificationStatus: LicensePlateVerificationStatus.PENDING,
      vehicleInfo: null,
    }),
}));
