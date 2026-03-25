import { NextRequest, NextResponse } from "next/server";

/**
 * プロジェクトCRUD API
 */

// デモデータ
const DEMO_PROJECTS = [
  { id: "1", name: "渋谷区 田中邸リフォーム", clientName: "田中様", status: "in_progress", propertyAddress: "東京都渋谷区", description: null, createdAt: "2026-03-22T10:00:00Z", updatedAt: "2026-03-22T10:00:00Z" },
  { id: "2", name: "世田谷区 山田邸新築", clientName: "山田様", status: "completed", propertyAddress: "東京都世田谷区", description: null, createdAt: "2026-03-20T10:00:00Z", updatedAt: "2026-03-20T10:00:00Z" },
  { id: "3", name: "港区 オフィスリノベーション", clientName: "ABC株式会社", status: "draft", propertyAddress: "東京都港区", description: "オフィスリノベーション案件", createdAt: "2026-03-18T10:00:00Z", updatedAt: "2026-03-18T10:00:00Z" },
];

export async function GET() {
  // TODO: Supabase実装
  // const supabase = await createServerSupabaseClient();
  // const { data } = await supabase.from('projects').select().order('updated_at', { ascending: false });

  return NextResponse.json({
    success: true,
    projects: DEMO_PROJECTS,
    total: DEMO_PROJECTS.length,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, clientName, propertyAddress, description } = body;

    if (!name) {
      return NextResponse.json({ success: false, error: "name is required" }, { status: 400 });
    }

    // TODO: Supabase INSERT
    // const supabase = await createServerSupabaseClient();
    // const { data: user } = await supabase.auth.getUser();
    // const { data } = await supabase.from('projects').insert({
    //   tenant_id: user.user_metadata.tenant_id,
    //   created_by: user.id,
    //   name, client_name: clientName, property_address: propertyAddress, description,
    // }).select().single();

    const newProject = {
      id: `proj_${Date.now()}`,
      name,
      clientName,
      propertyAddress,
      description,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, project: newProject });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
