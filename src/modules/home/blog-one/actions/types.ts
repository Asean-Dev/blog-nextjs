import { IRespontMeta } from "@/utils/axios";

export interface IRespontBlogOne extends IRespontMeta {
  data: IBlogOneData | null;
}
export interface IRespontCreateBlog extends IRespontMeta {
  data: IResCreateBlog | null;
}

export interface IBlogOneData {
  id: number;
  uuid: string;
  titles: string;
  content: string;
  createdAt: Date;
  status: string;
  user: {
    userName: string;
  };
  blogComment: IBlogComment[];
}

export interface IBlogComment {
  createdAt: Date;
  comment: string;
  user: {
    userName: string;
  };
}

export interface IResCreateBlog {
  id: number;
  uuid: string;
  userId: number;
  titles: string;
  content: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
