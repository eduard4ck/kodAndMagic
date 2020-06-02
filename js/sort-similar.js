window.sortSimilar = function () {
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

(function () {
  let prevTimer;
  window.deboubce = function (cb) {
    clearTimeout(prevTimer);
    prevTimer = setTimeout(() => {
      cb();
    }, 500);
  };
}());


