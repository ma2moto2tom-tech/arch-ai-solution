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
  // =============================================
  // 壁材
  // =============================================
  { id: "wall-white-cross", name: "クロス（白）", nameEn: "white wallpaper", category: "wall", brand: "サンゲツ", thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", promptKeywords: "clean white Japanese wallpaper, smooth matte finish" },
  { id: "wall-wood", name: "木目調パネル", nameEn: "wood panel", category: "wall", brand: "Panasonic", thumbnail: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop", promptKeywords: "warm wood grain wall panel, Japanese cedar finish" },
  { id: "wall-concrete", name: "コンクリート打ちっぱなし", nameEn: "exposed concrete", category: "wall", thumbnail: "https://images.unsplash.com/photo-1553969420-fb915228af81?w=400&h=400&fit=crop", promptKeywords: "raw exposed concrete wall, industrial modern" },
  { id: "wall-tile", name: "タイル", nameEn: "ceramic tile", category: "wall", brand: "LIXIL", thumbnail: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=400&fit=crop", promptKeywords: "ceramic wall tiles, clean geometric pattern" },
  { id: "wall-plaster", name: "漆喰", nameEn: "lime plaster", category: "wall", thumbnail: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=400&h=400&fit=crop", promptKeywords: "traditional Japanese lime plaster wall, subtle texture" },
  { id: "wall-brick", name: "レンガ調", nameEn: "brick wall", category: "wall", thumbnail: "https://images.unsplash.com/photo-1464288550599-43d5a73451b8?w=400&h=400&fit=crop", promptKeywords: "exposed brick wall, warm reddish-brown texture, rustic industrial" },
  { id: "wall-diatomite", name: "珪藻土", nameEn: "diatomaceous earth", category: "wall", thumbnail: "https://images.unsplash.com/photo-1533628635777-112b2239b1c7?w=400&h=400&fit=crop", promptKeywords: "diatomaceous earth textured wall, natural matte finish, Japanese eco material" },
  { id: "wall-accent-navy", name: "アクセントクロス（ネイビー）", nameEn: "accent wallpaper navy", category: "wall", brand: "サンゲツ", thumbnail: "https://images.unsplash.com/photo-1528696892704-5e1122852276?w=400&h=400&fit=crop", promptKeywords: "deep navy blue accent wall, sophisticated Japanese interior" },
  { id: "wall-stone", name: "ストーンパネル", nameEn: "stone panel", category: "wall", brand: "LIXIL", thumbnail: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&h=400&fit=crop", promptKeywords: "natural stone panel wall, textured slate finish, luxury" },
  { id: "wall-japanese-plaster", name: "じゅらく壁", nameEn: "juraku plaster", category: "wall", thumbnail: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=400&h=400&fit=crop", promptKeywords: "traditional Japanese juraku clay plaster wall, warm earth tone texture" },

  // =============================================
  // 床材
  // =============================================
  { id: "floor-oak", name: "フローリング（オーク）", nameEn: "oak flooring", category: "floor", brand: "LIXIL", thumbnail: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=400&h=400&fit=crop", promptKeywords: "light oak hardwood flooring, natural grain" },
  { id: "floor-walnut", name: "フローリング（ウォールナット）", nameEn: "walnut flooring", category: "floor", brand: "Panasonic", thumbnail: "https://images.unsplash.com/photo-1622452104864-1fc528e97d5e?w=400&h=400&fit=crop", promptKeywords: "dark walnut hardwood flooring, rich brown tone" },
  { id: "floor-marble", name: "大理石", nameEn: "marble floor", category: "floor", thumbnail: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=400&fit=crop", promptKeywords: "polished white marble floor, luxury finish" },
  { id: "floor-tile", name: "タイル", nameEn: "floor tile", category: "floor", brand: "LIXIL", thumbnail: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=400&fit=crop", promptKeywords: "modern porcelain floor tiles, clean lines" },
  { id: "floor-tatami", name: "畳", nameEn: "tatami mat", category: "floor", thumbnail: "https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?w=400&h=400&fit=crop", promptKeywords: "traditional Japanese tatami mats, green rush weave" },
  { id: "floor-cherry", name: "フローリング（チェリー）", nameEn: "cherry flooring", category: "floor", brand: "Panasonic", thumbnail: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&h=400&fit=crop", promptKeywords: "warm cherry wood flooring, reddish-brown tone, smooth grain" },
  { id: "floor-herringbone", name: "ヘリンボーンフローリング", nameEn: "herringbone flooring", category: "floor", thumbnail: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop", promptKeywords: "herringbone pattern hardwood flooring, European classic style" },
  { id: "floor-concrete", name: "モルタル仕上げ", nameEn: "mortar floor", category: "floor", thumbnail: "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=400&h=400&fit=crop", promptKeywords: "polished concrete mortar floor, industrial modern finish" },
  { id: "floor-vinyl-wood", name: "フロアタイル（木目調）", nameEn: "vinyl wood tile", category: "floor", brand: "サンゲツ", thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop", promptKeywords: "wood-look luxury vinyl tile flooring, realistic grain" },
  { id: "floor-terrazzo", name: "テラゾー", nameEn: "terrazzo", category: "floor", thumbnail: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=400&fit=crop", promptKeywords: "terrazzo floor with colorful aggregate chips, polished finish" },
  { id: "floor-half-tatami", name: "琉球畳", nameEn: "ryukyu tatami", category: "floor", thumbnail: "https://images.unsplash.com/photo-1545083036-b175dd155a1d?w=400&h=400&fit=crop", promptKeywords: "modern square Ryukyu tatami mats, checkered pattern, Japanese modern" },

  // =============================================
  // 外壁材
  // =============================================
  { id: "ext-siding", name: "サイディング", nameEn: "siding", category: "exterior", brand: "ニチハ", thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop", promptKeywords: "Japanese fiber cement siding, modern residential exterior" },
  { id: "ext-galvalume", name: "ガルバリウム鋼板", nameEn: "galvalume steel", category: "exterior", thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop", promptKeywords: "dark galvalume steel cladding, sleek modern exterior" },
  { id: "ext-tile", name: "外壁タイル", nameEn: "exterior tile", category: "exterior", brand: "LIXIL", thumbnail: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=400&fit=crop", promptKeywords: "exterior ceramic tile cladding, durable finish" },
  { id: "ext-plaster", name: "塗り壁", nameEn: "stucco", category: "exterior", thumbnail: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&h=400&fit=crop", promptKeywords: "Japanese stucco exterior wall, warm textured finish" },
  { id: "ext-wood-siding", name: "木質サイディング", nameEn: "wood siding", category: "exterior", brand: "ニチハ", thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=400&fit=crop", promptKeywords: "natural wood grain siding, warm cedar-tone exterior cladding" },
  { id: "ext-stone-cladding", name: "石材調サイディング", nameEn: "stone cladding", category: "exterior", brand: "ケイミュー", thumbnail: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&h=400&fit=crop", promptKeywords: "natural stone look exterior cladding, textured masonry finish" },
  { id: "ext-black-galva", name: "ガルバリウム（ブラック）", nameEn: "black galvalume", category: "exterior", thumbnail: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=400&fit=crop", promptKeywords: "matte black galvalume steel exterior, modern minimalist facade" },
];

export function getMaterialsByCategory(category: MaterialCategory): Material[] {
  return materials.filter(m => m.category === category);
}

export function getMaterialById(id: string): Material | undefined {
  return materials.find(m => m.id === id);
}
