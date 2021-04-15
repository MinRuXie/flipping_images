# 翻翻牌對對碰遊戲

※ 注意！遊戲內有音效

## 功能介紹
* 每次開局都隨機 12 種圖案 (24張) 的翻翻牌對對碰遊戲，以 3 列 8 欄的方式排列卡片。
* 遊戲規則：一次可以翻開兩張卡片，連續翻開兩張一樣的圖案即可消除卡片，否則卡片將翻回背面。
* 破關條件：場上所有卡片都消失後即可獲勝。
* 成績為計時制：按下開始遊戲後即開始計時，遊戲時間不限制，但花費越少秒數，遊戲排名將越高。
* 重新開始：每次重新開始都會再重新選出 12 種圖案並打亂排序。

## 待開發
* 遊戲難易度
* 增加卡片種類
* 破關獎勵(一張彩圖)

## Development Tool
* jQuery
* Javascript
* HTML
* SCSS

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
    |       |
    |       |- data
    |           |- images.json
    |
    |- dist (production)
    |   |- assets
    |       |- img
    |       |- audio
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
* Add new images url to `src/assets/data/images.json`.
* Add new images file to `dist/assets/img` folder.


## Audio Resource
* Background music
    - Resource: [西野加奈／喜歡你的理由 (中文字幕短版MV)](https://www.youtube.com/watch?v=9FCCYhLi6sc&list=LLfbRY728DLyrjq2eRlkvA_w&index=516)
* `corret.wav`
    - Resource: [Correct Answer / That's Right!](https://freesound.org/people/Beetlemuse/sounds/528957/)
* `incorrect.wav`
    - Resource: [Game Sounds » Game Sound Wrong.wav](https://freesound.org/people/Bertrof/sounds/131657/)
* `flipping.wav`
    - Resource: [Book, Flipping Through Pages, A.wav](https://freesound.org/people/InspectorJ/sounds/416179/)
* `start.ogg`
    - Resource: [Arcade » Game Start](https://freesound.org/people/plasterbrain/sounds/243020/)
