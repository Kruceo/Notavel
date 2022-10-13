let text = 
`
await async function loot(test)
{
    await console.log(test + 1);
    await http.get('http://kruceo.com/index.html')
}`
function addBefore(src,itens,add)
{
    let source = src;
    itens.forEach(element => {
        src.replaceAll(element, add+element);
    });
    return source;
}
function addAfter(src,itens,add)
{
    let source = src;
    itens.forEach(element => {
        src.replaceAll(element, element+add);
    });
    return source;
}
function englobe(src,itens,before,after)
{
    let source = src;
    itens.forEach(element => {
        console.log(element);
        source = source.replaceAll(element, before+element+after);
       
    });
   
    return source;
}
let o = englobe(text,['function','else','catch','async','await'],'<span style="color:red">','</span>');
o = englobe(o,['{','}','(',')'],'<span style="color: yellow">','</span>')
o = englobe(o,['1','2','3','4','5','6','7','8','9','0'],'<span style="color: blue">','</span>')
console.log(o);