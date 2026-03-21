"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Building2, Phone, Mail, MessageCircle, Send, AlertCircle } from "lucide-react";

interface ShareData {
  afterImage: string;
  propertyName: string;
  wallName: string;
  floorName: string;
  exteriorName: string;
  roomType: string;
  style: string;
}

export default function ShareViewPage() {
  const params = useParams();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  // Base64デコード
  const shareData = useMemo<ShareData | null>(() => {
    try {
      const token = params.token as string;
      const decoded = decodeURIComponent(escape(atob(token)));
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }, [params.token]);

  if (!shareData) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-[#7F8C8D] mx-auto mb-4" />
          <h1 className="text-lg font-semibold text-[#2C3E50] mb-2">リンクが無効です</h1>
          <p className="text-sm text-[#7F8C8D]">
            このURLは無効または期限切れです。共有リンクを再発行してください。
          </p>
        </div>
      </div>
    );
  }

  const handleSendRequest = () => {
    const subject = encodeURIComponent(`【素材変更リクエスト】${shareData.propertyName}`);
    const body = encodeURIComponent(`物件名: ${shareData.propertyName}\n\n変更リクエスト:\n${requestText}`);
    window.location.href = `mailto:info@sample.co.jp?subject=${subject}&body=${body}`;
    setRequestSent(true);
    setTimeout(() => {
      setShowRequestForm(false);
      setRequestSent(false);
      setRequestText("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 bg-[#1B4F72] rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2C3E50]">株式会社サンプル建装</p>
            <p className="text-xs text-[#7F8C8D]">完成イメージのご提案</p>
          </div>
        </div>
      </header>

      {/* メイン */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* 物件情報 */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#2C3E50]">{shareData.propertyName}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {shareData.roomType && (
              <span className="text-xs bg-[#1B4F72]/10 text-[#1B4F72] px-2.5 py-1 rounded-full">
                {shareData.roomType}
              </span>
            )}
            {shareData.style && (
              <span className="text-xs bg-[#1B4F72]/10 text-[#1B4F72] px-2.5 py-1 rounded-full">
                {shareData.style}
              </span>
            )}
          </div>
        </div>

        {/* AI生成画像 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="aspect-[4/3] relative">
            <img
              src={shareData.afterImage}
              alt="AI生成完成イメージ"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 使用素材 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <h2 className="font-semibold text-[#2C3E50] mb-3">使用素材</h2>
          <div className="space-y-2">
            {shareData.wallName && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#7F8C8D] w-12">壁材</span>
                <span className="text-[#2C3E50] font-medium">{shareData.wallName}</span>
              </div>
            )}
            {shareData.floorName && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#7F8C8D] w-12">床材</span>
                <span className="text-[#2C3E50] font-medium">{shareData.floorName}</span>
              </div>
            )}
            {shareData.exteriorName && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#7F8C8D] w-12">外壁材</span>
                <span className="text-[#2C3E50] font-medium">{shareData.exteriorName}</span>
              </div>
            )}
          </div>
        </div>

        {/* 素材変更リクエスト */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <h2 className="font-semibold text-[#2C3E50] mb-3">素材変更リクエスト</h2>
          {!showRequestForm ? (
            <button
              onClick={() => setShowRequestForm(true)}
              className="w-full flex items-center justify-center gap-2 bg-[#F39C12] hover:bg-[#E67E22] text-white px-5 py-3 rounded-lg font-medium transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              変更をリクエストする
            </button>
          ) : (
            <div className="space-y-3">
              <textarea
                value={requestText}
                onChange={e => setRequestText(e.target.value)}
                placeholder="例：リビングの壁を木目調に変更希望です。キッチンの床はもう少し明るいトーンが良いです。"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-none focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-[#7F8C8D] hover:bg-gray-50 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleSendRequest}
                  disabled={!requestText.trim()}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#1B4F72] hover:bg-[#154360] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {requestSent ? (
                    <>送信しました!</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      メールで送信
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-white border-t border-gray-100 px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-[#1B4F72] rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-sm text-[#2C3E50]">株式会社サンプル建装</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 text-sm text-[#7F8C8D]">
            <a href="tel:03-1234-5678" className="flex items-center gap-1.5 hover:text-[#2C3E50]">
              <Phone className="w-3.5 h-3.5" /> 03-1234-5678
            </a>
            <a href="mailto:info@sample.co.jp" className="flex items-center gap-1.5 hover:text-[#2C3E50]">
              <Mail className="w-3.5 h-3.5" /> info@sample.co.jp
            </a>
          </div>
          <p className="text-xs text-[#7F8C8D] mt-4">
            &copy; 2026 株式会社サンプル建装. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
