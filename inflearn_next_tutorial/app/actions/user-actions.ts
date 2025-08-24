"use server";

// 서버 액션
export async function searchUsers(keyName: string) {
  const DB = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  return DB.filter((user) => user.name.includes(keyName));
}
