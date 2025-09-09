import { notFound } from "next/navigation";
import EditCourseHeader from "./components/edit-course-header";
import * as api from "@/lib/api";
import EditCourseSidebar from "./components/edit-course-sidebar";

export default async function EditCourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await api.getCourseById(id);

  if (course.error || !course.data) {
    notFound();
  }

  return (
    <div className="w-full h-full bg-[#F1F3F5]">
      <EditCourseHeader title={course.data?.title} />
      <div className="p-12 flex min-h-screen gap-12">
        <EditCourseSidebar />
        {children}
      </div>
    </div>
  );
}
