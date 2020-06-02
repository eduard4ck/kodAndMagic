window.Code = {
  SUCCESS: 200,
  CACHED: 302,
  WRONG_REQ: 400,
  NOT_AUTH: 401,
  NOT_FOUND_ERROR: 404,
  SERVER_ERROR: 500
};

(function () {
  window.save = function (onError, data, onLoad) {
    let URL = `https://javascript.pages.academy/code-and-magick`;
    createXhr.call(window.save, onError, onLoad, false, `POST`, URL, data);
  };

  window.load = function (onError, onLoad) {
    let URL = `https://javascript.pages.academy/code-and-magick/data`;
    createXhr.call(window.load, onError, onLoad, true, `GET`, URL);
  };


  function createXhr(onError, onLoad, isTimeoutListener, method, URL, data) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    let windowLoad = this === window.load;

    xhr.addEventListener(`load`, function () {
      switch (xhr.status) {
        case Code.SUCCESS: windowLoad ? onLoad(xhr.response) : onLoad(); break;
        case Code.WRONG_REQ: onError(`400 Неверный запрос`); break;
        case Code.NOT_AUTH: onError(`401 Пользователь не авторизован`); break;
        case Code.NOT_FOUND_ERROR: onError(`404 Ничего не найдено`); break;
        default: onError(`Неизвестный статус ${xhr.status} ${xhr.statustext}`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    !isTimeoutListener || xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = 1000;
    xhr.open(method, URL);
    data ? xhr.send(data) : xhr.send();
  }
}());
