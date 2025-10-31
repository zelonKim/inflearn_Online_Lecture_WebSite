"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Metadata } from "next";

export default function UI() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">로그인</h1>
      <p className="text-gray-700">이프런 계정으로 로그인할 수 있어요</p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 min-w-[300px] mt-2"
      >
        <label htmlFor="email">이메일</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="hong@gildong.com"
          className="border-2 border-gray-300 rounded-sm p-2 focus:border-green-500 focus:border-2  focus:bg-green-50 focus:outline-0"
        />
        <label htmlFor="password">비밀번호</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder=""
          className="border-2 border-gray-300 rounded-sm p-2  focus:border-green-500 focus:border-2 focus:bg-green-50  focus:outline-0"
        />

        <button
          type="submit"
          className="bg-green-500 shadow-sm text-white font-bold cursor-pointer rounded-sm p-2 mt-4 hover:bg-green-600"
        >
          로그인
        </button>
        <Link
          href="/signup"
          className="text-center shadow-sm rounded-sm p-2 mt-1 border-1 border-gray-200 hover:bg-gray-100"
        >
          회원가입
        </Link>
      </form>
    </div>
  );
}
