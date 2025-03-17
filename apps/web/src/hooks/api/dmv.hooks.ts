import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

import { VehicleInfoResponse } from "@/types/api/api-responses";
import { client } from "@/lib/client";
import { queryKeysFactory } from "@/lib/query-key-factory";

const DMV_QUERY_KEY = "dmv" as const;
export const dmvQueryKeys = queryKeysFactory(DMV_QUERY_KEY);

export const useGetVehicleInfo = (
  licensePlate: string,
  options?: UseQueryOptions<
    VehicleInfoResponse,
    Error,
    VehicleInfoResponse,
    QueryKey
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () => client.dmv.getVehicleInfo(licensePlate),
    queryKey: dmvQueryKeys.detail("vehicle-info"),
    ...options,
    gcTime: 100000,
  });

  return {
    data,
    ...rest,
  };
};
