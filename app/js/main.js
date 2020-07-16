$(function () {});
//cursor animations
const mouse = document.querySelector(".cursor");

function cursor(e) {
  //   console.log(wheel);
  mouse.style.top = e.y + "px";
  mouse.style.left = e.x + "px";
}

//event listeners
window.addEventListener("mousemove", cursor);
