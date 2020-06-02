window.colorizeElement = function (target, colors, cb) {

  let rgbToHex = (rgb) =>
    `#` + ((1 << 24) + (Number(rgb.match(/\d{1,3}/gi)[0]) << 16) +
    (Number(rgb.match(/\d{1,3}/gi)[1]) << 8) +
    Number(rgb.match(/\d{1,3}/gi)[2])).toString(16).slice(1);

  let fill = target.style.fill || target.style.backgroundColor;
  let i = colors.indexOf(fill);

  if (i < 0 && fill) {
    fill = rgbToHex(fill);
    i = colors.indexOf(fill);
  }

  if (!fill) {
    cb(target, colors[1]);
    return;
  }

  i = i === colors.length - 1 ? -1 : i;
  cb(target, colors[i + 1]);
};

