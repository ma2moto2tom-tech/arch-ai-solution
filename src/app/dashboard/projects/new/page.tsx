"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/dashboard/Header";
import { ArrowRight, FolderOpen } from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    setIsCreating(true);

    // TODO: Supabase INSERT
    // const supabase = createClient();
    // const { data } = await supabase.from('projects').insert({ ... }).select().single();

    // デモ: プロジェクト一覧に遷移
    setTimeout(() => {
      router.push("/dashboard/projects");
    }, 500);
  };

  return (
    <>
      <Header title="新規プロジェクト" subtitle="案件情報を入力" />

      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleCreate} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#2E86C1]/10 rounded-lg flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-[#2E86C1]" />
              </div>
              <div>
                <h2 className="font-semibold text-[#2C3E50]">プロジェクト情報</h2>
                <p className="text-xs text-[#7F8C8D]">案件の基本情報を入力してください</p>
              </div>
            </div>

            <div>
              <label className="text-sm text-[#7F8C8D] mb-1 block">プロジェクト名 *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例：渋谷区 田中邸リフォーム"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#7F8C8D] mb-1 block">クライアント名</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="例：田中様"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-[#7F8C8D] mb-1 block">物件所在地</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="例：東京都渋谷区"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-[#7F8C8D] mb-1 block">概要メモ（任意）</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="案件の概要・特記事項を入力..."
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!name || isCreating}
              className="w-full flex items-center justify-center gap-2 bg-[#2E86C1] hover:bg-[#2574A9] disabled:bg-gray-300 text-white py-3 rounded-lg text-sm font-medium transition-colors"
            >
              {isCreating ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  プロジェクトを作成
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
