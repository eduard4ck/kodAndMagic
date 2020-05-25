/*
** Генерирует число от min до max, но максимальное число не учитываеться.
** Если макс число 100, то максимум при генерации будет 99.
*/

window.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
