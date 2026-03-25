"use client";

import Header from "@/components/dashboard/Header";
import Link from "next/link";
import {
  FolderOpen,
  Image,
  Film,
  Youtube,
  Plus,
  TrendingUp,
  Clock,
  ArrowRight,
} from "lucide-react";

// デモ用統計データ（Supabase接続後に実データに置換）
const DEMO_STATS = [
  { label: "プロジェクト", value: "12", icon: FolderOpen, color: "#2E86C1" },
  { label: "パース生成", value: "148", icon: Image, color: "#27AE60" },
  { label: "映像合成", value: "23", icon: Film, color: "#8E44AD" },
  { label: "YouTube配信", value: "8", icon: Youtube, color: "#E74C3C" },
];

const RECENT_PROJECTS = [
  { id: "1", name: "渋谷区 田中邸リフォーム", status: "in_progress", date: "2026-03-22", generations: 5 },
  { id: "2", name: "世田谷区 山田邸新築", status: "completed", date: "2026-03-20", generations: 12 },
  { id: "3", name: "港区 オフィスリノベーション", status: "draft", date: "2026-03-18", generations: 0 },
];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  draft: { label: "下書き", color: "bg-gray-100 text-gray-600" },
  in_progress: { label: "進行中", color: "bg-blue-100 text-blue-700" },
  completed: { label: "完了", color: "bg-green-100 text-green-700" },
  archived: { label: "アーカイブ", color: "bg-gray-100 text-gray-500" },
};

export default function DashboardPage() {
  return (
    <>
      <Header title="ダッシュボード" subtitle="建築・内装AIソリューション" />

      <main className="flex-1 p-6 space-y-6">
        {/* 統計カード */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {DEMO_STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-gray-200 p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-[#2C3E50]">{stat.value}</p>
                <p className="text-sm text-[#7F8C8D] mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 最近のプロジェクト */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-semibold text-[#2C3E50]">最近のプロジェクト</h2>
              <Link
                href="/dashboard/projects"
                className="text-sm text-[#2E86C1] hover:underline flex items-center gap-1"
              >
                すべて見る <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {RECENT_PROJECTS.map((project) => (
                <Link
                  key={project.id}
                  href={`/dashboard/projects/${project.id}`}
                  className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#F8F9FA] rounded-lg flex items-center justify-center">
                      <FolderOpen className="w-5 h-5 text-[#7F8C8D]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#2C3E50]">
                        {project.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${STATUS_LABELS[project.status].color}`}
                        >
                          {STATUS_LABELS[project.status].label}
                        </span>
                        <span className="text-xs text-[#7F8C8D] flex items-center gap-1">
                          <Image className="w-3 h-3" /> {project.generations}件
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#7F8C8D]">
                    <Clock className="w-3.5 h-3.5" />
                    {project.date}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* クイックアクション */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-[#2C3E50] mb-4">クイックアクション</h2>
            <div className="space-y-3">
              <Link
                href="/dashboard/projects/new"
                className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-gray-300 hover:border-[#2E86C1] hover:bg-blue-50/50 transition-colors"
              >
                <div className="w-9 h-9 bg-[#2E86C1]/10 rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-[#2E86C1]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2C3E50]">新規プロジェクト</p>
                  <p className="text-xs text-[#7F8C8D]">図面をアップロード</p>
                </div>
              </Link>

              <Link
                href="/dashboard/generate"
                className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-gray-300 hover:border-[#F39C12] hover:bg-orange-50/50 transition-colors"
              >
                <div className="w-9 h-9 bg-[#F39C12]/10 rounded-lg flex items-center justify-center">
                  <Image className="w-4 h-4 text-[#F39C12]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2C3E50]">パース生成</p>
                  <p className="text-xs text-[#7F8C8D]">AI画像を生成</p>
                </div>
              </Link>

              <Link
                href="/dashboard/videos"
                className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-gray-300 hover:border-[#8E44AD] hover:bg-purple-50/50 transition-colors"
              >
                <div className="w-9 h-9 bg-[#8E44AD]/10 rounded-lg flex items-center justify-center">
                  <Film className="w-4 h-4 text-[#8E44AD]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2C3E50]">映像合成</p>
                  <p className="text-xs text-[#7F8C8D]">動画を作成</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
