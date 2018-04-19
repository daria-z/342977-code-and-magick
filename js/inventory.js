'use strict';


(function () {
  var shopElement = document.querySelector('.setup-artifacts-shop .setup-artifacts-cell');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  var artifactsElement = document.querySelector('.setup-artifacts');
  var artifactsCell = document.querySelector('.setup-artifacts .setup-artifacts-cell:first-of-type');
  var shopCell = document.querySelector('.setup-artifacts-shop .setup-artifacts-cell:first-of-type');

  shopElement.addEventListener('dragstart', function () {
    artifactsCell.style.outline = '2px dashed red';
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    if (evt.target !== artifactsCell) {
      shopCell.appendChild(draggedItem);
    } else {
      evt.target.appendChild(draggedItem);
    }
    evt.target.style.backgroundColor = '';
    evt.target.style.outline = '';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.target.style.outline = '';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.style.outline = '';
    evt.preventDefault();
  });
})();
