import { NextRequest, NextResponse } from "next/server";

/**
 * 映像合成API
 * 生成済みパース画像からカメラワーク付き動画を生成
 *
 * 実装時はRunwayML Gen-3 / Kling / Stable Video Diffusion等を使用
 * 現在はスタブ実装（APIキー設定後に有効化）
 */

interface VideoCreateRequest {
  generationIds: string[];       // 使用するパース画像ID
  cameraMotion: "pan_left" | "pan_right" | "zoom_in" | "orbit" | "walkthrough";
  durationSeconds?: number;      // デフォルト30秒
  hasAvatar?: boolean;           // AIアバターを挿入するか
  avatarScript?: string;         // アバターの台本テキスト
  projectId?: string;
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const body: VideoCreateRequest = await req.json();
    const {
      generationIds,
      cameraMotion = "pan_left",
      durationSeconds = 30,
      hasAvatar = false,
      avatarScript,
      projectId,
    } = body;

    if (!generationIds || generationIds.length === 0) {
      return NextResponse.json(
        { success: false, error: "generationIds is required" },
        { status: 400 }
      );
    }

    // TODO: 実際のAPIコール実装
    // 1. RunwayML API: 静止画→動画変換（カメラワーク付き）
    //    - POST https://api.runwayml.com/v1/image_to_video
    //    - input: { image_url, motion_type, duration }
    //
    // 2. HeyGen API (hasAvatar=trueの場合): AIアバター挿入
    //    - POST https://api.heygen.com/v2/video/generate
    //    - input: { avatar_id, script, background_video_url }

    // スタブ: 処理中ステータスを返却
    const videoId = `vid_${Date.now()}`;

    return NextResponse.json({
      success: true,
      videoId,
      status: "processing",
      estimatedDuration: durationSeconds,
      cameraMotion,
      hasAvatar,
      message: hasAvatar
        ? "映像合成＋AIアバター挿入を開始しました。完了まで2-5分お待ちください。"
        : "映像合成を開始しました。完了まで1-3分お待ちください。",
      processingTime: Date.now() - startTime,
      // デモモード情報
      demoMode: true,
      note: "RunwayML/HeyGen APIキーを設定すると実際の映像合成が有効になります",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
