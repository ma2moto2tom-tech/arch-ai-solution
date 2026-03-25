import { NextRequest, NextResponse } from "next/server";
import { buildPrompt } from "@/lib/prompt-builder";
import { getReplicateClient, isReplicateConfigured } from "@/lib/replicate";

// モック画像URLs
const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
];

/**
 * 素材着せ替えAPI
 * 既存の生成画像をベースに、素材だけを変更して再生成する
 */
export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await req.json();
    const {
      baseImageUrl,   // 元の生成画像URL
      wallId,
      floorId,
      exteriorId,
      roomType,
      style,
      customNote,
      strength = 0.55, // 素材変更の強度（0.3-0.8推奨、低いほど構造維持）
    } = body;

    if (!baseImageUrl) {
      return NextResponse.json({ success: false, error: "baseImageUrl is required" }, { status: 400 });
    }

    const prompt = buildPrompt({ wallId, floorId, exteriorId, roomType, style, customNote });

    let generatedImageUrl: string;

    if (isReplicateConfigured()) {
      const replicate = getReplicateClient()!;

      // img2img: 元画像をベースに素材だけ変更
      // adirik/interior-designで構造維持しつつ素材変更
      const output = await replicate.run(
        "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
        {
          input: {
            image: baseImageUrl,
            prompt: prompt,
            guidance_scale: 15,
            negative_prompt: "different room layout, different angle, lowres, blurry, watermark, text, cartoon, anime",
            prompt_strength: strength,
            num_inference_steps: 50,
          },
        }
      );

      generatedImageUrl = Array.isArray(output) ? String(output[0]) : String(output);
    } else {
      // デモモード
      await new Promise((resolve) => setTimeout(resolve, 1500));
      generatedImageUrl = MOCK_IMAGES[Math.floor(Math.random() * MOCK_IMAGES.length)];
    }

    return NextResponse.json({
      success: true,
      generatedImageUrl,
      processingTime: Date.now() - startTime,
      prompt,
      demoMode: !isReplicateConfigured(),
      swapMode: true,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
