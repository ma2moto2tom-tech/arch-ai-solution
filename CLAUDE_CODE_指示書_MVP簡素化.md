# 建築・内装AIソリューション MVP簡素化 指示書

## このドキュメントについて

既存の Next.js プロジェクト `arch-ai-solution-20260316` を「3画面MVP」に簡素化するための Claude Code 向け作業指示書です。

---

## 1. 現状の問題

現在のプロジェクトは機能が多すぎて、どのAPIも実際に接続されていない「見た目だけ」の状態です。YouTube動画生成、AIアバター、Supabase認証など、今すぐ必要のない機能が混在しています。

**目標：「図面を送ったら完成イメージが出て、施主に共有できる」というコア体験だけに絞る。**

---

## 2. 完成形のイメージ（3画面だけ）

### 画面A：トップ（1ページ完結の生成画面）
- ダッシュボードやログインは不要
- 1ページで「アップロード → 素材選択 → 生成 → 結果表示」が完結
- 現在の `/dashboard/projects/new` にある4ステップウィザードを1画面にフラット化

### 画面B：Before/After 結果表示
- 生成完了後に表示
- 現在の `BeforeAfter` コンポーネントをそのまま活用
- 「共有リンクを作成」ボタンを配置
- 「別の素材で再生成」ボタンを配置

### 画面C：施主向け共有ページ `/view/[id]`
- 施主がURLを開いて完成イメージを見る画面
- 画像ギャラリー + 素材変更リクエストフォーム
- YouTubeセクション・動画プレースホルダーは削除

---

## 3. 削除するもの

### ファイルごと削除
```
src/app/dashboard/           ← ディレクトリごと削除（layout, page, projects すべて）
src/app/api/video/           ← 動画生成APIは不要
src/app/api/youtube/         ← YouTube連携は不要
src/components/Sidebar.tsx   ← ダッシュボード用サイドバー不要
src/components/ProjectCard.tsx ← プロジェクト一覧カード不要
src/components/DemoModeBadge.tsx ← デモモードバッジ不要
src/lib/youtube.ts           ← YouTube関連不要
src/lib/supabase.ts          ← 認証・DB不要（今は）
```

### package.json から削除
```
@supabase/auth-helpers-nextjs
@supabase/supabase-js
```

### .env.local から削除
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
（REPLICATE_API_TOKEN はそのまま残す）
```

---

## 4. 残すもの（活用するコア資産）

### そのまま使うファイル
```
src/components/BeforeAfter.tsx      ← Before/Afterスライダー（そのまま）
src/components/FileUploader.tsx     ← 図面アップロード（そのまま）
src/components/MaterialSelector.tsx ← 素材選択UI（そのまま）
src/components/GenerationStatus.tsx ← 生成中ステータス表示（そのまま）
src/data/materials.ts               ← 日本建材データ（そのまま）
src/lib/replicate.ts                ← Replicate API クライアント（そのまま）
src/lib/prompt-builder.ts           ← プロンプト構築（buildPrompt のみ残す、buildNarration は削除）
src/app/api/generate/route.ts       ← 画像生成API（そのまま）
```

---

## 5. 新しいページ構成

### `src/app/page.tsx`（メイン画面 = 画面A + 画面B統合）

現在のランディングページを書き換える。

**レイアウト：**
```
┌──────────────────────────────────────────┐
│  ヘッダー：「建築・内装AI」ロゴ          │
├──────────────────────────────────────────┤
│                                          │
│  左カラム（50%）        右カラム（50%）   │
│  ┌──────────────┐    ┌──────────────┐    │
│  │ 図面          │    │ 素材選択      │    │
│  │ アップロード   │    │ (壁材/床材)   │    │
│  │              │    │              │    │
│  │ FileUploader │    │ Material     │    │
│  │              │    │ Selector     │    │
│  └──────────────┘    │              │    │
│                      │ 部屋タイプ    │    │
│                      │ スタイル      │    │
│                      │ 追加メモ      │    │
│                      └──────────────┘    │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │   ✨ AI画像を生成する（ボタン）    │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ── 生成結果（生成後に表示）──────────    │
│  ┌──────────────────────────────────┐    │
│  │ BeforeAfter スライダー            │    │
│  └──────────────────────────────────┘    │
│                                          │
│  [再生成する]  [共有リンクを作成]        │
│                                          │
└──────────────────────────────────────────┘
```

**実装のポイント：**
- 4ステップウィザードは廃止 → 1画面にフラット配置
- 物件名・住所の入力は「任意」に格下げ（生成に必須ではない）
- 「生成する」ボタンは図面アップロード＋壁材＋床材が選択されていれば有効化
- 生成完了後、同じページの下部に BeforeAfter が出現
- 「共有リンクを作成」を押すと `/view/[ランダムID]` のURLが生成される

**共有リンクの仕組み（DB不要版）：**
- 生成画像URLと素材情報をBase64エンコードしてURLパラメータに埋め込む
- `/view/[token]` ページ側でデコードして表示
- 例：`/view/eyJpbWFnZVVybCI6Imh0dHBzOi8v...`
- ※将来的にVercel KVやSupabaseに置き換え可能

### `src/app/view/[token]/page.tsx`（画面C：施主向け共有ページ）

現在のファイルを簡素化する。

**変更点：**
- URLパラメータからBase64デコードして画像URL・物件情報を取得
- YouTube動画セクションを完全削除
- ウォークスルー動画プレースホルダーを削除
- 画像ギャラリー（複数画像対応）はそのまま
- 素材変更リクエストフォームはそのまま（ただし送信先はメールのmailto:リンクに簡素化）
- 会社情報フッターはそのまま

### `src/app/layout.tsx`（ルートレイアウト）

- 現状維持でOK
- ダッシュボードのレイアウトは削除済みなので影響なし

---

## 6. 接続するAPI（1つだけ）

### Replicate API

**設定手順：**
1. https://replicate.com でアカウント作成
2. API Token を取得
3. `.env.local` に `REPLICATE_API_TOKEN=r8_xxxxxxxx` を設定

**使用モデル（現在のコードのまま）：**
```
jagilley/controlnet-hough
```
- 入力：図面画像（白黒線画 or 写真）
- 出力：フォトリアルな内装画像
- パラメータ：`prompt-builder.ts` の `buildPrompt()` が自動構築

**APIキー未設定時のフォールバック：**
- 現在のデモモード（Unsplashのモック画像を返す）をそのまま維持
- UIに「デモモード：実際のAI生成には API キーの設定が必要です」と小さく表示

---

## 7. 作業手順（推奨順序）

```
Step 1: 不要ファイルの削除
  └→ dashboard ディレクトリ、video/youtube API、Sidebar、ProjectCard、DemoModeBadge、supabase.ts、youtube.ts

