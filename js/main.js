const getCharacterLimit = function (minValue, maxValue) {
  if (minValue < 0 || maxValue < 0) {
    return NaN;
  }
  let min = minValue;
  let max = maxValue;
  if (minValue > maxValue) {
    min = maxValue;
    max = minValue;
  }
  const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomValue;
};

const getMaxStrLength = function (str, maxLen) {
  return str.length <= maxLen;
};

getCharacterLimit(0, 140);
getMaxStrLength('test', 140);
