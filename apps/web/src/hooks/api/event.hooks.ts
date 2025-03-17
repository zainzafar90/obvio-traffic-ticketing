import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { UpdateEventReq } from "@/types/api/api-payloads";
import { EventResponse } from "@/types/api/api-responses";
import { client } from "@/lib/client";
import { queryClient } from "@/lib/query-client";
import { queryKeysFactory } from "@/lib/query-key-factory";

const EVENT_QUERY_KEY = "events" as const;
export const eventQueryKeys = queryKeysFactory(EVENT_QUERY_KEY);

export const useRandomEvent = (
  options?: UseQueryOptions<EventResponse, Error, EventResponse, QueryKey>
) => {
  const { data, ...rest } = useQuery({
    queryFn: () => client.event.getRandom(),
    queryKey: eventQueryKeys.detail("random"),
    ...options,
    gcTime: 100000,
  });

  return {
    data,
    ...rest,
  };
};

export const useUpdateEvent = (
  options?: UseMutationOptions<
    EventResponse,
    Error,
    UpdateEventReq & { id: string }
  >
) => {
  return useMutation({
    mutationFn: (payload) => {
      const { id, ...updateData } = payload;
      return client.event.update(id, updateData);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: eventQueryKeys.detail(variables.id),
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
