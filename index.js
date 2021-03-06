// Generated by CoffeeScript 1.6.3
(function() {
  var clamp, currentX, currentY, hue, lastX, lastY, lightness, touchend, touchmove, touchstart, update, updateBackgroundColor;

  hue = 0;

  lightness = 0;

  lastX = null;

  lastY = null;

  currentX = null;

  currentY = null;

  touchstart = function(e) {
    var _ref, _ref1;
    lastX = null;
    lastY = null;
    currentX = (_ref = e.clientX) != null ? _ref : e.touches[0].clientX;
    currentY = (_ref1 = e.clientY) != null ? _ref1 : e.touches[0].clientY;
    return e.preventDefault();
  };

  touchmove = function(e) {
    var dx, dy, _ref, _ref1;
    if (currentX != null) {
      lastX = currentX;
      lastY = currentY;
      currentX = (_ref = e.clientX) != null ? _ref : e.touches[0].clientX;
      currentY = (_ref1 = e.clientY) != null ? _ref1 : e.touches[0].clientY;
      dx = currentX - lastX;
      dy = currentY - lastY;
      return update(dx, dy);
    }
  };

  touchend = function(e) {
    lastX = null;
    lastY = null;
    currentX = null;
    return currentY = null;
  };

  document.addEventListener("mousedown", touchstart);

  document.addEventListener("mousemove", touchmove);

  document.addEventListener("mouseup", touchend);

  document.addEventListener("touchstart", touchstart);

  document.addEventListener("touchmove", touchmove);

  document.addEventListener("touchend", touchend);

  clamp = function(x, min, max) {
    return Math.min(Math.max(x, min), max);
  };

  update = function(dx, dy) {
    var scale;
    scale = 200;
    hue += dx * 360 / scale;
    lightness += dy * -100 / scale;
    lightness = clamp(lightness, 0, 100);
    return updateBackgroundColor();
  };

  updateBackgroundColor = function() {
    return document.body.style.backgroundColor = "hsla(" + hue + ", 50%, " + lightness + "%, 1)";
  };

  updateBackgroundColor();

}).call(this);
