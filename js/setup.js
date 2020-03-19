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

const players = [];
(function createPlayers() { // получаем массив объектов рандомных игроков, для константы строкой выше
  for (let i = 0; i < 4; i++) {
    let obj = {};
    obj.name = generateName(names, lastNames);
    obj.coatColor = getRandomElement(coatColors);
    obj.eyesColor = getRandomElement(eyeColors);
    players.push(obj);
  }
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
  let fullName;
  toggle ? fullName = name + ` ` + lastName : fullName = lastName + ` ` + name;
  return fullName;
}

function getRandomElement(colorsArray) { // получить рандомный цвет, для глаз или одежды
  let i = getRandomInt(0, colorsArray.length);
  let color = colorsArray[i];
  colorsArray.splice(i, 1);
  return color;
}


let wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
let overlay = document.querySelector(`.overlay`);
let similarWizards = document.querySelector(`.setup-similar`);
let setupSimilarList = similarWizards.querySelector(`.setup-similar-list`);

(function addSimilarPlayers() {
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

overlay.classList.remove(`hidden`);
similarWizards.classList.remove(`hidden`);

let overlayClose = overlay.querySelector(`.setup-close`);
overlayClose.addEventListener(`click`, function () {
  overlay.classList.add(`hidden`);
});
