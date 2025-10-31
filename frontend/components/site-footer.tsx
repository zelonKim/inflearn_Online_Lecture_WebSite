"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-gray-800 text-white mt-16 ">
      <div className="max-w-auto sm:px-12 md:px-16 lg:px-20 xl:px-24 py-8">
        {/* 상단 로고와 네비게이션 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            {/* 로고 */}
            <Link href="/">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-sm flex items-center justify-center">
                  <span className="text-white font-bold text-sm">if</span>
                </div>
                <span className="text-xl font-bold text-white">iflearn</span>
              </div>
            </Link>

            {/* 네비게이션 링크들 */}
            <div className="gap-4 text-sm  md:flex flex-row items-center ">
              <div className="w-px h-4 bg-gray-600"></div>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                개인정보처리방침
              </Link>
              <div className="w-px h-4 bg-gray-600"></div>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                이용약관
              </Link>
              <div className="w-px h-4 bg-gray-600"></div>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                We Are Hiring
              </Link>
            </div>
          </div>

          {/* 소셜미디어 아이콘들 */}
          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
            >
              <span className="text-sm font-bold">N</span>
            </Link>
            <Link
              href="#"
              className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
            >
              <Instagram size={16} />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
            >
              <Youtube size={16} />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
            >
              <Facebook size={16} />
            </Link>
          </div>
        </div>

        {/* 회사 정보 */}
        <div className="space-y-2 text-sm text-gray-300">
          <div>
            (주)이프랩 | 대표자: 김성진 | 사업자번호: 123-45-6789{" "}
            <Link
              href="#"
              className="underline hover:text-white transition-colors"
            >
              사업자 정보 확인
            </Link>
          </div>
          <div>
            통신판매업: 2025-경기안산A-0029 | 개인정보보호책임자: 김성진 |
            이메일:{" "}
            <Link
              href="mailto:ksz1860@naver.com"
              className="underline hover:text-white transition-colors"
            >
              ksz1860@naver.com
            </Link>
          </div>
          <div>
            전화번호:{" "}
            <Link
              href="tel:010-4674-1860"
              className="underline hover:text-white transition-colors"
            >
              010-4674-1860
            </Link>{" "}
            | 주소: 경기도 안산시 단원구 초지2로 11
          </div>
        </div>

        {/* 저작권 정보 */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="text-sm text-gray-400">
            © IFLAB. ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
}
