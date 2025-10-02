"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { signUp } from "@/app/actions/auth-actions";
import { redirect } from "next/navigation";

export default function UI() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const result = await signUp({
      name,
      email,
      password,
    });
    if (result?.status === "ok") {
      redirect("/signin");
    }

    if (result?.message) {
      alert(result.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">회원가입</h1>
      <p className="text-gray-700">진프런에서 다양한 학습의 기회를 얻으세요</p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 min-w-[300px] mt-2"
      >
        <label htmlFor="passwordConfirm">이름</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="string"
          name="name"
          placeholder="홍길동"
          className="border-2 border-gray-300 rounded-sm p-2 focus:border-green-500 focus:border-2  focus:bg-green-50 focus:outline-0"
        />
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
          className="border-2 border-gray-300 rounded-sm p-2 focus:border-green-500 focus:border-2  focus:bg-green-50 focus:outline-0"
        />
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          type="password"
          name="passwordConfirm"
          placeholder=""
          className="border-2 border-gray-300 rounded-sm p-2 focus:border-green-500 focus:border-2  focus:bg-green-50 focus:outline-0"
        />

        <button
          type="submit"
          className="bg-green-500 shadow-sm text-white font-bold cursor-pointer rounded-sm p-2 mt-4 hover:bg-green-600"
        >
          회원가입
        </button>
        <Link
          href="/signin"
          className="text-center shadow-sm rounded-sm p-2 mt-1 border-1 border-gray-200 hover:bg-gray-100"
        >
          로그인
        </Link>
      </form>
    </div>
  );
}
