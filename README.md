# Live Coding 2023

jig.jp の 2023年夏インターンで行ったライブコーディングのリポジトリです

## Installation

### 1. 前提環境の構築

以下のコマンドが使用できるようにしておいてください。

- `deno`: JavaScriptの実行用

以下の環境を用意してください。

- `db`: データベースを構築する。今回はMySQLを使用することを前提に構築している

### 2. 開発環境の構築

以下で開発環境を構築します。

```sh
# clone
git clone git@github.com:Futaba-Kosuke/live-coding-2023.git

# create .env
cd live-coding-2023
cp ./server/.env.template ./server/.env

# edit .env
vim ./server/.env
```

### 3. 実行


```sh
# client
cd client
deno run --allow-net --allow-read client.js

# server
cd server
deno run --allow-net --allow-env --allow-read server.js
```