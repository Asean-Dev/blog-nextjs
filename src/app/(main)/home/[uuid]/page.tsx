import { AuthGuard } from "@/auth/guard";
import BlogOne from "@/modules/home/blog-one";

export default function Page({ params }: { params: { uuid: string } }) {
  const { uuid } = params;

  return (
    <AuthGuard>
      <BlogOne uuid={uuid} />
    </AuthGuard>
  );
}
