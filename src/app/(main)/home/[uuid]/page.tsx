import BlogOne from "@/modules/home/blog-one";

type Props = {
  params: { uuid: string };
};

export default async function Page({ params }: { params: { uuid: string } }) {
  const { uuid } = await params;

  return <BlogOne uuid={uuid} />;
}
