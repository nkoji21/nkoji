---
title: デザインシステムを Figma Variables で組み直した
date: 2026-08-14
topic: Design
---

色を Primitives と Semantic の2層に分けて、コード側の CSS 変数と名前を揃えた。

## 2層に分ける理由

Primitives は生の値、Semantic は用途を表す。

## Code Syntax を設定する

Figma 側の変数に `var(--color-accent)` を書いておくと、Dev Mode でそのまま読める。
