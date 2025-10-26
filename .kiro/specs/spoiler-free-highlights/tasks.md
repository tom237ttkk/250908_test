# Implementation Plan

- [x] 1. プロジェクト初期設定とコア構造の構築

  - Vite + React + TypeScript プロジェクトの初期化
  - Tailwind CSS の設定
  - Biome の設定（フォーマッター/Linter）
  - 基本的なディレクトリ構造の作成
  - _Requirements: 全体的な基盤_

- [x] 2. バックエンド基盤の構築
- [x] 2.1 Hono + Bun プロジェクトの初期化

  - Hono フレームワークのセットアップ
  - Bun ランタイムの設定
  - 基本的な API サーバーの起動確認
  - _Requirements: 4.1_

- [x] 2.2 Prisma + PostgreSQL の設定

  - Prisma ORM の初期化
  - PostgreSQL データベースの設定
  - Video と Team モデルのスキーマ定義
  - データベースマイグレーションの実行
  - _Requirements: 1.1, 1.2, 2.1_

- [x] 2.3 基本的な API エンドポイントの実装

  - GET /api/videos エンドポイントの作成
  - GET /api/videos/:id エンドポイントの作成
  - GET /api/teams エンドポイントの作成
  - CORS 設定とエラーハンドリングの実装
  - _Requirements: 1.1, 1.2, 2.1, 4.3_

- [x] 3. フロントエンド基盤コンポーネントの実装
- [x] 3.1 TypeScript 型定義とユーティリティの作成

  - Video, Team, VideoFilters インターフェースの定義
  - API 通信ユーティリティ関数の実装
  - 動画 URL 変換・プラットフォーム判定ユーティリティの作成
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 3.2 基本的なページコンポーネントの作成

  - HomePage コンポーネントの骨組み作成
  - VideoPage コンポーネントの骨組み作成
  - React Router の設定
  - _Requirements: 1.1, 1.3_

- [x] 4. 動画一覧機能の実装
- [x] 4.1 VideoCard コンポーネントの実装

  - ネタバレなしタイトル表示機能
  - ネタバレなしサムネイル表示機能
  - チーム情報と試合日の表示
  - _Requirements: 1.1, 1.2_

- [x] 4.2 VideoGrid コンポーネントの実装

  - 動画カードのグリッドレイアウト
  - レスポンシブデザインの実装
  - 動画一覧の表示機能
  - _Requirements: 1.1, 3.3_

- [x] 4.3 useVideos カスタムフックの実装

  - API からの動画データ取得
  - ローディング状態の管理
  - エラーハンドリングの実装
  - _Requirements: 1.1, 4.1, 4.3_

- [x] 5. フィルタリング機能の実装
- [x] 5.1 FilterBar コンポーネントの実装

  - チーム選択フィルターの作成
  - 日付範囲フィルターの作成
  - フィルター状態の管理
  - _Requirements: 2.1, 2.2_

- [x] 5.2 フィルタリングロジックの統合

  - フィルター条件に基づく動画一覧の絞り込み
  - URL パラメータとの連携
  - フィルター状態のリセット機能
  - _Requirements: 2.1, 2.2, 2.3_

- [x] 6. YouTube 動画プレイヤーの実装
- [x] 6.1 YouTubePlayer コンポーネントの作成

  - YouTube 埋め込み iframe の実装
  - 動画 URL の YouTube 埋め込み形式への変換
  - プレイヤーのレスポンシブ対応
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 6.2 VideoPlayer コンポーネントの実装

  - 動画タイプに応じたプレイヤーの切り替え
  - 将来の拡張性を考慮した設計
  - 動画情報の表示（タイトル、チーム、日付）
  - _Requirements: 3.1, 3.2_

- [x] 7. ページ統合とナビゲーション
- [x] 7.1 HomePage の完成

  - VideoGrid と FilterBar の統合
  - 動画一覧の表示とフィルタリング機能
  - 動画詳細ページへのナビゲーション
  - _Requirements: 1.1, 1.3, 2.1_

- [x] 7.2 VideoPage の完成

  - VideoPlayer コンポーネントの統合
  - 動画詳細情報の表示
  - ホームページへの戻るナビゲーション
  - _Requirements: 1.3, 3.1, 3.2_

