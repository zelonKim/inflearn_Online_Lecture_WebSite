"use client";

import { useAtom } from "jotai";
import { countAtom } from "../config/atoms";

export default function Counter() {
  const [count, setCount] = useAtom(countAtom); // useAtom(아톰): 아톰의 상태값과 이에 대한 업데이트 함수를 가져옴.

  return (
    <button onClick={() => setCount((c) => c + 1)}>카운트 값: {count}</button>
  );
}
