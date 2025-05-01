"use client";
import Iconify from "@/components/iconify";
import { useBoolean } from "@/hook/use-boolean";
import usePopover from "@/hook/use-popover";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  IconButton,
  InputAdornment,
  InputBase,
  MenuItem,
  Paper,
  Popover,
  Stack,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import CreateBlog from "../home/create-blog";
import { STATUS } from "../home/home-view";
import { useBlogOur } from "./actions/swr";
import EditBlog from "./blog-edit";
import CardBlogView from "./card";

type Props = {};

const BlogView = (props: Props) => {
  const isOpen = useBoolean();
  const isEditOpen = useBoolean();
  const [value, setValue] = useState("Community");
  const [uuid, setUuid] = useState("");

  const { data, refreshData } = useBlogOur({
    value: value === "Community" ? "" : value,
  });

  const popover = usePopover();
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const [search, setSearch] = useState("");

  const hadleGetValue = useCallback(
    (value: string) => {
      setValue(value);
      popover.onClose();
      refreshData();
    },
    [setValue, popover, refreshData]
  );

  useEffect(() => {
    if (!isOpen.value) {
      refreshData();
    }
  }, [isOpen.value]);
  return (
    <Stack
      sx={{
        width: "100%",
        padding: 4,
      }}
      spacing={4}
    >
      <EditBlog isOpen={isEditOpen} refreshData={refreshData} uuid={uuid} />
      <CreateBlog isOpen={isOpen} refreshData={refreshData} />
      <Stack
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 2, sm: 2 },
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 1,
            borderRadius: "8px",
            border: " solid 1px #49A569",
          }}
        >
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Search "
            sx={{
              ml: 1,
              flex: 1,
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Paper>
        <Stack direction={"row"} sx={{ mt: 0 }}>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-haspopup="true"
            sx={{ color: "#000", width: "150px", textTransform: "none" }}
            onClick={popover.onOpen}
            endIcon={
              <motion.div
                animate={{
                  rotate: Boolean(popover.open) ? 180 : 0,
                }}
                transition={{
                  duration: 0.1,
                  ease: "easeInOut",
                }}
              >
                <Stack alignItems={"center"} justifyContent={"center"}>
                  <Iconify
                    icon={"iconamoon:arrow-down-2"}
                    sx={{ width: "20px", height: "20px" }}
                  />
                </Stack>
              </motion.div>
            }
          >
            {value}
          </Button>
          <Popover
            // id={id}
            open={Boolean(popover.open)}
            anchorEl={popover.open}
            onClose={popover.onClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            {STATUS.map((e, index) => (
              <MenuItem key={index} onClick={() => hadleGetValue(e)}>
                {e}
              </MenuItem>
            ))}
          </Popover>
          <Button
            variant={"contained"}
            sx={{ bgcolor: "#49A569", textTransform: "none" }}
            // fullWidth
            endIcon={
              <Iconify
                icon={"material-symbols-light:add"}
                sx={{ width: "20px", height: "20px" }}
              />
            }
            onClick={() => {
              isOpen.onTrue();
            }}
          >
            Create
          </Button>
        </Stack>
      </Stack>
      <CardBlogView
        data={data.data}
        search={search}
        setUuid={setUuid}
        uuid={uuid}
        isEditOpen={isEditOpen}
        refreshData={refreshData}
      />
    </Stack>
  );
};

export default BlogView;
