import CourseList from "@/components/course-list";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page_number?: string }>;
}) {
  const { page_number } = await searchParams;

  return (
    <div className="p-6">
      <CourseList q={""} page={page_number ? parseInt(page_number) : 1} />
    </div>
  );
}
