"use client";

import { useState, useRef } from "react";
import { Building2, Sparkles, Share2, RotateCcw, AlertCircle } from "lucide-react";
import FileUploader from "@/components/FileUploader";
import MaterialSelector from "@/components/MaterialSelector";
import GenerationStatus from "@/components/GenerationStatus";
import BeforeAfter from "@/components/BeforeAfter";
import { materials } from "@/data/materials";

type RoomType = "living" | "kitchen" | "bedroom" | "bathroom" | "exterior";
type StyleType = "photorealistic" | "modern" | "japanese_modern" | "natural";

const ROOM_OPTIONS: { value: RoomType; label: string }[] = [
  { value: "living", label: "リビング" },
  { value: "kitchen", label: "キッチン" },
  { value: "bedroom", label: "寝室" },
  { value: "bathroom", label: "バスルーム" },
  { value: "exterior", label: "外観" },
];

const STYLE_OPTIONS: { value: StyleType; label: string }[] = [
  { value: "photorealistic", label: "フォトリアル" },
  { value: "modern", label: "モダン" },
  { value: "japanese_modern", label: "和モダン" },
  { value: "natural", label: "ナチュラル" },
];

interface GenerationResult {
  beforeImage: string;
  afterImage: string;
  demoMode: boolean;
  wallId: string;
  floorId: string;
  exteriorId: string | null;
  roomType: RoomType;
  style: StyleType;
}

