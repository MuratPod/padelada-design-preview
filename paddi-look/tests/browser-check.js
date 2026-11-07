const {chromium}=require('playwright');const fs=require('fs');
const R=[];const ok=(n,c)=>{R.push((c?'PASS ':'FAIL ')+n);if(!c)process.exitCode=1};
(async()=>{const b=await chromium.launch();
const out='/home/user/padelada-design-preview/paddi-look/screenshots';fs.mkdirSync(out,{recursive:true});
for(const vp of[{n:'mobile',w:375,h:812},{n:'desktop',w:1280,h:900}]){
 const ctx=await b.newContext({viewport:{width:vp.w,height:vp.h},deviceScaleFactor:2});const p=await ctx.newPage();
 const bad=[];p.on('response',r=>{if(r.status()>=400)bad.push(r.url())});p.on('requestfailed',r=>bad.push(r.url()));
 const ext=[];p.on('request',r=>{if(!r.url().startsWith('http://localhost'))ext.push(r.url())});
 await p.goto('http://localhost:8765/index.html');await p.waitForLoadState('networkidle');
 const ov=async n=>ok(vp.n+' no h-overflow '+n,await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 const st=async()=>(await p.textContent('#statelabel'));
 for(const size of['se','promax']){
  await p.click(`[data-size=${size}]`);
  await p.click('[data-st="01_paddi-hello"]');
  // nav
  await p.click('.hs[data-id=open-whatcan]');ok(`${vp.n} ${size} hello->whatcan`,(await st()).includes('02'));
  await p.click('.hs[data-id=close-whatcan]');ok(`${vp.n} ${size} close->hello`,(await st()).includes('01'));
  await p.click('.hs[data-id=suggest-game]');ok(`${vp.n} ${size} game->typing`,(await st()).includes('05'));
  await p.waitForTimeout(1500);ok(`${vp.n} ${size} typing->draft auto`,(await st()).includes('03'));
  await p.click('.hs[data-id=draft-create]');ok(`${vp.n} ${size} create toast`,(await p.textContent('.toast')).includes('Демо'));
  await p.click('.hs[data-id=attach]');ok(`${vp.n} ${size} draft->attach`,(await st()).includes('04'));
  await p.click('.hs[data-id=attach-2]');ok(`${vp.n} ${size} attach-n->draft`,(await st()).includes('03'));
  await p.click('.hs[data-id=attach]');await p.click('.hs[data-id=close-attach]');ok(`${vp.n} ${size} close-attach->draft`,(await st()).includes('03'));
  await p.click('.hs[data-id=draft-cancel]');ok(`${vp.n} ${size} cancel->hello`,(await st()).includes('01'));
  await p.click('.hs[data-id=saved]');ok(`${vp.n} ${size} saved`,(await st()).includes('06'));
  await p.click('.hs[data-id=back-to-chat]');ok(`${vp.n} ${size} back-to-chat`,(await st()).includes('01'));
  await p.click('.hs[data-id=suggest-partner]');ok(`${vp.n} ${size} partner stays typing`,(await st()).includes('05'));
  await p.waitForTimeout(1500);ok(`${vp.n} ${size} typing stays`,(await st()).includes('05'));
  await p.click('.hs[data-id=back]');ok(`${vp.n} ${size} typing back`,(await st()).includes('01'));
  await p.click('.hs[data-id=open-whatcan]');await p.click('.hs[data-id=cap-4]');ok(`${vp.n} ${size} cap-4->typing`,(await st()).includes('05'));await p.waitForTimeout(1500);
  await p.click('.hs[data-id=back]');await p.click('.hs[data-id=open-whatcan]');await p.click('.hs[data-id=cap-1]');ok(`${vp.n} ${size} cap-1->hello`,(await st()).includes('01'));
  // limit toggle
  await p.check('#t-limit');ok(`${vp.n} ${size} limit toggle`,(await st()).includes('07'));
  await p.click('.hs[data-id=limit-ok]');ok(`${vp.n} ${size} limit-ok`,(await st()).includes('01')&&!(await p.isChecked('#t-limit')));
  // chip
  await p.click('.hs[data-id=chip-context]');ok(`${vp.n} ${size} chip hidden`,await p.locator('.cover').count()==1);
  await p.screenshot({path:`${out}/${vp.n}-${size}-hello-nochip.png`});
  await p.check('#t-chip');ok(`${vp.n} ${size} chip restored`,await p.locator('.cover').count()==0);
  // every state
  for(const k of['01_paddi-hello','02_paddi-whatcan','03_paddi-draft','04_paddi-attach','05_typing','06_empty-saved','07_limit']){
   await p.click(`[data-st="${k}"]`);ok(`${vp.n} ${size} state ${k} loaded`,await p.evaluate(()=>{const i=document.querySelector('img.shot');return i.complete&&i.naturalWidth>0}));
   ok(`${vp.n} ${size} ${k} has exit`,await p.locator('.hs').count()>0);
   await ov(k);
   await p.screenshot({path:`${out}/${vp.n}-${size}-${k}.png`,fullPage:vp.n==='mobile'?false:false});
  }
 }
 // hotspot size accuracy & keyboard
 await p.click('[data-size=se]');await p.click('[data-st="01_paddi-hello"]');
 const r=await p.evaluate(()=>{const s=document.getElementById('stage').getBoundingClientRect();const h=document.querySelector('.hs[data-id=suggest-game]').getBoundingClientRect();return[(h.left-s.left)/s.width*375,(h.top-s.top)/s.height*667,h.width/s.width*375,h.height/s.height*667]});
 ok(vp.n+' hotspot coords scale '+r.map(x=>x.toFixed(1)),Math.abs(r[0]-23)<.6&&Math.abs(r[1]-384)<.6&&Math.abs(r[2]-330)<.6);
 await p.focus('.hs[data-id=open-whatcan]');await p.keyboard.press('Enter');ok(vp.n+' keyboard Enter',(await st()).includes('02'));
 await p.focus('.hs[data-id=close-whatcan]');await p.keyboard.press('Space');ok(vp.n+' keyboard Space',(await st()).includes('01'));
 await p.keyboard.press('Tab');ok(vp.n+' tab moves focus',await p.evaluate(()=>document.activeElement.tagName==='BUTTON'));
 await p.focus('.hs[data-id=open-whatcan]');await p.screenshot({path:`${out}/${vp.n}-focus-visible.png`});
 // reduce motion typing
 await p.click('[data-st="05_typing"]');
 const pos=()=>p.evaluate(()=>document.getElementById('tpy').style.backgroundPosition);
 const seen=new Set();for(let i=0;i<10;i++){seen.add(await pos());await p.waitForTimeout(80)}
 ok(vp.n+' typing animates frames='+seen.size,seen.size>=3);
 await p.check('#t-rm');const s2=new Set();for(let i=0;i<8;i++){s2.add(await pos());await p.waitForTimeout(100)}
 ok(vp.n+' reduce motion static',s2.size===1&&[...s2][0].startsWith('0%'));
 await p.uncheck('#t-rm');
 // emotions + avatars
 for(const k of['Рад','Нейтральный','Думает','Извиняется']){await p.click(`#emos button:has-text("${k}")`);await p.waitForTimeout(300);ok(vp.n+' emotion '+k,(await p.locator('#big img').count())===1&&await p.evaluate(()=>document.querySelector('#big img').naturalWidth>0))}
 await p.check('#t-navy');await p.waitForTimeout(300);ok(vp.n+' navy variant',(await p.getAttribute('#big img','src')).includes('on-navy'));
 ok(vp.n+' 4 avatars',await p.evaluate(()=>[...document.querySelectorAll('#avs img')].every(i=>i.naturalWidth>0))&&await p.locator('#avs img').count()==4);
 await ov('end');
 await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:`${out}/${vp.n}-page-full.png`,fullPage:true});
 ok(vp.n+' zero 4xx/failed ('+bad.length+')',bad.length===0);
 ok(vp.n+' no external requests ('+ext.length+')',ext.length===0);
 await ctx.close();
}
await b.close();fs.writeFileSync('/tmp/claude-0/t/results.txt',R.join('\n'));console.log(R.join('\n'))})()
