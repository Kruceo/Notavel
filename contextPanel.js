let panel = document.createElement("div");
panel.id = "context-panel";
document.body.appendChild(panel);
const itemStyle = `
margin: 0 auto;
border: none;
padding: 5px;
width: 100%;
text-align: start;
border-radius: 0px;
`;
const panelStyle = `
background: #dfdfdf;
margin: 0 auto;
border-radius: 2px;
width: 200px;
max-height: 400px;
overflow: auto;
position: fixed;
left: 80%;top:0;
font-family: monospace;
visibility: invisible;
`;
panel.style = panelStyle;
let x, y;
export function genContextPanel(itens) {
  //array, (item)=>{}

  panel.innerHTML = null;
  itens.forEach((element) => {
    let item = document.createElement("button");
    item.id = "context-item";
    item.style = itemStyle;
    item.innerText = element;
    panel.appendChild(item);
  });
  
  window.addEventListener("mousemove", (e) => {
    x = e.pageX + "px";
    y = e.pageY + "px";
  });
  window.addEventListener('keydown',(e)=>
  {
    
    if(e.key == "Escape")
    {
        setVisible(false)
    }
  })
}

export function setVisible(bool) {
  if (bool) {
    panel.style.left = x;
    panel.style.top = y;
    panel.style.visibility = "visible";
  }
  if (!bool) {
   
    panel.style.visibility = "hidden";
  }
}
