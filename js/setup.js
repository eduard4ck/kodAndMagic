const names = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];

const lastNames = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Тополино`,
  `Нионго`,
  `Ирвинг`
];

const coatColors = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

const eyeColors = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

const fireballColors = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`
];

const players = [];
(function createPlayers() { // получаем массив объектов рандомных игроков, для константы строкой выше
  let localCoatColors = coatColors.concat();
  let localEyeColors = eyeColors.concat();
  for (let i = 0; i < 4; i++) {
    let obj = {};
    obj.name = generateName(names, lastNames);
    obj.coatColor = getRandomElement(localCoatColors);
    obj.eyesColor = getRandomElement(localEyeColors);
    players.push(obj);
  }
  localCoatColors = ``;
  localEyeColors = ``;
}());

function generateName(namesArray, lastNamesArray) { // сгенерировать имя с фамилией
  let i = getRandomInt(0, namesArray.length);
  let name = namesArray[i];
  namesArray.splice(i, 1);
  i = getRandomInt(0, lastNamesArray.length);
  let lastName = lastNamesArray[i];
  lastNamesArray.splice(i, 1);
  if (lastName.indexOf(`да`) === 0) {
    return name + ` ` + lastName;
  }

  let toggle = getRandomInt(0, 2);
  let fullName = toggle ? name + ` ` + lastName : lastName + ` ` + name;
  return fullName;
}

function getRandomElement(colorsArray) { // получить рандомный цвет, для глаз или одежды
  let i = getRandomInt(0, colorsArray.length);
  let color = colorsArray[i];
  colorsArray.splice(i, 1);
  return color;
}


let wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
let similarWizards = document.querySelector(`.setup-similar`);
let setupSimilarList = similarWizards.querySelector(`.setup-similar-list`);

(function addSimilarPlayers() { // добавляем похожих игроков в блок с другими игроками
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < players.length; i++) {
    let newWizard = wizardTemplate.cloneNode(true);

    newWizard.querySelector(`p`).textContent = players[i].name;
    newWizard.querySelector(`.wizard-coat`).style.fill = players[i].coatColor;
    newWizard.querySelector(`.wizard-eyes`).style.fill = players[i].eyesColor;

    fragment.appendChild(newWizard);
  }
  setupSimilarList.appendChild(fragment);
}());

// УСТАНОВКА СЛУШАТЕЛЕЙ НА ОКНО НАСТРОЙКИ ИГРОКА

const ENTER_KEYCODE = 13;
const ESC_KEYCODE = 27;

let setup = document.querySelector(`.setup`);
let setupOpen = document.querySelector(`.setup-open`);
let setupClose = setup.querySelector(`.setup-close`);
let inputWizardName = setup.querySelector(`.setup-user-name`);
let setupPlayer = setup.querySelector(`.setup-player`);

setupOpen.addEventListener(`click`, openPopup);
setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

function openPopup() {
  setup.classList.remove(`hidden`);
  similarWizards.classList.remove(`hidden`);

  setupClose.addEventListener(`click`, closePopup);
  document.addEventListener(`keydown`, onPopupEscPress);
  setupClose.addEventListener(`keydown`, onEnterClose);

  inputWizardName.addEventListener(`focus`, function () {
    document.removeEventListener(`keydown`, onPopupEscPress);
    inputWizardName.addEventListener(`blur`, openPopup);
  });
  setupPlayer.addEventListener(`click`, onClickChangeColor);
}

function closePopup() {
  setup.classList.add(`hidden`);
  similarWizards.classList.add(`hidden`);

  setupClose.removeEventListener(`click`, closePopup);
  document.removeEventListener(`keydown`, onPopupEscPress);
  setupClose.removeEventListener(`keydown`, onEnterClose);
  inputWizardName.removeEventListener(`blur`, openPopup);
  setupPlayer.removeEventListener(`click`, onClickChangeColor);
}

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}
function onEnterClose(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
}

function onClickChangeColor(evt) { // смена цвета по клику, на глаза, мантию, и фаербол
  let changeColor = (currentElem) => {
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
        if (fireballColors.indexOf(hex) < 0) {
          evt.target.parentNode.style.backgroundColor = fireballColors[1];
          break;
        } else {
          let i = fireballColors.indexOf(hex);
          i == fireballColors.length - 1 ? i = -1 : false;
          evt.target.parentNode.style.backgroundColor = fireballColors[i + 1];
          break;
        }

      case `wizard-coat`:
        let j = coatColors.indexOf(evt.target.style.fill);
        j == coatColors.length - 1 ? j = -1 : false;
        evt.target.style.fill = coatColors[j + 1];
        break;

      case `wizard-eyes`:
        if (eyeColors.indexOf(evt.target.style.fill) < 0) {
          evt.target.style.fill = eyeColors[1];
          break;
        } else {
          let k = eyeColors.indexOf(evt.target.style.fill);
          k == eyeColors.length - 1 ? k = -1 : false;
          evt.target.style.fill = eyeColors[k + 1];
          break;
        }
    }
  };

  if (evt.target.classList.value.match(/wizard-coat|wizard-eyes|setup-fireball/)) {
    changeColor(evt.target.classList.value);
  }
}
