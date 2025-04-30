import { Box } from "@mui/material";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <Box
      sx={{
        width: 1,
        top: 0,
        height: "4rem",
        bgcolor: "#243831",
      }}
    >
      Header
    </Box>
  );
};

export default Header;
