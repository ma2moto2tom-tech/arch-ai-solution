import { NextRequest, NextResponse } from "next/server";
import { buildPrompt } from "@/lib/prompt-builder";
import { getReplicateClient, isReplicateConfigured } from "@/lib/replicate";

// モック画像URLs (Unsplash architectural images)
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
    const { imageUrl, wallId, floorId, exteriorId, roomType, style, customNote, projectId, blueprintId } = body;

    const prompt = buildPrompt({ wallId, floorId, exteriorId, roomType, style, customNote });

    let generatedImageUrl: string;

    if (isReplicateConfigured()) {
      const replicate = getReplicateClient()!;
      const output = await replicate.run(
        "jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56c5c572c",
        {
          input: {
            image: imageUrl,
            prompt: prompt,
            num_samples: "1",
            image_resolution: "768",
            ddim_steps: 30,
            scale: 9,
            a_prompt: "best quality, extremely detailed, photorealistic, architectural photography",
            n_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers, blurry, watermark, text, cartoon, anime, illustration"
          }
        }
      );
      generatedImageUrl = Array.isArray(output) ? String(output[1] || output[0]) : String(output);
    } else {
      // デモモード: ランダムなモック画像を返却
      await new Promise(resolve => setTimeout(resolve, 2000)); // 擬似的な待機
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
