import { parse } from "acorn";
import { genContextPanel, setVisible } from "./contextPanel";
import { getLastFromVarious, replaceVarious } from "./lib/stringProcess";

let varis = [];
let params = [];
const defaultVaris = Object.keys(self);

document.querySelector("code-editor").addEventListener("input", (e) => {
   
    let selEnd = e.target.selectionEnd + 1;
  let lastWord = e.target.value.slice(0, selEnd);
  
  setVisible(false)
  lastWord = lastWord.slice(
    getLastFromVarious(lastWord, ";", " ", "\n"),
    selEnd - 1
  );
  let param = lastWord
    .slice(
      getLastFromVarious(lastWord, "(", "=", "-", "+", "/", "*", ".",";","\n"),selEnd).trim();
  param = replaceVarious(param, "", "(", ".");
  console.log(selEnd);
  const varisBackup = varis;
  varis = [];
  let parseAll = [];
  try {
    parseAll = parse(e.target.value, { ecmaVersion: 2021 }).body;
    parseAll.forEach((each) => {
        //console.log(each);
        if (each.type == "VariableDeclaration") {
          varis.push(each.declarations[0].id.name);
        }
      });
  } catch (error) {
    //console.log(error);
    varis = varisBackup;
  }
  const paramsBackup = params;
  params = [];
  try {
    params = Object.keys(new Function("return " + lastWord.trim())());
  } catch (error) {
    params = paramsBackup;
  }
  
  let all = [];
  all.push(...params)
  all.push(...varis);
  if (param == lastWord) {
    all.push(...defaultVaris);
  }
  let filter = all.filter((each) => {
    if (each.startsWith(param)) {
      return each;
    }
  });
  
  if(filter.length > 0)
  {
    genContextPanel(filter);
    setVisible(true)
  }
  
});
