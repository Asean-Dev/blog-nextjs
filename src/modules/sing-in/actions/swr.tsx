import { endpoints, fetcher } from "@/utils/axios";
import qs from "query-string";
import { useMemo } from "react";
import useSWR, { mutate } from "swr";
import { IRespontUser } from "./type";
import { getToken } from "@/utils/cookie";

export function useUserInfo() {
  const URL = endpoints.user;

  const url = qs.stringifyUrl({
    url: `${URL}/me`,
  });

  const key = url;

  const { data, isLoading, error, isValidating } = useSWR(key, fetcher);

  const memoizedValue = useMemo(
    () => ({
      data: (data as IRespontUser) || [],
      isListsLoading: isLoading,
      isListsError: error,
      isListsValidating: isValidating,
      refreshData: () => mutate(key),
    }),
    [data, error, isLoading, isValidating, key]
  );
  return memoizedValue;
}
