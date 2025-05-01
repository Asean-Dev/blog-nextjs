import Iconify from "@/components/iconify";
import {
  Avatar,
  Box,
  Card,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { IBlogData } from "./actions/type";
import HighlightedText from "./highlight-text";
import { ReturnType } from "@/hook/use-boolean";
type Props = {
  data: IBlogData[] | null;
  search: string;
};

const CardView = ({ data, search }: Props) => {
  const router = useRouter();
  const path = (uuid: string) => `/home/${uuid}`;
  const handleVirwCommment = useCallback(
    (uuid: string) => {
      router.push(path(uuid));
    },
    [router]
  );
  return (
    <Card sx={{ borderRadius: "12px" }}>
      {data?.map((item, index) => (
        <Stack
          key={index}
          sx={{
            p: 4,
            borderTop: index == 0 ? "0" : "solid 1px #BBC2C0 ",
          }}
          spacing={2}
          onClick={() => handleVirwCommment(item.uuid)}
        >
          <Stack direction={"row"} justifyContent={"space-between"} width={1}>
            <Stack
              direction={"row"}
              spacing={1}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              <Avatar
                sx={{ width: "31px", height: "31px" }}
                src="/image/user.png"
              />
              <Typography
                sx={{ fontSize: "14px", fontWeight: 500 }}
                color={"gray"}
              >
                {item.user.userName}
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <Chip size={"small"} label={item.status} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
              <HighlightedText text={item.titles} keyword={search} />
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 400,
                display: "-webkit-box",
                overflow: "hidden",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
              }}
            >
              <HighlightedText text={item.content} keyword={search} />
            </Typography>
          </Box>
          <Stack
            spacing={0.5}
            direction={"row"}
            alignItems={"center"}
            sx={{
              color: "#939494",
              "&:hover": {
                color: "#000",
                cursor: "pointer",
              },
            }}
            onClick={() => handleVirwCommment(item.uuid)}
          >
            <Iconify
              icon={"tabler:message-circle"}
              sx={{
                width: "16px",
                height: "16px",
              }}
            />
            <Typography sx={{ fontSize: "12px" }}>
              {item.commentCount} Comments
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Card>
  );
};

export default CardView;
