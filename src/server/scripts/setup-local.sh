# 初期セットアップスクリプト
#   最初に1回、実行するコマンド達
#!/bin/sh
# set +e
SCRIPT_DIR=$(cd $(dirname $0); pwd)
cd $SCRIPT_DIR

# CREATE DATABASEが終わるのを待つ
sleep 15

# node.jsパッケージをインストール
yarn

#　migration実行
yarn typeorm migration:run

#　一旦、すべて削除
yarn typeorm schema:drop

# 初期データを投入
yarn seed:run
