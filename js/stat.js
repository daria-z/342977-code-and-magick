'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var firstLineHight = (CLOUD_Y + GAP * 3);
var secondLineHight = (CLOUD_Y + GAP * 5);
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseLine = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, firstLineHight);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, secondLineHight);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseLine = 'hanging';

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], CLOUD_X + GAP * 4 + BAR_WIDTH * i + BAR_GAP * i, secondLineHight + BAR_HEIGHT + GAP * 5);
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP * 4 + BAR_WIDTH * i + BAR_GAP * i, secondLineHight + GAP * 2);
    ctx.fillRect(CLOUD_X + GAP * 4 + BAR_WIDTH * i + BAR_GAP * i, secondLineHight + GAP * 3, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  }
};
