"use client";

import { Button } from "@/components/ui/button";
import { Course } from "@/generated/openapi-client";
import * as api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image as ImageSign, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/gif": [".gif"],
};

export default function UI({ course }: { course: Course }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [file, setFile] = useState<File | null>(null);

  const [thumbnailUrl, setThumbnailUrl] = useState<string>(
    course.thumbnailUrl || ""
  );

  const updateCourseThumbnailMutation = useMutation({
    mutationFn: async () => {
      if (!file && !thumbnailUrl) {
        return api.updateCourse(course.id, { thumbnailUrl: "" });
      }

      if (file) {
        const { data, error } = await api.uploadMedia(file as File);
        if (!data || error) {
          toast.error(error as string);
          return;
        }
        return api.updateCourse(course.id, {
          thumbnailUrl: (data as any).cloudFront.url,
        });
      }
      toast.error("변경할 이미지가 없습니다.");
      return;
    },
    onSuccess: (res) => {
      toast.success("업데이트를 성공적으로 완료했습니다.");

      queryClient.invalidateQueries({
        queryKey: ["course", course.id],
      });
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const nextFile = acceptedFiles[0];
    if (nextFile) {
      setFile(nextFile);

      const { data, error } = await api.uploadMedia(nextFile as File);

      if (!data || error) {
        toast.error(error as string);
        return;
      }

      setThumbnailUrl((data as any).cloudFront.url);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_IMAGE_TYPES,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <div className="space-y-4 prose bg-white p-8 rounded-lg">
      <h2>커버 이미지 업로드</h2>

      <div className="space-y-2">
        <div
          {...getRootProps()}
          className={`hover:border-green-400  border-2 border-dashed rounded-lg p-4  text-center cursor-pointer ${
            isDragActive ? "border-primary" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <div className="py-4">
            {updateCourseThumbnailMutation.isPending ? (
              <Loader2 className="w-12 h-12 mx-auto mb-4 text-gray-400 animate-spin" />
            ) : thumbnailUrl ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setThumbnailUrl("");
                    setFile(null);
                  }}
                  className="text-red-500/90 hover:bg-red-100/90 ml-[520px] -mt-24 "
                  aria-label="커버 이미지 삭제"
                >
                  <Trash2 size={18} />
                </Button>

                <Image
                  src={thumbnailUrl}
                  alt="이미지변경용 배경"
                  width={300}
                  height={300}
                  className="mx-auto object-cover"
                />
                <p className="text-sm text-gray-600">
                  {isDragActive
                    ? "변경할 이미지를 여기에 놓아주세요"
                    : "클릭하거나 이미지를 드래그하여 변경하세요"}
                </p>
              </>
            ) : (
              <>
                <ImageSign className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-600">
                  {isDragActive
                    ? "업로드할 이미지를 여기에 놓아주세요"
                    : "클릭하거나 이미지를 드래그하여 업로드하세요"}
                </p>
              </>
            )}
          </div>
        </div>

        {/* 권장 이미지 형식 안내 */}
        <p className="text-sm text-gray-500 mb-2">
          • 최대 파일 크기: 5MB
          <br />
          • 지원 형식: .jpg, .jpeg, .png, .gif
          <br />• 권장 해상도: 1200 x 781px
        </p>

        <div className="w-full flex flex-row justify-center gap-12">
          <Button
            onClick={() => router.back()}
            className="w-72 mt-4 bg-gray-400 text-white hover:bg-gray-400/90 hover:!ring-gray-300 hover:ring-2"
          >
            이전으로
          </Button>

          {updateCourseThumbnailMutation.isPending ? (
            <Button
              type="submit"
              className="w-72 mt-4 hover:!ring-green-300 hover:ring-2"
            >
              <Loader2 className="size-4 animate-spin" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-72 mt-4 hover:!ring-green-300 hover:ring-2"
              onClick={() => updateCourseThumbnailMutation.mutate()}
            >
              다음으로
            </Button>
          )}

        </div>
      </div>
    </div>
  );
}
