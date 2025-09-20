import React from 'react';

export default function App() {
  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <h1 className="text-lg font-semibold">Spoiler‑Free Highlights</h1>
          <p className="text-sm text-gray-500">初期セットアップ動作確認</p>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="rounded-md border bg-white p-4 shadow-sm">
          <p className="text-gray-700">
            Vite + React + TypeScript + Tailwind + Biome の初期化が完了しました。
          </p>
        </div>
      </main>
    </div>
  );
}

