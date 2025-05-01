import { ContentCut } from "@mui/icons-material";
import {
  Box,
  ListItemIcon,
  MenuItem,
  MenuList,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback } from "react";
import ListItemText from "@mui/material/ListItemText";
import { usePathname, useRouter } from "next/navigation";
type Props = {};

export const MENU = [
  {
    label: "Home",
    paths: "/home",
    logo: "/home",
  },
  {
    label: "Our Blog",
    paths: "/blog",
    logo: "/edit",
  },
];

const Menu = (props: Props) => {
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
    <Stack
      direction={"column"}
      spacing={2}
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      sx={{ width: "20%", pt: 4 }}
    >
      <MenuList sx={{ width: 1, p: 0 }}>
        {MENU.map((item, index) => (
          <MenuItem
            key={index}
            sx={{ mb: 1 }}
            onClick={() => handleMenu(item.paths)}
          >
            <ListItemIcon>
              <img src={`/logo/${item.logo}.png`}></img>
            </ListItemIcon>
            <ListItemText>
              {pathname.includes(item.paths) ? (
                <Typography variant={"subtitle2"} sx={{ fontWeight: 800 }}>
                  {item.label}
                </Typography>
              ) : (
                <Typography variant={"subtitle2"} sx={{ fontWeight: 500 }}>
                  {item.label}
                </Typography>
              )}
            </ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </Stack>
  );
};

export default Menu;