- [x] 8. テストデータとサンプル実装
- [x] 8.1 サンプルデータの作成

  - プレミアリーグチームのマスターデータ作成
  - サンプル動画データの作成（YouTube URL 使用）
  - データベースシードスクリプトの実装
  - _Requirements: 1.1, 2.1_

- [x] 8.2 基本的な単体テストの実装

  - VideoCard コンポーネントのテスト
  - useVideos フックのテスト
  - API エンドポイントのテスト
  - _Requirements: 4.1, 4.2_

- [x] 9. パフォーマンス最適化と仕上げ
- [x] 9.1 パフォーマンス最適化の実装

  - 画像の遅延読み込み（Lazy Loading）
  - コンポーネントの最適化
  - バンドルサイズの最適化
  - _Requirements: 4.1, 4.2_

- [x] 9.2 エラーハンドリングと UX 改善
  - ネットワークエラー時のリトライ機能
  - 動画読み込みエラー時の代替表示
  - ローディング状態の改善
  - _Requirements: 4.3_

# 追加改修\_251026

## 現状整理

バックエンドは Hono + Node/Bun 構成で、Prisma 経由で PostgreSQL に接続する前提です。起動ポートは PORT 未指定時 8787 で、ヘルスチェック (/health, /health/db) と /api/\* ルートが用意されています。

PostgreSQL は docker-compose.yml でユーザー/パスワードとも sfl、ホスト側 55432 ポートに公開されています。

Prisma スキーマは DATABASE_URL 環境変数経由の接続を要求し、Team と Video テーブルを作成します。

バックエンドの npm スクリプトには DB 起動・停止、マイグレーション、シード投入が揃っているので、これらを順に実行することでローカル環境を構築できます。

フロントエンドは Vite + React + TypeScript 構成で、npm run dev で 5173 番ポートに開発サーバーを立ち上げる想定です。

フロントの API クライアントは VITE_API_BASE_URL を参照してバックエンドへアクセスします。未設定の場合はフロントのオリジンに対してリクエストするため、環境変数を明示する必要があります。

## ローカル起動に必要な手順

apps/api 直下に .env を作成し、DATABASE_URL=postgresql://sfl:sfl@localhost:55432/sfl のように接続文字列を定義する（Prisma が必須とするため）。

npm run db:up で PostgreSQL コンテナを起動する。

npm run prisma:migrate → npm run prisma:seed を実行し、テーブル作成とサンプルデータ投入を行う。

npm run dev（または npm run dev:bun）で API サーバーを起動する。

apps/web 直下に .env を作成し、VITE_API_BASE_URL=http://localhost:8787 を設定したうえで npm run dev を実行し、フロントから API を呼び出す。

## 現時点の不足点・注意点

データモデル不整合: フロントエンドが期待する Video / Team 形（videoUrl, homeTeam, shortName など）と、バックエンドが返す Prisma モデル（url, team.slug など）が一致していません。このままでは取得したレスポンスをそのまま UI に渡すと欠落プロパティによる表示崩れが発生します。レスポンス整形または型定義の見直しが必要です。

環境変数の雛形: .env.example が存在しないため、開発者間で設定値を共有する仕組みが未整備です（作成を検討）。

動作確認フローの未整備: 上記の型ギャップを解消しない限り、フロントからバックエンドへ実リクエストして完全な画面確認を行うことは困難です。API 側でフロント用にフィールドを補うか、フロントで受け取ったデータを正規化する実装が追加で必要です。

以上より、インフラ面（DB 起動～サーバー立ち上げ）は整備済みですが、フロントとバックのデータフォーマットを揃えるタスクが残っており、現状ではその調整を行わないと「起動して画面確認」までは至りません。

## 対応方針

- 環境変数テンプレートを整備する: `apps/api/.env.example` と `apps/web/.env.example` を用意し、接続情報 (`DATABASE_URL`, `VITE_API_BASE_URL` など) を明示化する。README にセットアップ手順を追記して、開発者が迷わずローカル検証できる状態にする。
- 初期化スクリプトの追加: `npm run db:up && npm run prisma:migrate && npm run prisma:seed` をまとめたセットアップコマンドを提供し、初回構築やリセットを容易にする。必要に応じて CI での実行も検討する。
- データ整合の解消: API 側で `videoUrl` や `homeTeam` などのフィールドを返すようレスポンス整形を行うか、フロントエンドで受信データを正規化するアダプタ層を実装して、UI の表示崩れを防ぐ。
