// УСТАНОВКА СЛУШАТЕЛЕЙ НА ОКНО НАСТРОЙКИ ИГРОКА

window.ENTER_KEYCODE = 13;
window.ESC_KEYCODE = 27;

(function () {

  window.setup = {
    setup: document.querySelector(`.setup`),
    setupOpen: document.querySelector(`.setup-open`),
    setupClose: document.querySelector(`.setup .setup-close`),
    inputWizardName: document.querySelector(`.setup .setup-user-name`),
    setupPlayer: document.querySelector(`.setup .setup-player`),
    form: document.querySelector(`.setup .setup-wizard-form`)
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

    window.setup.form.addEventListener(`submit`, onSubmit);

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
    window.setup.form.removeEventListener(`submit`, onSubmit);

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

    let fillElement = (target, color) => {
      target.style.fill = color;
      if (target.classList.contains(`wizard-coat`)) {
        window.setup.setup.querySelector(`input[name="coat-color"]`).value = color;
      } else if (target.classList.contains(`wizard-eyes`)) {
        window.setup.setup.querySelector(`input[name="eyes-color"]`).value = color;
      }
    };
    let changeElemBackground = (target, color) => {
      target.style.backgroundColor = color;
      window.setup.setup.querySelector(`input[name="fireball-color"]`).value = color;
    };

    // regexExample = target.classList.value.match(/wizard-coat|wizard-eyes|setup-fireball/)
    let w = window.players.options;
    if (evt.target.classList.contains(`wizard-coat`)) {
      window.colorizeElement(evt.target, w.coatColors, fillElement);
    } else if (evt.target.classList.contains(`wizard-eyes`)) {
      window.colorizeElement(evt.target, w.eyeColors, fillElement);
    } else if (evt.target.classList.contains(`setup-fireball`)) {
      window.colorizeElement(evt.target.parentNode, w.fireballColors, changeElemBackground);
    }
  }

  function onSubmit(evt) {
    evt.preventDefault();
    let onSuccess = () => closePopup();
    window.save(errorHandler, new FormData(window.setup.form), onSuccess);
  }

  function errorHandler(errMessage) {
    let errDiv = document.createElement(`div`);
    errDiv.style.height = `100 px`;
    errDiv.style.width = `100%`;
    errDiv.style.backgroundColor = `red`;
    errDiv.style.textAlign = `center`;
    errDiv.style.position = `absolute`;
    errDiv.style.left = 0;
    errDiv.style.top = 0;
    errDiv.textContent = errMessage;
    document.body.appendChild(errDiv);
  }

  function successHandler(wizards) {
    let fragment = document.createDocumentFragment();
    const WIZARDS_QUANTITY = 4;
    let fourWizards = [];

    for (let i = 0; i < WIZARDS_QUANTITY; i++) { // выбираем 4 рандомных волшебника
      let randomNumber = window.getRandomInt(0, wizards.length);
      fourWizards.push(wizards[randomNumber]);
      wizards.splice(randomNumber, 1);
    }

    for (let i = 0; i < fourWizards.length; i++) { // добавляем их в list волшебников
      let newWizard = window.players.wizardTemplate.cloneNode(true);
      newWizard.querySelector(`p`).textContent = fourWizards[i].name;
      newWizard.querySelector(`.wizard-coat`).style.fill = fourWizards[i].colorCoat;
      newWizard.querySelector(`.wizard-eyes`).style.fill = fourWizards[i].colorEyes;
      fragment.appendChild(newWizard);
    }
    window.players.setupSimilarList.appendChild(fragment);
  }

  window.load(errorHandler, successHandler); // загрузить волшебников через xhr
  window.setup.setupOpen.addEventListener(`click`, openPopup);
  window.setup.setupOpen.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      openPopup();
    }
  });

}());

