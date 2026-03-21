export type MaterialCategory = "wall" | "floor" | "exterior";

export interface Material {
  id: string;
  name: string;
  nameEn: string;
  category: MaterialCategory;
  brand?: string;
  thumbnail: string;
  promptKeywords: string;
}

export const materials: Material[] = [
  // 壁材
  { id: "wall-white-cross", name: "クロス（白）", nameEn: "white wallpaper", category: "wall", brand: "サンゲツ", thumbnail: "/materials/wall-white.jpg", promptKeywords: "clean white Japanese wallpaper, smooth matte finish" },
  { id: "wall-wood", name: "木目調パネル", nameEn: "wood panel", category: "wall", brand: "Panasonic", thumbnail: "/materials/wall-wood.jpg", promptKeywords: "warm wood grain wall panel, Japanese cedar finish" },
  { id: "wall-concrete", name: "コンクリート打ちっぱなし", nameEn: "exposed concrete", category: "wall", thumbnail: "/materials/wall-concrete.jpg", promptKeywords: "raw exposed concrete wall, industrial modern" },
  { id: "wall-tile", name: "タイル", nameEn: "ceramic tile", category: "wall", brand: "LIXIL", thumbnail: "/materials/wall-tile.jpg", promptKeywords: "ceramic wall tiles, clean geometric pattern" },
  { id: "wall-plaster", name: "漆喰", nameEn: "lime plaster", category: "wall", thumbnail: "/materials/wall-plaster.jpg", promptKeywords: "traditional Japanese lime plaster wall, subtle texture" },

  // 床材
  { id: "floor-oak", name: "フローリング（オーク）", nameEn: "oak flooring", category: "floor", brand: "LIXIL", thumbnail: "/materials/floor-oak.jpg", promptKeywords: "light oak hardwood flooring, natural grain" },
  { id: "floor-walnut", name: "フローリング（ウォールナット）", nameEn: "walnut flooring", category: "floor", brand: "Panasonic", thumbnail: "/materials/floor-walnut.jpg", promptKeywords: "dark walnut hardwood flooring, rich brown tone" },
  { id: "floor-marble", name: "大理石", nameEn: "marble floor", category: "floor", thumbnail: "/materials/floor-marble.jpg", promptKeywords: "polished white marble floor, luxury finish" },
  { id: "floor-tile", name: "タイル", nameEn: "floor tile", category: "floor", brand: "LIXIL", thumbnail: "/materials/floor-tile.jpg", promptKeywords: "modern porcelain floor tiles, clean lines" },
  { id: "floor-tatami", name: "畳", nameEn: "tatami mat", category: "floor", thumbnail: "/materials/floor-tatami.jpg", promptKeywords: "traditional Japanese tatami mats, green rush weave" },

  // 外壁材
  { id: "ext-siding", name: "サイディング", nameEn: "siding", category: "exterior", brand: "ニチハ", thumbnail: "/materials/ext-siding.jpg", promptKeywords: "Japanese fiber cement siding, modern residential exterior" },
  { id: "ext-galvalume", name: "ガルバリウム鋼板", nameEn: "galvalume steel", category: "exterior", thumbnail: "/materials/ext-galvalume.jpg", promptKeywords: "dark galvalume steel cladding, sleek modern exterior" },
  { id: "ext-tile", name: "外壁タイル", nameEn: "exterior tile", category: "exterior", brand: "LIXIL", thumbnail: "/materials/ext-tile.jpg", promptKeywords: "exterior ceramic tile cladding, durable finish" },
  { id: "ext-plaster", name: "塗り壁", nameEn: "stucco", category: "exterior", thumbnail: "/materials/ext-plaster.jpg", promptKeywords: "Japanese stucco exterior wall, warm textured finish" },
];

export function getMaterialsByCategory(category: MaterialCategory): Material[] {
  return materials.filter(m => m.category === category);
}

export function getMaterialById(id: string): Material | undefined {
  return materials.find(m => m.id === id);
}
