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
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { IBlogOneData } from "../home/blog-one/actions/types";
import { useFindBlogOne, useUpdateBlog } from "../home/blog-one/actions/client";

type Props = {
  isOpen: ReturnType;
  refreshData: VoidFunction;
  uuid: string;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const EditBlog = ({ isOpen, refreshData, uuid }: Props) => {
  const [data, setData] = useState<IBlogOneData>();
  const methods = useForm({
    defaultValues: {
      status: "",
      titles: "",
      content: "",
    },
  });
  const values = methods.watch();
  const handleApi = async () => {
    const result = await useFindBlogOne({ uuid });
    if (result.data) {
      setData(result.data);
      methods.setValue("status", result.data.status);
      methods.setValue("titles", result.data.titles);
      methods.setValue("content", result.data.content);
    }
  };

  useEffect(() => {
    if (uuid && isOpen.value) {
      handleApi();
    }
  }, [uuid, isOpen]);

  const matches = useMediaQuery("(min-width:600px)");

  console.log("methods", methods.watch());

  const handleDialogClose = () => {
    isOpen.onToggle();
  };

  const handleSubmit = methods.handleSubmit(async (data) => {
    const update = await useUpdateBlog({ ...data, uuid: uuid });
    if (update.success) {
      toast.success("You're create blog success.");
      isOpen.onFalse();
      refreshData();
    }
  });

  const hasData = !!values.content && !!values.status && !!values.titles;
  return (
    <BootstrapDialog
      onClose={isOpen.onToggle}
      aria-labelledby="customized-dialog-title"
      open={isOpen.value}
      sx={{ overflowX: "hidden" }}
    >
      <RHFProvider methods={methods} onSubmit={handleSubmit}>
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
      </RHFProvider>
    </BootstrapDialog>
  );
};

export default EditBlog;
const STATUS = [
  "History",
  "Food",
  "Pets",
  "Health",
  "Fashion",
  "Exercise",
  "Others",
];
