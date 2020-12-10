import preloadImages from './preload-images.js';

/* preload images */
preloadImages();

// HTML 讀取後執行
$(function(){
    let $start_btn = $('#js-start-btn');
    let $card_wrap = $('#js-card-wrap');
    let $restart_btn = $('#js-restart-btn');
    let $timer = $('#js-timer');
    let $history_list = $('#js-history-list');
    
    // 卡背圖片
    let img_cover = 'img/cover.jpg';
    
    // 圖片種類
    let img_array = [
        'img/test_1.jpg',
        'img/test_2.jpg',
        'img/test_3.jpg',
        'img/test_4.jpg',
        'img/test_5.jpg',
        'img/test_6.jpg',
        'img/test_7.jpg',
        'img/test_8.jpg',
        'img/test_9.jpg',
        'img/test_10.jpg',
        'img/test_11.jpg',
        'img/test_12.jpg'
    ];

    // 要使用幾種圖案
    let img_type_count = 12;

    // 複製雙倍陣列元素 (生成元素) 
    let dbl_img_array = [];

    // 記錄目前場上剩下的卡片
    let cur_img_array = [];

    // 記錄目前翻開的卡片
    let open_count = 0; // 翻開個數
    let open_card_array = []; // 翻開元素

    // 遊戲時間
    let s_timer;
    let min = 0;
    let sec = 0;

    // 玩家成績
    let scores = [];

    //--------------------
    // 自定義 function
    //--------------------

    /* 建立遊戲卡片 */
    function createCards() {
        // 複製一份
        let copy_img_array = img_array;

        // 亂數排序陣列元素
        shuffle(copy_img_array);

        // 取出此回合的 X 種圖片
        let new_img_array = [];
        for(let i=0 ; i < img_type_count ; i++) {
            new_img_array.push(copy_img_array[i]);
        }

        // 複製雙倍陣列元素 (生成元素)
        dbl_img_array = new_img_array.concat(new_img_array);

        // 記錄目前場上剩下的卡片
        cur_img_array = [];
        for(let p=0 ; p < new_img_array.length ; p++){
            cur_img_array.push(new_img_array[p]);
        }

        // 清空容器
        $card_wrap.empty();

        // 加入卡片圖片
        for(let i=0 ; i < dbl_img_array.length ; i++) {
            $card_wrap.append(
                `<div class="card exist">
                    <img class="card-back" src="${img_cover}" draggable="false" />
                    <img class="card-front" src="${dbl_img_array[i]}" draggable="false"/>
                </div>`
            );
        }
    }

    /* 計算遊戲時間 */
    function calculatingGameTime() {
        // 重置數值
        min = 0;
        sec = 0;

        $timer.text(`${formatTime(min)}:${formatTime(sec)}`);

        // 每秒執行
        s_timer = setInterval(function() {
            sec++; // 增加秒數

            if(sec >= 60){
                sec = 0;
                min++;
            }

            $timer.text(`${formatTime(min)}:${formatTime(sec)}`);
        }, 1000);
    }

    /* 調整時間顯示格式 */
    function formatTime(time) {
        let str = time < 10 ? `0${time}` : time;
        return str;
    }

    /* 判斷遊戲進度 */
    function deterGameProgress() {
        if(cur_img_array.length <= 0) {
            // 停止計時器
            clearInterval(s_timer);
            
            // 玩家姓名
            let person = prompt(`遊戲結束！共花費${min}分${sec}秒！\n請輸入您的大名：`, "讓我想想");

            if(person == null) {
                person = "無名氏";
            }

            // 紀錄成績
            scores.push({'sec': min*60+sec, 'name': person});
            scores.sort(sortIdAsc);
            console.log(scores);

            $history_list.empty();
            for(let i=0 ; i < scores.length ; i++) {
                $history_list.append(`<li>${scores[i].name}花費${scores[i].sec}秒</li>`);
            }
        }
    }

    //--------------------
    // 外部 function
    //--------------------

    /* 亂數排序陣列元素 */
    // http://shubo.io/javascript-random-shuffle/
    function shuffle(array) {
        for (let i = array.length - 1 ; i > 0 ; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    /* 从小到大 升序排序 json */
    // https://blog.csdn.net/u011019468/article/details/89931940
    function sortIdAsc(a,b){
        return a.sec-b.sec;
    }

    //--------------------
    // Event Binding
    //--------------------

    /* 開始遊戲 */
    $start_btn.on('click', function() {   
        // 隱藏載入動畫
        $('.loading').fadeOut();
            
        // 計算遊戲時間
        calculatingGameTime();
    });

    /* 重新開始 */
    $restart_btn.on('click', function() {
        // 停止計時器 (重新開局)
        clearInterval(s_timer);

        // 建立遊戲卡片
        createCards();

        // 計算遊戲時間
        calculatingGameTime();
    });

    /* 卡片點擊事件: 給未來新增的元素也綁上事件 */
    $(document).on('click', '.exist', function() {    
        // 紀錄翻開個數
        open_count++;

        // 翻牌效果: 清除
        $(this).removeClass('flipped-b-to-f');
        $(this).removeClass('flipped-f-to-b');

        // 防止點擊超過兩張
        if(open_count <= 2){
            // 記錄翻開圖片
            open_card_array.push($(this));

            // 翻牌效果: 反到正
            $(this).addClass('flipped-b-to-f');

            // 隱藏卡背圖片
            $(this).find('img').eq(0).fadeOut();

            // 暫時移除元素的事件綁定 (為了防止重複點選)
            for(let y=0 ; y < open_card_array.length ; y++) {
                open_card_array[y].removeClass('exist');
                open_card_array[y].removeClass('exist');
            }
           
            // 選取兩張
            if(open_card_array.length == 2) {
                let img_1 = open_card_array[0].find('img');
                let img_2 = open_card_array[1].find('img');

                setTimeout(function() {
                    // 兩張一樣: 隱藏元素
                    if(img_1.eq(1).attr('src') == img_2.eq(1).attr('src')) {
                        img_1.fadeOut();
                        img_2.fadeOut();

                        // 移除陣列元素
                        cur_img_array.splice(cur_img_array.indexOf(img_1.eq(1).attr('src')), 1);

                        setTimeout(function() {
                            // 判斷遊戲進度
                            deterGameProgress();
                        }, 500);
                    // 兩張不一樣: 還原卡背圖片
                    } else {
                        // 翻牌效果: 正到反
                        for(let y=0 ; y < open_card_array.length ; y++) {
                            open_card_array[y].addClass('flipped-f-to-b');
                            open_card_array[y].addClass('flipped-f-to-b');
                        }
                        
                        img_1.eq(0).fadeIn();
                        img_2.eq(0).fadeIn();

                        // 復原元素的事件綁定 (為了防止重複點選)
                        open_card_array[0].addClass('exist');
                        open_card_array[1].addClass('exist');
                    }

                    // 重置預設值
                    open_count = 0; // 歸 0
                    open_card_array = []; // 清除陣列
                }, 600);
            }
        }        
    });


    //--------------------
    // initial
    //--------------------

    // 建立遊戲卡片
    createCards();
});