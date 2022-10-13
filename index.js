document.querySelectorAll("code-editor").forEach((ce) => {
  console.log(ce);
  let tst = ce;
  let lineCounterPad = 2;
  console.log(tst.style);
  let textEditorEl = document.createElement("p");
  let header = document.createElement("header");
  textEditorEl.setAttribute("contenteditable", "true");
  let rowsCountEl = document.createElement("p");
  let rowsCountTxt = "";
  tst.style.display = "block";
  tst.style.overflow = "hidden";
  header.style.display = "flex";
  header.style.margin = 0;
  header.style.overflow = "auto";
  header.style.height = "100%";
  rowsCountEl.style = "background-color: #00000050;margin:0 0 0 0;padding: 0";
  rowsCountEl.style.color = getComputedStyle(tst).getPropertyValue("--counter-color");
  rowsCountEl.style.minHeight = "100%";
  rowsCountEl.style.height = "fit-content";
  rowsCountEl.style.paddingInline = "10px";
  textEditorEl.style.width = "100%";
  textEditorEl.style.height = "fit-content";
  textEditorEl.style.minHeight = "100%";
  textEditorEl.style.overflowY = "hidden";
  textEditorEl.style.margin = "0";
  textEditorEl.style.whiteSpace = "nowrap";
  textEditorEl.style.overflowX = "overlay"
  textEditorEl.style.paddingInline = "10px";
  textEditorEl.style.border = "0";
  textEditorEl.style.outline = "none";
  
  textEditorEl.value = tst.value;
  textEditorEl.addEventListener("input", (e) => {
    rowsCountTxt = "";
    let rows = [...textEditorEl.innerHTML.matchAll("<div>")];

    for (let i = 0; i < rows.length + 1; i++) {
      rowsCountTxt += (i + 1).toString().padStart(lineCounterPad, "0") + "\n";
    }
    rowsCountEl.innerText = rowsCountTxt;
    tst.value = textEditorEl.innerText;
  });

  textEditorEl.addEventListener("focusout", (e) => {
    try {
      if (hljs != undefined && hljs != null) {
        hljs.highlightElement(textEditorEl);
      }
    } catch (err) {
      console.info("try using with highlight.js");
    }
  });
  //let style = document.createElement('style');
  //style.innerHTML = "pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#000;background:#fff}.hljs-subst,.hljs-title{font-weight:400;color:#000}.hljs-title.function_{color:#7a7a43}.hljs-code,.hljs-comment,.hljs-quote{color:#8c8c8c;font-style:italic}.hljs-meta{color:#9e880d}.hljs-section{color:#871094}.hljs-built_in,.hljs-keyword,.hljs-literal,.hljs-meta .hljs-keyword,.hljs-name,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-selector-pseudo,.hljs-selector-tag,.hljs-symbol,.hljs-template-tag,.hljs-type,.hljs-variable.language_{color:#0033b3}.hljs-attr,.hljs-property{color:#871094}.hljs-attribute{color:#174ad4}.hljs-number{color:#1750eb}.hljs-regexp{color:#264eff}.hljs-link{text-decoration:underline;color:#006dcc}.hljs-meta .hljs-string,.hljs-string{color:#067d17}.hljs-char.escape_{color:#0037a6}.hljs-doctag{text-decoration:underline}.hljs-template-variable{color:#248f8f}.hljs-addition{background:#bee6be}.hljs-deletion{background:#d6d6d6}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}"
  //document.body.appendChild(style);

  tst.appendChild(header);
  header.appendChild(rowsCountEl);
  header.appendChild(textEditorEl);
});
