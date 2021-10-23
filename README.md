## TypeScriptの環境構築

1. npmの初期化<br>
  npm init<br>
2. 関連パッケージのインストール<br>
  npm install --save-dev typescript ts-loader webpack webpack-cli webpack-dev-server<br>
3. webpack.conif.jsファイルを作成する<br>
4. package.jsonの"test:"を削除して下記の2点に書き換える<br>
  "build": "webpack --mode=production",<br>
  "start": "webpack-cli serve --mode development"<br>
5. tsconfig.jsonの作成と設定<br>
  npm install -g typescript<br>
  tsc --init<br>
  "outDir": "./dist", にする<br>
  "baseUrl": "./src", にする<br>
6. npm run startでブラウザに表示<br>
7. npm run buildでbundle.jsが生成される<br>

## 各パッケージの役割

+ typescript => TypeScript構文をJavaScript構文に変換するコンパイラ<br>
+ ts-loader => Webpackと連動してTypeScriptコンパイラを起動<br>
+ webpack => 複数のファイルを1つにまとめる<br>
+ webpack-cli => コマンドラインでwebpackを使う<br>
+ webpack-dev-server => Webpackのビルド 開発用Webサーバーの起動 ホットリロード(ファイル変更の自動検知と再読み込み)

## ソースコードの品質を高めるツール

### ESLint

+ JavaScriptのための静的検証ツール<br>
+ ファイル内のバグチェックやコーディングスタイルの一貫性を保つ<br>

### Prettier

+ コードフォーマッター<br>
+ ルールに則ってソースコードを整形してくれる<br>
+ プロジェクトごとにルールを設定する<br>

### パッケージのインストール

+ $npm install --save-dev eslint eslint-config-prettier prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin husky lint-staged<br>

### huskyがもし動かなかったら...

.git/hooksが正常に作成されていない可能性アリ これで確認する<br>

`ls -la .git/hooks/ls -la .git/hooks/` <br>
`.sample` しか無かったらNG<br>
NGの場合はインストールし直す `npm uninstall husky` <br>
`npm install --save-dev husky` <br>
もう一度hooksを確認<br>
`ls -la .git/hooks/ls -la .git/hooks/` <br>

## 各パッケージの役割

|パッケージ名|役割|
|----------|-----------|
|eslint-config-prettier|ESLintとPrettierを併用する際に|
|@typescript-eslint/eslint-plugin|ESLintでTypeScriptのチェックを行うプラグイン|
|@typescript-eslint/parser|ESLintでTypeScriptを解析できるようにする|
|husky|Gitコマンドをフックに別のコマンドを呼び出せる|
|lint-staged|commitしたファイル（stagingにあるファイル）にlintを実行することができる|

## Prettierの設定

```
.prettierrc
{
  "printWidth": 120,
  "singleQuote": true,
  "semi": false
}
```

1. 現代のPCならprintWidthは120で良い<br>
2. 文末セミコロンはVimで邪魔になりがちなのでfalse<br>
3. デフォルト値で良いものは書く必要なし<br>

## ESLintの設定

1. prettierはextendsの最後に<br>
2. TypeScriptを解析するparserを指定<br>
3. tsconfig.jssonのパスに注意<br>
4. rootプロパティをtrueにした方が良い<br>

```
.eslintrc.js
module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  root: true,
  rules: {}
}
```

+ package.jsonに `""lint-fix": "eslint --fix './src/**/*.{js,ts}' && prettier --write './src/**/*.{js,ts}'"`を追加<br>
+ テストをする<br>
+ コマンド `npm run lint-fix`<br>
+ `npm uninstall husky`<br>
+ `npm install -D husky@4.3.8`(バージョンを下げる)<br>
+ `npm install eslint@7.26.0 eslint-config-prettier@7.1.0 --save-dev`(バージョンを下げる)<br>

## ESLint&Prettierが起動する流れ

`.ts` (git commit)=> `husky` (pre-commit hook)=> `lint-stages` (チェック&整形)=> `github`<br>

## 型推論と明示的な型定義

+ TypeScriptは型を推論する<br>
+ 型アノテーションを使うことで明示的な型を定義する

```
const name = 'Torahack' // ①string型と推論される
const name: string = 'Torahack' // ②明示的にstring型と定義することもできる
// ちなみにESLintのfixを行うと、わざわざ型アノテーションする必要がないと判断されて
// ②が①のように修正される
```

## プリミティブ型

+ string : 全ての文字列を扱う型<br>
+ number : 整数、浮動小数点数、整数、負数、Infinity(無限大)、NaN(非数)など全ての数値を扱う型<br>
+ boolean : trueとfalseの2つの値を扱う型<br>

```
const name: string = 'Torahack'
const age: number = 28
const isSingle: boolean = true

// 判定式の結果も代入できる
const isOver20: boolean = age >= 20
```

## 存在しないことを表現する型

+ null : 値が欠如していることを表す<br>
+ undefined : 初期化されておらず値が割り当てられていないことを表す<br>
+ できる限りundefinedを使う<br>

## TypeScriptはanyを回避するゲーム

+ any : どんな型でも許容する = 全く安全ではない<br>
+ unknown : どんな型になるのか不明<br>
+ unknownは代入した値によって型が変化する<br>
