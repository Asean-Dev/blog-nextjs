"use client";
import React from "react";
import Header from "./header";
import Menu from "./menu";
import { Box, useMediaQuery } from "@mui/material";
import HeaderMini from "./header-mini";
type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const matches = useMediaQuery("(min-width:600px)");

  const menu = matches ? <Menu /> : <></>;
  const header = matches ? <Header /> : <HeaderMini />;
  return (
    <div>
      {header}
      <Box
        sx={{
          display: "flex",
        }}
      >
        {menu}
        <Box sx={{ width: 1 }}>{children}</Box>
      </Box>
    </div>
  );
};

export default DashboardLayout;
