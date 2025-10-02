"use client";

import {
  AddToCartDto,
  CourseDetailDto,
  Course as CourseEntity,
  CourseFavorite as CourseFavoriteEntity,
} from "@/generated/openapi-client";
import { HeartIcon, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getLevelText } from "@/lib/level";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "@/lib/api";
import { User } from "next-auth";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CourseCardProps {
  user?: User;
  course: CourseEntity;
}

export default function CourseCard({ user, course }: CourseCardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const getCourseQuery = useQuery({
    queryKey: ["course", course.id],
    queryFn: async () => await api.getCourseById(course.id),
    select: (data) => data.data,
  });

  const getMyFavoritesQuery = useQuery({
    queryKey: ["my-favorites", user?.id],
    queryFn: async () => {
      if (user) {
        return api.getMyFavorites();
      }

      return null;
    },
  });

  const isFavorite = getMyFavoritesQuery.data?.data?.find(
    (fav) => fav.courseId === course.id
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      if (isFavorite) {
        removeFavoriteMutation.mutate();
      } else {
        addFavoriteMutation.mutate();
      }
    } else {
      alert("로그인 후 이용하세요.");
    }
  };

  const addFavoriteMutation = useMutation({
    mutationFn: () => api.addFavorite(course.id),
    onSuccess: () => {
      getMyFavoritesQuery.refetch();
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: () => {
      return api.removeFavorite(course.id);
    },
    onSuccess: () => {
      getMyFavoritesQuery.refetch();
    },
  });

  const isFavoriteDisabled =
    addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

  ///////////////////////

  const addToCartMutation = useMutation({
    mutationFn: (addToCartDto: AddToCartDto) => api.addToCart(addToCartDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
      toast.success(`"${course.title}"이(가) 장바구니에 담겼습니다.`);
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    addToCartMutation.mutate({ courseId: course.id });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const calculateDiscountPercentage = (
    originalPrice: number,
    discountPrice: number
  ): number => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  };

  return (
    <div
      className="group hover:scale-105 hover:shadow-lg hover:rounded-md  relative cursor-pointer overflow-hidden bg-white transition-all duration-300"
      onClick={() => router.push(`/course/${course.id}`)}
    >
      {/* 썸네일 이미지 */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.thumbnailUrl || "/placeholder-course.jpg"}
          alt={course.title}
          fill
          className="rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* 호버 시 보이는 액션 버튼들 */}
        <div className="absolute right-2 top-2 flex gap-2 opacity-0 transition-opacity duration-300  group-hover:opacity-100">
          <Button
            size="sm"
            variant="secondary"
            className=" h-8 w-8 p-0 hover:bg-red-50/90 "
            onClick={handleFavoriteClick}
          >
            <HeartIcon
              className={cn(
                "size-4 transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-500",
                isFavoriteDisabled && "cursor-not-allowed"
              )}
            />
          </Button>

          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 hover:bg-green-50/90"
            onClick={handleCartClick}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 강의 정보 */}
      <div className="p-2">
        <h3
          className="mb-2 text-md font-semibold text-gray-900 overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {course.title}
        </h3>

        {course.shortDescription && (
          <p
            className="mb-3 text-xs text-gray-600 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {course.shortDescription}
          </p>
        )}

        {/* 레벨 및 강사 정보 */}
        <div className="flex flex-row justify-between mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="rounded bg-gray-100 px-2 py-1">
              {getLevelText(course.level)}
            </span>
            <span>{course.instructor?.name || "강사명"}</span>
          </div>

          <div className=" flex items-center gap-1 text-xs">
            <span className="text-yellow-500 group-hover:scale-110">★</span>
            <span className="font-medium">
              {getCourseQuery?.data?.averageRating?.toFixed(1) || 0.0}
            </span>
            <span className="text-gray-400">
              ({getCourseQuery?.data?.totalReviews || 0})
            </span>
          </div>
        </div>

        {/* 가격 정보 */}
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            {course.discountPrice && course.discountPrice < course.price ? (
              <>
                <div className="flex flex-row gap-2">
                  <span className="text-xs text-gray-400 line-through">
                    ₩{formatPrice(course.price)}
                  </span>
                  <div className="flex items-center gap-2 ">
                    <span className="text-sm font-bold text-gray-900">
                      ₩{formatPrice(course.discountPrice)}
                    </span>
                  </div>
                  <span className="group-hover:animate-bounce text-xs font-bold text-red-500 bg-red-50 mx-2 px-1.5 py-0.5 rounded-sm">
                    {calculateDiscountPercentage(
                      course.price,
                      course.discountPrice
                    )}
                    % 할인
                  </span>
                </div>
              </>
            ) : (
              <span className="text-sm font-bold text-gray-900">
                ₩{formatPrice(course.price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
