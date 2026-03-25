"use client";

import { Bell, Search, ChevronDown } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#2C3E50]">{title}</h1>
          {subtitle && (
            <p className="text-sm text-[#7F8C8D] mt-0.5">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* 検索 */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="プロジェクト・素材を検索..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent"
            />
          </div>

          {/* 通知 */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#F39C12] rounded-full" />
          </button>

          {/* ユーザーメニュー */}
          <button className="flex items-center gap-2 pl-4 border-l border-gray-200">
            <div className="w-8 h-8 bg-[#2E86C1] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">U</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
