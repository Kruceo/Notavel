let tst = document.querySelector("test");
let lineCounterPad = 2;
console.log(tst.style);
let textEditor = document.createElement("p");
let header = document.createElement("header");
textEditor.setAttribute("contenteditable", "true");
let h2 = document.createElement("p");

tst.style.display = "block";
tst.style.overflow = "hidden";
header.style.display = "flex";
header.style.margin = 0;
header.style.overflowY = "auto";
header.style.height = "100%";
h2.style = "background-color: #00000050;margin:0 0 0 0;padding: 0";
h2.style.color = getComputedStyle(tst).getPropertyValue("--counter-color");
h2.style.minHeight = "100%";
h2.style.height = "fit-content";

h2.style.paddingInline = "10px";

textEditor.style.width = "100%";
textEditor.style.height = "fit-content";
textEditor.style.minHeight = '100%';
textEditor.style.overflowY = "hidden";
textEditor.style.margin = "0";
textEditor.style.paddingInline = "10px";
textEditor.style.border = "0";
textEditor.style.outline = "none";
let text = "";

textEditor.addEventListener("input", (e) => {
  text = "";
  let rows = [...textEditor.innerHTML.matchAll("<div>")];

  for (let i = 0; i < rows.length + 1; i++) {
    text += (i + 1).toString().padStart(lineCounterPad, "0") + "\n";
  }
  h2.innerText = text;
  tst.value = textEditor.innerText;
});

textEditor.addEventListener("focusout", (e) => {
  if (hljs) {
    hljs.highlightElement(textEditor);
  }
});

setInterval(() => {
  console.log();
}, 1000);

tst.appendChild(header);
header.appendChild(h2);
header.appendChild(textEditor);
