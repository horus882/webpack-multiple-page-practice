# webpack-multiple-page-practice
邊做邊記筆記，主要是希望能透過使用 webpack 來處理平常活動網站的開發 (不使用前端框架，多個頁面的網站)
https://www.ivarprudnikov.com/static-website-multiple-html-pages-using-webpack-plus-github-example/

---
初始化專案  
```
npm init
```
---
先安裝 webpack 和其他後面會先用到的套件
```
npm install webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev
```
---
在專案目錄下建立 src 資料夾，並在 src 底下建立 index.html 和 index.js
```
touch src/index.html src/index.js
```
---
在專案目錄下建立 webpack 設定檔，打算分成 development 和 production 兩個版本 (這裡先建立 development 用的)
```
touch webpack.dev.js
```
---
修改 package.json，在 scripts 裡加入下面這段，之後就可以使用 npm start 來啟動本機伺服器
``` javascript
"start": "webpack-dev-server --config webpack.dev.js --mode development"
```
---
加入 normalize.css
```
npm install normalize.css --save
```
---
在該頁面的 js (index.html => index.js) 中加入：
``` javascript
import 'normalize.css/normalize.css';
```
---
這時會報錯，因為 webpack 本身看不懂除了 js 以外的東西，所以要另外安裝 loaders  
(Loaders 整理：https://webpack.js.org/loaders/)
```
npm install css-loader style-loader --save-dev
```
---
module.exports 加入 rules，加完有遇到還是會 compile 失敗，但重新 npm start 一次就正常了
```javascript
module: {
    rules: [
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"]
        }
    ]
},
```
---
通常專案上都會有一個設定整體的 css，所以在 src 資料夾底下新增了名稱為 css 的資料夾，同時建立 common.css 的檔案，再將 import './css/common.css'; 加入 index.js

再來建立 index.html 自己使用的 css，在 css 資料夾底下建立一個 index.css 的檔案，一樣將 import './css/index.css'; 加入 index.js

接著安裝活動網站最常用的 jQuery

```
npm install jquery --save
```
---
module.exports 的 plugins 做些調整，讓 jQuery 變成全域變數
```javascript
plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    })
]
```
再來在該頁面的 js (index.js) 加入 import 'jquery' 應該就成功了

---
首頁的部分處理完接下來就比較簡單了
首頁的檔案先直接複製兩份，新的檔名改成 about 和 contact (about.html, about.css, about.js, contact.html, contact.css, contact.js)

接著要編輯 webpack.dev.js 裡 module.exports 的 entry 和 plugins
```javascript
module.exports = {
// ...
    entry: {
        index: "./src/index.js",
        about: "./src/about.js",              // 新增加的
        contact: "./src/contact.js"           // 新增加的
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: true,
            chunks: ["index"],
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({              // 新增加的
            template: "./src/about.html",
            inject: true,
            chunks: ["about"],
            filename: "about.html"
        }),
        new HtmlWebpackPlugin({              // 新增加的
            template: "./src/contact.html",
            inject: true,
            chunks: ["contact"],
            filename: "contact.html"
        })
    ]
// ...
}
```
切換到瀏覽器，將網址後加上 about.html 或 contact.html 看應該已經成功了

---
接下來想實現常在專案上用到的 php 的 include
先安裝 html-loader
```
npm install html-loader --save-dev
```
裝完之後先來修改 index.html (留意要 include 的檔案的路徑)
``` html
<body>
    <%= require('html-loader!./include/header.html') %>
    <h1>Index 首頁</h1>
</body>
```
回到瀏覽器上會發現 header 已經成功顯示在首頁上
其他頁面就比照辦理吧 (也順便做個 footer 好了)

