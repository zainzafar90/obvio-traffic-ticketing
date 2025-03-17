import { useState } from "react";

import { Loader2, Search } from "lucide-react";

import { client } from "@/lib/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useLicensePlateStore } from "../stores/license-plate.store";
import { LicensePlateVerificationStatus } from "../types/enums";

export function LicensePlateDmvVerification() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    licensePlateNumber,
    setLicensePlateNumber,
    setVehicleInfo,
    setVerificationStatus,
  } = useLicensePlateStore((state) => ({
    licensePlateNumber: state.licensePlateNumber,
    setLicensePlateNumber: state.setLicensePlateNumber,
    setVehicleInfo: state.setVehicleInfo,
    setVerificationStatus: state.setVerificationStatus,
  }));

  const handleVerify = async () => {
    if (!licensePlateNumber.trim()) {
      setError("Please enter a license plate number");
      return;
    }

    setIsLoading(true);
    setError("");
    setVerificationStatus(LicensePlateVerificationStatus.PENDING);
    try {
      const result = await client.dmv.getVehicleInfo(licensePlateNumber);
      setVehicleInfo(result);
      setVerificationStatus(LicensePlateVerificationStatus.SUCCESS);
    } catch (err) {
      setError("An error occurred while verifying the license plate");
      console.error("DMV API error:", err);
      setVerificationStatus(LicensePlateVerificationStatus.ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-2 rounded-md border bg-background p-3">
      <div className="mb-1 w-full text-xs font-medium">
        DMV Information Check
      </div>
      <div className="!ml-0 flex w-full max-w-full space-x-2">
        <Input
          autoFocus
          value={licensePlateNumber}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleVerify();
            }
          }}
          onChange={(e) => setLicensePlateNumber(e.target.value)}
          placeholder="Enter license plate number"
          className="m-0 w-full"
        />

        <Button color="zinc" onClick={handleVerify} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Search className="size-4" />
          )}
          Verify
        </Button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
