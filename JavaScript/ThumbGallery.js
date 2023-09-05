var galleryThumbs = new Swiper("#thumb-swiper", {
    spaceBetween: 12,
    slidesPerView: "auto",
    watchSlidesProgress: true,
    centeredSlides: false,
    grabCursor: true,
    allowTouchMove: false,
    a11y: false,
});
var galleryTop = new Swiper("#gallery-swiper", {
    spaceBetween: 12,
    navigation: {
        nextEl: "#thumb-arrow-next-slide",
        prevEl: "#thumb-arrow-prev-slide",
    },
    /* This piece of code connects main slider with thumbnail slider*/ thumbs: {
        swiper: galleryThumbs,
    },
    a11y: false,
    loop: true,
});