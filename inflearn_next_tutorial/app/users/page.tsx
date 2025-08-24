"use client";

import { useEffect, useState } from "react";
import { searchUsers } from "../actions/user-actions";

/*
export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`/api/users?name=${"Alice"}`) // fetch 함수와 REST API를 활용함.
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      });
  }, []);

  return (
    <main>
      <h1>Users</h1>
      {users.map((user) => (
        <p key={user.id}>{user.id}.{user.name}</p> // 화면에 1.Alice가 나타남.
      ))}
    </main>
  );
}
*/

/////////////////////////

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    searchUsers("Alice").then((data) => setUsers(data)); // 서버 액션을 활용함.
  }, []);

  return (
    <main>
      <h1>Users</h1>

      {users.map((user) => (
        <p key={user.id}>
          {user.id}.{user.name} {/* 화면에 1.Alice가 나타남. */}
        </p>
      ))}
    </main>
  );
}
