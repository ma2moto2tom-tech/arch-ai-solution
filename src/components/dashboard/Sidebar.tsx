"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  FolderOpen,
  Image,
  Film,
  Youtube,
  Palette,
  Settings,
  CreditCard,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "ダッシュボード", icon: Building2 },
  { href: "/dashboard/projects", label: "プロジェクト", icon: FolderOpen },
  { href: "/dashboard/generate", label: "パース生成", icon: Image },
  { href: "/dashboard/materials", label: "建材データ", icon: Palette },
  { href: "/dashboard/videos", label: "映像合成", icon: Film },
  { href: "/dashboard/youtube", label: "YouTube配信", icon: Youtube },
];

const BOTTOM_ITEMS = [
  { href: "/dashboard/settings", label: "設定", icon: Settings },
  { href: "/dashboard/billing", label: "課金管理", icon: CreditCard },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-[#1B2A4A] min-h-screen flex flex-col">
      {/* ロゴ */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#F39C12] rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-white text-sm block">建築AI</span>
            <span className="text-white/50 text-xs">ソリューション</span>
          </div>
        </Link>
      </div>

      {/* メインナビ */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-white/10 text-white font-medium"
                  : "text-white/60 hover:bg-white/5 hover:text-white/80"
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* ボトムナビ */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        {BOTTOM_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-white/10 text-white font-medium"
                  : "text-white/60 hover:bg-white/5 hover:text-white/80"
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              {item.label}
            </Link>
          );
        })}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-red-400 hover:bg-white/5 transition-colors">
          <LogOut className="w-4.5 h-4.5" />
          ログアウト
        </button>
      </div>
    </aside>
  );
}
