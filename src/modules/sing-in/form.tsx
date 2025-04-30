"use client";
import RHFProvider from "@/components/hook-form/form-provider";
import RHFTextField from "@/components/hook-form/rhf-text-field";
import { Button } from "@mui/material";
import { useCallback } from "react";

import { useForm } from "react-hook-form";
type Props = {};
type FormValues = {
  username: string;
};
const SingInForm = (props: Props) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      username: "",
    },
  });

  const handleSubmit = useCallback(() => {}, []);

  return (
    <RHFProvider methods={methods} onSubmit={handleSubmit}>
      <div className="w-screen pl-4 pr-4 sm:w-[384px] flex flex-col gap-4">
        <p className=" text-[28px]">Sign In</p>
        <div className=" flex flex-col gap-2">
          <RHFTextField name="username" label="Username" />
          <Button variant={"contained"} fullWidth sx={{ bgcolor: "#49A569" }}>
            Sign In
          </Button>
        </div>
      </div>
    </RHFProvider>
  );
};

export default SingInForm;
