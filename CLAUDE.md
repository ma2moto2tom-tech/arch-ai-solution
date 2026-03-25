# 建築・内装向けAIソリューション

## プロジェクト概要
CAD図面からControlNet等でフォトリアルな3Dパースを自動生成し、素材着せ替え・映像合成・AIアバターナビゲーション・YouTube限定公開配信までを一気通貫で提供するWebダッシュボードシステム。

クライアント: 株式会社and
作成日: 2026年3月20日

## 技術スタック
- **フレームワーク**: Next.js 16 (App Router) + React 19 + TypeScript
- **スタイリング**: Tailwind CSS 4
- **画像生成**: Replicate API (Stable Diffusion + ControlNet)
- **映像合成**: RunwayML / Kling API (カメラワーク動画化)
- **AIアバター**: HeyGen / Vidu API
- **動画配信**: YouTube Data API v3
- **認証**: NextAuth.js
- **DB**: Supabase (PostgreSQL)
- **課金**: Stripe
- **デプロイ**: Vercel + GPU環境(別途)

## 機能一覧と優先度

### Must（必須）
1. **CAD図面→3Dパース自動生成** - ControlNet等で構造維持しつつフォトリアルな内装画像を自動生成
2. **素材着せ替え機能** - 壁・床・外壁等の表面素材をニュアンス指示やサンプル画像で変更
3. **Webダッシュボード** - 図面アップロード→素材選択→生成→3Dプレビューまで一気通貫UI
4. **映像合成パイプライン** - AIパース静止画→カメラワーク動画化→AIアバター挿入
5. **YouTube API連携** - 限定公開自動アップロード、チャプター設定、施主専用URL発行
6. **日本建材データベース** - LIXIL・Panasonic等の建材データ、和室・サイディング対応
7. **マルチテナント・課金基盤** - 企業別テナント管理、月額サブスク課金、横展開対応

### Should（推奨）
8. **AIアバターナビゲーション** - HeyGen/Vidu連携で営業担当AIが空間を解説

## 開発フェーズ

### Phase 1: コア基盤 (Day 1-2) ✅ 完了
- [x] プロジェクト初期化 (Next.js + Tailwind)
- [x] Supabase統合 (認証・DB・ストレージ) - client/server/middleware
- [x] マルチテナントDB設計・実装 - supabase-schema.sql (RLS付き)
- [x] ダッシュボードレイアウト (サイドバー・ヘッダー・メインエリア)
- [x] 認証フロー (ログイン/新規登録ページ)

### Phase 2: 画像生成エンジン (Day 3-6) ✅ 完了
- [x] Replicate API連携 (ControlNet hough)
- [x] ControlNetパイプライン (部屋タイプ7種・スタイル6種対応)
- [x] 素材着せ替えAPI (/api/generate/swap-material)
- [x] 生成結果表示・Before/Afterプレビュー
- [x] ダッシュボード内パース生成ページ

### Phase 3: 日本建材DB (Day 7-9) ✅ 完了
- [x] 壁材10種（白クロス・木目・コンクリ・タイル・漆喰・レンガ・珪藻土・アクセント・石材・じゅらく壁）
- [x] 床材11種（オーク・ウォルナット・大理石・タイル・畳・チェリー・ヘリンボーン・モルタル・フロアタイル・テラゾー・琉球畳）
- [x] 外壁材7種（サイディング・ガルバリウム・外壁タイル・塗り壁・木質サイディング・石材調・ブラックガルバ）
- [x] 建材検索API (/api/materials)
- [x] 建材管理UI（カテゴリフィルタ・検索）

### Phase 4: 映像合成パイプライン (Day 10-13) ✅ 完了
- [x] 映像合成API (/api/video/create) - RunwayML連携準備
- [x] AIアバターAPI (/api/video/avatar) - HeyGen連携準備
- [x] 5種カメラモーション対応（パンL/R・ズーム・オービット・ウォークスルー）
- [x] 映像管理UI（作成・一覧・ステータス管理）

### Phase 5: YouTube連携 (Day 14-17) ✅ 完了
- [x] YouTubeアップロードAPI (/api/youtube/upload) - Data API v3準備
- [x] ステータス確認API (/api/youtube/status/[id])
- [x] チャプター自動設定
- [x] 限定公開・施主専用URL発行
- [x] YouTube配信管理UI

### Phase 6: 課金・基盤 (Day 18-20) ✅ 完了
- [x] Stripe Webhook API (/api/stripe/webhook)
- [x] Stripe Checkout API (/api/stripe/create-checkout)
- [x] 4プラン設計（Free/Starter/Professional/Enterprise）
- [x] 課金管理UI（プラン表示・使用量バー）
- [x] プロジェクトCRUD API (/api/projects)

### 次のステップ（外部API接続時）
- [ ] Supabase実環境セットアップ → supabase-schema.sql実行
- [ ] RunwayML APIキー取得 → 映像合成の実稼働
- [ ] HeyGen APIキー取得 → AIアバター実稼働
- [ ] YouTube OAuth設定 → 実アップロード有効化
- [ ] Stripe本番キー設定 → 実課金有効化

## DB設計 (Supabase)

### テーブル構成
- `tenants` - テナント（企業）管理
- `users` - ユーザー管理（テナント紐付き）
- `projects` - プロジェクト管理
- `floor_plans` - CAD図面アップロード
- `generations` - 生成結果（パース画像）
- `materials` - 建材マスターデータ
- `videos` - 映像合成結果
- `youtube_uploads` - YouTube配信管理
- `subscriptions` - サブスクリプション管理

## API設計
- `POST /api/generate` - パース画像生成 (既存)
- `POST /api/generate/swap-material` - 素材着せ替え
- `POST /api/video/create` - 映像合成
- `POST /api/video/avatar` - AIアバター挿入
- `POST /api/youtube/upload` - YouTube限定公開アップロード
- `GET /api/youtube/status/:id` - アップロードステータス
- `POST /api/stripe/webhook` - Stripe Webhook
- `GET /api/materials` - 建材データ検索
- `GET /api/projects` - プロジェクト一覧
- `POST /api/projects` - プロジェクト作成

## 対象外（スコープ外）
- 3Dモデリングソフトウェアの開発
- 建材メーカーとのAPI直接連携（カタログベースで手動整備）
- 不動産ポータルサイトとの自動連携
- 建築確認申請用の法的図面生成
- 補助金申請書類の作成代行

## リスク事項
- 画像生成AIの品質が建築業界の要求水準に達しない可能性
- HeyGen等のアバター生成サービスの利用規約・価格改定リスク
- YouTube APIの仕様変更・制限強化リスク
- 建材メーカーのカタログデータ利用に関する著作権確認が必要

## 環境変数
- `REPLICATE_API_TOKEN` - Replicate API (設定済み)
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase匿名キー
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase管理キー
- `NEXTAUTH_SECRET` - NextAuth秘密鍵
- `STRIPE_SECRET_KEY` - Stripe秘密鍵
- `STRIPE_WEBHOOK_SECRET` - Stripe Webhook秘密鍵
- `YOUTUBE_API_KEY` - YouTube API キー
- `YOUTUBE_CLIENT_ID` - YouTube OAuth クライアントID
- `YOUTUBE_CLIENT_SECRET` - YouTube OAuth クライアントシークレット
- `HEYGEN_API_KEY` - HeyGen APIキー
