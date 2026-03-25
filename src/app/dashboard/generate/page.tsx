"use client";

import { useState, useRef } from "react";
import { Sparkles, RotateCcw, AlertCircle, Save, Share2, Film } from "lucide-react";
import Header from "@/components/dashboard/Header";
import FileUploader from "@/components/FileUploader";
import MaterialSelector from "@/components/MaterialSelector";
import GenerationStatus from "@/components/GenerationStatus";
import BeforeAfter from "@/components/BeforeAfter";
import { materials } from "@/data/materials";

type RoomType = "living" | "kitchen" | "bedroom" | "bathroom" | "exterior" | "office" | "japanese_room";
type StyleType = "photorealistic" | "modern" | "japanese_modern" | "natural" | "industrial" | "scandinavian";

const ROOM_OPTIONS: { value: RoomType; label: string }[] = [
  { value: "living", label: "リビング" },
  { value: "kitchen", label: "キッチン" },
  { value: "bedroom", label: "寝室" },
  { value: "bathroom", label: "バスルーム" },
  { value: "exterior", label: "外観" },
  { value: "office", label: "オフィス" },
  { value: "japanese_room", label: "和室" },
];

const STYLE_OPTIONS: { value: StyleType; label: string }[] = [
  { value: "photorealistic", label: "フォトリアル" },
  { value: "modern", label: "モダン" },
  { value: "japanese_modern", label: "和モダン" },
  { value: "natural", label: "ナチュラル" },
  { value: "industrial", label: "インダストリアル" },
  { value: "scandinavian", label: "スカンジナビア" },
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
  prompt: string;
  processingTime: number;
}

export default function GeneratePage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [selectedWall, setSelectedWall] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [selectedExterior, setSelectedExterior] = useState<string | null>(null);
  const [roomType, setRoomType] = useState<RoomType>("living");
  const [style, setStyle] = useState<StyleType>("photorealistic");
  const [customNote, setCustomNote] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);
  const canGenerate = uploadedFile && selectedWall && selectedFloor;

  const handleFileSelect = (file: File, preview: string) => {
    setUploadedFile(file);
    setUploadedPreview(preview);
    setResult(null);
  };

  const handleClearFile = () => {
    setUploadedFile(null);
    setUploadedPreview(null);
    setResult(null);
  };

  // ファイルをbase64 data URIに変換
  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleGenerate = async () => {
    if (!canGenerate || !uploadedFile) return;
    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      // blob URLではなくbase64 data URIに変換してAPIに送る
      const imageDataUri = await fileToDataUri(uploadedFile);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: imageDataUri,
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
        prompt: data.prompt,
        processingTime: data.processingTime,
      });

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Header
        title="パース生成"
        subtitle="CAD図面からフォトリアルな3Dパースを自動生成"
      />

      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          {/* 2カラム入力エリア */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* 左: 図面アップロード */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-[#2C3E50] mb-3">
                1. 図面をアップロード
              </h2>
              <FileUploader
                onFileSelect={handleFileSelect}
                currentPreview={uploadedPreview}
                onClear={handleClearFile}
              />

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#7F8C8D] mb-1 block">部屋タイプ</label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value as RoomType)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
                  >
                    {ROOM_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#7F8C8D] mb-1 block">スタイル</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value as StyleType)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
                  >
                    {STYLE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3">
                <label className="text-xs text-[#7F8C8D] mb-1 block">追加指示（任意）</label>
                <textarea
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="例：窓からの自然光を強調してください"
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"
                />
              </div>
            </div>

            {/* 右: 素材選択 */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-[#2C3E50] mb-3">
                2. 素材を選択
              </h2>
              <MaterialSelector
                selectedWall={selectedWall}
                selectedFloor={selectedFloor}
                selectedExterior={selectedExterior}
                onSelectWall={setSelectedWall}
                onSelectFloor={setSelectedFloor}
                onSelectExterior={setSelectedExterior}
              />
            </div>
          </div>

          {/* 生成ボタン */}
          <div className="mt-6">
            <button
              onClick={handleGenerate}
              disabled={!canGenerate || isGenerating}
              className="w-full flex items-center justify-center gap-2 bg-[#F39C12] hover:bg-[#E67E22] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors shadow-lg shadow-[#F39C12]/30 disabled:shadow-none"
            >
              <Sparkles className="w-5 h-5" />
              AI画像を生成する
            </button>
            {!canGenerate && !isGenerating && !result && (
              <p className="text-center text-xs text-[#7F8C8D] mt-2">
                図面のアップロードと壁材・床材の選択が必要です
              </p>
            )}
          </div>

          {/* ステータス */}
          {isGenerating && (
            <div className="mt-6">
              <GenerationStatus isGenerating={isGenerating} />
            </div>
          )}

          {/* エラー */}
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* 結果 */}
          {result && (
            <div ref={resultRef} className="mt-6 space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-[#2C3E50]">生成結果</h2>
                  <span className="text-xs text-[#7F8C8D]">
                    処理時間: {(result.processingTime / 1000).toFixed(1)}秒
                    {result.demoMode && " (デモモード)"}
                  </span>
                </div>

                <BeforeAfter
                  beforeImage={result.beforeImage}
                  afterImage={result.afterImage}
                />

                {/* 使用素材情報 */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {[result.wallId, result.floorId, result.exteriorId].filter(Boolean).map((id) => {
                    const mat = materials.find((m) => m.id === id);
                    return mat ? (
                      <span key={mat.id} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                        {mat.brand ? `${mat.brand} ` : ""}{mat.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              {/* アクションボタン */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => { setResult(null); }}
                  className="flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-[#2C3E50] px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  再生成
                </button>
                <button className="flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-[#2C3E50] px-4 py-3 rounded-xl text-sm font-medium transition-colors">
                  <Save className="w-4 h-4" />
                  保存
                </button>
                <button className="flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-[#2C3E50] px-4 py-3 rounded-xl text-sm font-medium transition-colors">
                  <Share2 className="w-4 h-4" />
                  共有
                </button>
                <button className="flex items-center justify-center gap-2 bg-[#8E44AD] hover:bg-[#7D3C98] text-white px-4 py-3 rounded-xl text-sm font-medium transition-colors">
                  <Film className="w-4 h-4" />
                  映像化
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
