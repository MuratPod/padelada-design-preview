(function(){
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
// 1) hero phone drives in from below with scroll, title eases up
var hero=document.querySelector('.dx-drive');
if(hero&&!rm){var st=hero.querySelector('.hero-stage'),cp=hero.querySelector('.copy'),tk=0;
 function f(){tk=0;var vh=innerHeight,p=Math.min(1,Math.max(0,scrollY/(vh*.8)));
  var y=(1-p)*Math.min(140,vh*.16),s=.9+.1*p;st.style.setProperty('--dx-y',y.toFixed(1)+'px');st.style.setProperty('--dx-s',s.toFixed(3));
  cp.style.setProperty('--dx-ty',(-p*40).toFixed(1)+'px');}
 addEventListener('scroll',function(){if(!tk){tk=requestAnimationFrame(f)}},{passive:true});f();}
// 3) rating counts with scroll
var n=document.querySelector('.dx-num');
if(n){var to=parseFloat(n.dataset.to),fmt=function(v){return v.toFixed(2).replace('.',',')};
 if(rm){n.textContent=fmt(to)}else{var on=function(){var r=n.getBoundingClientRect(),vh=innerHeight;
  var p=Math.min(1,Math.max(0,(vh-r.top)/(vh*.6)));p=1-Math.pow(1-p,3);n.textContent=fmt(to*p)};
  addEventListener('scroll',function(){requestAnimationFrame(on)},{passive:true});on();}}
// 2) swipe rails with dots
function rail(el,item,label){if(!el)return;var items=el.querySelectorAll(item);if(items.length<2)return;
 var d=document.createElement('div');d.className='dx-dots';d.setAttribute('role','group');d.setAttribute('aria-label',label);
 items.forEach(function(it,i){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label',(i+1)+' / '+items.length);
  b.onclick=function(){it.scrollIntoView({behavior:rm?'auto':'smooth',inline:'center',block:'nearest'})};d.appendChild(b)});
 el.after(d);var bs=d.children;
 function upd(){var c=el.scrollLeft+el.clientWidth/2,best=0,bd=1e9;items.forEach(function(it,i){var m=it.offsetLeft+it.offsetWidth/2,dd=Math.abs(m-c);if(dd<bd){bd=dd;best=i}});
  for(var i=0;i<bs.length;i++)bs[i].setAttribute('aria-current',i===best)}
 el.addEventListener('scroll',function(){requestAnimationFrame(upd)},{passive:true});upd();
 if(item==='figure'&&items[1])requestAnimationFrame(function(){el.scrollLeft=items[1].offsetLeft-(el.clientWidth-items[1].offsetWidth)/2;upd()});}
rail(document.querySelector('#chats .shots'),'figure','Pantallas de mensajería');
rail(document.querySelector('#reloj .w11-cards'),'.w11-card','Pantallas del Apple Watch');
})();
