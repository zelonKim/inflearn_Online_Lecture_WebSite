"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface InstructorStats {
  coursesCount: number;
  reviewsCount: number;
  questionsCount: number;
  commentsCount: number;
}

interface InstructorStatsChartProps {
  stats: InstructorStats;
}

export default function InstructorStatsChart({
  stats,
}: InstructorStatsChartProps) {
  const router = useRouter();

  const maxValue = Math.max(
    stats.coursesCount,
    stats.reviewsCount,
    stats.questionsCount,
    stats.commentsCount,
    50
  );

  const chartData = [
    {
      subject: "강의",
      value: stats.coursesCount,
      fullMark: maxValue,
    },
    {
      subject: "리뷰",
      value: stats.reviewsCount,
      fullMark: maxValue,
    },
    {
      subject: "질문",
      value: stats.questionsCount,
      fullMark: maxValue,
    },
    {
      subject: "댓글",
      value: stats.commentsCount,
      fullMark: maxValue,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">나의 활동 통계</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height={330}>
              <RadarChart data={chartData}>
                <PolarGrid stroke="#868e96" strokeWidth={1} />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{
                    fill: "#364154",
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, maxValue]}
                  tick={false}
                  stroke="#868e96"
                />
                <Radar
                  name="통계"
                  dataKey="value"
                  stroke="#36c67b"
                  fill="#36c67b"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* 통계 정보 */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => router.push("/instructor/courses")}
                className="bg-blue-50 hover:bg-blue-200 rounded-lg p-4 h-21 text-center flex flex-col items-center gap-0"
              >
                <div className="text-2xl font-bold text-blue-600">
                  {stats.coursesCount}
                </div>
                <div className="text-sm text-gray-800">강의</div>
              </Button>

              <Button
                onClick={() => router.push("instructor/reviews")}
                className="bg-green-50 hover:bg-green-200 rounded-lg p-4 h-21 text-center flex flex-col items-center gap-0"
              >
                <div className="text-2xl font-bold text-green-600">
                  {stats.reviewsCount}
                </div>
                <div className="text-sm text-gray-800">리뷰</div>
              </Button>

              <Button
                onClick={() => router.push("/instructor/questions")}
                className="bg-orange-50 hover:bg-orange-200 rounded-lg p-4 h-21 text-center flex flex-col items-center gap-0"
              >
                <div className="text-2xl font-bold text-orange-600">
                  {stats.questionsCount}
                </div>
                <div className="text-sm text-gray-600">질문</div>
              </Button>

              <Button
                onClick={() => router.push("instructor/reviews")}
                className="bg-purple-50 hover:bg-purple-200 rounded-lg p-4 h-21 text-center flex flex-col items-center gap-0"
              >
                <div className="text-2xl font-bold text-purple-600">
                  {stats.commentsCount}
                </div>
                <div className="text-sm text-gray-600">댓글</div>
              </Button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">활동 요약</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• 총 강의 수: {stats.coursesCount}개</div>
                <div>• 총 리뷰 수: {stats.reviewsCount}개</div>
                <div>• 총 질문 수: {stats.questionsCount}개</div>
                <div>• 총 댓글 수: {stats.commentsCount}개</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
