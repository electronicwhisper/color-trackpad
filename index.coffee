# Current hue and lightness of the room
hue = 0
lightness = 0


# Trackpad state
lastX = null
lastY = null
currentX = null
currentY = null


# Trackpad listeners
touchstart = (e) ->
  lastX = null
  lastY = null
  currentX = e.clientX ? e.touches[0].clientX
  currentY = e.clientY ? e.touches[0].clientY
  e.preventDefault()

touchmove = (e) ->
  if currentX?
    lastX = currentX
    lastY = currentY
    currentX = e.clientX ? e.touches[0].clientX
    currentY = e.clientY ? e.touches[0].clientY

    dx = currentX - lastX
    dy = currentY - lastY
    update(dx, dy)

touchend = (e) ->
  lastX = null
  lastY = null
  currentX = null
  currentY = null

document.addEventListener "mousedown", touchstart
document.addEventListener "mousemove", touchmove
document.addEventListener "mouseup", touchend
document.addEventListener "touchstart", touchstart
document.addEventListener "touchmove", touchmove
document.addEventListener "touchend", touchend


# Update logic
clamp = (x, min, max) ->
  Math.min(Math.max(x, min), max)

update = (dx, dy) ->
  scale = 200

  hue       += dx *  360 / scale
  lightness += dy * -100 / scale

  lightness = clamp(lightness, 0, 100)

  updateBackgroundColor()

updateBackgroundColor = ->
  document.body.style.backgroundColor = "hsla(#{hue}, 50%, #{lightness}%, 1)"


# Initialize background color
updateBackgroundColor()
