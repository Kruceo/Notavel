import { parse } from "acorn";

import { variArray } from "./contextPanel";

let exp = "let i = 0; console.log(i);";

//getBeforeWhile(exp,1,exp.length-1)
let varis = [];

function getLastFromVarious(_text, ..._regexArray) {
  let finalArray = [];

  _regexArray.forEach((element) => {
    finalArray.push(_text.lastIndexOf(element));
  });
  if (finalArray.sort((a, b) => b - a)[0] == -1) {
    return 0;
  }
  return finalArray.sort((a, b) => b - a)[0];
}
document.querySelector("textarea").addEventListener("input", (e) => {
  varis = [];

  let parseAll = [];
  try {
    parseAll = parse(e.target.value, { ecmaVersion: 2021 }).body;
  } catch (error) {}

  //console.log(parseAll)
  parseAll.forEach((each) => {
    if (each.type == "VariableDeclaration") {
      varis.push(each);
    }
  });

  let selEnd = e.target.selectionEnd;
  let lastWord = e.target.value.slice(0, selEnd);
  lastWord = lastWord.slice(getLastFromVarious(lastWord, ";", " ", "\n"),selEnd);
  let param = lastWord.slice(getLastFromVarious(lastWord, "(", "=", "-", "+", "/", "*"),selEnd).trim();
  let filter = varis.filter((each) => {
      if (each.declarations[0].id.name.startsWith(param)) {
        return each;
      }
    });
  variArray(filter);
});
