// route.ts 파일을 통해 Next의 내장 서버를 이용할 수 있음.
import { NextResponse } from "next/server";

/*
// http://localhost:3000/api/users에 접속할 경우, 화면에 JSON객체가 나타남.
export async function GET(request: Request) {
  return NextResponse.json({
    users: [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ],
  });
}
*/

/////////////////////////

const DB = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams; // 요청받은 url에서 쿼리 스트링을 가져옴.
  const keyName = searchParams.get("name") as string; // 쿼리 스트링에서 name키에 해당하는 밸류를 가져옴.

  return NextResponse.json({
    users: DB.filter((user) => user.name.includes(keyName)), // 해당 keyName을 포함하는 데이터만 필터링하여 가져옴.
  });
}
