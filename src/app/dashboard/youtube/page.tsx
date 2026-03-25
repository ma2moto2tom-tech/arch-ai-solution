"use client";

import Header from "@/components/dashboard/Header";
import { Youtube, Upload, Link2, Eye, Clock, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

// デモデータ
const DEMO_UPLOADS = [
  {
    id: "1",
    title: "渋谷区 田中邸リフォーム - 完成イメージ",
    videoProjectName: "渋谷区 田中邸リフォーム",
    visibility: "unlisted",
    status: "live",
    youtubeUrl: "https://youtube.com/watch?v=demo1",
    shareUrl: "https://youtu.be/demo1",
    views: 12,
    chapters: ["0:00 エントランス", "0:15 リビング", "0:30 キッチン"],
    uploadedAt: "2026-03-22",
  },
  {
    id: "2",
    title: "世田谷区 山田邸新築 - 外観＋内装ツアー",
    videoProjectName: "世田谷区 山田邸新築",
    visibility: "unlisted",
    status: "processing",
    youtubeUrl: null,
    shareUrl: null,
    views: 0,
    chapters: [],
    uploadedAt: "2026-03-21",
  },
];

const VISIBILITY_MAP: Record<string, { label: string; icon: typeof Eye }> = {
  private: { label: "非公開", icon: Eye },
  unlisted: { label: "限定公開", icon: Link2 },
  public: { label: "公開", icon: Eye },
};

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: "アップロード待ち", color: "bg-gray-100 text-gray-600" },
  uploading: { label: "アップロード中", color: "bg-blue-100 text-blue-700" },
  processing: { label: "YouTube処理中", color: "bg-yellow-100 text-yellow-700" },
  live: { label: "配信中", color: "bg-green-100 text-green-700" },
  failed: { label: "失敗", color: "bg-red-100 text-red-700" },
};

export default function YouTubePage() {
  return (
    <>
      <Header
        title="YouTube配信"
        subtitle="限定公開で施主専用の動画URLを発行"
      />

      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* アップロードパネル */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-[#2C3E50] mb-4">新規アップロード</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[#7F8C8D] mb-1 block">映像を選択</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white">
                    <option value="">合成済み映像から選択...</option>
                    <option value="1">渋谷区 田中邸リフォーム (45秒)</option>
                    <option value="2">世田谷区 山田邸新築 (60秒)</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-[#7F8C8D] mb-1 block">タイトル</label>
                  <input
                    type="text"
                    placeholder="例：渋谷区 田中邸リフォーム - 完成イメージ"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#7F8C8D] mb-1 block">説明文</label>
                  <textarea
                    placeholder="動画の説明を入力..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[#7F8C8D] mb-2 block">公開設定</label>
                  <div className="space-y-2">
                    {(["unlisted", "private", "public"] as const).map((vis) => (
                      <label
                        key={vis}
                        className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="radio"
                          name="visibility"
                          value={vis}
                          defaultChecked={vis === "unlisted"}
                          className="text-[#2E86C1]"
                        />
                        <div>
                          <p className="text-sm font-medium text-[#2C3E50]">
                            {VISIBILITY_MAP[vis].label}
                          </p>
                          <p className="text-xs text-[#7F8C8D]">
                            {vis === "unlisted"
                              ? "URLを知っている人だけ閲覧可能（推奨）"
                              : vis === "private"
                              ? "自分のみ閲覧可能"
                              : "誰でも閲覧可能"}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-[#E74C3C] hover:bg-[#C0392B] text-white py-3 rounded-lg text-sm font-medium transition-colors">
                  <Upload className="w-4 h-4" />
                  YouTubeにアップロード
                </button>
              </div>
            </div>
          </div>

          {/* 配信一覧 */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-[#2C3E50]">配信一覧</h2>
            </div>

            <div className="divide-y divide-gray-100">
              {DEMO_UPLOADS.map((upload) => (
                <div key={upload.id} className="px-5 py-4 hover:bg-gray-50/50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Youtube className="w-5 h-5 text-[#E74C3C]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#2C3E50]">
                          {upload.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_MAP[upload.status].color}`}>
                            {STATUS_MAP[upload.status].label}
                          </span>
                          <span className="text-xs text-[#7F8C8D]">
                            {VISIBILITY_MAP[upload.visibility].label}
                          </span>
                          {upload.views > 0 && (
                            <span className="text-xs text-[#7F8C8D] flex items-center gap-1">
                              <Eye className="w-3 h-3" /> {upload.views}回視聴
                            </span>
                          )}
                        </div>

                        {/* チャプター */}
                        {upload.chapters.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {upload.chapters.map((ch, i) => (
                              <span key={i} className="text-xs bg-gray-50 text-[#7F8C8D] px-2 py-0.5 rounded">
                                {ch}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* 共有URL */}
                        {upload.shareUrl && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs text-[#7F8C8D]">施主共有URL:</span>
                            <code className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                              {upload.shareUrl}
                            </code>
                            <button className="text-xs text-[#2E86C1] hover:underline">コピー</button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {upload.youtubeUrl && (
                        <a
                          href={upload.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#E74C3C] hover:underline flex items-center gap-1"
                        >
                          YouTube <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <span className="text-xs text-[#7F8C8D]">{upload.uploadedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
