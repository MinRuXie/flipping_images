// HTML 讀取後執行
$(function(){
    //--------------------
    // 變數宣告
    //--------------------
    let $card_wrap = $('#main-panel .card-wrap');
    let $restart_btn = $('#control-panel .restart-btn');
    let $timer = $('#control-panel .timer');
    
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
    ];

    // 複製雙倍陣列元素
    let dbl_img_array = img_array.concat(img_array);

    // 記錄目前翻開的卡片
    let open_count = 0; // 翻開個數
    let open_card_array = []; // 翻開元素

    //--------------------
    // 自定義 function
    //--------------------

    /* 刷新卡片順序 */
    function reflushCards() {
        // 亂數排序陣列元素
        shuffle(dbl_img_array);

        // 清空容器
        $card_wrap.empty();

        // 加入卡片圖片
        for(let i=0;i<dbl_img_array.length;i++){
            $card_wrap.append(
                `<div class="card exist">
                    <img src="${img_cover}" draggable="false" />
                    <img src="${dbl_img_array[i]}" draggable="false"/>
                </div>`
            );
        }

        // 重置預設值
        resetValue();
    }

    /* 重置預設值 */
    function resetValue() {
        open_count = 0; // 歸 0
        open_card_array = []; // 清除陣列
    }

    /* 計算遊戲時間 */
    function calculatingGameTime() {
        let min = 0;
        let sec = 0;

        $timer.text(`${formatTime(min)}:${formatTime(sec)}`);

        s_timer = setInterval(function(){
            sec++; // 增加秒數
            $timer.text(`${formatTime(min)}:${formatTime(sec)}`);
        }, 1000);

        m_timer = setInterval(function(){
            min++; // 增加分鐘數
            $timer.text(`${formatTime(min)}:${formatTime(sec)}`);
        }, 60000); // 1000ms = 1s ; 1min=60s=60000
    }

    /* 調整時間顯示格式 */
    function formatTime(time) {
        str = time < 10 ? `0${time}` : time;
        return str;
    }

    //--------------------
    // 外部 function
    //--------------------

    /* 亂數排序陣列元素 */
    // http://shubo.io/javascript-random-shuffle/
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    //--------------------
    // 初始化
    //--------------------

    // 刷新卡片順序
    reflushCards();

    // 計算遊戲時間
    calculatingGameTime();

    //--------------------
    // Event Binding
    //--------------------

    /* 重新開始 */
    $restart_btn.on('click', function(){
        // 刷新卡片順序
        reflushCards();

        // 計算遊戲時間
        calculatingGameTime();
    });

    /* 卡片點擊事件: 給未來新增的元素也綁上事件 */
    $(document).on('click', '.exist', function(){
        // 紀錄翻開個數
        open_count++;

        // 防止點擊超過兩張
        if(open_count <= 2){
            // 記錄翻開圖片
            open_card_array.push($(this));

            // 隱藏卡背圖片
            $(this).find('img').eq(0).fadeOut();

            // 選取兩張
            if(open_card_array.length == 2) {
                let img_1 = open_card_array[0].find('img');
                let img_2 = open_card_array[1].find('img');

                setTimeout(function(){
                    // 兩張一樣: 飛走圖案
                    if(img_1.eq(1).attr('src') == img_2.eq(1).attr('src')) {
                        img_1.fadeOut();
                        img_2.fadeOut();

                        // 移除元素事件綁定
                        open_card_array[0].removeClass('exist');
                        open_card_array[1].removeClass('exist');
                    // 兩張不一樣: 還原卡背圖片
                    }else{
                        img_1.eq(0).fadeIn();
                        img_2.eq(0).fadeIn();
                    }

                    // 重置預設值
                    resetValue();
                }, 600);
            }
        }        
    });
    // $('.card').each(function(index){
        
    // });
});