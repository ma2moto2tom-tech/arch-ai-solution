"use client";

import { useState } from "react";
import Header from "@/components/dashboard/Header";
import { Search, Filter, Palette } from "lucide-react";
import { materials, type MaterialCategory } from "@/data/materials";

const CATEGORIES: { value: MaterialCategory | "all"; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "wall", label: "壁材" },
  { value: "floor", label: "床材" },
  { value: "exterior", label: "外壁材" },
];

export default function MaterialsPage() {
  const [category, setCategory] = useState<MaterialCategory | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = materials.filter((m) => {
    if (category !== "all" && m.category !== category) return false;
    if (search && !m.name.includes(search) && !m.nameEn.toLowerCase().includes(search.toLowerCase()) && !(m.brand || "").includes(search)) return false;
    return true;
  });

  return (
    <>
      <Header
        title="建材データベース"
        subtitle="LIXIL・Panasonic等の日本建材データ"
      />

      <main className="flex-1 p-6">
        {/* ツールバー */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="素材名・ブランドで検索..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64"
              />
            </div>

            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    category === cat.value
                      ? "bg-white text-[#2C3E50] shadow-sm font-medium"
                      : "text-[#7F8C8D] hover:text-[#2C3E50]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <span className="text-sm text-[#7F8C8D]">{filtered.length}件の建材</span>
        </div>

        {/* 建材グリッド */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((material) => (
            <div
              key={material.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
            >
              {/* サムネイル */}
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img
                  src={material.thumbnail}
                  alt={material.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* カテゴリバッジ */}
                <span className="absolute top-2 left-2 text-[10px] bg-black/50 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {material.category === "wall" ? "壁材" : material.category === "floor" ? "床材" : "外壁"}
                </span>
              </div>

              {/* 情報 */}
              <div className="p-3">
                <p className="text-sm font-medium text-[#2C3E50] truncate">
                  {material.name}
                </p>
                <p className="text-xs text-[#7F8C8D] mt-0.5">
                  {material.brand || "汎用"}
                </p>
                <p className="text-[10px] text-[#7F8C8D] mt-1 truncate">
                  {material.nameEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 拡張予定エリア */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">建材データベース拡張予定</h3>
          <p className="text-xs text-blue-600 max-w-lg mx-auto">
            LIXIL全シリーズ / Panasonic Veritis / TOTO / サンゲツ壁紙カタログ / ニチハサイディング /
            和室素材（畳・襖・障子）/ 天井材 など、日本の主要建材メーカーのカタログデータを順次追加予定です。
          </p>
        </div>
      </main>
    </>
  );
}
