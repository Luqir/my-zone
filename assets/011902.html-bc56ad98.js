import{_ as l,r as t,o,c as r,a as e,b as n,d as s,e as i}from"./app-04c27b99.js";const c={},d=i(`<h2 id="mysql-导入时文件过大解决办法" tabindex="-1"><a class="header-anchor" href="#mysql-导入时文件过大解决办法" aria-hidden="true">#</a> MySQL 导入时文件过大解决办法</h2><ol><li>命令修改：（即时生效）</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>//设置为50M
<span class="token builtin class-name">set</span> global max_allowed_packet <span class="token operator">=</span> <span class="token number">50</span>*1024*1024<span class="token punctuation">;</span>
//或者
<span class="token builtin class-name">set</span> global max_allowed_packet <span class="token operator">=</span> <span class="token number">52428800</span>‬<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>运行检查：</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>show VARIABLES like <span class="token string">&#39;%max_allowed_packet%&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>必须重登录行才可以看到更新后的数值</p></blockquote><h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h2>`,7),p={href:"https://blog.csdn.net/sinat_33127389/article/details/108624086",target:"_blank",rel:"noopener noreferrer"},u={href:"https://blog.csdn.net/wd2014610/article/details/89023562",target:"_blank",rel:"noopener noreferrer"},_={href:"https://www.cnblogs.com/seasonhu/p/14994857.html",target:"_blank",rel:"noopener noreferrer"};function h(b,m){const a=t("ExternalLinkIcon");return o(),r("div",null,[d,e("ol",null,[e("li",null,[e("a",p,[n("使用nodejs连接数据库时提示“Client does not support authentication protocol requested by server； “错误解决办法"),s(a)])]),e("li",null,[e("a",u,[n("解决Mysql8+版本远程连接问题"),s(a)])]),e("li",null,[e("a",_,[n("mysql设置了utf8mb4，为什么还有utf8mb4_general_ci和utf8mb4_0900_ai_ci？"),s(a)])])])])}const v=l(c,[["render",h],["__file","011902.html.vue"]]);export{v as default};