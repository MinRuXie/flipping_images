/* 預先載入圖片 */
function preloadImg(image) {
    let img = new Image();
    img.src = image;
}

let pics = [
    'img/card_back.png',
    'img/card_0.png',
    'img/card_1.png',
    'img/card_2.png',
    'img/card_3.png',
    'img/card_4.png',
    'img/card_5.png',
    'img/card_6.png',
    'img/card_7.png',
    'img/card_8.png',
    'img/card_9.png',
    'img/card_10.png',
    'img/card_11.png',
    'img/card_12.png',
    'img/card_13.png',
    'img/card_14.png',
    'img/card_15.png',
    'img/card_16.png',
    'img/bg.jpg'
];


function preloadImages() {
    for (let i=0; i<pics.length ; i++) {
        preloadImg(pics[i]);
    }
}

export default preloadImages;