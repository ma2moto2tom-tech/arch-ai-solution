// Supabase Database Types - マルチテナント建築AIソリューション

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: "free" | "starter" | "professional" | "enterprise";
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  youtube_channel_id: string | null;
  settings: TenantSettings;
  created_at: string;
  updated_at: string;
}

export interface TenantSettings {
  logo_url?: string;
  primary_color?: string;
  default_style?: string;
  heygen_avatar_id?: string;
}

export interface User {
  id: string;
  tenant_id: string;
  email: string;
  name: string;
  role: "owner" | "admin" | "member";
  avatar_url: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  tenant_id: string;
  created_by: string;
  name: string;
  description: string | null;
  property_address: string | null;
  client_name: string | null;
  status: "draft" | "in_progress" | "completed" | "archived";
  created_at: string;
  updated_at: string;
}

export interface FloorPlan {
  id: string;
  project_id: string;
  tenant_id: string;
  file_url: string;
  file_name: string;
  file_type: "dxf" | "dwg" | "pdf" | "image";
  room_type: RoomType;
  created_at: string;
}

export interface Generation {
  id: string;
  project_id: string;
  floor_plan_id: string;
  tenant_id: string;
  original_image_url: string;
  generated_image_url: string;
  wall_material_id: string;
  floor_material_id: string;
  exterior_material_id: string | null;
  room_type: RoomType;
  style: StyleType;
  prompt: string;
  custom_note: string | null;
  processing_time_ms: number;
  is_demo: boolean;
  created_at: string;
}

export interface Video {
  id: string;
  project_id: string;
  tenant_id: string;
  generation_ids: string[];
  status: "pending" | "processing" | "completed" | "failed";
  video_url: string | null;
  duration_seconds: number | null;
  has_avatar: boolean;
  avatar_script: string | null;
  camera_motion: CameraMotion;
  created_at: string;
  updated_at: string;
}

export interface YouTubeUpload {
  id: string;
  video_id: string;
  tenant_id: string;
  youtube_video_id: string | null;
  title: string;
  description: string;
  visibility: "private" | "unlisted" | "public";
  status: "pending" | "uploading" | "processing" | "live" | "failed";
  share_url: string | null;
  chapters: YouTubeChapter[];
  created_at: string;
  updated_at: string;
}

export interface YouTubeChapter {
  time_seconds: number;
  title: string;
}

export interface Subscription {
  id: string;
  tenant_id: string;
  stripe_subscription_id: string;
  plan: "starter" | "professional" | "enterprise";
  status: "active" | "past_due" | "canceled" | "trialing";
  current_period_start: string;
  current_period_end: string;
  generations_used: number;
  generations_limit: number;
  videos_used: number;
  videos_limit: number;
}

// Enums
export type RoomType = "living" | "kitchen" | "bedroom" | "bathroom" | "exterior" | "office" | "japanese_room";
export type StyleType = "photorealistic" | "modern" | "japanese_modern" | "natural" | "industrial" | "scandinavian";
export type CameraMotion = "pan_left" | "pan_right" | "zoom_in" | "orbit" | "walkthrough";

// Plan limits
export const PLAN_LIMITS = {
  free: { generations: 5, videos: 0, materials: 14, projects: 1 },
  starter: { generations: 50, videos: 5, materials: 50, projects: 10 },
  professional: { generations: 200, videos: 20, materials: 100, projects: 50 },
  enterprise: { generations: -1, videos: -1, materials: -1, projects: -1 }, // unlimited
} as const;
