"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  {
    label: "대시보드",
    href: "/instructor",
  },
  {
    label: "새 강의 만들기",
    href: "/create_courses",
  },
  {
    label: "강의 관리",
    href: "/instructor/courses",
  },
  {
    label: "강의 질문 관리",
    href: "/instructor/questions",
  },
  {
    label: "수강평 리스트",
    href: "/instructor/reviews",
  },
];

export default function InstructorSidebar() {
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState("");

  return (
    <aside className="hidden sm:flex flex-col md:w-full max-w-[260px]   gap-2 p-4 border-r bg-white min-h-screen">
      {sidebarItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Button
            key={item.label}
            variant="link"
            className={`justify-start w-full text-base font-medium ${
              isActive ? "bg-white text-primary font-bold" : "text-gray-700"
            }`}
          >
            <a href={item.href}>{item.label}</a>
          </Button>
        );
      })}
    </aside>
  );
}
