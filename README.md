# Expressのテンプレートプロジェクト

## 概要
いろいろなページを参考にした実際のプロジェクトで使えそうなプロジェクト構成。 
と、ある程度汎用的に必要そうな機能。

## ディレクトリ構成
.
├── assets      :ビルド前のjs/css
│   ├── css
│   └── js
├── bin
├── config
├── controllers :コントローラー
├── lib         :外部ロジック
├── models      :DBとの連携処理
│   └── tables
├── public      :ビルド後のjs/css
│   ├── css
│   ├── images
│   └── js
├── routes      :ルーティング
└── views       :画面(テンプレートエンジン/pug)


## 最低限の機能(モジュール)
### ログイン認証/セッション
- passport.js
- express-session

## ORマッパー
- sequelize
