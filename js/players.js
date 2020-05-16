(function () {

  window.players = {
    wizardTemplate: document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`),
    similarWizards: document.querySelector(`.setup-similar`),
    setupSimilarList: document.querySelector(`.setup-similar .setup-similar-list`),
    players: [],
    options: {
      names: [
        `Иван`,
        `Хуан Себастьян`,
        `Мария`,
        `Кристоф`,
        `Виктор`,
        `Юлия`,
        `Люпита`,
        `Вашингтон`
      ],

      lastNames: [
        `да Марья`,
        `Верон`,
        `Мирабелла`,
        `Вальц`,
        `Онопко`,
        `Тополино`,
        `Нионго`,
        `Ирвинг`
      ],

      coatColors: [
        `rgb(101, 137, 164)`,
        `rgb(241, 43, 107)`,
        `rgb(146, 100, 161)`,
        `rgb(56, 159, 117)`,
        `rgb(215, 210, 55)`,
        `rgb(0, 0, 0)`
      ],

      eyeColors: [
        `black`,
        `red`,
        `blue`,
        `yellow`,
        `green`
      ],

      fireballColors: [
        `#ee4830`,
        `#30a8ee`,
        `#5ce6c0`,
        `#e848d5`,
        `#e6e848`
      ]
    }
  };

  function generateName(namesArray, lastNamesArray) { // сгенерировать имя с фамилией
    let i = window.getRandomInt(0, namesArray.length);
    let name = namesArray[i];
    namesArray.splice(i, 1);
    i = window.getRandomInt(0, lastNamesArray.length);
    let lastName = lastNamesArray[i];
    lastNamesArray.splice(i, 1);
    if (lastName.indexOf(`да`) === 0) {
      return name + ` ` + lastName;
    }

    let toggle = window.getRandomInt(0, 2);
    let fullName = toggle ? name + ` ` + lastName : lastName + ` ` + name;
    return fullName;
  }

  function getRandomElement(colorsArray) { // получить рандомный цвет, для глаз или одежды
    let i = window.getRandomInt(0, colorsArray.length);
    let color = colorsArray[i];
    colorsArray.splice(i, 1);
    return color;
  }

  (function createPlayers() { // получаем массив объектов рандомных игроков, для window.players.players
    let localCoatColors = window.players.options.coatColors.concat();
    let localEyeColors = window.players.options.eyeColors.concat();
    for (let i = 0; i < 4; i++) {
      let obj = {};
      obj.name = generateName(window.players.options.names, window.players.options.lastNames);
      obj.coatColor = getRandomElement(localCoatColors);
      obj.eyesColor = getRandomElement(localEyeColors);
      window.players.players.push(obj);
    }
  }());

  (function addSimilarPlayers() { // добавляем похожих игроков в блок с другими игроками
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < window.players.players.length; i++) {
      let newWizard = window.players.wizardTemplate.cloneNode(true);

      newWizard.querySelector(`p`).textContent = window.players.players[i].name;
      newWizard.querySelector(`.wizard-coat`).style.fill = window.players.players[i].coatColor;
      newWizard.querySelector(`.wizard-eyes`).style.fill = window.players.players[i].eyesColor;

      fragment.appendChild(newWizard);
    }
    window.players.setupSimilarList.appendChild(fragment);
  }());

}());
