#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd ./public

# deploy to coding
echo 'luqirong.com' > CNAME  # 自定义域名

git init
git add -A
git commit -m 'deploy'
git remote add origin https://e.coding.net/luqirong/my-zone/my-zone.git
git push -u origin master -f

cd - # 退回开始所在目录
rm -rf ./public