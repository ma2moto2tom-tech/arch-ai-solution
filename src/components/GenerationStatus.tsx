"use client";

import { useEffect, useState } from "react";
import { Loader2, Check, Sparkles } from "lucide-react";

interface GenerationStatusProps {
  isGenerating: boolean;
  onComplete?: () => void;
}

const STEPS = [
  { label: "図面を解析中...", duration: 800 },
  { label: "素材を適用中...", duration: 1200 },
  { label: "高画質化処理中...", duration: 1000 },
  { label: "完了！", duration: 0 },
];

export default function GenerationStatus({ isGenerating, onComplete }: GenerationStatusProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isGenerating) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    let stepIndex = 0;
    const advanceStep = () => {
      if (stepIndex < STEPS.length - 1) {
        stepIndex++;
        setCurrentStep(stepIndex);
        setProgress((stepIndex / (STEPS.length - 1)) * 100);
        if (stepIndex < STEPS.length - 1) {
          setTimeout(advanceStep, STEPS[stepIndex].duration);
        }
      }
    };

    setTimeout(advanceStep, STEPS[0].duration);
  }, [isGenerating]);

  if (!isGenerating && currentStep === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        {currentStep < STEPS.length - 1 ? (
          <Loader2 className="w-5 h-5 text-[#2E86C1] animate-spin" />
        ) : (
          <Sparkles className="w-5 h-5 text-[#F39C12]" />
        )}
        <span className="font-medium text-[#2C3E50]">AI画像生成</span>
      </div>

      {/* プログレスバー */}
      <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
        <div
          className="bg-gradient-to-r from-[#2E86C1] to-[#1B4F72] h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ステップ一覧 */}
      <div className="space-y-2">
        {STEPS.map((step, index) => (
          <div key={index} className="flex items-center gap-2">
            {index < currentStep ? (
              <Check className="w-4 h-4 text-[#27AE60]" />
            ) : index === currentStep && isGenerating ? (
              <Loader2 className="w-4 h-4 text-[#2E86C1] animate-spin" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-gray-300" />
            )}
            <span className={`text-sm ${
              index <= currentStep ? "text-[#2C3E50]" : "text-[#7F8C8D]"
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
