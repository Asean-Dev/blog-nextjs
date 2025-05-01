"use client";

import { useUserInfo } from "@/modules/sing-in/actions/swr";
import { getToken } from "@/utils/cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export function GuestGuard({ children }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo") || "/home";
  const token = getToken();

  useEffect(() => {
    if (!token) return;
    if (token.token) {
      router.replace(returnTo);
    }
  }, [token.token]);

  return <>{children}</>;
}
