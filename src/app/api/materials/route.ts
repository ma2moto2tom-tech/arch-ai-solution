import { NextRequest, NextResponse } from "next/server";
import { materials, getMaterialsByCategory, type MaterialCategory } from "@/data/materials";

/**
 * 建材データ検索API
 * GET /api/materials?category=wall&search=オーク&brand=LIXIL
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") as MaterialCategory | null;
  const search = searchParams.get("search");
  const brand = searchParams.get("brand");

  let result = category ? getMaterialsByCategory(category) : [...materials];

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.nameEn.toLowerCase().includes(q) ||
        m.promptKeywords.toLowerCase().includes(q)
    );
  }

  if (brand) {
    result = result.filter((m) => m.brand === brand);
  }

  return NextResponse.json({
    success: true,
    materials: result,
    total: result.length,
  });
}
