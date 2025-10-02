"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Loader2, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/generated/openapi-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "@/lib/api";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/gif": [".gif"],
};

const CKEditor = dynamic(() => import("@/components/ckeditor"), {
  ssr: false,
});

export default function UI({ profile }: { profile: User }) {
  const queryClient = useQueryClient();

  const router = useRouter();
  const [image, setImage] = useState<string>(profile.image || "");
  const [email, setEmail] = useState<string>(profile.email || "");
  const [name, setName] = useState(profile.name || "");
  const [phone, setPhone] = useState(profile.phone || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [isUploading, setIsUploading] = useState(false);

  const userProfileQuery = useQuery({
    queryFn: () => api.getProfile(),
    queryKey: ["userProfile"],
    select: (data) => data.data,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await api.updateProfile({
        name,
        phone,
        bio,
        image,
      });
      if (error) {
        throw new Error(error as string);
      }

      return data;
    },
    onSuccess: () => {
      toast.success("프로필 업데이트가 완료되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const uploadMediaResult = await api.uploadMedia(file);
      if (!uploadMediaResult.data || uploadMediaResult.error) {
        toast.error(uploadMediaResult.error as string);
        return;
      }
      setImage((uploadMediaResult.data as any).cloudFront.url);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_IMAGE_TYPES,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
  });

  // 저장 버튼 클릭 시 (api 연동은 비워둠)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate();
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg mt-10 shadow">
      <h2 className="text-2xl font-bold mb-6">프로필 수정</h2>
      <form onSubmit={handleSave} className="space-y-6">
        {/* 프로필 이미지 업로드 */}

        <div className="ml-45 ">
          <label className="block font-medium mb-1 ml-6.5">프로필 사진</label>

          <div
            {...getRootProps()}
            className={` w-32 rounded-full p-1 text-center cursor-pointer  hover:!border-green-300 group  ${
              isDragActive ? "border-primary" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            <div className="py-1 flex flex-col items-center">
              {isUploading ? (
                <Loader2 className="w-10 h-10 text-gray-400 animate-spin mb-2" />
              ) : image ? (
                <img
                  src={image}
                  alt="프로필 미리보기"
                  className="w-28 h-28 object-cover rounded-full mx-auto mb-2 border-2 group-hover:border-green-300 "
                />
              ) : (
                <ImageIcon className="w-25 h-25 text-gray-400 rounded-full p-3  border-2 group-hover:border-green-300" />
              )}
              <span className="text-sm text-gray-600 mt-2">
                {image
                  ? "클릭하여 변경가능"
                  : isDragActive
                  ? "이미지를 여기에 놓으세요"
                  : "클릭하거나 드래그하여 이미지 업로드"}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400">최대 5MB, jpg/png/gif 지원</p>
        </div>

        <div>
          <label className="block font-medium mb-2">이메일</label>
          <Input
            type="text"
            value={email}
            required
            disabled
            className="bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">이름</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            required
            className=" focus:!ring-green-300  focus:!border-gray-400 hover:!border-green-300"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">전화번호</label>
          <Input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="전화번호를 입력하세요 (-제외)"
            className=" focus:!ring-green-300  focus:!border-gray-400 hover:!border-green-300"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">자기소개</label>
          <CKEditor value={bio} onChange={setBio} />
        </div>
        {/* 저장 버튼 */}
        <div className="pt-2">
          <Button
            disabled={updateProfileMutation.isPending}
            type="submit"
            className="w-full text-md font-bold hover:bg-green-500 hover:ring-green-300 ring-2"
            size={"lg"}
          >
            {updateProfileMutation.isPending ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <span>수정하기</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
