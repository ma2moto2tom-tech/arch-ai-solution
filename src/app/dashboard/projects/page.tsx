"use client";

import Link from "next/link";
import Header from "@/components/dashboard/Header";
import { Plus, FolderOpen, Image, Clock, Search, Filter } from "lucide-react";

// デモデータ（Supabase接続後に実データに置換）
const DEMO_PROJECTS = [
  { id: "1", name: "渋谷区 田中邸リフォーム", client: "田中様", status: "in_progress", date: "2026-03-22", generations: 5, address: "東京都渋谷区" },
  { id: "2", name: "世田谷区 山田邸新築", client: "山田様", status: "completed", date: "2026-03-20", generations: 12, address: "東京都世田谷区" },
  { id: "3", name: "港区 オフィスリノベーション", client: "ABC株式会社", status: "draft", date: "2026-03-18", generations: 0, address: "東京都港区" },
  { id: "4", name: "目黒区 鈴木邸外装", client: "鈴木様", status: "in_progress", date: "2026-03-15", generations: 8, address: "東京都目黒区" },
  { id: "5", name: "新宿区 カフェ内装", client: "カフェモカ様", status: "completed", date: "2026-03-10", generations: 15, address: "東京都新宿区" },
];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  draft: { label: "下書き", color: "bg-gray-100 text-gray-600" },
  in_progress: { label: "進行中", color: "bg-blue-100 text-blue-700" },
  completed: { label: "完了", color: "bg-green-100 text-green-700" },
  archived: { label: "アーカイブ", color: "bg-gray-100 text-gray-500" },
};

export default function ProjectsPage() {
  return (
    <>
      <Header title="プロジェクト" subtitle="案件の管理・進捗確認" />

      <main className="flex-1 p-6">
        {/* ツールバー */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="プロジェクトを検索..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64"
              />
            </div>
            <button className="flex items-center gap-2 border border-gray-200 bg-white px-3 py-2 rounded-lg text-sm text-[#7F8C8D] hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              フィルタ
            </button>
          </div>
          <Link
            href="/dashboard/projects/new"
            className="flex items-center gap-2 bg-[#2E86C1] hover:bg-[#2574A9] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            新規プロジェクト
          </Link>
        </div>

        {/* プロジェクト一覧 */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-xs font-medium text-[#7F8C8D] uppercase tracking-wider">プロジェクト名</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#7F8C8D] uppercase tracking-wider">クライアント</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#7F8C8D] uppercase tracking-wider">ステータス</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#7F8C8D] uppercase tracking-wider">生成数</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#7F8C8D] uppercase tracking-wider">更新日</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {DEMO_PROJECTS.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <Link
                      href={`/dashboard/projects/${project.id}`}
                      className="flex items-center gap-3"
                    >
                      <div className="w-9 h-9 bg-[#F8F9FA] rounded-lg flex items-center justify-center">
                        <FolderOpen className="w-4 h-4 text-[#7F8C8D]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#2C3E50] hover:text-[#2E86C1]">
                          {project.name}
                        </p>
                        <p className="text-xs text-[#7F8C8D]">{project.address}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#2C3E50]">{project.client}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${STATUS_LABELS[project.status].color}`}>
                      {STATUS_LABELS[project.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1 text-sm text-[#7F8C8D]">
                      <Image className="w-3.5 h-3.5" />
                      {project.generations}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1 text-sm text-[#7F8C8D]">
                      <Clock className="w-3.5 h-3.5" />
                      {project.date}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
