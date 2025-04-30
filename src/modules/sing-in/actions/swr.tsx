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
  const token = getToken();
  // if (token.Authorization) {
  const { data, isLoading, error, isValidating } = useSWR(url, fetcher);

  const memoizedValue = useMemo(
    () => ({
      data: (data as IRespontUser) || [],
      isListsLoading: isLoading,
      isListsError: error,
      isListsValidating: isValidating,
      refreshData: () => mutate(url),
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
  // } else {
  //   const memoizedValue = useMemo(
  //     () => ({
  //       data: [],
  //       isListsLoading: isLoading,
  //       isListsError: error,
  //       isListsValidating: isValidating,
  //       refreshData: () => mutate(url),
  //     }),
  //     [data?.data, error, isLoading, isValidating]
  //   );
  //   return memoizedValue;
  // }
}
