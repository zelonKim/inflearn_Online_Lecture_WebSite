"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard } from "lucide-react";
import PortOne from "@portone/browser-sdk/v2";
import { useMutation } from "@tanstack/react-query";
import * as api from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { CourseDetailDto, User } from "@/generated/openapi-client";

interface BuyUIProps {
  course: CourseDetailDto;
  userProfile: User | null;
}

export default function BuyUI({ course, userProfile }: BuyUIProps) {
  const router = useRouter();
  const [customerName, setCustomerName] = useState<string | undefined>(
    userProfile?.name
  );
  const [customerEmail, setCustomerEmail] = useState<string | undefined>(
    userProfile?.email
  );
  const [customerPhone, setCustomerPhone] = useState<string | undefined>(
    (userProfile as any)?.phone
  );
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!course || course.price === 0) {
      router.replace(`/courses/lecture?courseId=${course.id}`);
    }
  }, [course, router]);

  const finalPrice = useMemo(() => {
    return course.discountPrice && course.discountPrice < course.price
      ? course.discountPrice
      : course.price;
  }, [course.discountPrice, course.price]);

  const formatPrice = (v: number) => new Intl.NumberFormat("ko-KR").format(v);

  const verifyMutation = useMutation({
    mutationFn: (paymentId: string) => api.verifyPayment({ paymentId }),
  });

  const handlePay = async () => {
    if (!userProfile) {
      alert("로그인 후 이용해주세요.");
      router.push("/signin");
      return;
    }

    if (!customerName || !customerEmail || !customerPhone) {
      alert("구매자 정보를 모두 입력해주세요.");
      return;
    }

    setIsProcessing(true);

    try {
      const paymentId = `order_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2, 10)}`;

      const payment = await PortOne.requestPayment({
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID || "store-test",
        channelKey:
          process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY || "channel-test-key",
        paymentId,
        orderName: course.title,
        totalAmount: finalPrice,
        currency: "CURRENCY_KRW",
        payMethod: "CARD",
        customer: {
          fullName: customerName,
          email: customerEmail,
          phoneNumber: customerPhone,
        },
        customData: {
          items: [
            {
              courseId: course.id,
              price: finalPrice,
            },
          ],
        },
      });

      if (!payment || payment.code !== undefined) {
        alert(`결제 실패: ${payment?.message || "알 수 없는 오류"}`);
        return;
      }

      const result = await verifyMutation.mutateAsync(paymentId);
      if ((result.data as any)["success"]) {
        toast.success("결제가 완료되었습니다!");
        router.push("/my/courses");
      } else {
        alert(`결제 검증 실패: ${(result.data as any)["message"]}`);
      }
    } catch (e) {
      console.error(e);
      alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">강의 결제</h1>

        <div className="border rounded-lg p-6 bg-white">
          <h2 className="font-semibold mb-4">구매자 정보</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="buyerName">이름</Label>
              <Input
                id="buyerName"
                placeholder="이름을 입력하세요"
                value={customerName || ""}
                onChange={(e) => setCustomerName(e.target.value)}
                className="mt-1 focus-visible:ring-[#30c979] focus:border-none"
              />
            </div>
            <div>
              <Label htmlFor="buyerEmail">
                이메일 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="buyerEmail"
                type="email"
                placeholder="이메일을 입력하세요"
                value={customerEmail || ""}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="mt-1 focus-visible:ring-[#30c979] focus:border-none"
              />
            </div>
            <div>
              <Label htmlFor="buyerPhone">
                휴대폰 번호 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="buyerPhone"
                type="tel"
                placeholder="휴대폰 번호 (- 없이)"
                value={customerPhone || ""}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="mt-1 focus-visible:ring-[#30c979] focus:border-none"
              />
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6 bg-white">
          <h2 className="font-semibold mb-4">결제 수단</h2>
          <div className="flex items-center gap-4">
            <Select defaultValue="card">
              <SelectTrigger className="w-48 py-5 focus-visible:ring-[#30c979] focus:border-none">
                <SelectValue placeholder="결제 수단 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100">
                    <CreditCard className="w-5 h-5  text-gray-700" />
                  </div>
                  신용/체크카드
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <aside className="space-y-6 lg:mt-14  lg:top-24 self-start">
        <div className="border rounded-lg p-4 bg-white">
          <div className="flex gap-3">
            {course.thumbnailUrl && (
              <div className="relative w-24 h-16 flex-shrink-0">
                <Image
                  src={course.thumbnailUrl}
                  alt={course.title}
                  fill
                  className="rounded object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium line-clamp-2">{course.title}</p>
              <p className="text-xs text-gray-500 mt-1">
                {course.instructor.name}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            {course.discountPrice && course.discountPrice < course.price ? (
              <>
                <div className="flex justify-between">
                  <span>상품 금액</span>
                  <span>₩{formatPrice(course.price)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>할인 금액</span>
                  <span>
                    -₩{formatPrice(course.price - course.discountPrice)}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex justify-between">
                <span>상품 금액</span>
                <span>₩{formatPrice(course.price)}</span>
              </div>
            )}

            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>총 결제 금액</span>
              <span>₩{formatPrice(finalPrice)}</span>
            </div>
          </div>

          <Button
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
          >
            {isProcessing ? "결제 진행 중..." : "결제하기"}
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={() => router.push(`/course/${course.id}`)}
          className="w-full "
        >
          이전으로
        </Button>
      </aside>
    </div>
  );
}
