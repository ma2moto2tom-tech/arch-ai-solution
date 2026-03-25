import { NextRequest, NextResponse } from "next/server";
import { buildPrompt } from "@/lib/prompt-builder";
import { getReplicateClient, isReplicateConfigured } from "@/lib/replicate";

// モック画像URLs
const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
];

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await req.json();
    const { imageUrl, wallId, floorId, exteriorId, roomType, style, customNote } = body;

    const prompt = buildPrompt({ wallId, floorId, exteriorId, roomType, style, customNote });

    let generatedImageUrl: string;

    if (isReplicateConfigured()) {
      const replicate = getReplicateClient()!;

      // adirik/interior-design: インテリアデザイン専用モデル
      // 元の部屋の構造（壁・窓・間取り）を保持しつつ素材・スタイルを変換
      const output = await replicate.run(
        "adirik/interior-design:76604baddc85b1b4616e1c6475571571f33e532a948b8e25fa3c5eac59055508",
        {
          input: {
            image: imageUrl,
            prompt: prompt,
            guidance_scale: 15,
            negative_prompt: "lowres, blurry, watermark, text, cartoon, anime, illustration, distorted, deformed",
            prompt_strength: 0.8,
            num_inference_steps: 50,
          },
        }
      );

      if (Array.isArray(output) && output.length > 0) {
        generatedImageUrl = String(output[0]);
      } else {
        generatedImageUrl = String(output);
      }
    } else {
      // デモモード
      await new Promise(resolve => setTimeout(resolve, 2000));
      generatedImageUrl = MOCK_IMAGES[Math.floor(Math.random() * MOCK_IMAGES.length)];
    }

    const processingTime = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      generatedImageUrl,
      processingTime,
      prompt,
      demoMode: !isReplicateConfigured(),
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
