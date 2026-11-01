const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const nav=$('.nav');const onS=()=>nav&&nav.classList.toggle('solid',scrollY>40);addEventListener('scroll',onS,{passive:true});onS();
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in-view')),{threshold:.12});$$('.reveal').forEach(e=>io.observe(e));
// statement words light up on scroll
const st=$('.statement p');if(st){const sp=$$('span',st);const f=()=>{const r=st.getBoundingClientRect();const p=Math.min(1,Math.max(0,(innerHeight*.85-r.top)/(r.height+innerHeight*.35)));sp.forEach((s,i)=>s.classList.toggle('lit',i/sp.length<p))};addEventListener('scroll',f,{passive:true});f()}
// segmented path
$$('.seg button').forEach(b=>b.addEventListener('click',()=>{$$('.seg button').forEach(x=>x.setAttribute('aria-selected',x===b));$$('.panel').forEach(p=>p.classList.toggle('on',p.id===b.dataset.p))}));
// comarca peek
const pk=$('.index .peek');if(pk){$$('.index li a').forEach(a=>{a.addEventListener('mouseenter',()=>{$('img',pk).src=a.dataset.img;pk.classList.add('on')});})}
// rail active
const rl=$$('.rail a');if(rl.length){const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)rl.forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id))}),{rootMargin:'-40% 0px -55% 0px'});rl.forEach(a=>{const t=$(a.hash);t&&so.observe(t)})}
// toast
function toast(m){let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.append(t)}t.textContent=m;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),3200)}
$$('[data-toast]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();toast(b.dataset.toast)}));
// duties
const acc=$('#acceptBtn');if(acc){const ch=$$('.duty input');const u=()=>{const n=ch.filter(c=>c.checked).length;acc.toggleAttribute('disabled',n<ch.length);$('#dcount').textContent=n+' / '+ch.length;const b=$('#dbar');if(b)b.style.width=(n/ch.length*100)+'%'};ch.forEach(c=>c.addEventListener('change',u));u()}
// complaint dialog
const dlg=$('#complaint');$$('[data-complain]').forEach(b=>b.addEventListener('click',()=>dlg.showModal()));
if(dlg){$('#csend').addEventListener('click',e=>{e.preventDefault();dlg.close();toast('Queja enviada al equipo Padelada. Solo la ven los moderadores.')})}
// world form
const wf=$('#worldForm');wf&&wf.addEventListener('submit',e=>{e.preventDefault();wf.innerHTML='<p class="d" style="font-size:44px">Recibido.</p><p class="mu" style="margin-top:12px">Lo revisamos a mano. Te escribimos cuando haya un equipo listo en tu país.</p>'});
// map pins
$$('.spain .pin').forEach(p=>p.addEventListener('click',()=>location.href='comarca.html'));
if(location.search.includes('shot')){$$('.reveal').forEach(e=>e.classList.add('in-view'));document.documentElement.style.scrollBehavior='auto';$$('.statement span').forEach(s=>s.classList.add('lit'));$$('.hero img.bg').forEach(i=>i.style.animation='none')}
{const m=location.search.match(/shot=(\d+)/);if(m){const h=m[1]+'px';const s=document.createElement('style');s.textContent=`.hero,.gate,.auth,.auth .art,.handoff,.page{min-height:${h}!important}.chead{min-height:calc(${h}*.6)!important}.moment{height:${h}!important}.nav,.rail,.accept{position:absolute!important}.demo{display:none}`;document.head.append(s)}}
