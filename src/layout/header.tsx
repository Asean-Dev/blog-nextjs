import { useBoolean } from "@/hook/use-boolean";
import { useUserInfo } from "@/modules/sing-in/actions/swr";
import { removedToken } from "@/utils/cookie";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  SpeedDial,
  SpeedDialAction,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const Header = (props: Props) => {
  const router = useRouter();
  const open = useBoolean();
  const { data, refreshData } = useUserInfo();

  return (
    <Box
      sx={{
        width: 1,
        top: 0,
        height: "4rem",
        bgcolor: "#243831",
      }}
    >
      <Stack
        pl={"32px"}
        pr={"32px"}
        height={1}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Drawer anchor="right" open={open.value} onClose={open.onToggle}>
          <Box sx={{ width: 300 }} role="presentation" onClick={open.onFalse}>
            <Stack direction={"row"} width={1} mt={5} justifyContent={"center"}>
              <Button
                variant={"outlined"}
                sx={{
                  color: "#49A569",
                  borderColor: "#49A569",
                  textTransform: "none",
                  minWidth: 100,
                }}
                onClick={() => {
                  removedToken(), refreshData(), router.push("/");
                }}
              >
                Sign Out
              </Button>
            </Stack>
          </Box>
        </Drawer>
        <img
          src={"/image/logo.png"}
          style={{ height: "24px", width: "auto" }}
        />
        {data.success ? (
          <Stack
            spacing={2}
            direction={"row"}
            alignItems={"center"}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={open.onTrue}
          >
            <Typography sx={{ fontSize: "16px", fontWeight: 600 }} color="#fff">
              {data.data?.userName}
            </Typography>
            <Avatar
              sx={{ width: "31px", height: "31px" }}
              src="/image/user.png"
            />
          </Stack>
        ) : (
          <Button
            variant={"contained"}
            sx={{ bgcolor: "#49A569" }}
            onClick={() => router.push("/")}
          >
            Sign In
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default Header;
