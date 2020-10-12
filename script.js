const canvas = document.querySelector('canvas');
const generateButton = document.querySelector('.generate-tree-button');
const sunAndMoonImage = document.querySelector('.sun-moon');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext('2d');

let curve = 10;

function drawTree(startX, startY, len, angle, branchWidth, leafAmount, bodyColor, leafColor) {
  context.beginPath();
  context.save();
  context.strokeStyle = bodyColor;
  context.fillStyle = leafColor;
  context.shadowBlur = 15;
  context.shadowColor = 'black';
  context.lineWidth = branchWidth;
  context.translate(startX, startY);
  context.rotate(angle * Math.PI / 180);
  context.moveTo(0, 0);
  
  // context.lineTo(0, -len);
  if (angle > 0) {
    context.bezierCurveTo(curve, -len/2, curve, -len/2, 0, -len);
  } else { 
    context.bezierCurveTo(curve, -len/2, -curve, -len/2, 0, -len);
  }

  context.stroke();
  
  if (len < leafAmount) {
    context.beginPath();
    context.arc(0, -len, 15, 0, Math.PI / 2);
    context.fill();
    context.restore();
    return;
  }

  drawTree(0, -len, len * .75, angle + curve + randomNumber(-5 , 5), branchWidth * .7, leafAmount);
  drawTree(0, -len, len * .75, angle - curve - randomNumber(-5 , 5), branchWidth * .7, leafAmount);

  context.restore();
}

drawTree(canvas.width / 2, canvas.height - 80, 120, 0, 23, 10, '#FF00FF', '#00FFFF');

function generateRandomTree() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  const centerPointX = canvas.width / 2;
  const startY = canvas.height - 80;

  const len = randomNumber(100, 120);
  const angle = 0;
  const branchWidth = randomNumber(2, 45);
  const bodyColor = randomColor();
  const leafColor = randomColor();
  const leafAmount = randomNumber(6, 15);

  generateButton.style.background = bodyColor;

  curve = randomNumber(10, 25);

  drawTree(centerPointX, startY, len, angle, branchWidth, leafAmount, bodyColor, leafColor);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  return `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(0, 255)})`
}

generateButton.addEventListener('click', generateRandomTree);

const dark = '#111';
const light = 'white';

let canvasBackground = light;

sunAndMoonImage.addEventListener('click', () => {
  canvas.style.background = canvasBackground;
  if (canvasBackground === light) {
    canvasBackground = dark;
    sunAndMoonImage.src = `${window.location}/assets/sun.png`
  } else {
    canvasBackground = light;
    sunAndMoonImage.src = `${window.location}/assets/moon.png`
  }
});