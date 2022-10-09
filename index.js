document.querySelectorAll('code-editor').forEach((ce)=>
{
  console.log(ce);
  let tst = ce;
  let lineCounterPad = 2;
  console.log(tst.style);
  let textEditor = document.createElement("p");
  let header = document.createElement("header");
  textEditor.setAttribute("contenteditable", "true");
  let rowsCountEl = document.createElement("p");
  
  tst.style.display = "block";
  tst.style.overflow = "hidden";
  header.style.display = "flex";
  header.style.margin = 0;
  header.style.overflowY = "auto";
  header.style.height = "100%";
  rowsCountEl.style = "background-color: #00000050;margin:0 0 0 0;padding: 0";
  rowsCountEl.style.color = getComputedStyle(tst).getPropertyValue("--counter-color");
  rowsCountEl.style.minHeight = "100%";
  rowsCountEl.style.height = "fit-content";
  rowsCountEl.style.paddingInline = "10px";
  textEditor.style.width = "100%";
  textEditor.style.height = "fit-content";
  textEditor.style.minHeight = '100%';
  textEditor.style.overflowY = "hidden";
  textEditor.style.margin = "0";
  textEditor.style.paddingInline = "10px";
  textEditor.style.border = "0";
  textEditor.style.outline = "none";
  let rowsCountTxt = "";
  
  textEditor.addEventListener("input", (e) => {
    rowsCountTxt = "";
    let rows = [...textEditor.innerHTML.matchAll("<div>")];
  
    for (let i = 0; i < rows.length + 1; i++) {
      rowsCountTxt += (i + 1).toString().padStart(lineCounterPad, "0") + "\n";
    }
    rowsCountEl.innerText = rowsCountTxt;
    tst.value = textEditor.innerText;
  });
  
  textEditor.addEventListener("focusout", (e) => {
    if (hljs != undefined) {
      hljs.highlightElement(textEditor);
    }
  });
  
  setInterval(() => {
    console.log();
  }, 1000);
  
  tst.appendChild(header);
  header.appendChild(rowsCountEl);
  header.appendChild(textEditor);
  
})
