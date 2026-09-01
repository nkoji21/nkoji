# 記事

1記事 = 1つの `.md`。ファイル名がそのまま URL の slug になる。

```md
---
title: 記事のタイトル
date: 2026-08-28
topic: Rust
draft: false
image: /blog/<slug>/cover.webp
description: 記事の内容を1行で
---
```

| | |
|---|---|
| `title` | 必須 |
| `date` | 必須。`YYYY-MM-DD` |
| `topic` | 必須。一覧の絞り込みに使う |
| `draft` | 省略時 `false`。`true` は開発時のみ表示 |
| `image` | 省略可。一覧のカードと記事上部に出る |
| `description` | 省略可。SNS のカードと検索結果に出る |

`description` は本文から自動で作らない。記事は挨拶や導入から始まることが多く、
冒頭をそのまま切り出しても何の話か伝わらないため。
省略するとサイト全体の説明文が代わりに出る。

画像は `public/blog/<slug>/` に置いて、`/blog/<slug>/xxx.webp` で参照する。
記事だけを別リポジトリへ移せるよう、本文は素の Markdown のまま保つ（MDX にしない）。

## 見出し

もくじには `h2`（`##`）だけが載る。
`h3` 以下は本文の構造として使ってよいが、もくじには出ない。
節が多い記事でもくじが本文の写しにならないようにするため。

## リンクカード

1行に URL だけを書くとカードになる。

```md
本文…

https://x.com/nkoji21/status/xxxx

本文…
```

カードの中身は `_links.json` に URL をキーとして書く。実行時に取得しないので、
リンク先が消えても記事から内容が欠けない。

```json
{
  "https://x.com/...": {
    "quote": "投稿の本文",
    "author": { "name": "えぬこじ", "handle": "nkoji21" },
    "date": "2025年3月8日"
  },
  "https://example.com/": {
    "title": "ページのタイトル",
    "description": "説明",
    "site": "example.com",
    "image": "/blog/<slug>/xxx.webp"
  }
}
```

`_links.json` に無い URL はふつうのリンクのまま表示される。

## 画像

`public/blog/<slug>/` に置いて、ふつうの Markdown 記法で参照する。

```md
![キャプション](/blog/<slug>/xxx.webp)
```

alt がそのままキャプションとして画像の下に出る。
画像サイズはビルド時にファイルから読むので、記事側に書かなくてよい。

## ツイートの埋め込み

1行に X の投稿 URL だけを書くと、X 公式の埋め込みになる。

```md
本文…

https://x.com/nkoji21/status/xxxx

本文…
```
