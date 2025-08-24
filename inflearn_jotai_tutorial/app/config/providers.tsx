"use client";

import { Provider as JotaiProvider } from "jotai";

export default function Providers({ children }: React.PropsWithChildren) { 
  return <JotaiProvider>{children}</JotaiProvider>; // 자식 컴포넌트에서 '전역상태 관리 라이브러리인 jotai'를 사용할 수 있도록 해줌.
}
