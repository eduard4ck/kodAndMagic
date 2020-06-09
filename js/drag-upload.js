(function () {

  let userPicture = document.querySelector(`.setup-user-pic`);
  let openPicture = document.querySelector(`.setup-open-icon`);
  let fileInput = document.querySelector(`.setup input[type="file"]`);
  let picExtensions = [`jpg`, `jpeg`, `png`, `gif`];

  function loadUserPic(file) {
    let fileName = file.name.toLowerCase();
    let matches = picExtensions.some((it) => fileName.endsWith(it));

    if (matches) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener(`load`, () => {
        userPicture.src = reader.result;
        openPicture.src = reader.result;
      });
    }
  }

  function dragenter(evt) {
    evt.preventDefault();
    if (fileInput.contains(evt.target)) {
      fileInput.addEventListener(`drop`, drop);
    } else {
      fileInput.removeEventListener(`drop`, drop);
    }
  }

  function drop(evt) {
    evt.preventDefault();
    loadUserPic(evt.dataTransfer.files[0]);
  }


  fileInput.addEventListener(`change`, () => loadUserPic(fileInput.files[0]));
  document.addEventListener(`dragenter`, dragenter);

}());


