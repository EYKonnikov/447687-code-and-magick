'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var BARS_GAP = 50;
var BAR_Y = 100;

// функция для отрисовки "облака" с тенью
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// функция для вывода статистики
window.renderStatistics = function (ctx, names, times) {
  //  рисуем облако и тень
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  //  выводим сообщение о победе
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + GAP + FONT_GAP * 2);

  //  ищем максимальное время в массиве для рассчета высоты столбцов гистограммы
  var maxTime = times[0];
  for (var i = 1; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }

  // пропорция для рассчета высоты:
  // 300s = 150px (максимальное время = максимальная высота)
  // 1px = 300s/150px
  // высота = время / 1px
  var onePixel = Math.round(maxTime / BAR_MAX_HEIGHT);

  for (i = 0; i < times.length; i++) {
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
    ctx.fillRect(CLOUD_X + FONT_GAP * 2 + i * (BARS_GAP + BAR_WIDTH), (BAR_MAX_HEIGHT - columnHeight) + BAR_Y, BAR_WIDTH, columnHeight);

    // делаем подписи: результаты над колонками и имена под колонками
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText(Math.round(times[i]), CLOUD_X + FONT_GAP * 2 + i * (BARS_GAP + BAR_WIDTH), (BAR_MAX_HEIGHT - columnHeight) + BAR_Y - FONT_GAP);
    ctx.fillText(names[i], CLOUD_X + FONT_GAP * 2 + i * (BARS_GAP + BAR_WIDTH), BAR_Y + BAR_MAX_HEIGHT + FONT_GAP);
  }

};
