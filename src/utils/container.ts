export const createContainer =(w:string, h:string)=>{
  var c = document.createElement('div');
  c.style.width = w;
  c.style.height = h;
  c.style.overflow = 'auto';
  c.style.position = 'relative';
  c.style.padding = '0';
  c.style.border = '1px solid black';
  return c;
}