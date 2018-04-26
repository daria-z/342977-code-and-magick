'use strict';
(function () {
  var generateRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Статус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      onError(xhr.response);
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться');
    });
    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick/data';
      var xhr = generateRequest(onLoad, onError);
      xhr.timeout = 10000;
      xhr.open('GET', URL);
      xhr.send();

    },
    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick';
      var xhr = generateRequest(onLoad, onError);
      xhr.timeout = 10000;
      xhr.open('POST', URL);
      xhr.send(data);

    },
  };
})();
