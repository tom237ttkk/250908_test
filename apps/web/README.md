# Spoiler‑Free Highlights – Web (Frontend)

このディレクトリはフロントエンド（Vite + React + TypeScript）です。Tailwind CSS と Biome を設定済みです。

## セットアップ

1. Node.js 18+ を用意
2. 依存関係をインストール（`npm install`）
3. `.env.example` を `.env` にコピーし、`VITE_API_BASE_URL` をバックエンド URL（例: `http://localhost:8787`）に設定
4. 開発サーバー起動: `npm run dev`
5. ビルド / プレビュー: `npm run build` → `npm run preview`

## 開発ルール（抜粋）

- 整形: `npm run format`（Biome）
- 静的検査: `npm run lint` / `npm run check`
- 主なディレクトリ
  - `src/components`, `src/pages`, `src/hooks`, `src/lib`, `src/assets`, `src/styles`

## 備考

- ルーティングやページ構成は後続タスクで追加します。
- Tailwind のスキャン対象は `index.html` と `src/**/*.{ts,tsx,js,jsx}` です。
