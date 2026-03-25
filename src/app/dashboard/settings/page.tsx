"use client";

import Header from "@/components/dashboard/Header";
import { Building2, Key, Youtube, User, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <>
      <Header title="設定" subtitle="テナント・API連携の設定" />

      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* 企業情報 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-5">
              <Building2 className="w-5 h-5 text-[#2E86C1]" />
              <h2 className="font-semibold text-[#2C3E50]">企業情報</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#7F8C8D] mb-1 block">企業名</label>
                <input type="text" defaultValue="株式会社and" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm" />
              </div>
              <div>
                <label className="text-sm text-[#7F8C8D] mb-1 block">テナントスラッグ</label>
                <input type="text" defaultValue="and-corp" disabled className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-500" />
              </div>
              <div>
                <label className="text-sm text-[#7F8C8D] mb-1 block">ロゴURL</label>
                <input type="text" placeholder="https://..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm" />
              </div>
            </div>
          </div>

          {/* API連携 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-5">
              <Key className="w-5 h-5 text-[#F39C12]" />
              <h2 className="font-semibold text-[#2C3E50]">API連携設定</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#7F8C8D] mb-1 flex items-center gap-2">
                  Replicate API Token
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">接続済み</span>
                </label>
                <input type="password" defaultValue="r8_••••••••••••" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm" />
              </div>
              <div>
                <label className="text-sm text-[#7F8C8D] mb-1 flex items-center gap-2">
                  <Youtube className="w-4 h-4 text-red-500" />
                  YouTube API Key
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">未設定</span>
                </label>
                <input type="text" placeholder="AIza..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm" />
              </div>
              <div>
                <label className="text-sm text-[#7F8C8D] mb-1 flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-500" />
                  HeyGen API Key
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">未設定</span>
                </label>
                <input type="text" placeholder="hg-..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm" />
              </div>
            </div>
          </div>

          {/* デフォルト設定 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-5">
              <Globe className="w-5 h-5 text-[#27AE60]" />
              <h2 className="font-semibold text-[#2C3E50]">デフォルト設定</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#7F8C8D] mb-1 block">デフォルトスタイル</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white">
                  <option value="photorealistic">フォトリアル</option>
                  <option value="modern">モダン</option>
                  <option value="japanese_modern">和モダン</option>
                  <option value="natural">ナチュラル</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-[#7F8C8D] mb-1 block">YouTube公開設定（デフォルト）</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white">
                  <option value="unlisted">限定公開（推奨）</option>
                  <option value="private">非公開</option>
                  <option value="public">公開</option>
                </select>
              </div>
            </div>
          </div>

          <button className="w-full bg-[#2E86C1] hover:bg-[#2574A9] text-white py-3 rounded-xl text-sm font-medium transition-colors">
            設定を保存
          </button>
        </div>
      </main>
    </>
  );
}
