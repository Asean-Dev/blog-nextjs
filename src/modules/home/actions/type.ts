import { IRespontMeta } from "@/utils/axios";

export interface IRespontBlog extends IRespontMeta {
  data: IBlogData[] | null;
}

export interface IBlogData {
  id: number;
  uuid: string;
  createdAt: Date;
  titles: string;
  content: string;
  status: string;
  user: {
    userName: string;
  };
  commentCount: number;
}
