"use client";

import { Metadata } from "next";
import { useEffect, useState } from "react";
import { getInstructorStats } from "@/lib/api";
import InstructorStatsChart from "@/components/instructor-stats-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface InstructorStats {
  coursesCount: number;
  reviewsCount: number;
  questionsCount: number;
  commentsCount: number;
}

export default function InstructorPage() {
  const [stats, setStats] = useState<InstructorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const { data, error } = await getInstructorStats();

        if (error) {
          setError("통계 데이터를 불러오는데 실패했습니다.");
          return;
        }

        if (data) {
          setStats(data);
        }
      } catch (err) {
        setError("통계 데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="text-gray-500 h-6 w-6 animate-spin ml-[450px] mb-[200px]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center text-gray-600">
              <p>통계 데이터가 없습니다.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 lg:w-full">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">대시보드</h1>
        <p className="text-gray-600">본인의 활동 통계를 확인하세요.</p>
      </div>

      <InstructorStatsChart stats={stats} />
    </div>
  );
}
