'use strict';
(function () {

  var userDialog = document.querySelector('.setup'); // создали переменную-блок настройки персонажа в которой будем работать
  var similarListElement = userDialog.querySelector('.setup-similar-list'); //  переменная в которую сложим сгенерированные элементы
  var wizardTemplate = document.querySelector('#similar-wizard-template') // создаем шаблон?
      .content // обращаемся к обертке
      .querySelector('.setup-similar-item'); // и к элементам внутри обертки

  var renderWizard = function (wizard) { // функция для генирации волшебника из массива
    var wizardElement = wizardTemplate.cloneNode(true); // копируем теиплейт волшебника

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // добавили имя из массива
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat; // добавили цвет плаща из массива
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  window.backend.load(function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  });
})();
