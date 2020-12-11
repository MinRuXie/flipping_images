# 翻翻牌對對碰遊戲

## 開發工具
* jQuery
* Javascript
* HTML
* SCSS

## 功能介紹
* 3 列 8 排 (24張) 12 種圖案的翻翻牌對對碰遊戲。
* 遊戲規則：必須連續翻開兩張一樣的圖案，才能消除卡片。場上所有卡片都消失後即可獲勝。
* 計時制：按下開始遊戲後即開始計時，花費越少秒數排名越高。
* 重新開始：每次重新開始都會重新選出12種圖案並打亂排序。

## Project Structure
```
project
    |- index.html (use /dist)
    |
    |- src (development)
    |   |- assets
    |       |- scss
    |       |   |- main.scss
    |       |
    |       |- js
    |       |   |- main.js
    |       |
    |       |- img
    |       |
    |       |- data
    |           |- images.json
    |
    |- dist (production)
    |   |- assets
    |       |- css
    |       |- js
    |           |- plugins
    |
```

## Gulp
* gulp-sass：compile SCSS to CSS
* gulp-clean-css：minify CSS
* gulp-terser：minify ES6 JS

Process file from `src` folder to `dist` folder.
```
gulp build
```

## Update Data Method
* Add new images url to `images.json`.
* Add new images file to `img` folder.