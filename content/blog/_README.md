# 記事

1記事 = 1つの `.md`。ファイル名がそのまま URL の slug になる。

```md
---
title: 記事のタイトル
date: 2026-08-28
topic: Rust
draft: false
image: /blog/<slug>/cover.webp
---
```

| | |
|---|---|
| `title` | 必須 |
| `date` | 必須。`YYYY-MM-DD` |
| `topic` | 必須。一覧の絞り込みに使う |
| `draft` | 省略時 `false`。`true` は開発時のみ表示 |
| `image` | 省略可。一覧のカードと記事上部に出る |

画像は `public/blog/<slug>/` に置いて、`/blog/<slug>/xxx.webp` で参照する。
記事だけを別リポジトリへ移せるよう、本文は素の Markdown のまま保つ（MDX にしない）。

## 見出し

もくじには `h2`（`##`）だけが載る。
`h3` 以下は本文の構造として使ってよいが、もくじには出ない。
節が多い記事でもくじが本文の写しにならないようにするため。
