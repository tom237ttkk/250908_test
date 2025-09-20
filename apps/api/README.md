# Spoiler‑Free Highlights – API (Backend)

Hono ベースの最小 API。Bun または Node で起動できます。

## スクリプト

- `npm run dev` — Node + tsx でホットリロード
- `npm run dev:bun` — Bun でホットリロード（Bun が必要）
- `npm run build` — TypeScript ビルド
- `npm start` — `dist` を Node で起動

## エンドポイント

- `GET /health` — 稼働確認 `{ ok: true }`
- `GET /` — テキスト `SFL API: up`

今後、Prisma + PostgreSQL 連携と `/api/videos` などを追加します。
