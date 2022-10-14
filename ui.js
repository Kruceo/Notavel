import {parse} from 'acorn'
let log = document.createElement('p');
document.body.appendChild(log)
let options = document.createElement("ul");
options.style.position = "fixed";
options.style.maxHeight = "300px";
options.style.display = "flex";
options.style.flexDirection = "column"
let mouseX, mouseY;
window.addEventListener("mousemove", (e) => {
  mouseX = e.pageX + "px";
  mouseY = e.pageY + "px";
});
window.addEventListener("keyup", (e) => {
  console.log(e.key);
  console.log(mouseX, mouseY);
  options.focus();
  if (e.key == "Control") {
    
    options.style.visibility = "visible";
    options.style.left = mouseX;
    options.style.top = mouseY;
  }
});
options.addEventListener("focusout", () => {
  options.style.visibility = "collapse";
});
document.body.appendChild(options);

let it = parse('let i = 0; let boo = "test"; const tooth = 1 + 1;', { ecmaVersion: 2021 }).body;
log.innerHTML = "";
let varis = [];
it.forEach((rr) => {
  console.log(rr);
  if (rr.type == "VariableDeclaration") {
    varis.push(rr);
    log.innerText +=
      rr.kind +
      " " +
      rr.declarations[0].id.name +
      " = " +
      (rr.declarations[0].init.raw ?? rr.declarations[0].init.type) +
      "\n";
  }
});

varis.forEach((each) => {
    navigator.clipboard.writeText()
    let button = document.createElement('button');
    button.addEventListener('click',()=>
    {
        let past = navigator.clipboard;
        navigator.clipboard.writeText(each.declarations[0].id.name);
        

    })
    button.innerText = each.declarations[0].id.name
   options.appendChild(button)
});

