"use client";

import Iconify from "@/components/iconify";
import { useBoolean } from "@/hook/use-boolean";
import usePopover from "@/hook/use-popover";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  InputAdornment,
  MenuItem,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
type Props = {};

const HomeView = (props: Props) => {
  const popover = usePopover();
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [value, setValue] = useState("Dashboard");

  const hadleGetValue = useCallback(
    (value: string) => {
      setValue(value);
      popover.onClose();
    },
    [setValue, popover]
  );

  return (
    <Stack
      sx={{
        width: "100%",
      }}
      spacing={4}
    >
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Stack direction={"row"}>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-haspopup="true"
            sx={{ color: "#000", width: "150px" }}
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
            <MenuItem onClick={(e) => hadleGetValue("Dashboard")}>
              Dashboard
            </MenuItem>
            <MenuItem onClick={(e) => hadleGetValue("The")}>The</MenuItem>
            <MenuItem onClick={(e) => hadleGetValue("content")}>
              content
            </MenuItem>
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
          >
            Create
          </Button>
        </Stack>
      </Stack>
      <Card>aaaaa</Card>
    </Stack>
  );
};

export default HomeView;
