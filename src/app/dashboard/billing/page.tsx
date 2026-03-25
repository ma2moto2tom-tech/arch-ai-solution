"use client";

import Header from "@/components/dashboard/Header";
import { CreditCard, Check, Zap, Crown, Rocket } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    price: "¥0",
    period: "/月",
    icon: Zap,
    color: "#7F8C8D",
    features: ["パース生成 5回/月", "プロジェクト 1件", "基本建材 14種", "共有リンク"],
    current: false,
  },
  {
    name: "Starter",
    price: "¥9,800",
    period: "/月",
    icon: Rocket,
    color: "#2E86C1",
    features: ["パース生成 50回/月", "映像合成 5本/月", "プロジェクト 10件", "建材 50種", "YouTube配信"],
    current: true,
  },
  {
    name: "Professional",
    price: "¥29,800",
    period: "/月",
    icon: Crown,
    color: "#F39C12",
    features: ["パース生成 200回/月", "映像合成 20本/月", "プロジェクト 50件", "建材 100種+", "AIアバター", "優先サポート"],
    current: false,
  },
  {
    name: "Enterprise",
    price: "お問い合わせ",
    period: "",
    icon: Crown,
    color: "#8E44AD",
    features: ["無制限パース生成", "無制限映像合成", "無制限プロジェクト", "全建材アクセス", "カスタムアバター", "専任サポート", "API連携"],
    current: false,
  },
];

export default function BillingPage() {
  return (
    <>
      <Header title="課金管理" subtitle="プラン変更・支払い情報" />

      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* 現在のプラン */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2E86C1]/10 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-[#2E86C1]" />
                </div>
                <div>
                  <p className="text-sm text-[#7F8C8D]">現在のプラン</p>
                  <p className="text-xl font-bold text-[#2C3E50]">Starter</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#7F8C8D]">次回請求日</p>
                <p className="text-sm font-medium text-[#2C3E50]">2026年4月20日</p>
              </div>
            </div>

            {/* 使用量バー */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-[#7F8C8D]">パース生成</span>
                  <span className="text-[#2C3E50] font-medium">32 / 50</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-[#2E86C1] rounded-full h-2" style={{ width: "64%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-[#7F8C8D]">映像合成</span>
                  <span className="text-[#2C3E50] font-medium">2 / 5</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-[#8E44AD] rounded-full h-2" style={{ width: "40%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* プラン一覧 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLANS.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`bg-white rounded-xl border-2 p-5 ${
                    plan.current ? "border-[#2E86C1] shadow-lg" : "border-gray-200"
                  }`}
                >
                  {plan.current && (
                    <span className="text-xs bg-[#2E86C1] text-white px-2.5 py-0.5 rounded-full mb-3 inline-block">
                      現在のプラン
                    </span>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5" style={{ color: plan.color }} />
                    <h3 className="font-semibold text-[#2C3E50]">{plan.name}</h3>
                  </div>
                  <p className="text-2xl font-bold text-[#2C3E50]">
                    {plan.price}
                    <span className="text-sm font-normal text-[#7F8C8D]">{plan.period}</span>
                  </p>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-[#2C3E50]">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full mt-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      plan.current
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "bg-[#2E86C1] hover:bg-[#2574A9] text-white"
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? "利用中" : "プラン変更"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
