import { dayFromNow } from "@/utils/date-formate";
import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import { IBlogComment } from "./actions/types";

type Props = {
  comment?: IBlogComment;
};

const CommentCard = ({ comment }: Props) => {
  return (
    <Stack>
      <Stack
        direction={"row"}
        spacing={1}
        alignItems={"center"}
        justifyContent={"flex-start"}
      >
        <Avatar sx={{ width: "24px", height: "24px" }} />
        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
          {comment?.user.userName}{" "}
          <Typography
            component={"span"}
            sx={{ fontSize: "12px", fontWeight: 500 }}
            color={"gray"}
          >
            {" "}
            {dayFromNow(comment?.createdAt)}
          </Typography>
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        spacing={1}
        alignItems={"center"}
        justifyContent={"flex-start"}
      >
        <Avatar sx={{ width: "24px", height: "24px", opacity: 0 }} />
        <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
          {comment?.comment}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CommentCard;
