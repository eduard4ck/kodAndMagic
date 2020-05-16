// УСТАНОВКА СЛУШАТЕЛЕЙ НА ОКНО НАСТРОЙКИ ИГРОКА

window.ENTER_KEYCODE = 13;
window.ESC_KEYCODE = 27;

(function () {

  window.setup = {
    setup: document.querySelector(`.setup`),
    setupOpen: document.querySelector(`.setup-open`),
    setupClose: document.querySelector(`.setup .setup-close`),
    inputWizardName: document.querySelector(`.setup .setup-user-name`),
    setupPlayer: document.querySelector(`.setup .setup-player`)
  };

  let setupDefaultCoords = {};

  function openPopup() {
    window.setup.setup.classList.remove(`hidden`);
    window.players.similarWizards.classList.remove(`hidden`);

    window.setup.setupClose.addEventListener(`click`, closePopup);
    document.addEventListener(`keydown`, onPopupEscPress);
    window.setup.setupClose.addEventListener(`keydown`, onEnterClose);

    window.setup.inputWizardName.addEventListener(`focus`, function () {
      document.removeEventListener(`keydown`, onPopupEscPress);
      window.setup.inputWizardName.addEventListener(`blur`, openPopup);
    });
    window.setup.setupPlayer.addEventListener(`click`, onClickChangeColor);

    setTimeout(() => {
      document.addEventListener(`mousedown`, isFormClicked);
    }, 0);

    setupDefaultCoords = {
      x: window.setup.setup.offsetLeft,
      y: window.setup.setup.offsetTop
    };
  }

  function closePopup() {
    window.setup.setup.classList.add(`hidden`);
    window.players.similarWizards.classList.add(`hidden`);

    window.setup.setupClose.removeEventListener(`click`, closePopup);
    document.removeEventListener(`keydown`, onPopupEscPress);
    window.setup.setupClose.removeEventListener(`keydown`, onEnterClose);
    window.setup.inputWizardName.removeEventListener(`blur`, openPopup);
    window.setup.setupPlayer.removeEventListener(`click`, onClickChangeColor);
    document.removeEventListener(`mousedown`, isFormClicked);

    window.setup.setup.style.top = setupDefaultCoords.y + `px`;
    window.setup.setup.style.left = setupDefaultCoords.x + `px`;
  }

  function onPopupEscPress(evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      closePopup();
    }
  }
  function onEnterClose(evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      closePopup();
    }
  }

  function isFormClicked(evt) {
    if (!window.setup.setup.contains(evt.target) && evt.which === 1) {
      closePopup();
    }
  }

  function onClickChangeColor(evt) { // смена цвета по клику, на глаза, мантию, и фаербол

    if (evt.target.classList.value.match(/wizard-coat|wizard-eyes|setup-fireball/)) {
      changeColor(evt.target.classList.value);
    }

    function changeColor(currentElem) {
      switch (currentElem) {
        case `setup-fireball`:
          let rgbToHex = (rgb) =>
            `#` + ((1 << 24) + (Number(rgb.match(/\d{1,3}/gi)[0]) << 16) +
          (Number(rgb.match(/\d{1,3}/gi)[1]) << 8) +
          Number(rgb.match(/\d{1,3}/gi)[2])).toString(16).slice(1);

          if (evt.target.parentNode.style.backgroundColor) {
          // eslint-disable-next-line no-var
            var hex = rgbToHex(evt.target.parentNode.style.backgroundColor);
          }
          if (window.players.options.fireballColors.indexOf(hex) < 0) {
            evt.target.parentNode.style.backgroundColor = window.players.options.fireballColors[1];
            break;
          } else {
            let i = window.players.options.fireballColors.indexOf(hex);
            i == window.players.options.fireballColors.length - 1 ? i = -1 : false;
            evt.target.parentNode.style.backgroundColor = window.players.options.fireballColors[i + 1];
            break;
          }

        case `wizard-coat`:
          let j = window.players.options.coatColors.indexOf(evt.target.style.fill);
          j == window.players.options.coatColors.length - 1 ? j = -1 : false;
          evt.target.style.fill = window.players.options.coatColors[j + 1];
          break;

        case `wizard-eyes`:
          if (window.players.options.eyeColors.indexOf(evt.target.style.fill) < 0) {
            evt.target.style.fill = window.players.options.eyeColors[1];
            break;
          } else {
            let k = window.players.options.eyeColors.indexOf(evt.target.style.fill);
            k == window.players.options.eyeColors.length - 1 ? k = -1 : false;
            evt.target.style.fill = window.players.options.eyeColors[k + 1];
            break;
          }
      }
    }
  }

  window.setup.setupOpen.addEventListener(`click`, openPopup);
  window.setup.setupOpen.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      openPopup();
    }
  });
}());
