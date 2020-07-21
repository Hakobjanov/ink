//elements
const body = document.querySelector(".body");
const mouse = document.querySelector(".cursor");
const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const swiperContainer = document.querySelector(".swiper-container");
const cursorText = document.querySelector(".cursor-text");
const blueLine = document.querySelector(".blue-line");
const photoFrameWrapper = document.querySelector(".photo-frame-wrapper");
const photoFrames = document.querySelectorAll(".photo-frame");
const circleCursor = document.querySelector(".cursor");

//event listeners
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);

burger.addEventListener("click", () => {
  burger.classList.toggle("cross");
  menu.classList.toggle("menu-active");
});

blueLine.addEventListener("animationend", () => {
  photoFrames[1].classList.remove("transparent");
  setTimeout(() => {
    photoFrames[2].classList.remove("transparent");
  }, 250);
  setTimeout(() => {
    photoFrames[0].classList.remove("transparent");
  }, 500);
});

/*swiper slider init*/
let mySwiper = new Swiper(".swiper-container", {
  loop: true,
  slidesPerView: 3,
  breakpoints: {
    1440: {
      slidesPerView: 3,
    },
  },
});

let lastSlideIndex = 3;

/*rotating photos with swiper*/
mySwiper.on("slideChange", () => {
  if (
    mySwiper.activeIndex === lastSlideIndex - 1 ||
    mySwiper.activeIndex - lastSlideIndex > 1
  ) {
    photoRotator.goLeft();
  } else {
    photoRotator.goRight();
  }
  lastSlideIndex = mySwiper.activeIndex;
});

/*photo rotator*/
const photoRotator = new Rotator(".photo-frame", [
  "img/image0.png",
  "img/image1.png",
  "img/image2.png",
]);

//parallax js init
let parallaxInstance = new Parallax(photoFrameWrapper, {
  relativeInput: true,
});

//cursor on move and on hover
function cursor(e) {
  mouse.style.top = e.y + "px";
  mouse.style.left = e.x + "px";
}

function activeCursor(e) {
  const item = e.target;
  if (
    item.classList.contains("menu-link") ||
    item.classList.contains("logo") ||
    item.classList.contains("inst") ||
    item.classList.contains("fb")
  ) {
    console.log(item.classList);
    mouse.classList.add("mouse-active");
  } else {
    mouse.classList.remove("mouse-active");
  }
  if ((e.path || e.composedPath()).includes(swiperContainer)) {
    cursorText.classList.add("cursor-drag");
  } else {
    cursorText.classList.remove("cursor-drag");
  }
}
