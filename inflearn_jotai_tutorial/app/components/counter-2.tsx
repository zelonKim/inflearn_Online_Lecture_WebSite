"use client";

import { useAtom, useAtomValue } from "jotai";
import { countAtom } from "../config/atoms";

export default function Counter2() {
  const count = useAtomValue(countAtom); // useAtomValue(아톰): 아톰의 상태값만 가져옴.

  return <div>카운트 값: {count}</div>;
}
