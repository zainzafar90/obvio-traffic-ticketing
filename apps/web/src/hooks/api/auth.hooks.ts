import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { EmailPassReq } from "@/types/api/api-payloads";
import { AuthResponse, UserProfileResponse } from "@/types/api/api-responses";
import { queryClient } from "@/lib/query-client";

import { client } from "../../lib/client";

export const useEmailPassLogin = (
  options?: UseMutationOptions<AuthResponse, Error, EmailPassReq>
) => {
  return useMutation({
    mutationFn: (payload) => client.auth.login(payload),
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useCreateAuthUser = (
  options?: UseMutationOptions<AuthResponse, Error, EmailPassReq>
) => {
  return useMutation({
    mutationFn: (payload) => client.auth.register(payload),
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useMe = (
  options?: UseQueryOptions<
    UserProfileResponse,
    Error,
    UserProfileResponse,
    QueryKey
  >
) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => client.auth.me(),
    ...options,
  });
};

export const useLogout = (options?: UseMutationOptions<void, Error, void>) => {
  return useMutation({
    mutationFn: () => client.auth.logout(),
    onSettled(data, error, variables, context) {
      options?.onSettled?.(data, error, variables, context);
      /**
       * When the user logs out, we want to clear the query cache
       */
      queryClient.clear();
    },
    ...options,
  });
};
