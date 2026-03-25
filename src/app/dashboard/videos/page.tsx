"use client";

import Header from "@/components/dashboard/Header";
import { Film, Play, Clock, AlertCircle, Plus, User, Camera } from "lucide-react";

// デモデータ
const DEMO_VIDEOS = [
  {
    id: "1",
    projectName: "渋谷区 田中邸リフォーム",
    status: "completed",
    duration: "45秒",
    hasAvatar: true,
    cameraMotion: "ウォークスルー",
    createdAt: "2026-03-22",
    thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80",
  },
  {
    id: "2",
    projectName: "世田谷区 山田邸新築",
    status: "processing",
    duration: "---",
    hasAvatar: false,
    cameraMotion: "パンレフト",
    createdAt: "2026-03-21",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
  },
  {
    id: "3",
    projectName: "港区 オフィスリノベーション",
    status: "pending",
    duration: "---",
    hasAvatar: false,
    cameraMotion: "ズームイン",
    createdAt: "2026-03-20",
    thumbnail: null,
  },
];

const STATUS_MAP: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "待機中", color: "bg-gray-100 text-gray-600", icon: Clock },
  processing: { label: "処理中", color: "bg-blue-100 text-blue-700", icon: Film },
  completed: { label: "完了", color: "bg-green-100 text-green-700", icon: Play },
  failed: { label: "失敗", color: "bg-red-100 text-red-700", icon: AlertCircle },
};

const CAMERA_OPTIONS = [
  { value: "pan_left", label: "パンレフト", desc: "左方向にカメラ移動" },
  { value: "pan_right", label: "パンライト", desc: "右方向にカメラ移動" },
  { value: "zoom_in", label: "ズームイン", desc: "中央に向かってズーム" },
  { value: "orbit", label: "オービット", desc: "空間を周回" },
  { value: "walkthrough", label: "ウォークスルー", desc: "室内を歩く視点" },
];

export default function VideosPage() {
  return (
    <>
      <Header
        title="映像合成"
        subtitle="AIパース静止画からカメラワーク動画を生成"
      />

      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* 新規映像合成パネル */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-[#2C3E50] mb-4">新規映像合成</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* パース画像選択 */}
              <div>
                <label className="text-sm text-[#7F8C8D] mb-2 block">
                  ソース画像（生成済みパース）
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                  <Camera className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-[#7F8C8D]">
                    プロジェクトから生成済みパースを選択
                  </p>
                  <button className="mt-3 text-sm text-[#2E86C1] hover:underline">
                    パースを選択
                  </button>
                </div>
              </div>

              {/* 設定 */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[#7F8C8D] mb-2 block">
                    カメラモーション
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CAMERA_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-left hover:border-[#2E86C1] hover:bg-blue-50/50 transition-colors"
                      >
                        <p className="text-sm font-medium text-[#2C3E50]">{opt.label}</p>
                        <p className="text-xs text-[#7F8C8D]">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-[#7F8C8D] mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    AIアバターナレーション（オプション）
                  </label>
                  <textarea
                    placeholder="例：こちらはリビングです。天然オーク材のフローリングが温かみを演出しています..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"
                  />
                  <p className="text-xs text-[#7F8C8D] mt-1">
                    HeyGen/Vidu APIでAIアバターが空間を解説します
                  </p>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-[#8E44AD] hover:bg-[#7D3C98] text-white py-3 rounded-lg text-sm font-medium transition-colors">
                  <Film className="w-4 h-4" />
                  映像を合成する
                </button>
              </div>
            </div>
          </div>

          {/* 映像一覧 */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-[#2C3E50]">映像一覧</h2>
              <button className="flex items-center gap-1 text-sm text-[#2E86C1] hover:underline">
                <Plus className="w-3.5 h-3.5" /> 新規作成
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {DEMO_VIDEOS.map((video) => {
                const statusInfo = STATUS_MAP[video.status];
                return (
                  <div key={video.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50">
                    {/* サムネイル */}
                    <div className="w-24 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {video.thumbnail ? (
                        <img
                          src={video.thumbnail}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Film className="w-6 h-6 text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* 情報 */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#2C3E50] truncate">
                        {video.projectName}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                        <span className="text-xs text-[#7F8C8D]">
                          {video.cameraMotion}
                        </span>
                        {video.hasAvatar && (
                          <span className="text-xs text-[#8E44AD] flex items-center gap-1">
                            <User className="w-3 h-3" /> アバター付き
                          </span>
                        )}
                        <span className="text-xs text-[#7F8C8D]">{video.duration}</span>
                      </div>
                    </div>

                    {/* アクション */}
                    <div className="flex items-center gap-2">
                      {video.status === "completed" && (
                        <button className="text-sm text-[#2E86C1] hover:underline">
                          再生
                        </button>
                      )}
                      <span className="text-xs text-[#7F8C8D]">{video.createdAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
