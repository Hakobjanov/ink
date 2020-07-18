function Rotator(frameSelector, imageUrls, options) {
  this.frames = document.querySelectorAll(frameSelector);
  this.offset = 0;
  const images = imageUrls.map((url) => {
    const img = new Image();
    img.src = url;
    return img;
  });
  this.length = images.length;
  this.frames.forEach((frame, i) => {
    const imageClones = images.map((image) => image.cloneNode());
    imageClones.forEach((img, j) => {
      //img.setAttribute("data-depth", 0.2);
      if (i !== j) {
        img.classList.add("transparent");
      }
    });
    frame.append(...imageClones);
  });
}

Rotator.prototype.goLeft = function () {
  this.shift(-1);
};

Rotator.prototype.goRight = function () {
  this.shift(1);
};

Rotator.prototype.shift = function (offset = 1) {
  this.offset = (this.offset + this.length - offset) % this.length;
  this.frames.forEach((frame, i) => {
    frame.querySelector(":not(.transparent)").classList.add("transparent");
    frame.children[(this.offset + i) % this.length].classList.remove(
      "transparent"
    );
  });
};
