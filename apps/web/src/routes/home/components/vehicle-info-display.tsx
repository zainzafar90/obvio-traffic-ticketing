import { motion } from "framer-motion";

import { IVehicleInfo } from "@/types/interfaces/resources";

interface VehicleInfoDisplayProps {
  vehicleInfo: IVehicleInfo;
}

const getColorDisplay = (color: string) => {
  const lowerCaseColor = color.toLowerCase();

  const supportedColors: Record<string, string> = {
    black: "bg-black",
    white: "bg-white border border-gray-200",
    gray: "bg-gray-500",
    silver: "bg-gray-300",
    red: "bg-red-600",
    blue: "bg-blue-600",
    navy: "bg-blue-900",
    green: "bg-green-600",
    yellow: "bg-yellow-400",
    orange: "bg-orange-500",
    brown: "bg-amber-800",
    purple: "bg-purple-600",
    pink: "bg-pink-500",
    beige: "bg-amber-100",
    gold: "bg-amber-400",
    tan: "bg-amber-200",
    burgundy: "bg-red-900",
  };

  const colorClass = supportedColors[lowerCaseColor];

  if (colorClass) {
    return (
      <div className="flex items-center gap-1.5">
        <div
          className={`${colorClass} h-4 w-4 rounded-full border border-foreground`}
        ></div>
        <span>{lowerCaseColor}</span>
      </div>
    );
  }

  return <span>{lowerCaseColor}</span>;
};

export function VehicleInfoDisplay({ vehicleInfo }: VehicleInfoDisplayProps) {
  return (
    <motion.div className="w-full rounded-md border bg-background p-3">
      <h4 className="mb-2 text-xs font-medium">Vehicle Information</h4>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
        <div>
          <span className="text-muted-foreground">Make:</span>{" "}
          {vehicleInfo.make}
        </div>
        <div>
          <span className="text-muted-foreground">Model:</span>{" "}
          {vehicleInfo.model}
        </div>
        <div>
          <span className="text-muted-foreground">Year:</span>{" "}
          {vehicleInfo.year}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">Color:</span>{" "}
          {getColorDisplay(vehicleInfo.color)}
        </div>
      </div>
    </motion.div>
  );
}
