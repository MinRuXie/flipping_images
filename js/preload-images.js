/* 預先載入圖片 */
function preloadImg(image) {
    let img = new Image();
    img.src = image;
}

let pics = [
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
    'img/cover.jpg',
    'img/bg.jpg'
];


function preloadImages() {
    for (let i=0; i<pics.length ; i++) {
        preloadImg(pics[i]);
    }
}

export default preloadImages;