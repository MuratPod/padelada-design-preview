const io=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('in')),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
if(location.search.includes('shot'))document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
const L=[...document.querySelectorAll('.langs span')];let i=0;setInterval(()=>{L.forEach(s=>s.classList.remove('on'));L[i++%L.length].classList.add('on')},1200);L[0]&&L[0].classList.add('on');
document.querySelectorAll('#menu a').forEach(a=>a.onclick=()=>document.body.classList.remove('open'));
if(/shot/.test(location.search))document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in'));
