import { materials } from "@/data/materials";

interface GeneratePromptInput {
  wallId: string;
  floorId: string;
  exteriorId?: string;
  roomType?: string;
  style?: string;
  customNote?: string;
}

export function buildPrompt(input: GeneratePromptInput): string {
  const wall = materials.find(m => m.id === input.wallId);
  const floor = materials.find(m => m.id === input.floorId);
  const exterior = input.exteriorId ? materials.find(m => m.id === input.exteriorId) : null;

  const roomLabel: Record<string, string> = {
    living: "spacious living room",
    kitchen: "modern kitchen",
    bedroom: "comfortable bedroom",
    bathroom: "clean bathroom",
    exterior: "residential exterior",
    office: "professional office space",
    japanese_room: "traditional Japanese room with tokonoma alcove",
  };

  const styleLabel: Record<string, string> = {
    photorealistic: "photorealistic architectural visualization",
    modern: "modern minimalist design",
    japanese_modern: "Japanese modern interior design with wa-modern aesthetics",
    natural: "natural and organic interior with warm lighting",
    industrial: "industrial loft design with exposed elements",
    scandinavian: "Scandinavian minimalist design with light wood and white tones",
  };

  const room = roomLabel[input.roomType || "living"] || "spacious living room";
  const style = styleLabel[input.style || "photorealistic"] || "photorealistic architectural visualization";

  let prompt = `A ${style} of a Japanese residential ${room}. `;
  if (wall) prompt += `Walls: ${wall.promptKeywords}. `;
  if (floor) prompt += `Floor: ${floor.promptKeywords}. `;
  if (exterior) prompt += `Exterior: ${exterior.promptKeywords}. `;
  prompt += "Natural daylight streaming through windows. ";
  prompt += "High-end architectural photography quality, 8K resolution. ";
  prompt += "Maintain the exact room layout and structural elements from the input image. ";
  if (input.customNote) prompt += `Additional notes: ${input.customNote}. `;

  return prompt;
}