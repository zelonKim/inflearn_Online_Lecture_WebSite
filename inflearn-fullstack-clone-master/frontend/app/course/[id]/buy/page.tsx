import * as api from "@/lib/api";
import BuyUI from "./ui";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page(props: PageProps) {
  const { id } = await props.params;

  const [courseRes, profileRes] = await Promise.all([
    api.getCourseById(id),
    api.getProfile(),
  ]);

  if (!courseRes.data) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-xl font-semibold">존재하지 않는 강의입니다.</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BuyUI course={courseRes.data} userProfile={profileRes.data || null} />
    </div>
  );
}
