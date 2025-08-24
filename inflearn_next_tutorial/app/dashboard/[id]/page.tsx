export default function DashboardDetailPage({ params, searchParams }) {
  // http://localhost:3000/dashboard/29?code=1234
  console.log(params.id); // URL의 동적 경로인 id 파라미터에 담긴 값을 가져옴.  // 29 출력
  console.log(searchParams.code); // URL의 쿼리 파라미터인 code키에 담긴 밸류를 가져옴.  // 1234 출력
  return <main>Dashboard Detail Page</main>;
}
