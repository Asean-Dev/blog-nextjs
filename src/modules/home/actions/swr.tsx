import { endpoints, fetcher } from "@/utils/axios";
import { useMemo } from "react";
import useSWR, { mutate } from "swr";

import { IRespontBlog } from "./type";


export function useBlog({ value }: { value: string }) {
  const URL = endpoints.blog;

  const key = [URL, { params: { status: value || "" } }];

  const { data, isLoading, error, isValidating } = useSWR(key, fetcher);

  const memoizedValue = useMemo(
    () => ({
      data: (data as IRespontBlog) || [],
      isListsLoading: isLoading,
      isListsError: error,
      isListsValidating: isValidating,
      refreshData: () => mutate(key), // ✅ ใช้ key เดียวกับ useSWR
    }),
    [data, error, isLoading, isValidating, key]
  );

  return memoizedValue;
}
