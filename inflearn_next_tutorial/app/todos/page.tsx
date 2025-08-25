"use client";

import { useMutation, useQuery } from "react-query";
import { createTodo, getTodos } from "../actions/todo-actions";
import { useState } from "react";
import { queryClient } from "@/config/ReactQueryProvider";

export default function TodosPage() {
  const [todoInput, setTodoInput] = useState("");

  const todosQuery = useQuery({
    // GET을 수행함.
    queryKey: ["todos"], // 캐싱할 쿼리 키
    queryFn: getTodos, // 쿼리 함수
  });

  const createTodoMutation = useMutation({
    // CREATE, UPDATE, DELETE를 수행함.
    mutationFn: async () => {
      // 뮤테이션 함수
      if (todoInput === "") throw new Error("투두를 입력해주세요");
      return createTodo(todoInput);
    },
    onSuccess: (TODOS) => {
      // 매개변수에는 뮤테이션 함수의 리턴값이 담김. 
      console.log("뮤테이션 성공:", TODOS);
      // todosQuery.refetch(); // 데이터를 다시 가져옴.
      queryClient.invalidateQueries(["todos"]); // 쿼리 키에 해당되는 쿼리를 무효화 시키고, 데이터를 다시 가져옴.
    },
    onError: (err: any) => {
      alert(err.message);
    },
  });

  return (
    <div>
      <h1>TODOS</h1>

      <input
        type="text"
        placeholder="투두를 입력하세요"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />

      <button onClick={() => createTodoMutation.mutate()}>
        {/* 뮤테이션을 실행함.*/}
        {createTodoMutation.isLoading ? "생성중" : "투두 생성"}
      </button>

      {todosQuery.isLoading && <p>로딩중...</p>}
      {todosQuery.data &&
        todosQuery.data.map((todo, index) => <p key={index}>{todo}</p>)}
    </div>
  );
}
