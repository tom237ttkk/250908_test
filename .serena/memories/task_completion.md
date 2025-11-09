# タスク完了時のチェック
- 変更対象の Markdown で見出し構造・箇条書きスタイル・相互リンクを再確認。
- 新旧文書で用語・日付・決定事項の整合性を確認し、必要なら経緯を追記。
- 任意ツール (Prettier/Mardownlint/link-check) を実行した場合は結果を PR で共有。
- コミットは Conventional Commits (例: docs: update spec) を徹底し、1 コミット=1 意図で背景と主要変更点を記述。
- ブランチは master から `feature/<issue>-<説明>` (Issue 無しは 000) で作成し、PR では概要/背景/変更点/影響/確認手順を明示。