$(function () {});

const photoRotator = new Rotator(".photo-frame", [
  "/img/image0.png",
  "/img/image1.png",
  "/img/image2.png",
]);

//cursor animations
const mouse = document.querySelector(".cursor");

function cursor(e) {
  //   console.log(wheel);
  mouse.style.top = e.y + "px";
  mouse.style.left = e.x + "px";
}

//event listeners
window.addEventListener("mousemove", cursor);
