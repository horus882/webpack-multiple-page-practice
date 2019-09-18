# webpack-multiple-page-practice
邊做邊記筆記，主要是希望能透過使用 webpack 來處理平常活動網站的開發 (不使用前端框架，多個頁面的網站)

初始化專案  
```
npm init
```

先安裝 webpack 和其他後面會先用到的套件
```
npm install webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev
```

在專案目錄下建立 src 資料夾，並在 src 底下建立 index.html 和 index.js
```
touch src/index.html src/index.js
```

在專案目錄下建立 webpack 設定檔，打算分成 development 和 production 兩個版本 (這裡先建立 development 用的)
```
touch webpack.dev.js
```

修改 package.json，在 scripts 裡加入下面這段，之後就可以使用 npm start 來啟動本機伺服器
``` javascript
"start": "webpack-dev-server --config webpack.dev.js --mode development"
```

加入 normalize.css
```
npm install normalize.css --save
```

在該頁面的 js (index.html => index.js) 中加入：
``` javascript
import 'normalize.css/normalize.css';
```

這時會報錯，因為 webpack 本身看不懂除了 js 以外的東西，所以要另外安裝 loaders  
(Loaders 整理：https://webpack.js.org/loaders/)
```
npm install css-loader style-loader --save-dev
```

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

通常專案上都會有一個設定整體的 css，所以在 src 資料夾底下新增了名稱為 css 的資料夾，同時建立 common.css 的檔案，再將 import './css/common.css'; 加入 index.js

再來建立 index.html 自己使用的 css，在 css 資料夾底下建立一個 index.css 的檔案，一樣將 import './css/index.css'; 加入 index.js

接著安裝活動網站最常用的 jQuery

```
npm install jquery --save
```

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

