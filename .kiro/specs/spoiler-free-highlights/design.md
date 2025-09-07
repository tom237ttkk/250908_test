# Design Document

## Overview

プレミアリーグのハイライト動画をネタバレなしで視聴できる Web サイトの MVP 設計です。React + TypeScript のフロントエンドと Hono + Bun のバックエンドで構成し、PostgreSQL でデータを管理します。動画のサムネイルとタイトルから試合結果を除去し、ユーザーが安心して視聴できる環境を提供します。

## Architecture

### システム構成

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React/Vite)  │◄──►│   (Hono/Bun)    │◄──►│   (PostgreSQL)  │
│   + Tailwind    │    │   + Prisma      │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 技術スタック詳細

- **フロントエンド**: React 18 + Vite + TypeScript
- **スタイリング**: Tailwind CSS
- **バックエンド**: Hono (Web Framework)
- **ランタイム**: Bun
- **ORM**: Prisma
- **データベース**: PostgreSQL
- **開発ツール**: Biome (フォーマッター/Linter)
- **テスト**: Vitest (単体テスト) + Playwright (E2E テスト)

## Components and Interfaces

### フロントエンド コンポーネント構成

```
src/
├── components/
│   ├── VideoCard.tsx          # ネタバレなし動画カード
│   ├── VideoPlayer.tsx        # 動画プレイヤー（YouTube埋め込み対応）
│   ├── YouTubePlayer.tsx      # YouTube専用プレイヤー
│   ├── FilterBar.tsx          # チーム・日付フィルター
│   └── VideoGrid.tsx          # 動画一覧グリッド
├── pages/
│   ├── HomePage.tsx           # メインページ
│   └── VideoPage.tsx          # 動画視聴ページ
├── hooks/
│   └── useVideos.tsx          # 動画データ取得
├── types/
│   └── index.ts               # TypeScript型定義
└── utils/
    ├── api.ts                 # API通信ユーティリティ
    └── videoUtils.ts          # 動画URL変換・プラットフォーム判定
```

### バックエンド API エンドポイント

```typescript
// API Routes
GET    /api/videos              # 動画一覧取得
GET    /api/videos/:id          # 特定動画取得
GET    /api/teams               # チーム一覧取得
```

## Data Models

### Prisma スキーマ設計

```prisma
model Video {
  id          String   @id @default(cuid())
  title       String   // ネタバレなしタイトル
  videoUrl    String   // 動画URL（YouTube埋め込みURL）
  videoType   String   @default("youtube") // 動画プラットフォーム種別
  thumbnailUrl String? // ネタバレなしサムネイル
  homeTeam    String   // ホームチーム
  awayTeam    String   // アウェイチーム
  matchDate   DateTime // 試合日
  duration    Int?     // 動画長（秒）
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("videos")
}

model Team {
  id        String   @id @default(cuid())
  name      String   @unique
  shortName String   // 略称（例: MAN, LIV）
  logoUrl   String?  // チームロゴURL
  createdAt DateTime @default(now())

  @@map("teams")
}


```

### TypeScript 型定義

```typescript
export interface Video {
  id: string;
  title: string;
  videoUrl: string;
  videoType: "youtube" | "vimeo" | "direct"; // 将来の拡張性を考慮
  thumbnailUrl?: string;
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  duration?: number;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logoUrl?: string;
}

export interface VideoFilters {
  team?: string;
  dateFrom?: string;
  dateTo?: string;
}

// 動画プラットフォーム対応のユーティリティ型
export type VideoProvider = "youtube" | "vimeo" | "direct";

export interface VideoPlayerProps {
  video: Video;
  autoplay?: boolean;
}
```

## Error Handling

### フロントエンド エラーハンドリング

- **ネットワークエラー**: 接続失敗時のリトライ機能
- **動画読み込みエラー**: 代替メッセージ表示
- **バリデーションエラー**: フォーム入力時の即座フィードバック

### バックエンド エラーハンドリング

```typescript
// エラーレスポンス形式
interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

// 主要エラーケース
- 400: バリデーションエラー
- 404: リソース未発見
- 500: サーバー内部エラー
```

## Testing Strategy

### 単体テスト (Vitest)

- **コンポーネントテスト**: React コンポーネントの描画・動作確認
- **フックテスト**: カスタムフックのロジック検証
- **ユーティリティテスト**: API 通信・データ変換関数のテスト
- **バックエンドテスト**: API エンドポイントの動作確認

### E2E テスト (Playwright)

- **ユーザーフロー**: 動画一覧 → フィルタリング → 動画視聴の流れ
- **レスポンシブテスト**: モバイル・デスクトップでの表示確認
- **パフォーマンステスト**: ページ読み込み時間の検証

### テスト環境

```typescript
// テスト設定例
describe("VideoCard Component", () => {
  it("should display spoiler-free title", () => {
    // ネタバレなしタイトル表示のテスト
  });

  it("should not show match result in thumbnail", () => {
    // サムネイルにスコア非表示のテスト
  });
});
```

## Security Considerations

- **入力サニタイゼーション**: XSS 攻撃防止
- **CORS 設定**: 適切なオリジン制限
- **レート制限**: API 呼び出し頻度制限
- **環境変数**: 機密情報の適切な管理

## Performance Optimization

- **画像最適化**: WebP 形式のサムネイル使用
- **遅延読み込み**: 動画一覧の Lazy Loading
- **キャッシュ戦略**: ブラウザキャッシュと CDN 活用
- **バンドル最適化**: Vite によるコード分割
- **データベース**: インデックス最適化とクエリ効率化
