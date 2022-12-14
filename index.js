import hljs from "highlight.js";
function initNotavel() {
  document.querySelectorAll("code-editor").forEach((ce) => {
    const initialValue = ce.innerHTML;
    ce.innerHTML = "";
    let tst = ce;
    let lang = ce.getAttribute("lang") ?? "javascript";
    let counter = ce.getAttribute("allowCounter") ?? true;
    console.log(tst.style);
    let textEditorEl = document.createElement("code");
    let header = document.createElement("header");
    textEditorEl.setAttribute("contenteditable", "true");
    let rowsCountEl = document.createElement("code");
    tst.style.display = "block";
    tst.style.overflow = "hidden";
    header.style.display = "flex";
    header.style.margin = 0;
    header.style.overflowY = "auto";
    header.style.overflowX = "none";
    header.style.height = "100%";
    rowsCountEl.style = "background-color: #00000050;margin:0 0 0 0;padding: 0";
    rowsCountEl.style.color = getComputedStyle(tst).getPropertyValue(
      "--counter-text-color"
    );
    rowsCountEl.style.background =
      getComputedStyle(tst).getPropertyValue("--counter-background") ??
      "#505050";
    rowsCountEl.style.minHeight = "100%";
    rowsCountEl.style.height = "fit-content";
    rowsCountEl.style.paddingInline = "10px";
    textEditorEl.style.width = "100%";
    textEditorEl.style.overflowWrap = "normal";
    textEditorEl.style.setProperty(
      "-webkit-user-modify",
      "read-write-plaintext-only"
    );
    textEditorEl.style.height = "fit-content";
    textEditorEl.style.minHeight = "100%";
    textEditorEl.style.overflow = "hidden hidden";
    textEditorEl.style.margin = "0";
    textEditorEl.style.whiteSpace = "nowrap";
    textEditorEl.tabIndex = 0;
    // textEditorEl.style.overflowX = "overlay";
    textEditorEl.style.paddingInline = "10px";
    textEditorEl.style.border = "0";
    textEditorEl.style.outline = "none";
    textEditorEl.innerHTML = initialValue;

    //start
    genRowsCounter(textEditorEl, rowsCountEl);
    genHighlight(textEditorEl, lang);
    textEditorEl.innerHTML += "\n";

    textEditorEl.addEventListener("input", (e) => {
      console.log(e)
      
      tst.value = textEditorEl.innerText;
      tst.selectionEnd = window.getSelection().focusOffset + 1;
      tst.dispatchEvent(new Event("input", { bubbles: true, composed: false }));
      genRowsCounter(textEditorEl, rowsCountEl);
      if (e.data == "insertLineBreak") {
        
        const postPos = window.getSelection().focusOffset + 1;
        console.log('##'+ textEditorEl.innerText.slice(0, tst.selectionEnd-1),'$$'+textEditorEl.innerText.slice(tst.selectionEnd-1,textEditorEl.innerText.lenght))
        textEditorEl.innerHTML =
          textEditorEl.innerText.slice(0, tst.selectionEnd-1) +"\n " +textEditorEl.innerText.slice(tst.selectionEnd-1,textEditorEl.innerText.lenght
          );
        window.getSelection().setPosition(textEditorEl.childNodes[0], postPos);
      }
      if (e.data == "insertTab") {
        
        const postPos = window.getSelection().focusOffset + 2;
        console.log('##'+ textEditorEl.innerText.slice(0, tst.selectionEnd-1),'$$'+textEditorEl.innerText.slice(tst.selectionEnd-1,textEditorEl.innerText.lenght))
        textEditorEl.innerHTML =
          textEditorEl.innerText.slice(0, tst.selectionEnd-1) +"  "+textEditorEl.innerText.slice(tst.selectionEnd-1,textEditorEl.innerText.lenght
          );
        window.getSelection().setPosition(textEditorEl.childNodes[0], postPos);
      }
    });
    textEditorEl.addEventListener("keydown", (e) => {
      //textEditorEl.innerHTML = textEditorEl.innerText
      if(e.key == "Tab")
      {
        e.preventDefault()
        let evt = new Event('input')
        evt.data = 'insertTab'
        textEditorEl.dispatchEvent(evt)
      }
      if (e.key == "Enter") {
        e.preventDefault();
        let evt = new Event('input')
        evt.data = 'insertLineBreak'
        textEditorEl.dispatchEvent(evt)
      }
      genRowsCounter(textEditorEl, rowsCountEl);
    });
    textEditorEl.addEventListener("focusout", (e) => {
      genHighlight(textEditorEl, lang);
      genRowsCounter(textEditorEl, rowsCountEl);
    });
    textEditorEl.addEventListener("focusin", (e) => {
      textEditorEl.innerHTML = textEditorEl.innerText
      genRowsCounter(textEditorEl, rowsCountEl);
    });
    let style = document.createElement("style");
    style.innerHTML = `
    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#222;color:#aaa}.hljs-subst{color:#aaa}.hljs-section{color:#fff}.hljs-comment,.hljs-meta,.hljs-quote{color:#444}.hljs-bullet,.hljs-regexp,.hljs-string,.hljs-symbol{color:#fc3}.hljs-addition,.hljs-number{color:#0c6}.hljs-attribute,.hljs-built_in,.hljs-link,.hljs-literal,.hljs-template-variable,.hljs-type{color:#32aaee}.hljs-keyword,.hljs-name,.hljs-selector-class,.hljs-selector-id,.hljs-selector-tag{color:#64a}.hljs-deletion,.hljs-template-tag,.hljs-title,.hljs-variable{color:#f1f}.hljs-doctag,.hljs-section,.hljs-strong{font-weight:700}.hljs-emphasis{font-style:italic}
    `;
    document.body.appendChild(style);

    tst.appendChild(header);
    header.appendChild(rowsCountEl);
    header.appendChild(textEditorEl);
  });
}

function genHighlight(codeElement, lang) {
  try {
    if (hljs != undefined && hljs != null) {
      const rawContent = codeElement.innerText;
      codeElement.innerHTML = "";
      let contentLines = rawContent.split("\n");
      contentLines.forEach((each, index) => {
        if (index < contentLines.length - 1) {
          codeElement.innerHTML +=
            hljs.highlight(each, { language: lang }).value + "\n";
        } else {
          codeElement.innerHTML += hljs.highlight(each, {
            language: lang,
          }).value;
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function genRowsCounter(source, targetElement) {
  let rowsCountTxt = "";

  let rows = source.innerHTML.split("\n");

  //console.log(rows);
  for (let i = 0; i < rows.length; i++) {
    rowsCountTxt += (i + 1).toString().padStart(3, 0) + "<br>";
  }
  targetElement.innerHTML = rowsCountTxt;
}

export { initNotavel };
