// Padelada web-lite v2 · interacciones de prototipo (sin backend)
function toast(t){let e=document.querySelector('.toast');if(!e){e=document.createElement('div');e.className='toast';document.body.appendChild(e)}e.textContent=t;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),1800)}
document.addEventListener('click',ev=>{
 const b=ev.target.closest('[data-toast]');if(b){ev.preventDefault();toast(b.dataset.toast)}
 const l=ev.target.closest('.lang button');if(l){l.parentNode.querySelectorAll('button').forEach(x=>x.classList.remove('on'));l.classList.add('on');if(l.textContent!=='ES')toast('Prototipo: solo ES')}
 const s=ev.target.closest('.seg button');if(s){const g=s.parentNode;g.querySelectorAll('button').forEach(x=>x.classList.remove('on'));s.classList.add('on');const k=s.dataset.tab;if(k){document.querySelectorAll('[data-pane="'+g.dataset.group+'"]').forEach(p=>p.classList.toggle('on',p.dataset.k===k))}}
 const bk=ev.target.closest('[data-back]');if(bk){ev.preventDefault();if(history.length>1&&document.referrer)history.back();else location.href=bk.dataset.back}
 const r=ev.target.closest('tr[data-href]');if(r)location.href=r.dataset.href
 const c=ev.target.closest('[data-confirm]');if(c){ev.preventDefault();const p=c.closest('tr').querySelector('.pill');p.className='pill ok';p.innerHTML='<i class="d"></i>Pagado';c.remove();toast('Marcado como pagado')}
});
// Gate: Google / Apple / WhatsApp→Paddi
(function(){const st=document.getElementById('otp');if(!st)return;
 const step=n=>document.querySelectorAll('[data-step]').forEach(e=>e.hidden=e.dataset.step!=n);
 const finish=how=>{const s=document.getElementById('joinsum');if(s)s.textContent='Plaza reservada con '+how+' · partido de Marc · sáb 7 nov 19:30. Confírmala en la app para que cuente.';toast('Entraste con '+how);step(3)};
 document.getElementById('goGoogle').onclick=()=>finish('Google');
 document.getElementById('goApple').onclick=()=>finish('Apple');
 document.getElementById('goWA').onclick=()=>{toast('Abriendo WhatsApp · Paddi');step(2)};
 document.getElementById('confirmwa').onclick=()=>finish('WhatsApp · Paddi');
 document.getElementById('back1').onclick=()=>step(1);
})();
// joined state on match
if(document.body.dataset.page==='match'&&new URLSearchParams(location.search).get('joined')){
 const f=document.querySelector('.spot.free');f.classList.remove('free');f.innerHTML='<div class="av you">TÚ</div><div class="n">Tú</div><span class="lv lv4">3,5</span>';
 document.getElementById('cnt').textContent='4/4';const pg=document.querySelector('.prog i');if(pg)pg.style.width='100%';document.getElementById('st').outerHTML='<span class="pill ok"><i class="d"></i>Completo</span>';
 document.getElementById('dockbtns').innerHTML='<div class="row" style="gap:10px;padding:4px 0 6px"><span class="pill warn"><i class="d"></i>Plaza reservada</span><span class="sm mu">Confírmala en la app</span></div><a class="btn cta full" href="onboarding.html?from=match.html">Abrir en la app para confirmar</a>';
 toast('¡Estás dentro!');
}
