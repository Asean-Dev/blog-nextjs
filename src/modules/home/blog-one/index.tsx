"use client";

import Iconify from "@/components/iconify";
import { dayFromNow } from "@/utils/date-formate";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import CommentCard from "./comment-card";
import { useCreateComment, useFindBlogOne } from "./actions/client";
import { IBlogOneData } from "./actions/types";
import { useBoolean } from "@/hook/use-boolean";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  uuid: string;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const BlogOne = ({ uuid }: Props) => {
  const isAddComment = useBoolean(true);
  const router = useRouter();
  const matches = useMediaQuery("(min-width:600px)");
  const [data, setData] = useState<IBlogOneData>();
  const [commentMgs, setCommentMgs] = useState<string>("");

  const handleApi = async () => {
    const result = await useFindBlogOne({ uuid });
    if (result.data) {
      setData(result.data);
    }
  };

  useEffect(() => {
    handleApi();
  }, [uuid]);

  const handleComment = useCallback(async () => {
    const data = await useCreateComment({
      comment: commentMgs,
      blogUuid: uuid,
    });

    if (data.success) {
      handleApi();
      isAddComment.onTrue();
      setCommentMgs("");
    }
  }, [commentMgs, uuid]);

  const blog = (
    <Stack spacing={2}>
      <Stack
        direction={"row"}
        spacing={1}
        alignItems={"center"}
        justifyContent={"flex-start"}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            sx={{ width: "31px", height: "31px" }}
            src="/image/user.png"
          />
        </StyledBadge>
        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
          {data?.user.userName}{" "}
          <Typography
            component={"span"}
            sx={{ fontSize: "12px", fontWeight: 500 }}
            color={"gray"}
          >
            {" "}
            {dayFromNow(data?.createdAt)}
          </Typography>
        </Typography>
      </Stack>
      <Box>
        <Chip size={"small"} label={data?.status} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
          {data?.titles}
        </Typography>
        <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
          {data?.content}
        </Typography>
      </Box>
      <Stack
        spacing={0.5}
        direction={"row"}
        alignItems={"center"}
        sx={{
          color: "#939494",
          // "&:hover": {
          //   color: "#000",
          //   cursor: "pointer",
          // },
        }}
      >
        <Iconify
          icon={"tabler:message-circle"}
          sx={{
            width: "16px",
            height: "16px",
          }}
        />
        <Typography sx={{ fontSize: "12px" }}>
          {data?.blogComment.length} Comments
        </Typography>
      </Stack>
    </Stack>
  );

  const commentInput = (
    <Stack direction={"column"} width={1} spacing={2}>
      <TextField
        id="outlined-multiline-static"
        label="What’s on your mind..."
        multiline
        rows={4}
        color="primary"
        value={commentMgs}
        onChange={(e) => setCommentMgs(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#49A569",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#49A569",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#49A569", // สี label เมื่อ focus
          },
        }}
      />
      <Stack
        width={1}
        direction={"row"}
        justifyContent={"flex-end"}
        spacing={2}
      >
        <Box>
          <Button
            variant={"outlined"}
            sx={{
              color: "#49A569",
              borderColor: "#49A569",
              textTransform: "none",
              minWidth: 100,
            }}
            onClick={() => {
              setCommentMgs(""), isAddComment.onToggle();
            }}
          >
            Cancel
          </Button>
        </Box>
        <Box>
          <Button
            variant={"contained"}
            sx={{
              color: "#fff",
              bgcolor: "#49A569",
              textTransform: "none",
              minWidth: 100,
            }}
            disabled={!!!commentMgs}
            onClick={handleComment}
          >
            Post
          </Button>
        </Box>
      </Stack>
    </Stack>
  );

  const handleDialogClose = () => {
    isAddComment.onToggle();
    openDialog.onToggle();
  };
  const openDialog = useBoolean(true);

  const dialog = (
    <BootstrapDialog
      // sx={{ width: "90vh" }}
      onClose={handleDialogClose}
      aria-labelledby="customized-dialog-title"
      open={openDialog.value}
    >
      <DialogTitle
        sx={{ m: 0, pt: 5, minWidth: "95vw" }}
        id="customized-dialog-title"
      >
        Add Comments
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={handleDialogClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <Stack direction={"column"} width={1} spacing={2} padding={2}>
        <TextField
          id="outlined-multiline-static"
          label="What’s on your mind..."
          multiline
          rows={4}
          color="primary"
          value={commentMgs}
          onChange={(e) => setCommentMgs(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#49A569",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#49A569",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#49A569", // สี label เมื่อ focus
            },
          }}
        />
        <Stack width={1} direction={"column"} spacing={1}>
          <Button
            variant={"outlined"}
            sx={{
              color: "#49A569",
              borderColor: "#49A569",
              textTransform: "none",
              minWidth: 100,
            }}
            onClick={() => setCommentMgs("")}
          >
            Cancel
          </Button>

          <Button
            variant={"contained"}
            sx={{
              color: "#fff",
              bgcolor: "#49A569",
              textTransform: "none",
              minWidth: 100,
            }}
            disabled={!!!commentMgs}
            onClick={handleComment}
          >
            Post
          </Button>
        </Stack>
      </Stack>
    </BootstrapDialog>
  );

  return (
    <Stack height={"100vh"} width={1} bgcolor={"#FFF"} p={4} spacing={4}>
      <Box>
        <Button
          variant="contained"
          onClick={() => router.back()}
          sx={{
            backgroundColor: "#D8E9E4",
            minWidth: 40,
            width: 40,
            height: 40,
            padding: 0,
            borderRadius: "50%",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#c9ded8",
            },
          }}
        >
          <Iconify icon="ep:back" sx={{ color: "#000" }} />
        </Button>
      </Box>

      {blog}

      {isAddComment.value ? (
        <Box>
          <Button
            variant={"outlined"}
            sx={{
              color: "#49A569",
              borderColor: "#49A569",
              textTransform: "none",
            }}
            onClick={isAddComment.onFalse}
          >
            Add Comments
          </Button>
        </Box>
      ) : matches ? (
        commentInput
      ) : (
        dialog
      )}

      <Box>
        {data?.blogComment.map((comment, index) => (
          <CommentCard key={index} comment={comment} />
        ))}
      </Box>
    </Stack>
  );
};

export default BlogOne;
