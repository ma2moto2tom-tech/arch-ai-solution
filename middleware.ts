import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Supabase未接続の間は認証チェックをスキップ
  // Supabase設定後にコメントを外して有効化する
  //
  // if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  //   return NextResponse.next();
  // }
  // const { updateSession } = await import("@/lib/supabase/middleware");
  // return await updateSession(request);

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
