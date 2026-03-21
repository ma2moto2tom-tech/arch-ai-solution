"use client";

import { useState } from "react";
import { materials, MaterialCategory, Material } from "@/data/materials";
import { Check } from "lucide-react";

interface MaterialSelectorProps {
  selectedWall: string | null;
  selectedFloor: string | null;
  selectedExterior: string | null;
  onSelectWall: (id: string) => void;
  onSelectFloor: (id: string) => void;
  onSelectExterior: (id: string) => void;
}

const TABS: { key: MaterialCategory; label: string }[] = [
  { key: "wall", label: "壁材" },
  { key: "floor", label: "床材" },
  { key: "exterior", label: "外壁材" },
];

// 素材カテゴリごとの色見本（サムネイル代替）
const COLOR_MAP: Record<string, string> = {
  "wall-white-cross": "#F5F5F0",
  "wall-wood": "#C19A6B",
  "wall-concrete": "#A9A9A9",
  "wall-tile": "#E8E8E8",
  "wall-plaster": "#FAF0E6",
  "floor-oak": "#DEB887",
  "floor-walnut": "#5C4033",
  "floor-marble": "#F0EDE5",
  "floor-tile": "#D3D3D3",
  "floor-tatami": "#8DB255",
  "ext-siding": "#B0B0B0",
  "ext-galvalume": "#3A3A3A",
  "ext-tile": "#C4A882",
  "ext-plaster": "#E8DCC8",
};

export default function MaterialSelector({
  selectedWall,
  selectedFloor,
  selectedExterior,
  onSelectWall,
  onSelectFloor,
  onSelectExterior,
}: MaterialSelectorProps) {
  const [activeTab, setActiveTab] = useState<MaterialCategory>("wall");

  const filtered = materials.filter(m => m.category === activeTab);

  const getSelected = (category: MaterialCategory) => {
    switch (category) {
      case "wall": return selectedWall;
      case "floor": return selectedFloor;
      case "exterior": return selectedExterior;
    }
  };

  const handleSelect = (material: Material) => {
    switch (material.category) {
      case "wall": onSelectWall(material.id); break;
      case "floor": onSelectFloor(material.id); break;
      case "exterior": onSelectExterior(material.id); break;
    }
  };

  const selected = getSelected(activeTab);

  return (
    <div>
      {/* タブ */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-4">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-white text-[#1B4F72] shadow-sm"
                : "text-[#7F8C8D] hover:text-[#2C3E50]"
            }`}
          >
            {tab.label}
            {getSelected(tab.key) && (
              <span className="ml-1.5 inline-flex items-center justify-center w-2 h-2 bg-[#27AE60] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* 素材カード一覧 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {filtered.map(material => {
          const isSelected = selected === material.id;
          return (
            <button
              key={material.id}
              onClick={() => handleSelect(material)}
              className={`relative p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                isSelected
                  ? "border-[#2E86C1] bg-[#2E86C1]/5 shadow-md"
                  : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 bg-[#2E86C1] rounded-full p-0.5">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              {/* 色見本 */}
              <div
                className="w-full h-16 rounded-lg mb-2 border border-gray-200"
                style={{ backgroundColor: COLOR_MAP[material.id] || "#E0E0E0" }}
              />
              <p className="text-sm font-medium text-[#2C3E50]">{material.name}</p>
              {material.brand && (
                <p className="text-xs text-[#7F8C8D] mt-0.5">{material.brand}</p>
              )}
            </button>
          );
        })}
      </div>

      {/* 選択サマリー */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-[#7F8C8D] mb-1">選択中の素材</p>
        <div className="flex flex-wrap gap-2">
          {selectedWall && (
            <span className="text-xs bg-[#1B4F72]/10 text-[#1B4F72] px-2.5 py-1 rounded-full">
              壁: {materials.find(m => m.id === selectedWall)?.name}
            </span>
          )}
          {selectedFloor && (
            <span className="text-xs bg-[#1B4F72]/10 text-[#1B4F72] px-2.5 py-1 rounded-full">
              床: {materials.find(m => m.id === selectedFloor)?.name}
            </span>
          )}
          {selectedExterior && (
            <span className="text-xs bg-[#1B4F72]/10 text-[#1B4F72] px-2.5 py-1 rounded-full">
              外壁: {materials.find(m => m.id === selectedExterior)?.name}
            </span>
          )}
          {!selectedWall && !selectedFloor && !selectedExterior && (
            <span className="text-xs text-[#7F8C8D]">素材を選択してください</span>
          )}
        </div>
      </div>
    </div>
  );
}
