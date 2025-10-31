import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractApiErrorMessage = (error: unknown): string => {
  if (!error) return "알 수 없는 오류가 발생했습니다.";

  const e = error as any;

  const candidates = [
    e?.message,
    e?.statusText,
    e?.error?.message,
    e?.data?.message,
    e?.data?.error?.message,
    typeof e?.data === "string" ? e.data : undefined,
    typeof e?.error === "string" ? e.error : undefined,
  ].filter(Boolean) as string[];

  const details = e?.data?.details ?? e?.error?.details ?? e?.errors;
  const detailMessage = Array.isArray(details)
    ? details.find((d: any) => typeof d?.message === "string")?.message
    : undefined;

  return detailMessage || candidates[0] || "요청 처리 중 오류가 발생했습니다.";
};
