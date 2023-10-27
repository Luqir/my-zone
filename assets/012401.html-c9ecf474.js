import{_ as a,r as t,o as p,c as e,a as n,b as o,d as i,e as l}from"./app-04c27b99.js";const c={},u=l(`<blockquote><p>Kindle 电子书想要多设备同步只能是 mobi 格式，要想同步和且有不同字体等样式，Kindle 就不可能有封面，试了很多软件如 VBook、EasyPub、Calibre 等，都不行，只能要么 USB 传书不要同步，要么不要样式用 mobi7 格式，切记不要浪费时间。</p></blockquote><h2 id="epub-mobi" tabindex="-1"><a class="header-anchor" href="#epub-mobi" aria-hidden="true">#</a> epub -&gt; mobi</h2><ol><li><s>直接在 https://zh.fr1lib.org/ 这个网站找有没有书（网站已不可访问）</s></li><li>下载 epub 格式书</li><li>使用 kindlegen 工具将 epub 转为 mobi</li></ol><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>kindlegen <span class="token string">&quot;文件路径&quot;</span> <span class="token operator">-</span>dont_append_source
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4"><li>用邮箱或者拉入 Calibre 软件后再邮箱推送</li></ol><h2 id="txt-mobi" tabindex="-1"><a class="header-anchor" href="#txt-mobi" aria-hidden="true">#</a> txt -&gt; mobi</h2><p>推荐用 EaEsyPub 软件，因为 EasyPub 可以自定义 CSS，有时间可以自己排版</p><blockquote><p>EasyPub v1.50 转 mobi 有 bug，推荐先转成 epub 格式再用上面的方法转成 mobi 格式</p></blockquote><h3 id="vbook-v3-5-1-1" tabindex="-1"><a class="header-anchor" href="#vbook-v3-5-1-1" aria-hidden="true">#</a> VBook v3.5.1.1</h3><ol><li>先用 VSCode 或者其他编辑器打开 txt 添加正则进行编辑</li></ol><ul><li>去除作者的话（ps、注）</li><li>去除广告</li><li>校准卷、章节名</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">(</span>\\<span class="token punctuation">(</span><span class="token operator">|</span>（<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token operator">+</span><span class="token punctuation">(</span>）<span class="token operator">|</span>\\<span class="token punctuation">)</span><span class="token punctuation">)</span>\\n\\n <span class="token comment">// 替换为空</span>
<span class="token punctuation">(</span>\\<span class="token punctuation">(</span><span class="token operator">|</span>（<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token operator">+</span>\\n\\n<span class="token punctuation">.</span><span class="token operator">+</span><span class="token punctuation">(</span>）<span class="token operator">|</span>\\<span class="token punctuation">)</span><span class="token punctuation">)</span>\\n\\n <span class="token comment">// 替换为空</span>
<span class="token punctuation">(</span>\\<span class="token punctuation">(</span><span class="token operator">|</span>（<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token operator">+</span>\\n\\n<span class="token punctuation">.</span><span class="token operator">+</span>\\n\\n<span class="token punctuation">.</span><span class="token operator">+</span><span class="token punctuation">(</span>）<span class="token operator">|</span>\\<span class="token punctuation">)</span><span class="token punctuation">)</span>\\n\\n <span class="token comment">// 替换为空</span>
<span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>将 txt 文件拖入 VBook 软件中，软件会自动生成目录</li><li>设置分卷/分章规则</li><li>如果 txt 章节有中文数字混杂不好改，那就设置“尝试使用阿拉伯显示章节序号”</li><li>设置文字效果</li></ol><table><thead><tr><th style="text-align:center;">Tips</th><th style="text-align:center;">段间距</th><th style="text-align:center;">行间距</th><th style="text-align:center;">章节字体大小</th><th style="text-align:center;">正文字体大小</th><th style="text-align:center;">首行缩进</th><th style="text-align:center;">标题位置</th></tr></thead><tbody><tr><td style="text-align:center;">我自己研究的，整体间距比较均衡</td><td style="text-align:center;">0.3</td><td style="text-align:center;">1.5</td><td style="text-align:center;">1.2</td><td style="text-align:center;">1</td><td style="text-align:center;">2</td><td style="text-align:center;">居中</td></tr><tr><td style="text-align:center;">段间距比较舒服</td><td style="text-align:center;">1</td><td style="text-align:center;">1.3</td><td style="text-align:center;">1.2</td><td style="text-align:center;">1</td><td style="text-align:center;">2</td><td style="text-align:center;">居中</td></tr></tbody></table><ol start="6"><li>设置封面比例为0.65（推荐：650 × 1000）（实在没资源用这个尺寸：325× 500）（1040 × 1600），封面会自动被亚马逊压缩，所以不用特地放小图，不超过50M都可以，小图被压缩后会看不清楚</li></ol><blockquote><p>Kindle 官网是说0.625，但是我自己截图用ps抠图发现其实是几乎接近0.65，实际测试过0.625确实会比收藏夹更窄</p></blockquote><blockquote><p>Kindle 书籍的图片在目录 system\\thumbnails 中</p></blockquote><blockquote><p>封面可要可不要...反正看不见</p></blockquote><ol start="7"><li>放入封面（用 ps 裁剪好尺寸以后再用 https://tinypng.com/ 这个网站无损压缩一下），设置好书名、作者</li><li>生成 mobi 文件</li><li>用邮箱或者拉入 Calibre 软件后再邮箱推送</li></ol><h3 id="eaesypub-v1-50" tabindex="-1"><a class="header-anchor" href="#eaesypub-v1-50" aria-hidden="true">#</a> EaEsyPub v1.50</h3><ol><li>和上面一样，先对 txt 进行校验排版</li><li>在软件中进行编辑章节</li><li>直接插入定制 CSS 进行覆盖样式</li></ol><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@page</span></span> <span class="token punctuation">{</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> 1%<span class="token punctuation">;</span>
  <span class="token property">margin-right</span><span class="token punctuation">:</span> 1%<span class="token punctuation">;</span>
  <span class="token property">orphans</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">widows</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">p</span> <span class="token punctuation">{</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 130%<span class="token punctuation">;</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span>
  <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">margin-right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">orphans</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">widows</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> justify<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 缩进两个字符 */</span>
<span class="token selector">.a</span> <span class="token punctuation">{</span>
  <span class="token property">text-indent</span><span class="token punctuation">:</span> 2em<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">div.centeredimage</span> <span class="token punctuation">{</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 0.5em<span class="token punctuation">;</span>
  <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 0.5em<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">img.attpic</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000000<span class="token punctuation">;</span>
  <span class="token property">max-width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.booktitle</span> <span class="token punctuation">{</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 30%<span class="token punctuation">;</span>
  <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> none solid none none<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> #4e594d<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 3em<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 120%<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.bookauthor</span> <span class="token punctuation">{</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> none solid none none<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> #4e594d<span class="token punctuation">;</span>
  <span class="token property">page-break-after</span><span class="token punctuation">:</span> always<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> large<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 120%<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* titletoc: 目录 titlel2std: 第N章 */</span>
<span class="token selector">.titletoc,
.titlel1top,
.titlel1std,
.titlel2top,
.titlel2std,
.titlel3top,
.titlel3std,
.titlel4std</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 1.3em<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 1em auto 2em<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 0pt<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 第N卷 */</span>
<span class="token selector">.titlel1single,
.titlel2single,
.titlel3single</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 1.5em<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 45% 0 0<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 目录页 */</span>
<span class="token selector">.toc</span> <span class="token punctuation">{</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> 16%<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> justify<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.toc a</span> <span class="token punctuation">{</span>
  <span class="token property">text-decoration</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #000000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.tocl1</span> <span class="token punctuation">{</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 0.5em<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> -30px<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> none none none solid<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 0 0 0 8px<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> #6b766a<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 1.2em<span class="token punctuation">;</span>
  <span class="token property">padding-left</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.tocl2</span> <span class="token punctuation">{</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 0.5em<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> -20px<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> none none none solid<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 0 0 0 6px<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> #939e92<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 1.1em<span class="token punctuation">;</span>
  <span class="token property">padding-left</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.tocl3</span> <span class="token punctuation">{</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 0.5em<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> -20px<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> none none none solid<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 0 0 0 4px<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> #939e92<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 1.05em<span class="token punctuation">;</span>
  <span class="token property">padding-left</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.tocl4</span> <span class="token punctuation">{</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 0.5em<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> -20px<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> none none none solid<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 0 0 0 2px<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> #939e92<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span>
  <span class="token property">padding-left</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.subtoc</span> <span class="token punctuation">{</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> 15%<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> justify<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.subtoclist</span> <span class="token punctuation">{</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 0.5em<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> -20px<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> none none none solid<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 0 0 0 10px<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> #939e92<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 123%<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 120%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>开始转换即可</li></ol><h3 id="epub基础知识介绍" tabindex="-1"><a class="header-anchor" href="#epub基础知识介绍" aria-hidden="true">#</a> Epub基础知识介绍</h3>`,24),r={href:"https://www.cnblogs.com/linlf03/archive/2011/12/13/2286218.html",target:"_blank",rel:"noopener noreferrer"};function d(k,v){const s=t("ExternalLinkIcon");return p(),e("div",null,[u,n("p",null,[n("a",r,[o("Epub基础知识介绍"),i(s)])])])}const m=a(c,[["render",d],["__file","012401.html.vue"]]);export{m as default};
