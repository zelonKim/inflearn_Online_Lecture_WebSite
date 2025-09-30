import { Metadata } from "next";
import UI from "./ui";
import * as api from "@/lib/api";

export const metadata: Metadata = {
  title: "나의 강의실 - 인프런",
  description: "내가 수강하는 강의 목록을 확인하세요.",
};

export default async function MyCoursesPage() {
  const myCoursesResponse = await api.getAllMyCourses();

  return <UI courses={myCoursesResponse.data || []} />;
}
