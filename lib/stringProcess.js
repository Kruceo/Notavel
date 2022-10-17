export function getLastFromVarious(_text, ..._regexArray) {
  let finalArray = [];

  _regexArray.forEach((element) => {
    finalArray.push(_text.lastIndexOf(element));
  });
  if (finalArray.sort((a, b) => b - a)[0] == -1) {
    return 0;
  }
  return finalArray.sort((a, b) => b - a)[0];
}

export function replaceVarious(src, toPlace, ...toReplace) {
  let toReturn = src;
  toReplace.forEach((each) => {
    toReturn = toReturn.replaceAll(each, toPlace);
  });
  return toReturn;
}
