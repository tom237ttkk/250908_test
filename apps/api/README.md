# Spoiler‑Free Highlights – API (Backend)

Hono ベースの最小 API。Bun または Node で起動できます。

## セットアップ

1. `.env.example` をコピーして `.env` を作成し、`DATABASE_URL` を確認します。
2. 依存関係をインストール: `npm install`
3. `npm run setup` で PostgreSQL コンテナ起動・マイグレーション・シードを一括実行します。
4. `npm run dev`（または `npm run dev:bun`）で API を起動します。

## スクリプト

- `npm run dev` — Node + tsx でホットリロード
- `npm run dev:bun` — Bun でホットリロード（Bun が必要）
- `npm run build` — TypeScript ビルド
- `npm start` — `dist` を Node で起動
- `npm run setup` — `db:up` → `prisma:generate` → `prisma:migrate` → `prisma:seed` を順に実行

## エンドポイント

- `GET /health` — 稼働確認 `{ ok: true }`
- `GET /` — テキスト `SFL API: up`

今後、Prisma + PostgreSQL 連携と `/api/videos` などを追加します。
