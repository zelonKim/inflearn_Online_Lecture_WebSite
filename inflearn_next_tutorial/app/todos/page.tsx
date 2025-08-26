"use client";

import { useMutation, useQuery } from "react-query";
import { createTodo, getTodos } from "../actions/todo-actions";
import { useState } from "react";
import { queryClient } from "@/config/ReactQueryProvider";

export default function TodosPage() {
  const [todoInput, setTodoInput] = useState("");

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const createTodoMutation = useMutation({
    mutationFn: async () => {
      if (todoInput === "") throw new Error("투두를 입력해주세요");
      return createTodo(todoInput);
    },
    onSuccess: (TODOS) => {
      console.log("뮤테이션 성공:", TODOS);

      queryClient.invalidateQueries(["todos"]);
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
