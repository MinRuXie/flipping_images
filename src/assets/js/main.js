async function init() {
    let response = await fetch('src/assets/data/images.json');
    let data = await response.json();

    let img_cover = data.card_back; // 卡背圖片
    let img_array = data.card_fronts; // 圖片種類
    
    /* preload images */
    function preloadImg(image) {
        let img = new Image();
        img.src = image;
    }

    let pics = img_array.slice();
    pics.push(data.card_back);
    pics.push(data.game_cover);

    for (let i=0; i < pics.length ; i++) {
        preloadImg(pics[i]);
    }
    
    // HTML 讀取後執行
    $(function(){
        // let bg_player = document.getElementById('js-bg-player');
        let correct_player = document.getElementById('js-correct-player');
        let incorrect_player = document.getElementById('js-incorrect-player');
        let flipping_player = document.getElementById('js-flipping-player');
        let start_player = document.getElementById('js-start-player');

        let $start_btn = $('#js-start-btn');
        let $card_wrap = $('#js-card-wrap');
        let $restart_btn = $('#js-restart-btn');

        let $timer = $('#js-timer');
        let $history_list = $('#js-history-list');
        let $game_cover_back = $('#js-game-cover-back');
        let $reward_wrap = $('#js-reward-wrap');

        // 要使用幾種圖案
        let img_kinds_count = 12;

        // 複製雙倍陣列元素 (生成元素) 
        let dbl_img_array = [];

        // 記錄目前場上剩下的卡片
        let cur_rest_cards_array = [];

        // 記錄目前翻開的卡片
        let cur_open_cards_count = 0; // 翻開個數
        let cur_open_cards_array = []; // 翻開元素

        // 遊戲時間
        let s_timer;
        let min = 0;
        let sec = 0;

        // 玩家成績
        let scores = []; // {"sec": "", "name": ""}

        //--------------------
        // 自定義 function
        //--------------------

        /* 建立遊戲卡片 */
        function createCards() {
            // 複製一份
            let copy_img_array = img_array.slice();

            // 亂數排序陣列元素
            shuffle(copy_img_array);

            // 取出此回合的 X 種圖片
            let new_img_array = copy_img_array.slice(0, img_kinds_count);

            // 複製雙倍陣列元素 (生成元素)
            dbl_img_array = new_img_array.concat(new_img_array);

            // 記錄目前場上剩下的卡片
            cur_rest_cards_array = [];
            for (let p=0 ; p < new_img_array.length ; p++) {
                cur_rest_cards_array.push(new_img_array[p]);
            }

            // 清空容器
            $card_wrap.empty();

            // 加入卡片圖片
            for (let i=0 ; i < dbl_img_array.length ; i++) {
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

            $timer.text(`${timeFormat(min)}:${timeFormat(sec)}`);

            // 每秒執行
            s_timer = setInterval(function() {
                sec++; // 增加秒數

                if(sec >= 60){
                    sec = 0;
                    min++;
                }

                $timer.text(`${timeFormat(min)}:${timeFormat(sec)}`);
            }, 1000);
        }

        /* 判斷遊戲進度 */
        async function deterGameProgress() {
            if(cur_rest_cards_array.length <= 0) {
                // 停止計時器
                await clearInterval(s_timer);

                // 紀錄成績
                await recordScore();

                // 獲得獎勵
                getReward();
            }
        }

        /* 紀錄成績 */
        function recordScore() {
            let spend_secs = min * 60 + sec;
            let message = "";
            if (spend_secs <= 20) {
                message = "這麼快速一定是真愛粉！";
            } else if (spend_secs <= 40 ) {
                message = "回去多練習吧！";
            } else {
                message = "太可憐了...";
            }
            
            // 玩家姓名
            let person = prompt(`遊戲結束！${message}共花費${timeFormat(min)}分${timeFormat(sec)}秒！\n請輸入您的大名：`, "讓我想想");

            if (person == null) {
                person = "無名氏";
            }

            scores.push({'sec': timeFormat(spend_secs), 'name': person});
            scores.sort(sortIdAsc); // 升序排序

            $history_list.empty();
            for (let i=0 ; i < scores.length ; i++) {
                $history_list.append(`<li>${scores[i].name} ${scores[i].sec}秒</li>`);
            }
        }

        /* 獲得獎勵 */
        function getReward() {
            $reward_wrap.addClass('show');
            $reward_wrap.append(`
                <div class="reward-content">
                    恭喜破關成功！
                    <div class="image-wrap"></div>
                    <div id="js-close-btn" class="btn">我收下了</div>
                </div>`);

            $('#js-image-wrap').addClass('show');

            $('#js-close-btn').on('click', function() {
                $reward_wrap.empty();
                $reward_wrap.removeClass('show');
            });
        }

        /* 重置預設值 */
        function resetGame() {
            cur_open_cards_count = 0; // 歸 0
            cur_open_cards_array = []; // 清除陣列
        }

        /* 時間格式 */
        function timeFormat(time) {
            return (time < 10) ? `0${time}` : time;
        }

        /* play audio */
        function playAudio(player) {
            player.currentTime = 0;
            player.play();
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
        function sortIdAsc(a,b) {
            return a.sec-b.sec;
        }

        //--------------------
        // Event Binding
        //--------------------

        /* 開始遊戲 */
        $start_btn.on('click', function() {
            // 播放音效
            playAudio(start_player);

            // 隱藏準備畫面
            $('#js-ready').fadeOut();
                
            // 計算遊戲時間
            calculatingGameTime();
        }).on('mouseenter', function(){
            // 出現動畫
            $game_cover_back.addClass('show');
        }).on('mouseleave', function(){
            // 動畫消失
            $game_cover_back.removeClass('show');
        });

        /* 重新開始 */
        $restart_btn.on('click', function() {
            // 播放音效
            playAudio(start_player);

            // 停止計時器 (重新開局)
            clearInterval(s_timer);

            // 建立遊戲卡片
            createCards();

            // 重置預設值
            resetGame();

            // 計算遊戲時間
            calculatingGameTime();
        });

        /* 卡片點擊事件: 給未來新增的元素也綁上事件 */
        $(document).on('click', '.exist', function() {
            playAudio(flipping_player);

            // 紀錄翻開個數
            cur_open_cards_count++;

            // 翻牌效果: 清除
            $(this).removeClass('flipped-b-to-f');
            $(this).removeClass('flipped-f-to-b');

            // 防止點擊超過兩張
            if(cur_open_cards_count <= 2){
                // 記錄翻開圖片
                cur_open_cards_array.push($(this));

                // 隱藏卡背圖片
                $(this).find('img').eq(0).fadeOut();

                // 翻牌效果: 反到正
                $(this).addClass('flipped-b-to-f');

                // 暫時移除元素的事件綁定 (為了防止重複點選)
                for(let y=0 ; y < cur_open_cards_array.length ; y++) {
                    cur_open_cards_array[y].removeClass('exist');
                    cur_open_cards_array[y].removeClass('exist');
                }
            
                // 選取兩張
                if(cur_open_cards_array.length == 2) {
                    let img_1 = cur_open_cards_array[0].find('img');
                    let img_2 = cur_open_cards_array[1].find('img');

                    setTimeout(function() {
                        // 兩張一樣: 隱藏元素
                        if(img_1.eq(1).attr('src') == img_2.eq(1).attr('src')) {
                            
                            new Promise(function(myResolve, myReject) {
                                // 播放音效
                                playAudio(correct_player);
                                
                                img_1.fadeOut();
                                img_2.fadeOut();

                                // 移除陣列元素
                                cur_rest_cards_array.splice(cur_rest_cards_array.indexOf(img_1.eq(1).attr('src')), 1);
                                
                                myResolve(); // when successful
                                myReject();  // when error
                            }).then(
                                function(value) {
                                    // 判斷遊戲進度
                                    deterGameProgress();
                                },
                                function(error) { /* code if some error */ }
                            );

                        // 兩張不一樣: 還原卡背圖片
                        } else {
                            // 播放音效
                            playAudio(incorrect_player);
                            
                            img_1.eq(0).fadeIn();
                            img_2.eq(0).fadeIn();

                            // 翻牌效果: 正到反
                            for(let y=0 ; y < cur_open_cards_array.length ; y++) {
                                cur_open_cards_array[y].addClass('flipped-f-to-b');
                                cur_open_cards_array[y].addClass('flipped-f-to-b');
                            }

                            // 復原元素的事件綁定 (為了防止重複點選)
                            cur_open_cards_array[0].addClass('exist');
                            cur_open_cards_array[1].addClass('exist');
                        }

                        // 重置預設值
                        resetGame();
                    }, 800);
                }
            }
        });


        //--------------------
        // initial
        //--------------------

        // 建立遊戲卡片
        createCards();
    });
};

init().then(function() {
    let flag = true;

    function determineLoadState() {
        console.log('Loading...');

        switch(document.readyState) {
            case 'interactive':
            case 'complete':
                $('#js-loading').fadeOut(); // 隱藏載入畫面
                flag = false;
                break;
        }

        if (!flag) {
            clearInterval(timer);
            console.log('Ready!');
        }
    }

    let timer = setInterval(determineLoadState, 500);
});