import { motion } from "framer-motion";

import { IEvent } from "@/types/interfaces/resources";

import { useLicensePlateStore } from "../stores/license-plate.store";
import { LicensePlateDmvVerification } from "./license-plate-dmv-verification";
import { LicensePlateImage } from "./license-plate-image";
import { VehicleInfoDisplay } from "./vehicle-info-display";

interface LicensePlateIndicatorProps {
  event: IEvent;
}

export const LicensePlateContainer = ({
  event,
}: LicensePlateIndicatorProps) => {
  const { isLicensePlateExpanded, vehicleInfo, toggleLicensePlateExpanded } =
    useLicensePlateStore();

  return (
    <motion.div
      className="absolute bottom-4 right-4 rounded-lg border bg-background/70 shadow-lg backdrop-blur-sm"
      initial={{ width: isLicensePlateExpanded ? 320 : 240 }}
      animate={{ width: isLicensePlateExpanded ? 320 : 240 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="h-full overflow-y-auto p-3">
        <div className="flex flex-col items-center gap-3">
          <LicensePlateImage
            imageUrl={event.licensePlateImageUrl}
            onClick={toggleLicensePlateExpanded}
          />

          {isLicensePlateExpanded && <LicensePlateDmvVerification />}

          {vehicleInfo && isLicensePlateExpanded && (
            <VehicleInfoDisplay vehicleInfo={vehicleInfo} />
          )}
        </div>
      </div>
    </motion.div>
  );
};
