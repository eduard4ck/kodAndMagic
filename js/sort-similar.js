(function () {

  window.sortSimilar = function () { // сортировка похожих волшебников по рангу
    let eyeColor = window.setup.setupPlayer.querySelector(`.wizard-eyes`).style.fill;
    let coatColor = window.setup.setupPlayer.querySelector(`.wizard-coat`).style.fill;

    let updateWizards = window.players.fullPlayers.slice().
    sort((left, right) => {
      let rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = window.players.fullPlayers.indexOf(left) - window.players.fullPlayers.indexOf(right);
      }
      return rankDiff;
    });

    function getRank(wizard) {
      let rank = 0;
      wizard.colorEyes === eyeColor ? rank++ : false;
      wizard.colorCoat === coatColor ? rank += 2 : false;
      return rank;
    }

    return updateWizards;
  };

  window.debounce = function (cb, delay = 500) { // нужно вызывать два раза, чтобы был return
    let prevTimer;
    return function () {
      let self = this;
      clearTimeout(prevTimer);
      prevTimer = setTimeout(() => {
        cb.call(self);
      }, delay);
    };
  };

  window.throttle = function (cb, delay = 500) { // тротлинг на таймаутах
    let timer;
    return function () {
      if (!timer) {
        timer = setTimeout(() => {
          cb();
          timer = null;
        }, delay);
      }
    };
  };

}());
