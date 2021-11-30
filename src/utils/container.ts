const styleContainer = (style:ElementCSSInlineStyle["style"])=>{
  style.overflow = 'auto';
  style.position = 'relative'; 
  style.padding = '0';
}
export const createContainer =(container:HTMLElement)=>{
 styleContainer(container.style);
 container.innerHTML='';
}