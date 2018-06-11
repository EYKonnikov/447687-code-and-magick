'use strict';


var CLOUD = {
  width: 420,
  height: 270,
  x: 100,
  y: 10
};

var FONT = {
  xGap: 10,
  yGap: 20,
};

var BAR = {
  width: 40,
  height: 150,
  gap: 50,
  y: 100
};

// функция для отрисовки "облака" с тенью
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD.width, CLOUD.height);
};

// функция для вывода статистики
window.renderStatistics = function (ctx, names, times) {
  //  рисуем облако и тень
  renderCloud(ctx, CLOUD.x + FONT.xGap, CLOUD.y + FONT.xGap, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD.x, CLOUD.y, '#fff');

  //  выводим сообщение о победе
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD.x + FONT.yGap, CLOUD.y + FONT.xGap + FONT.yGap);
  ctx.fillText('Список результатов:', CLOUD.x + FONT.yGap, CLOUD.y + FONT.xGap + FONT.yGap * 2);

  //  ищем максимальное время в массиве для рассчета высоты столбцов гистограммы

  function getMaxOfArray(arr) {
    return Math.max.apply(null, arr);
  }
  var maxTime = getMaxOfArray(times);
  // пропорция для рассчета высоты:
  // 300s = 150px (максимальное время = максимальная высота)
  // 1px = 300s/150px
  // высота = время / 1px
  var onePixel = Math.round(maxTime / BAR.height);

  for (var i = 0; i < times.length; i++) {
    // рассчитываем высоту столбца
    var columnHeight = times[i] / onePixel;

    // раскрашиваем столбцы в рандомный оттенок синего, если "Вы" - красный
    var randomColor = Math.floor(Math.random() * 255);
    var columnColor = 'rgb(4, 0, ' + randomColor + ')';

    if (names[i] === 'Вы') {
      columnColor = 'rgba(255, 0, 0, 1)';
    }
    // рисуем столбцы
    ctx.fillStyle = columnColor;
    ctx.fillRect(CLOUD.x + FONT.yGap * 2 + i * (BAR.gap + BAR.width), (BAR.height - columnHeight) + BAR.y, BAR.width, columnHeight);

    // делаем подписи: результаты над колонками и имена под колонками
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText(Math.round(times[i]), CLOUD.x + FONT.yGap * 2 + i * (BAR.gap + BAR.width), (BAR.height - columnHeight) + BAR.y - FONT.yGap);
    ctx.fillText(names[i], CLOUD.x + FONT.yGap * 2 + i * (BAR.gap + BAR.width), BAR.y + BAR.height + FONT.yGap);
  }

};
