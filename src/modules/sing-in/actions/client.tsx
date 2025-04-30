"use client";
import axios, { endpoints } from "@/utils/axios";
import { setToken } from "@/utils/cookie";
import { IRespontUser } from "./type";
export const useSignIn = async ({
  userName,
}: {
  userName: string;
}): Promise<IRespontUser> => {
  try {
    const serializedDto = JSON.stringify({ userName: userName });

    const res = await axios.post(`${endpoints.user}/sign-in`, serializedDto, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setToken(res?.data?.data?.access_token);
    return res.data;
  } catch (error) {
    throw new Error("Failed to sign in");
  }
};
