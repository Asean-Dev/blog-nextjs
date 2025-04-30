"use client";
import axios, { endpoints } from "@/utils/axios";
import { getToken } from "@/utils/cookie";
import { IRespontBlogOne, IRespontCreateBlog } from "./types";

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
  } catch (error) {
    throw new Error("Failed to sign in");
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
