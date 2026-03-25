import { NextRequest, NextResponse } from "next/server";

/**
 * YouTube限定公開アップロードAPI
 * YouTube Data API v3を使用して限定公開で自動アップロード
 * チャプター設定・施主専用URL発行を行う
 */

interface YouTubeUploadRequest {
  videoId: string;               // 映像合成結果のID
  title: string;                 // 動画タイトル
  description?: string;          // 動画説明文
  visibility?: "private" | "unlisted" | "public";
  chapters?: { timeSeconds: number; title: string }[];
  tags?: string[];
  projectId?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: YouTubeUploadRequest = await req.json();
    const {
      videoId,
      title,
      description = "",
      visibility = "unlisted",
      chapters = [],
      tags = [],
    } = body;

    if (!videoId || !title) {
      return NextResponse.json(
        { success: false, error: "videoId and title are required" },
        { status: 400 }
      );
    }

    // チャプター情報をdescriptionに追加
    let fullDescription = description;
    if (chapters.length > 0) {
      fullDescription += "\n\nチャプター:\n";
      fullDescription += chapters
        .map((ch) => {
          const min = Math.floor(ch.timeSeconds / 60);
          const sec = ch.timeSeconds % 60;
          return `${min}:${sec.toString().padStart(2, "0")} ${ch.title}`;
        })
        .join("\n");
    }

    // TODO: YouTube Data API v3実装
    // 1. OAuth2認証済みクライアントを取得
    // 2. videos.insert APIで動画をアップロード
    //    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
    //    const res = await youtube.videos.insert({
    //      part: ['snippet', 'status'],
    //      requestBody: {
    //        snippet: { title, description: fullDescription, tags },
    //        status: { privacyStatus: visibility }
    //      },
    //      media: { body: videoStream }
    //    });
    // 3. 施主専用URLを生成
    //    shareUrl = `https://youtu.be/${youtubeVideoId}`

    const demoYouTubeId = `demo_${Date.now()}`;

    return NextResponse.json({
      success: true,
      uploadId: `upload_${Date.now()}`,
      youtubeVideoId: demoYouTubeId,
      status: "processing",
      visibility,
      shareUrl: `https://youtu.be/${demoYouTubeId}`,
      title,
      chapters,
      message: visibility === "unlisted"
        ? "限定公開でYouTubeにアップロードを開始しました。施主専用URLが発行されます。"
        : "YouTubeにアップロードを開始しました。",
      demoMode: true,
      note: "YouTube APIキーとOAuth認証を設定すると実際のアップロードが有効になります",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
