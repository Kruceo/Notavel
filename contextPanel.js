let panel = document.createElement("div");
panel.id = 'context-panel'
document.body.appendChild(panel);
const itemStyle = `
margin: 0 auto;
border-bottom: solid #0001 2px;
padding: 5px
`
const panelStyle = `
background: #dfdfdf;
margin: 0 auto;
border-radius: 10px;
width: 200px;
position: fixed;
left: 0;top:0;
font-family: monospace;
`
panel.style = panelStyle;

export function variArray (_array){   //array, (item)=>{}
  panel.innerHTML = null;
  _array.forEach((element) => {
    let ul = document.createElement("p");
    ul.id = 'context-item'
    ul.style = itemStyle ;
    ul.innerText = element.declarations[0].id.name;
    panel.appendChild(ul);
  });
};
