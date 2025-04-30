import { IRespontMeta } from "@/utils/axios";

export interface IRespontUser extends IRespontMeta {
  data: IDatumUser | null;
}

export interface IDatumUser {
  id: number;
  uuid: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
  blog: IBlogData[];
}

export interface IBlogData {
  id: number;
  uuid: string;
  createdAt: Date;
  titles: string;
  content: string;
  status: string;
}
