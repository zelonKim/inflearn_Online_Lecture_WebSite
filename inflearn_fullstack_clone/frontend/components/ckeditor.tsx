/*
"use client";

import { useState, useEffect, useRef } from "react";

interface CKEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CKEditor = ({ value, onChange }: CKEditorProps) => {
  const editorRef = useRef<any>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialValueRef = useRef(value);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const loadEditor = async () => {
      try {
        if (editorRef.current) {
          await editorRef.current.destroy(); // 이전 에디터 인스턴스가 있다면 제거
          editorRef.current = null;
          setIsEditorReady(false);
        }

        const ClassicEditor = (
          await import("@ckeditor/ckeditor5-build-classic")
        ).default; // 동적으로 CKEditor 모듈 로드

        if (containerRef.current && !editorRef.current) {
          const editorInstance = await ClassicEditor.create(
            // 에디터 초기화
            containerRef.current,
            {
              licenseKey: "GPL",
              initialData: initialValueRef.current,
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "|",
                "outdent",
                "indent",
                "|",
                "imageUpload",
                "blockQuote",
                "insertTable",
                "undo",
                "redo",
              ],
              language: "ko",
            }
          );

          editorInstance.model.document.on("change:data", () => {
            // 변경 이벤트 리스너 추가
            const data = editorInstance.getData();
            if (data !== value) {
              onChange(data);
            }
          });

          editorRef.current = editorInstance; // 에디터 인스턴스 저장
          setIsEditorReady(true);
        }
      } catch (error) {
        console.error("CKEditor 초기화 오류:", error);
      }
    };

    loadEditor();

    return () => {
      // 컴포넌트 언마운트 시 에디터 정리
      const cleanup = async () => {
        if (editorRef.current) {
          try {
            await editorRef.current.destroy();
            editorRef.current = null;
            setIsEditorReady(false);
          } catch (error) {
            console.error("에디터 정리 중 오류 발생:", error);
          }
        }
      };
      cleanup();
    };
  }, [isMounted]);

  useEffect(() => {
    if (
      isEditorReady &&
      editorRef.current &&
      value !== editorRef.current.getData()
    ) {
      editorRef.current.setData(value); // 값이 외부에서 변경되면 에디터 내용 업데이트
    }
  }, [value, isEditorReady]);

  return (
    <div className="ck-editor-container prose">
      <div ref={containerRef} className="min-h-[300px] border p-4 rounded">
        {!isEditorReady && "에디터 로딩 중..."}
      </div>
    </div>
  );
};

export default CKEditor;
*/

// @ts-nocheck
"use client";

import React from "react";
import { CKEditor as CKEditorReact } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Link,
  Image,
  ImageUpload,
  Table,
  TableToolbar,
  BlockQuote,
  List,
  Heading,
  Indent,
  Base64UploadAdapter,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

interface CustomEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CKEditor = ({ value, onChange }: CustomEditorProps) => {
  return (
    <div className="ck-editor-container prose">
      <CKEditorReact
        editor={ClassicEditor}
        data={value}
        config={{
          licenseKey: "GPL",
          plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Link,
            Image,
            ImageUpload,
            Table,
            TableToolbar,
            BlockQuote,
            List,
            Heading,
            Indent,
            Base64UploadAdapter,
          ],
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "outdent",
            "indent",
            "|",
            "imageUpload",
            "blockQuote",
            "insertTable",
            "undo",
            "redo",
          ],
          language: "ko",
        }}
        onChange={(_, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
};

export default CKEditor;
