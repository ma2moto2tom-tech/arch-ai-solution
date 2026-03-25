"use client";

import { useState } from "react";
import { Building2, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Supabase Auth実装
    // const supabase = createClient();
    // if (mode === 'login') {
    //   await supabase.auth.signInWithPassword({ email, password });
    // } else {
    //   await supabase.auth.signUp({ email, password });
    // }

    // デモ: ダッシュボードに遷移
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B2A4A] to-[#2E86C1] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* ロゴ */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#F39C12] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">建築・内装AIソリューション</h1>
          <p className="text-white/60 text-sm mt-2">
            図面からフォトリアルな完成イメージを自動生成
          </p>
        </div>

        {/* フォーム */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          {/* タブ */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                mode === "login"
                  ? "bg-white text-[#2C3E50] shadow-sm"
                  : "text-[#7F8C8D]"
              }`}
            >
              ログイン
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                mode === "signup"
                  ? "bg-white text-[#2C3E50] shadow-sm"
                  : "text-[#7F8C8D]"
              }`}
            >
              新規登録
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-[#7F8C8D] mb-1 block">メールアドレス</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@company.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-[#7F8C8D] mb-1 block">パスワード</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm"
                  required
                />
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <label className="text-sm text-[#7F8C8D] mb-1 block">企業名</label>
                <input
                  type="text"
                  placeholder="株式会社○○"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#2E86C1] hover:bg-[#2574A9] disabled:bg-gray-300 text-white py-3 rounded-lg text-sm font-medium transition-colors"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === "login" ? "ログイン" : "アカウント作成"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {mode === "login" && (
            <p className="text-center text-xs text-[#7F8C8D] mt-4">
              パスワードをお忘れですか？{" "}
              <button className="text-[#2E86C1] hover:underline">リセット</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
