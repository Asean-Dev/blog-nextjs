import { useBoolean } from "@/hook/use-boolean";
import { useUserInfo } from "@/modules/sing-in/actions/swr";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { MENU } from "./menu";
import { removedToken } from "@/utils/cookie";

type Props = {};

const HeaderMini = (props: Props) => {
  const open = useBoolean();
  const { data } = useUserInfo();
  const pathname = usePathname();
  const router = useRouter();

  console.log("getPath.get", pathname.includes("home"));

  const handleMenu = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );
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
          <Box
            sx={{ width: 300, bgcolor: "#243831", height: 1 }}
            role="presentation"
            onClick={open.onFalse}
          >
            <Stack direction={"row"} width={1} mt={5} justifyContent={"center"}>
              <MenuList sx={{ width: 1, p: 0, mb: 2 }}>
                <MenuItem sx={{ mb: 1 }} onClick={() => open.onFalse()}>
                  <ListItemIcon>
                    <img
                      src={`/logo/Icon.png`}
                      style={{ width: "24px", height: "24px" }}
                    />
                  </ListItemIcon>
                </MenuItem>
                {MENU.map((item, index) => (
                  <MenuItem
                    key={index}
                    sx={{ mb: 1 }}
                    onClick={() => handleMenu(item.paths)}
                  >
                    <ListItemIcon>
                      <img
                        src={`/logo/${item.logo}-05.png`}
                        style={{ width: "24px", height: "24px" }}
                      />
                    </ListItemIcon>
                    <ListItemText>
                      {pathname.includes(item.paths) ? (
                        <Typography
                          variant={"subtitle2"}
                          sx={{ fontWeight: 800, color: "#D8E9E4" }}
                        >
                          {item.label}
                        </Typography>
                      ) : (
                        <Typography
                          variant={"subtitle2"}
                          sx={{ fontWeight: 500, color: "#D8E9E4" }}
                        >
                          {item.label}
                        </Typography>
                      )}
                    </ListItemText>
                  </MenuItem>
                ))}
                <Stack
                  direction={"row"}
                  width={1}
                  mt={5}
                  justifyContent={"center"}
                >
                  <Button
                    variant={"outlined"}
                    sx={{
                      color: "#49A569",
                      borderColor: "#49A569",
                      textTransform: "none",
                      minWidth: 100,
                    }}
                    onClick={() => {
                      removedToken(), router.push("/");
                    }}
                  >
                    Sing Out
                  </Button>
                </Stack>
              </MenuList>
            </Stack>
          </Box>
        </Drawer>
        <img src="/image/logo.png" style={{ height: "24px", width: "auto" }} />
        <IconButton onClick={open.onTrue}>
          <img style={{ width: "24px", height: "24px" }} src="/logo/menu.png" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default HeaderMini;
