document.addEventListener("DOMContentLoaded", () => {
  if (typeof Swiper === "undefined") return;

  const companiesSwiper = document.querySelector(".companies-wrapper");
  if (!companiesSwiper) return;

  new Swiper(".companies-wrapper", {
    loop: true,
    grabCursor: true,
    centeredSlides: false,

    breakpoints: {
      320: { slidesPerView: 2, spaceBetween: 15 },
      576: { slidesPerView: 3, spaceBetween: 20 },
      768: { slidesPerView: 4, spaceBetween: 25 },
      1024: { slidesPerView: 6, spaceBetween: 30 },
      1440: { slidesPerView: 8, spaceBetween: 35 },
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    a11y: {
      enabled: true,
    },
  });
});
