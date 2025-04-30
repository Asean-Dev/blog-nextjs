// ----------------------------------------------------------------------

import { AuthGuard } from "@/auth/guard";
import DashboardLayout from "@/layout/dashboard-layout";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <AuthGuard>{children}</AuthGuard>;
}
