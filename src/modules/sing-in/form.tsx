"use client";
import RHFProvider from "@/components/hook-form/form-provider";
import RHFTextField from "@/components/hook-form/rhf-text-field";
import { Button } from "@mui/material";
import { useCallback } from "react";
import { Toaster, toast } from "sonner";
import { useForm } from "react-hook-form";
import { useSignIn } from "./actions/client";
import { useRouter } from "next/navigation";
type Props = {};
type FormValues = {
  userName: string;
};

const SingInForm = (props: Props) => {
  const router = useRouter();
  const methods = useForm<FormValues>({
    defaultValues: {
      userName: "",
    },
  });

  const handleSubmit = methods.handleSubmit(async (data) => {
    console.log("data", data);
    const result = await useSignIn({ userName: data.userName });
    if (result) {
      toast.success(result.message);
      router.push("home");
    }
  });

  return (
    <RHFProvider methods={methods} onSubmit={handleSubmit}>
      <div className="w-screen pl-4 pr-4 sm:w-[384px] flex flex-col gap-4">
        <p className=" text-[28px] text-white ">Sign In</p>
        <div className=" flex flex-col gap-2">
          <RHFTextField name="userName" label="Username" />
          <Button
            variant={"contained"}
            fullWidth
            sx={{ bgcolor: "#49A569" }}
            type={"submit"}
          >
            Sign In
          </Button>
        </div>
      </div>
    </RHFProvider>
  );
};

export default SingInForm;
