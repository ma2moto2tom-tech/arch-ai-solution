import { NextRequest, NextResponse } from "next/server";

/**
 * AIアバター生成API
 * HeyGen/Vidu連携で営業担当AIアバターが空間を解説する映像を生成
 */

interface AvatarRequest {
  videoId: string;              // 元の映像ID
  script: string;               // ナレーション台本
  avatarType?: "professional" | "casual" | "custom";
  language?: "ja" | "en";
  voiceId?: string;             // カスタム音声ID
}

export async function POST(req: NextRequest) {
  try {
    const body: AvatarRequest = await req.json();
    const {
      videoId,
      script,
      avatarType = "professional",
      language = "ja",
    } = body;

    if (!videoId || !script) {
      return NextResponse.json(
        { success: false, error: "videoId and script are required" },
        { status: 400 }
      );
    }

    // TODO: HeyGen API実装
    // POST https://api.heygen.com/v2/video/generate
    // {
    //   "video_inputs": [{
    //     "character": { "type": "avatar", "avatar_id": avatarId },
    //     "voice": { "type": "text", "input_text": script, "voice_id": voiceId },
    //     "background": { "type": "video", "video_url": backgroundVideoUrl }
    //   }],
    //   "dimension": { "width": 1920, "height": 1080 }
    // }

    return NextResponse.json({
      success: true,
      avatarVideoId: `avatar_${Date.now()}`,
      status: "processing",
      script,
      avatarType,
      language,
      message: "AIアバター映像を生成中です。完了まで3-5分お待ちください。",
      demoMode: true,
      note: "HeyGen APIキーを設定すると実際のアバター生成が有効になります",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
