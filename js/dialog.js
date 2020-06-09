(function () {

  let dialogHandle = window.setup.setup.querySelector(`.upload`);

  dialogHandle.addEventListener(`mousedown`, function (evt) { // перетаскивание окна setup по экрану
    let setup = window.setup.setup;
    let setupCoords = setup.getBoundingClientRect();
    let dragged = false;

    let shift = {
      x: (setupCoords.x + setupCoords.width / 2) - evt.clientX,
      y: setupCoords.y - evt.clientY
    };

    function onMouseMove(moveEvt) {
      let endCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      setup.style.left = shift.x + endCoords.x + `px`;
      setup.style.top = shift.y + endCoords.y + `px`;
      !dragged ? setTimeout(() => dragged = true, 1000) : false; // таймаут при ложном драге
    }

    function onMouseUp(upEvt) {
      if (dragged) { // предотвратить открытие typeFile после перетаскивания
        let preventClick = (clickEvt) => {
          clickEvt.preventDefault();
          document.removeEventListener(`click`, preventClick);
        };
        document.addEventListener(`click`, preventClick);
      }

      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

    }

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  })

}());

/**
 * Перетаскивание элементов из магазина в рюкзак, запрет перетаскивания двух элементов в одну ячейку
 */
(function () {

  let shopElement = window.setup.setup.querySelector(`.setup-artifacts-shop`);
  let artifacts = window.setup.setup.querySelector(`.setup-artifacts`);
  let draggedItem = null;
  let startParentNode = null;
  let recentCell = null;
  let justEntered = null;

  shopElement.addEventListener(`dragstart`, dragstart);
  shopElement.addEventListener(`dragend`, dragend);
  artifacts.addEventListener(`dragstart`, dragstart);
  artifacts.addEventListener(`dragend`, dragend);
  artifacts.addEventListener(`dragover`, dragover);
  artifacts.addEventListener(`dragenter`, dragenter);
  artifacts.addEventListener(`dragleave`, dragleave);
  artifacts.addEventListener(`drop`, drop);

  function dragstart(evt) {
    if (evt.target.tagName.toLowerCase() === `img`) {
      startParentNode = evt.target.parentNode.parentNode;
      draggedItem = evt.target;

      if (startParentNode.className === `setup-artifacts`) {
        setTimeout(() => {
          evt.target.style.visibility = `hidden`;
        }, 0);
      }
    }
  }

  function dragenter(evt) {
    evt.preventDefault();
    let closestCell = recentCell = evt.target.closest(`.setup-artifacts-cell`);
    justEntered = evt.target;
    closestCell.style.outline = `2px dashed red`;

    closestCell.style.backgroundColor = `rgba(255, 255, 255, 0.5)`; // white
    if (draggedItem.parentNode === closestCell) {
      closestCell.style.backgroundColor = `rgba(255, 255, 255, 0.5)`; // white
    } else if (closestCell.childNodes.length > 0) {
      closestCell.style.backgroundColor = `rgba(192, 57, 43, 0.5)`; // red
    }
  }

  function dragover(evt) {
    evt.preventDefault();
    let closestCell = evt.target.closest(`.setup-artifacts-cell`);

    evt.dataTransfer.dropEffect = `copy`;
    if (closestCell.style.backgroundColor === `rgba(192, 57, 43, 0.5)`) {
      evt.dataTransfer.dropEffect = `none`;
    }
  }

  function dragleave(evt) {
    let closestCell = evt.target.closest(`.setup-artifacts-cell`);
    if (closestCell !== recentCell || justEntered === evt.target) {
      closestCell.style.backgroundColor = ``;
      closestCell.style.outline = ``;
    }
  }

  function drop(evt) {
    evt.target.style.backgroundColor = ``;
    draggedItem.style.visibility = `visible`;
    evt.target.style.outline = `none`;

    if (startParentNode.className === `setup-artifacts-shop`) {
      evt.target.appendChild(draggedItem.cloneNode(true));
    } else {
      evt.target.appendChild(draggedItem);
    }
  }

  function dragend(evt) {
    evt.target.style.visibility = `visible`;
  }

}());

/* dialogHandle.addEventListener(`mousedown`, function (evt) {

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    let setup = window.setup.setup;

    // rigth
    if (setup.offsetLeft - shift.x + setup.clientWidth >= window.screen.width) {
      setup.style.left = (window.screen.width - setup.clientWidth) + `px`;
    } else {
      setup.style.left = (setup.offsetLeft - shift.x) + `px`;
    }
    // left
    if (setup.offsetLeft <= setup.clientWidth / 2) {
      setup.style.left = setup.clientWidth / 2 + `px`;
    }
    // top
    if (setup.offsetTop - shift.y <= 0) {
      setup.style.top = 0 + `px`;
    } else {
      setup.style.top = (setup.offsetTop - shift.y) + `px`;
    }

  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  }

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
}); */


