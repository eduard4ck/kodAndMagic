
function getFireballSpeed(movingLeft) {
  return movingLeft ? 10 : 10;
}


let getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

window.renderStatistics = function (ctx, names, times) {
  const WIDTH = 600;
  const HEIGHT = 300;
  const step = 20;
  ctx.save();

  function setShadow() {
    ctx.shadowColor = `White`; // цвет
    ctx.shadowBlur = 20; // уровень размытия
    ctx.shadowOffsetX = 0; // горизонтальное смещение
    ctx.shadowOffsetY = 15; // вертикальное смещение
  }

  (function drawCloud() { // нарисовать облако
    ctx.fillStyle = `#FFA500`; // orange
    let x = WIDTH / 1.7;
    let y = HEIGHT - (HEIGHT / 8);
    let N = 1;
    let trigger = true;

    setShadow();
    ctx.beginPath();
    for (let i = 0; i <= 1; i++) {
      if (i > 0) {
        trigger = false;
        N *= -1;
      }
      ctx.moveTo(x, y);
      ctx.lineTo(x + (WIDTH / 3) * N, y);
      ctx.arc(x + (WIDTH / 3) * N, y - (HEIGHT / 5), (WIDTH / 10), (Math.PI / 180) * 90, (Math.PI / 180) * -90, trigger);
      ctx.quadraticCurveTo(x + (WIDTH / 100 * 30) * N, y - (HEIGHT / 1.5), x + (WIDTH / 7.5) * N, y - (HEIGHT / 1.58));
      ctx.quadraticCurveTo(x + (WIDTH / 10) * N, y - (HEIGHT / 100 * 80), x, y - (HEIGHT / 100 * 80));
      ctx.fill();
    }
    ctx.closePath();
    ctx.restore();
  }());

  function getMaxElement() { // узнаём худшее время среди игроков
    let maxTime = -1;
    for (let i = 0; i < times.length; i++) {
      if (times[i] > maxTime) {
        maxTime = times[i];
        // eslint-disable-next-line no-var
        var maxIndex = i;
      }
    }
    return maxIndex;
  }

  function generateColors() { // генерация массива цветов из пула, для гистограммы
    let colorsPool = [`#DC143C`, `#32CD32`, `#008080`, `#D2691E`, `#6A5ACD`];
    let workColors = [];

    for (let i = 0; i < names.length; i++) {
      let randomNumber = getRandomInt(0, colorsPool.length);
      workColors.push(colorsPool[randomNumber]);
      colorsPool.splice(randomNumber, 1);
    }
    return workColors;
  }

  (function writeText() { // написать первые две строки над гистограммой
    let x = WIDTH / 1.7;

    ctx.fillStyle = `#000`; // black
    ctx.font = `14px PT Mono`;

    let text = `Ура, вы победили!`;
    ctx.fillText(text, x - (ctx.measureText(text).width) / 2, HEIGHT / 3.9);

    let worstTime = (times[getMaxElement()] / 1000).toFixed(1);
    // eslint-disable-next-line eqeqeq
    if (worstTime.split(``)[worstTime.length - 1] == 0) {
      worstTime = Math.floor(times[getMaxElement()] / 1000);
    }

    text = `Худшее время ` + worstTime + ` cек у игрока ` + names[getMaxElement()];
    if ((names[getMaxElement()]) === `Вы`) {
      text = `Худшее время ` + worstTime + ` cек у Вас`;
    }
    ctx.fillText(text, x - (ctx.measureText(text).width) / 2, HEIGHT / 3.9 + step);
  }());

  (function drawPlayers() { // рисуем гистограмму игроков
    let nameX = WIDTH / 3.1;
    let nameY = HEIGHT / 1.2;
    let histogramWidth = 20;
    let histogramHeight = 110;
    let colors = generateColors();
    ctx.font = `14px Roboto`;

    for (let i = 0; i < names.length; i++) {
      let nameLength = ctx.measureText(names[i]).width;
      let elementHeight = times[i] * histogramHeight / times[getMaxElement()];
      ctx.fillStyle = `#000`; // black
      ctx.fillText(names[i], nameX, nameY);

      ctx.beginPath();
      ctx.fillStyle = colors[i];
      ctx.fillRect(nameX + nameLength / 2 - histogramWidth / 2, nameY - step, histogramWidth, elementHeight * -1);
      if (names[i] === `Вы`) {
        ctx.strokeStyle = `#000`;
        ctx.lineWidth = 2;
        ctx.strokeRect(nameX + nameLength / 2 - histogramWidth / 2, nameY - step, histogramWidth, elementHeight * -1);
      }
      ctx.fill();
      ctx.closePath();

      nameX += nameLength + 60;
    }
  }());
};
