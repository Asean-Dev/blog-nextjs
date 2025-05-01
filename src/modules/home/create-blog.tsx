import { AuthGuard } from "@/auth/guard";
import RHFProvider from "@/components/hook-form/form-provider";
import { RHFAutocomplete } from "@/components/hook-form/rhf-autocomplete";
import RHFTextFieldInput from "@/components/hook-form/rhf-text-field-tnput";
import { ReturnType } from "@/hook/use-boolean";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateBlog } from "./blog-one/actions/client";
type Props = {
  isOpen: ReturnType;
  refreshData: VoidFunction;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CreateBlog = ({ isOpen, refreshData }: Props) => {
  const matches = useMediaQuery("(min-width:600px)");

  const methods = useForm({
    defaultValues: {
      status: "",
      titles: "",
      content: "",
    },
  });

  console.log("methods", methods.watch());

  const values = methods.watch();

  const handleDialogClose = () => {
    isOpen.onToggle();
  };

  const handleSubmit = methods.handleSubmit(async (data) => {
    const create = await useCreateBlog({ ...data });
    if (create.success) {
      toast.success("You're create blog success.");
      isOpen.onFalse();
      refreshData();
    }
  });

  const hasData = !!values.content && !!values.status && !!values.titles;
  return (
    <RHFProvider methods={methods} onSubmit={handleSubmit}>
      <BootstrapDialog
        onClose={isOpen.onToggle}
        aria-labelledby="customized-dialog-title"
        open={isOpen.value}
        sx={{ overflowX: "hidden" }}
      >
        <AuthGuard>
          <Stack width={matches ? "500px" : "350px"}>
            <DialogTitle sx={{ m: 0, pt: 2 }} id="customized-dialog-title">
              Create Post
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleDialogClose}
              sx={(theme) => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}
            >
              <CloseIcon />
            </IconButton>
            <Stack direction={"column"} width={1} spacing={2} padding={2}>
              <RHFAutocomplete
                name="status"
                options={STATUS.map((option) => option) || []}
                getOptionLabel={(option) => option}
                label="Choose a community"
              />
              <RHFTextFieldInput
                name="titles"
                multiline
                rows={4}
                // fullWidth
                label="Title"
              />
              <RHFTextFieldInput
                name="content"
                multiline
                rows={4}
                // fullWidth
                label="What’s on your mind..."
              />
              {/* <TextField
            id="outlined-multiline-static"
            label="What’s on your mind..."
            multiline
            rows={4}
            fullWidth
            color="primary"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
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
          /> */}
              <Stack
                width={1}
                direction={!matches ? "column" : "row"}
                spacing={1}
                justifyContent={"flex-end"}
              >
                <Box minWidth={!matches ? 1 : "100px"}>
                  <Button
                    variant={"outlined"}
                    sx={{
                      color: "#49A569",
                      borderColor: "#49A569",
                      textTransform: "none",
                      minWidth: 100,
                    }}
                    fullWidth
                    onClick={() => methods.reset()}
                  >
                    Cancel
                  </Button>
                </Box>
                <Box minWidth={!matches ? 1 : "100px"}>
                  <Button
                    variant={"contained"}
                    sx={{
                      color: "#fff",
                      bgcolor: "#49A569",
                      textTransform: "none",
                      minWidth: 100,
                    }}
                    fullWidth
                    disabled={!hasData}
                    type={"submit"}
                    onClick={handleSubmit}
                  >
                    Post
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </AuthGuard>
      </BootstrapDialog>
    </RHFProvider>
  );
};

export default CreateBlog;
const STATUS = [
  "History",
  "Food",
  "Pets",
  "Health",
  "Fashion",
  "Exercise",
  "Others",
];
