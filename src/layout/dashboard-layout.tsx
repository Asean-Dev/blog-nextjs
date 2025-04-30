"use client";
import React from "react";
import Header from "./header";
import Menu from "./menu";
import { Box, useMediaQuery } from "@mui/material";
type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const matches = useMediaQuery("(min-width:600px)");

  const menu = matches ? <Menu /> : <></>;
  return (
    <div>
      <Header />
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
