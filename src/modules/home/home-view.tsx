"use client";

import Iconify from "@/components/iconify";
import usePopover from "@/hook/use-popover";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  InputAdornment,
  MenuItem,
  Popover,
  Stack,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { useBlog } from "./actions/swr";
import CardView from "./card";
import CreateBlog from "./create-blog";
import { useBoolean } from "@/hook/use-boolean";

type Props = {};

const HomeView = (props: Props) => {
  const isOpen = useBoolean();
  const [value, setValue] = useState("Community");
  const { data, refreshData } = useBlog({
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
      <CreateBlog isOpen={isOpen} refreshData={refreshData} />
      <Stack
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
        spacing={2}
      >
        <TextField
          size={"small"}
          fullWidth
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Stack direction={"row"}>
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
                <Stack alignItems={"center "} justifyContent={"center"}>
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
            sx={{ bgcolor: "#49A569" }}
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
      <CardView data={data.data} search={search} />
    </Stack>
  );
};

export default HomeView;

const STATUS = [
  "Community",
  "History",
  "Food",
  "Pets",
  "Health",
  "Fashion",
  "Exercise",
  "Others",
];
