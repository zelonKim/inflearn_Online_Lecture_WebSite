import InstructorPageName from "./components/instructor-page-name";
import InstructorSideBar from "./components/instructor-sidebar";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <InstructorPageName />
      <div className="flex w-6xl mx-auto">
        <InstructorSideBar />
        {children}
      </div>
    </div>
  );
}
