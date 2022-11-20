/**
 * Возвращает рандомное число. Максимум не включается, минимум включается
 */
export function getRandomInt(from, to) {
  const min = Math.ceil(from);
  const max = Math.floor(to);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Проверка obj на Массив
 * @param somebody
 */
export function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

/**
 * Копирование объекта
 * @param  {Object}  obj - object
 * @param  {boolean} req - deep copy
 * @return {Object}      - сopy object
 */
export function clone(obj, req) {
  var newObj = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (req && typeof obj[i] === 'object' && i !== 'prototype') {
      newObj[i] = clone(obj[i]);
    } else {
      newObj[i] = obj[i];
    }
  }
  return newObj;
}
