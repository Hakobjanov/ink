//swiper
const swiperContainer = document.querySelector(".swiper-container");
const cursorText = document.querySelector(".cursor-text");
const blueLine = document.querySelector(".blue-line");
const photoFrameWrapper = document.querySelector(".photo-frame-wrapper");
const photoFrames = document.querySelectorAll(".photo-frame");

blueLine.addEventListener("animationend", () => {
  photoFrames[1].classList.remove("transparent");
  setTimeout(() => {
    photoFrames[2].classList.remove("transparent");
  }, 250);
  setTimeout(() => {
    photoFrames[0].classList.remove("transparent");
  }, 500);
});

let mySwiper = new Swiper(".swiper-container", {
  loop: true,
  slidesPerView: 3,
});

let lastSlideIndex = 0;

mySwiper.on("slideChange", () => {
  console.log(mySwiper.activeIndex.classList);
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

//const scene = document.querySelector(".frame-1");

const photoRotator = new Rotator(".photo-frame", [
  "/img/image0.png",
  "/img/image1.png",
  "/img/image2.png",
]);

//parallax js
// let parallaxInstance = new Parallax(photoFrameWrapper, {
//   relativeInput: true,
// });

//cursor animations
const mouse = document.querySelector(".cursor");

function cursor(e) {
  //   console.log(wheel);
  mouse.style.top = e.y + "px";
  mouse.style.left = e.x + "px";
}

function activeCursor(e) {
  const item = e.target;
  if (item.classList.contains("menu-link") || item.classList.contains("logo")) {
    console.log(item.classList);
    mouse.classList.add("mouse-active");
  } else {
    mouse.classList.remove("mouse-active");
  }
  if (e.path.includes(swiperContainer)) {
    cursorText.classList.add("cursor-drag");
  } else {
    cursorText.classList.remove("cursor-drag");
  }
}

//event listeners
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