Step 2: package.json の整理
  └→ Supabase関連パッケージを削除
  └→ npm install で依存関係を更新

Step 3: src/app/page.tsx を新しい1画面構成に書き換え
  └→ 既存コンポーネント（FileUploader, MaterialSelector, BeforeAfter, GenerationStatus）を組み合わせ
  └→ 共有リンク生成ロジック（Base64エンコード方式）を実装

Step 4: src/app/view/[token]/page.tsx を簡素化
  └→ Base64デコードで画像・物件情報を取得する方式に変更
  └→ YouTube・動画関連セクションを削除

Step 5: prompt-builder.ts から buildNarration 関数を削除

Step 6: 動作確認
  └→ npm run dev で起動
  └→ 図面アップロード → 素材選択 → 生成（デモモード）→ Before/After表示 → 共有リンク作成 → 共有ページ表示
  └→ モバイルレスポンシブ確認

Step 7: （任意）Replicate API キーを設定して実際のAI生成をテスト
```

---

## 8. 将来の拡張パス（今は作らない）

今回のMVPが動いた後、段階的に追加する想定の機能：

| フェーズ | 追加機能 | 必要なAPI/技術 |
|---------|---------|---------------|
| Phase 2 | データ永続化・ユーザー認証 | Supabase or Vercel KV |
| Phase 3 | 複数画像の一括生成（部屋ごと） | Replicate Batch API |
| Phase 4 | 画像→動画変換 | FFmpeg or Runway API |
| Phase 5 | YouTube限定公開アップロード | YouTube Data API v3 + OAuth2 |
| Phase 6 | AIアバターナレーション | HeyGen API + ElevenLabs API |

---

## 9. 技術スタック（変更なし）

- **フレームワーク:** Next.js 16 (App Router)
- **言語:** TypeScript
- **スタイリング:** Tailwind CSS 4
- **画像生成API:** Replicate (ControlNet)
- **アイコン:** lucide-react
- **ファイルアップロード:** react-dropzone
- **デプロイ先:** Vercel（推奨）

---

## 10. 補足：このMVPで検証したいこと

1. **工務店の営業さんが「使いたい」と思うか？** → 操作が簡単で、施主に見せて「おぉ」と言われるか
2. **AI生成画像の品質は十分か？** → ControlNet + 日本建材プロンプトの精度検証
3. **共有リンクの体験は良いか？** → 施主がスマホで見て満足するか

この3つが検証できれば、Phase 2以降の開発投資判断ができる。