export default function MainPage() {
  // アップロード
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);

  // 素材選択
  const [selectedWall, setSelectedWall] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [selectedExterior, setSelectedExterior] = useState<string | null>(null);

  // 設定
  const [roomType, setRoomType] = useState<RoomType>("living");
  const [style, setStyle] = useState<StyleType>("photorealistic");
  const [customNote, setCustomNote] = useState("");
  const [propertyName, setPropertyName] = useState("");

  // 生成
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const canGenerate = uploadedFile && selectedWall && selectedFloor;

  const handleFileSelect = (file: File, preview: string) => {
    setUploadedFile(file);
    setUploadedPreview(preview);
    setResult(null);
    setShareUrl(null);
  };

  const handleClearFile = () => {
    setUploadedFile(null);
    setUploadedPreview(null);
    setResult(null);
    setShareUrl(null);
  };

  const handleGenerate = async () => {
    if (!canGenerate || !uploadedPreview) return;
    setIsGenerating(true);
    setError(null);
    setResult(null);
    setShareUrl(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: uploadedPreview,
          wallId: selectedWall,
          floorId: selectedFloor,
          exteriorId: selectedExterior,
          roomType,
          style,
          customNote,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "生成に失敗しました");

      setResult({
        beforeImage: uploadedPreview,
        afterImage: data.generatedImageUrl,
        demoMode: data.demoMode,
        wallId: selectedWall!,
        floorId: selectedFloor!,
        exteriorId: selectedExterior,
        roomType,
        style,
      });

      // 結果までスクロール
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateShareLink = () => {
    if (!result) return;

    const shareData = {
      afterImage: result.afterImage,
      propertyName: propertyName || "未設定物件",
      wallName: materials.find(m => m.id === result.wallId)?.name || "",
      floorName: materials.find(m => m.id === result.floorId)?.name || "",
      exteriorName: result.exteriorId
        ? materials.find(m => m.id === result.exteriorId)?.name || ""
        : "",
      roomType: ROOM_OPTIONS.find(r => r.value === result.roomType)?.label || "",
      style: STYLE_OPTIONS.find(s => s.value === result.style)?.label || "",
    };

    const token = btoa(unescape(encodeURIComponent(JSON.stringify(shareData))));
    const url = `${window.location.origin}/view/${token}`;
    setShareUrl(url);
    navigator.clipboard.writeText(url).catch(() => {});
  };

  const handleRegenerate = () => {
    setResult(null);
    setShareUrl(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* ヘッダー */}
      <header className="bg-[#1B4F72] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-white text-lg">建築・内装AI</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* 2カラムレイアウト */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 左カラム：図面アップロード */}
          <div>
            <h2 className="text-lg font-semibold text-[#2C3E50] mb-4">1. 図面をアップロード</h2>
            <FileUploader
              onFileSelect={handleFileSelect}
              currentPreview={uploadedPreview}
              onClear={handleClearFile}
            />

            {/* 物件名（任意） */}
            <div className="mt-4">
              <label className="text-sm text-[#7F8C8D] mb-1 block">物件名（任意）</label>
              <input
                type="text"
                value={propertyName}
                onChange={e => setPropertyName(e.target.value)}
                placeholder="例：渋谷区 田中邸"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent"
              />
            </div>
          </div>

          {/* 右カラム：素材選択 + 設定 */}
          <div>
            <h2 className="text-lg font-semibold text-[#2C3E50] mb-4">2. 素材を選択</h2>
            <MaterialSelector
              selectedWall={selectedWall}
              selectedFloor={selectedFloor}
              selectedExterior={selectedExterior}
              onSelectWall={setSelectedWall}
              onSelectFloor={setSelectedFloor}
              onSelectExterior={setSelectedExterior}
            />

            {/* 部屋タイプ・スタイル */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#7F8C8D] mb-1 block">部屋タイプ</label>
                <select
                  value={roomType}
                  onChange={e => setRoomType(e.target.value as RoomType)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent bg-white"
                >
                  {ROOM_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-[#7F8C8D] mb-1 block">スタイル</label>
                <select
                  value={style}
                  onChange={e => setStyle(e.target.value as StyleType)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent bg-white"
                >
                  {STYLE_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 追加メモ */}
            <div className="mt-4">
              <label className="text-sm text-[#7F8C8D] mb-1 block">追加メモ（任意）</label>
              <textarea
                value={customNote}
                onChange={e => setCustomNote(e.target.value)}
                placeholder="例：窓からの自然光を強調してください"
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm resize-none focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* 生成ボタン */}
        <div className="mt-8">
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
            className="w-full flex items-center justify-center gap-2 bg-[#F39C12] hover:bg-[#E67E22] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors shadow-lg shadow-[#F39C12]/30 disabled:shadow-none"
          >
            <Sparkles className="w-5 h-5" />
            AI画像を生成する
          </button>
          {!canGenerate && !isGenerating && !result && (
            <p className="text-center text-sm text-[#7F8C8D] mt-2">
              図面のアップロードと壁材・床材の選択が必要です
            </p>
          )}
        </div>

        {/* 生成ステータス */}
        {isGenerating && (
          <div className="mt-6">
            <GenerationStatus isGenerating={isGenerating} />
          </div>
        )}

        {/* エラー */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">生成エラー</p>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* 生成結果 */}
        {result && (
          <div ref={resultRef} className="mt-8">
            <h2 className="text-lg font-semibold text-[#2C3E50] mb-4">生成結果</h2>

            {result.demoMode && (
              <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 flex items-center gap-2 text-sm text-amber-700">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                デモモード：実際のAI生成にはAPIキーの設定が必要です
              </div>
            )}

            <BeforeAfter
              beforeImage={result.beforeImage}
              afterImage={result.afterImage}
            />

            {/* アクションボタン */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRegenerate}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-[#2E86C1] text-[#2C3E50] px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                別の素材で再生成
              </button>
              <button
                onClick={handleCreateShareLink}
                className="flex-1 flex items-center justify-center gap-2 bg-[#1B4F72] hover:bg-[#154360] text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <Share2 className="w-4 h-4" />
                共有リンクを作成
              </button>
            </div>

            {/* 共有URL表示 */}
            {shareUrl && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm font-medium text-green-800 mb-2">共有リンクが作成されました（クリップボードにコピー済み）</p>
                <div className="bg-white border border-green-300 rounded-lg px-3 py-2">
                  <p className="text-xs text-[#2C3E50] break-all font-mono">{shareUrl}</p>
                </div>
                <p className="text-xs text-green-600 mt-2">このURLを施主様に共有してください</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* フッター */}
      <footer className="border-t border-gray-200 py-6 px-6 mt-12">
        <div className="max-w-6xl mx-auto text-center text-[#7F8C8D] text-sm">
          &copy; 2026 建築・内装AIソリューション. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
