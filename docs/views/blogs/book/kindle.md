---
title: kindle 电子书制作
date: 2022-01-24
categories:
  - 电子书
tags:
  - kindle
  - kwp4
---

> 要想多设备同步和字体样式，kindle 就不可能有封面，试了很多软件如 VBook EasyPub Calibre 等，都不行，只能要么 USB 传书不要同步，要么不要样式用 mobi7 格式，切记不要浪费时间
### epub -> mobi
1. 直接在 https://zh.fr1lib.org/ 这个网站找有没有书
2. 下载 epub 格式书
3. 使用 kindlegen 工具将 epub 转为 mobi

```powershell
kindlegen "文件路径" -dont_append_source
```

4. 用邮箱或者拉入 Calibre 软件后再邮箱推送

### txt -> mobi
推荐用 EaEsyPub 软件，因为 EaEsyPub 可以自定义 CSS，有时间可以自己排版
#### VBook v3.5.1.1
1. 先用 vscode 或者其他编辑器打开 txt 添加正则进行编辑
- 去除作者的（ps）
- 去除广告
- 校准卷章节
```js
(\(|（).+(）|\))\n\n // 替换为空
(\(|（).+\n\n.+(）|\))\n\n // 替换为空
(\(|（).+\n\n.+\n\n.+(）|\))\n\n // 替换为空
...
```
2. 将 txt 文件拖入 VBook 软件中，软件会自动生成目录
3. 设置分卷/分章规则
4. 如果 txt 章节有中文数字混杂不好改，那就设置“尝试使用阿拉伯显示章节序号”
5. 设置文字效果 

Tips|段间距|行间距|章节字体大小|正文字体大小|首行缩进|标题位置
:--:|:--:|:--:|:--:|:--:|:--:|:--:
我自己研究的，整体间距比较均衡|0.3|1.5|1.2|1|2|居中
段间距比较舒服|1|1.3|1.2|1|2|居中

6. 设置封面比例为0.65（推荐：650 × 1000）（实在没资源用这个尺寸：325× 500）（1040 × 1600），封面会自动被亚马逊压缩，所以不用特地放小图，不超过50M都可以，小图被压缩后会看不清楚
> kindle官网是说0.625，但是我自己截图用ps抠图发现其实是几乎接近0.65，实际测试过0.625确实会比收藏夹更窄

> kindle 书籍的图片在目录 system\thumbnails 中 

> 封面可要可不要...反正看不见
7. 放入封面（用 ps 裁剪好尺寸以后再用 https://tinypng.com/ 这个网站无损压缩一下），设置好书名、作者
8. 生成 mobi 文件
9. 用邮箱或者拉入 Calibre 软件后再邮箱推送

#### EaEsyPub v1.50
1. 和上面一样，先对 txt 进行校验排版
2. 在软件中进行编辑章节
3. 直接插入定制 CSS 进行覆盖样式
```css
@page {
  margin-top: 0;
  margin-bottom: 0;
}

body {
  padding: 0;
  margin-left: 1%;
  margin-right: 1%;
  orphans: 0;
  widows: 0;
}

p {
  line-height: 130%;
  margin-top: 1em;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
  orphans: 0;
  widows: 0;
  text-align: justify;
}
/* 缩进两个字符 */
.a {
  text-indent: 2em;
}

div.centeredimage {
  text-align: center;
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

img.attpic {
  border: 1px solid #000000;
  max-width: 100%;
  margin: 0;
}

.booktitle {
  margin-top: 30%;
  margin-bottom: 0;
  border-style: none solid none none;
  border-width: 50px;
  border-color: #4e594d;
  font-size: 3em;
  line-height: 120%;
  text-align: right;
}

.bookauthor {
  margin-top: 0;
  border-style: none solid none none;
  border-width: 50px;
  border-color: #4e594d;
  page-break-after: always;
  font-size: large;
  line-height: 120%;
  text-align: right;
}
/* titletoc: 目录 titlel2std: 第N章 */
.titletoc,
.titlel1top,
.titlel1std,
.titlel2top,
.titlel2std,
.titlel3top,
.titlel3std,
.titlel4std {
  display: block;
  font-size: 1.3em;
  margin: 1em auto 2em;
  border: 0pt;
  text-align: center;
}
/* 第N卷 */
.titlel1single,
.titlel2single,
.titlel3single {
  font-size: 1.5em;
  margin: 45vh 2em auto;
  text-align: center;
}

/* 目录页 */
.toc {
  margin-left: 16%;
  padding: 0;
  text-align: justify;
}

.toc a {
  text-decoration: none;
  color: #000000;
}

.tocl1 {
  margin-top: 0.5em;
  margin-left: -30px;
  border-style: none none none solid;
  border-width: 0 0 0 8px;
  border-color: #6b766a;
  font-size: 1.2em;
  padding-left: 5px;
}

.tocl2 {
  margin-top: 0.5em;
  margin-left: -20px;
  border-style: none none none solid;
  border-width: 0 0 0 6px;
  border-color: #939e92;
  font-size: 1.1em;
  padding-left: 5px;
}

.tocl3 {
  margin-top: 0.5em;
  margin-left: -20px;
  border-style: none none none solid;
  border-width: 0 0 0 4px;
  border-color: #939e92;
  font-size: 1.05em;
  padding-left: 5px;
}

.tocl4 {
  margin-top: 0.5em;
  margin-left: -20px;
  border-style: none none none solid;
  border-width: 0 0 0 2px;
  border-color: #939e92;
  font-size: 1em;
  padding-left: 5px;
}

.subtoc {
  margin-left: 15%;
  padding: 0;
  text-align: justify;
}

.subtoclist {
  margin-top: 0.5em;
  margin-left: -20px;
  border-style: none none none solid;
  border-width: 0 0 0 10px;
  border-color: #939e92;
  line-height: 123%;
  font-size: 120%;
}
```
4. 开始转换即可