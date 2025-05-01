"use client";

import { useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUserInfo } from "@/modules/sing-in/actions/swr";
import { toast } from "sonner";
import { getToken } from "@/utils/cookie";
import { verifyJWT } from "@/utils/decode-jwt";

type Props = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const token = getToken();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  // const verify = await verifyJWT(token.token || "");
  // if (!verify) return;
  useEffect(() => {
    if (token.token) return;

    let href = `/?${createQueryString("returnTo", pathname)}`;
    toast.success("You're unauthorized. Please sign in to continue.");
    router.replace(href);
  }, [token.token]);

  return <>{children}</>;
}
