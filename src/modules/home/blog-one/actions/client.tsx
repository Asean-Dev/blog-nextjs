"use client";
import axios, { endpoints } from "@/utils/axios";
import { getToken } from "@/utils/cookie";
import { AxiosError } from "axios";
import { IRespontBlogOne, IRespontCreateBlog } from "./types";
import * as axiosErorr from "axios";
export const useFindBlogOne = async ({
  uuid,
}: {
  uuid: string;
}): Promise<IRespontBlogOne> => {
  try {
    const token = getToken();
    const res = await axios.get(`${endpoints.blog}/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        ...token.Authorization,
      },
    });
    return res.data;
  } catch (error: any) {
    if (axiosErorr.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error(
        "Axios error:",
        axiosError.response?.data || axiosError.message
      );
      throw new Error("Failed to fetch blog data");
    } else {
      throw error;
    }
  }
};

type PayloadCreateComment = {
  blogUuid: string;
  comment: string;
};

export const useCreateComment = async ({
  blogUuid,
  comment,
}: PayloadCreateComment): Promise<IRespontBlogOne> => {
  try {
    const serializedDto = JSON.stringify({ blogUuid, comment });
    const token = getToken();
    const res = await axios.post(
      `${endpoints.blog}/create-comment`,
      serializedDto,
      {
        headers: {
          "Content-Type": "application/json",
          ...token.Authorization,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw new Error("Failed to sign in");
  }
};

type PayloadCreateBlog = {
  status: string;
  titles: string;
  content: string;
};

export const useCreateBlog = async ({
  status,
  titles,
  content,
}: PayloadCreateBlog): Promise<IRespontCreateBlog> => {
  try {
    const serializedDto = JSON.stringify({ status, titles, content });
    const token = getToken();
    const res = await axios.post(`${endpoints.blog}`, serializedDto, {
      headers: {
        "Content-Type": "application/json",
        ...token.Authorization,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to sign in");
  }
};

type PayloadUpdateBlog = {
  status: string;
  titles: string;
  content: string;
  uuid: string;
};

export const useUpdateBlog = async ({
  status,
  titles,
  content,
  uuid,
}: PayloadUpdateBlog): Promise<IRespontCreateBlog> => {
  try {
    const serializedDto = JSON.stringify({ status, titles, content });
    const token = getToken();
    const res = await axios.put(`${endpoints.blog}/${uuid}`, serializedDto, {
      headers: {
        "Content-Type": "application/json",
        ...token.Authorization,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to sign in");
  }
};
type PayloadDeleteBlog = {
  uuid: string;
};
export const useDeleteBlog = async ({
  uuid,
}: PayloadDeleteBlog): Promise<IRespontCreateBlog> => {
  try {
    const token = getToken();
    const res = await axios.delete(`${endpoints.blog}/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        ...token.Authorization,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to sign in");
  }
};
