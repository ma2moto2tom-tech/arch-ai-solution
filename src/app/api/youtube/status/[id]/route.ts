import { NextRequest, NextResponse } from "next/server";

/**
 * YouTubeアップロードステータス確認API
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // TODO: Supabaseからステータスを取得
  // const supabase = await createServerSupabaseClient();
  // const { data } = await supabase.from('youtube_uploads').select().eq('id', id).single();

  return NextResponse.json({
    success: true,
    upload: {
      id,
      status: "processing", // pending | uploading | processing | live | failed
      youtubeVideoId: null,
      shareUrl: null,
      progress: 65, // パーセント
      message: "YouTube側で動画を処理中です...",
    },
    demoMode: true,
  });
}
