import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next.js Tutorial", // 브라우저 탭의 제목으로 설정함.
  description: "Next.js 튜토리얼 배우기",
};

export default function Home() {
  return (
    <main>
      Home
      <div>
        <a href="/dashboard">Go to Dashboard with a tag</a>
        {/* 서버 사이드에서 리다이렉트됨. */}
      </div>
      <div>
        <Link href="/dashboard">Go to Dashboard with Link tag</Link>
        {/* 클라이언트 사이드에서 리다이렉트됨. */}
      </div>
    </main>
  );
}
