# 翻翻牌對對碰遊戲

※ 注意！遊戲內有音效

## 功能介紹
* 3 列 8 排 (24張) 12 種圖案的翻翻牌對對碰遊戲。
* 遊戲規則：必須連續翻開兩張一樣的圖案，才能消除卡片。場上所有卡片都消失後即可獲勝。
* 計時制：按下開始遊戲後即開始計時，花費越少秒數排名越高。
* 重新開始：每次重新開始都會重新選出 12 種圖案並打亂排序。

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


## 音效檔案來源
* 背景音樂
    - 來源：[西野加奈／喜歡你的理由 (中文字幕短版MV)](https://www.youtube.com/watch?v=9FCCYhLi6sc&list=LLfbRY728DLyrjq2eRlkvA_w&index=516)
* `corret.wav`
    - 來源：[Correct Answer / That's Right!](https://freesound.org/people/Beetlemuse/sounds/528957/)
* `incorrect.wav`
    - 來源：[Game Sounds » Game Sound Wrong.wav](https://freesound.org/people/Bertrof/sounds/131657/)
* `flipping.wav`
    - 來源：[Book, Flipping Through Pages, A.wav](https://freesound.org/people/InspectorJ/sounds/416179/)
* `start.ogg`
    - 來源：[Arcade » Game Start](https://freesound.org/people/plasterbrain/sounds/243020/)