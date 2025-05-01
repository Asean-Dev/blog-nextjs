import Iconify from "@/components/iconify";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { ReturnType, useBoolean } from "@/hook/use-boolean";
import HighlightedText from "../home/highlight-text";
import { IBlogData } from "../home/actions/type";
import { useDeleteBlog } from "../home/blog-one/actions/client";
import { toast } from "sonner";
type Props = {
  data: IBlogData[] | null;
  search: string;
  uuid: string;
  setUuid: (i: string) => void;
  isEditOpen: ReturnType;
  refreshData: VoidFunction;
};

const CardBlogView = ({
  data,
  search,
  setUuid,
  uuid,
  isEditOpen,
  refreshData,
}: Props) => {
  const isDelete = useBoolean();
  const router = useRouter();
  const matches = useMediaQuery("(min-width:600px)");

  const handleVirwCommment = useCallback(
    (uuid: string) => {
      router.push(`home/${uuid}`);
    },
    [router]
  );

  const hadleDelete = useCallback(async () => {
    const data = await useDeleteBlog({ uuid });
    if (data.success) {
      toast.success("You're create blog success.");
      isDelete.onFalse();
      refreshData();
    }
  }, [uuid]);
  const hadleCencel = useCallback(async () => {
    isDelete.onFalse();
  }, []);

  return (
    <Card sx={{ borderRadius: "12px" }}>
      <Dialog
        open={isDelete.value}
        keepMounted
        onClose={isDelete.onToggle}
        aria-describedby="alert-dialog-slide-description"
      >
        <Stack
          p={4}
          alignItems={"center"}
          width={1}
          spacing={2}
          sx={{ borderRadius: "12px" }}
        >
          <Box>
            <Typography
              sx={{ fontSize: "h6", fontWeight: 600, textAlign: "center" }}
            >
              Please confirm if you wish to
              <br /> delete the post
            </Typography>
            <Typography
              sx={{ fontSize: "14px", fontWeight: 400, textAlign: "center" }}
            >
              Are you sure you want to delete the post? <br />
              Once deleted, it cannot be recovered.
            </Typography>
          </Box>
          {!matches ? (
            <Stack direction={"column"} width={1} spacing={2}>
              <Button
                variant={"contained"}
                color="error"
                fullWidth
                sx={{ textTransform: "none" }}
                onClick={hadleDelete}
              >
                Delete
              </Button>
              <Button
                variant={"outlined"}
                color="inherit"
                fullWidth
                sx={{ textTransform: "none" }}
                onClick={hadleCencel}
              >
                Cancel
              </Button>
            </Stack>
          ) : (
            <Stack direction={"row"} width={1} spacing={2}>
              <Button
                variant={"outlined"}
                color="inherit"
                fullWidth
                sx={{ textTransform: "none" }}
                onClick={hadleCencel}
              >
                Cancel
              </Button>
              <Button
                variant={"contained"}
                color="error"
                fullWidth
                sx={{ textTransform: "none" }}
                onClick={hadleDelete}
              >
                Delete
              </Button>
            </Stack>
          )}
        </Stack>
      </Dialog>

      {data?.map((item, index) => (
        <Stack
          key={index}
          sx={{
            p: 4,
            borderTop: index == 0 ? "0" : "solid 1px #BBC2C0 ",
          }}
          spacing={2}
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
            <Stack
              direction={"row"}
              spacing={1}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              <IconButton
                onClick={() => {
                  setUuid(item.uuid);
                  isEditOpen.onTrue();
                }}
              >
                <img
                  style={{ width: "16px", height: "16px" }}
                  src={"/logo/edit-03.png"}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  setUuid(item.uuid);
                  isDelete.onTrue();
                }}
              >
                <img
                  style={{ width: "16px", height: "16px" }}
                  src={"/logo/trash-01.png"}
                />
              </IconButton>
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

export default CardBlogView;
