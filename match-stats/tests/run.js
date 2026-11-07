// node run.js <rootDir containing match-stats/> ; serves under /padelada-design-preview/match-stats/
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.resolve(process.argv[2]);
const out = path.resolve(process.argv[3] || 'shots');
fs.mkdirSync(out, { recursive: true });
const types = { '.html': 'text/html', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json', '.txt': 'text/plain' };
const srv = http.createServer((q, r) => {
  let u = decodeURIComponent(q.url.split('?')[0]); const pre = '/padelada-design-preview/';
  if (!u.startsWith(pre)) { r.statusCode = 404; return r.end(); }
  u = u.slice(pre.length); if (u.endsWith('/')) u += 'index.html';
  const f = path.join(root, u); if (!f.startsWith(root) || !fs.existsSync(f)) { r.statusCode = 404; return r.end('nf'); }
  r.setHeader('content-type', types[path.extname(f)] || 'application/octet-stream'); r.end(fs.readFileSync(f));
}).listen(0);
const D = JSON.parse(fs.readFileSync(path.join(root, 'match-stats/data/match_demo.json'), 'utf8'));
let pass = 0, fail = []; const ck = (c, m) => { if (c) pass++; else fail.push(m); };
(async () => {
  const port = srv.address().port, base = `http://127.0.0.1:${port}/padelada-design-preview/match-stats/`;
  const br = await chromium.launch();
  const viewports = [['375', 375, 667], ['390', 390, 844], ['430', 430, 932], ['desktop', 1280, 800]];
  for (const [vn, w, h] of viewports) {
    const ctx = await br.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const pg = await ctx.newPage(); const ext = [], bad = [], errs = [];
    pg.on('request', q => { if (!q.url().startsWith(`http://127.0.0.1:${port}`) && !q.url().startsWith('data:')) ext.push(q.url()); });
    pg.on('response', r => { if (r.status() >= 400) bad.push(r.url()); });
    pg.on('pageerror', e => errs.push(String(e)));
    const T = (m) => `[${vn}] ${m}`;
    const shot = async n => pg.screenshot({ path: `${out}/${vn}_${n}.png`, fullPage: true });
    const noOverflow = async n => { const o = await pg.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); ck(o <= 0, T(`no h-overflow @${n} (${o})`)); };
    const banner = async n => ck(await pg.locator('.banner').count() > 0 || await pg.locator('img[alt*="Демо"]').count() > 0, T(`synthetic banner @${n}`));
    const small = async n => { // text>=14px, targets>=44
      const r = await pg.evaluate(() => { const bad = []; document.querySelectorAll('body *').forEach(e => { const cs = getComputedStyle(e); if (e.children.length === 0 && e.textContent.trim() && cs.display !== 'none' && e.closest('svg') === null && parseFloat(cs.fontSize) < 14 && !e.closest('.status')) bad.push(e.textContent.trim().slice(0, 20) + ':' + cs.fontSize); document.querySelectorAll('svg text').forEach(t => { const fs = parseFloat(getComputedStyle(t).fontSize); const sc = t.ownerSVGElement.getBoundingClientRect().width / t.ownerSVGElement.viewBox.baseVal.width; if (fs * sc < 13.5) bad.push('svgtext ' + t.textContent + ' ' + (fs * sc).toFixed(1)); }); }); return bad.slice(0, 5); });
      ck(r.length === 0, T(`font>=14 @${n}: ${r.join(',')}`));
      const t = await pg.evaluate(() => { const b = []; document.querySelectorAll('button').forEach(e => { const r = e.getBoundingClientRect(); if (r.width && (r.width < 43.5 || r.height < 43.5)) b.push((e.getAttribute('aria-label') || e.textContent) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); }); return b.slice(0, 6); });
      ck(t.length === 0, T(`targets>=44 @${n}: ${t.join(',')}`));
    };
    const hs = async id => pg.locator(`[data-hs="${id}"]`).click();
    const hash = () => pg.evaluate(() => location.hash);
    // list
    await pg.goto(base); await pg.waitForSelector('.mrow');
    ck(await pg.locator('.mrow').count() === 1 + D.history.matches.length, T('list rows'));
    await banner('list'); await noOverflow('list'); await small('list'); await shot('list');
    await pg.locator('.mrow').nth(1).click(); ck(await pg.locator('.toast').count() === 1, T('past match toast'));
    await pg.locator('.mrow').first().click(); await pg.waitForSelector('.pimg'); ck(await hash() === '#/overview', T('list->overview'));
    // overview png
    await pg.waitForFunction(() => document.querySelector('.pimg img').complete && document.querySelector('.pimg img').naturalWidth > 0);
    await banner('overview'); await noOverflow('overview'); await shot('overview');
    const imgSrc = await pg.locator('.pimg img').getAttribute('src');
    const want = w <= 382 ? 'se' : w <= 410 ? 'std390' : 'promax'; ck(imgSrc.includes('__' + want + '__'), T('png size ' + imgSrc));
    // hotspot scaling: tab-1 at proper place
    const geo = await pg.evaluate(() => { const i = document.querySelector('.pimg').getBoundingClientRect(), b = document.querySelector('[data-hs=tab-1]').getBoundingClientRect(); return { iw: i.width, bw: b.width, bh: b.height, ratio: b.width / i.width }; });
    ck(geo.bw >= 43.5 && geo.bh >= 43.5, T(`overview tab hotspot size ${geo.bw}x${geo.bh}`));
    // defs from overview
    for (const [id, anchor] of [['def-mvp', 'mvp'], ['def-turn', 'turn'], ['def-comeback', 'comeback']]) {
      await hs(id); ck(await pg.locator('#def-' + anchor + '.on').count() === 1, T('sheet anchor ' + anchor));
      if (id === 'def-mvp') await shot('sheet_mvp');
      await pg.locator('#ov [data-close]').click(); ck(await pg.locator('#ov').count() === 0, T('sheet close ' + anchor));
    }
    await hs('def-mvp'); await pg.keyboard.press('Escape'); ck(await pg.locator('#ov').count() === 0, T('Esc closes sheet'));
    // backdrop close
    await hs('def-mvp'); await pg.mouse.click(w / 2, 5); ck(await pg.locator('#ov').count() === 0, T('backdrop closes sheet'));
    // turning point jump
    await hs('open-timeline-turn'); await pg.waitForSelector('#set3-game9');
    ck((await hash()) === '#/timeline/turn' || (await hash()).startsWith('#/timeline'), T('jump to timeline'));
    ck(await pg.locator('#set3-game9.tp').count() === 1, T('turning point row highlighted'));
    const vis = await pg.evaluate(() => { const r = document.getElementById('set3-game9').getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; });
    ck(vis, T('turning point scrolled into view')); await shot('turning_jump');
    // share via overview open-share
    await pg.goto(base + '#/overview'); await pg.waitForSelector('.pimg'); await hs('open-share'); ck(await hash() === '#/share', T('open-share'));
    await pg.waitForSelector('.pimg'); await banner('share'); await noOverflow('share'); await shot('share');
    await hs('share-send'); ck((await pg.locator('.toast').textContent()).includes('Демо: отправка не выполняется'), T('share-send toast'));
    await hs('share-save'); ck((await pg.locator('.toast').textContent()).includes('картинка не сохраняется'), T('share-save toast'));
    const reqBefore = ext.length; ck(ext.length === 0, T('no ext requests on share'));
    await hs('back'); ck(await hash() === '#/overview', T('share back'));
    // tabs on png screens
    for (const [i, name] of [[1, 'players'], [2, 'timeline'], [3, 'company'], [0, 'overview']]) {
      await pg.goto(base + '#/overview'); await pg.waitForSelector('.pimg'); await hs('tab-' + i);
      ck((await hash()).startsWith('#/' + name), T('tab ' + name));
      if (name !== 'timeline') { await pg.waitForSelector('.pimg'); await noOverflow(name); await banner(name); await shot(name); } else { await pg.waitForSelector('.chips'); }
    }
    await pg.goto(base + '#/company'); await pg.waitForSelector('.pimg'); await hs('def-rating'); ck(await pg.locator('#def-rating.on').count() === 1, T('rating sheet')); await pg.keyboard.press('Escape');
    // players list -> each player
    await pg.goto(base + '#/players'); await pg.waitForSelector('.pimg');
    for (const id of [3, 4, 1, 2]) {
      await pg.goto(base + '#/players'); await pg.waitForSelector('.pimg'); await hs('player-' + id);
      await pg.waitForSelector('.hero'); const p = D.players[id], st = D.players_stats[id], wt = D.watch[id];
      ck((await hash()) === '#/player/' + id, T('player route ' + id));
      ck((await pg.locator('.hero h1').textContent()) === p.name, T('hero name ' + p.name));
      const txt = await pg.locator('.pad').evaluate(e => e.textContent);
      ck(txt.includes(`${st.serve_games_won} из ${st.serve_games}`) && txt.includes(`${st.serve_pts_won} из ${st.serve_pts}`) && txt.includes(`${st.ret_pts_won} из ${st.ret_pts}`) && txt.includes(`${st.decisive_serve_won} из ${st.decisive_serve_pts}`), T('stats text ' + p.name));
      ck((await pg.locator('.hero img').getAttribute('src')).includes('player' + id), T('avatar ' + id));
      ck((txt.includes('MVP матча')) === (D.mvp.player === id), T('mvp badge ' + id));
      if (p.watch) { ck(txt.includes(wt.load_vs_baseline_pct + '%') && txt.includes(wt.hr_avg + ' уд/мин') && txt.includes('≈' + wt.kcal_est) && txt.includes(wt.hr_max_est + ' уд/мин') && !txt.includes('Без данных часов'), T('watch metrics ' + p.name)); ck(await pg.locator('svg[aria-label^="Пульс"] polyline').count() === 1, T('hr chart ' + p.name)); const zs = await pg.locator('.zone b').allInnerTexts(); ck(zs.join() === wt.zones_min.map(x => x + ' мин').join(), T('zones ' + p.name)); }
      else { ck(txt.includes('Без данных часов') && !txt.includes('Пульс средний') && !/0 уд\/мин/.test(txt), T('no-watch compact ' + p.name)); }
      await banner('player' + id); await noOverflow('player' + id); await small('player' + id); await shot('player' + id);
      // picker
      for (const j of [3, 4, 1, 2]) { await pg.locator(`.picker button[aria-label="${D.players[j].name}"]`).click(); await pg.waitForFunction(n => document.querySelector('.hero h1').textContent === n, D.players[j].name).catch(() => {}); ck((await pg.locator('.hero h1').textContent()) === D.players[j].name, T(`picker ${id}->${j}`)); await pg.goBack().catch(() => { }); await pg.waitForTimeout(0); await pg.goto(base + '#/player/' + id); await pg.waitForSelector('.hero'); }
      // defs
      for (const a of ['deuce'].concat(p.watch ? ['sensors', 'load'] : [])) { await pg.locator(`[data-def="${a}"]`).click(); ck(await pg.locator('#def-' + a + '.on').count() === 1, T(`def ${a} @${p.name}`)); await pg.locator('#ov [data-close]').click(); }
      await pg.locator('.nav .back').click(); ck(await hash() === '#/overview', T('player back'));
    }
    // timeline filters
    await pg.goto(base + '#/timeline'); await pg.waitForSelector('.chips');
    await banner('timeline'); await noOverflow('timeline'); await small('timeline');
    const tl = D.timeline, checkF = async (f) => {
      await pg.locator(`[data-filter="${f}"]`).click(); await pg.waitForTimeout(50);
      const ids = await pg.locator('.game').evaluateAll(e => e.map(x => +x.dataset.id));
      const sets = await pg.locator('.setcap').evaluateAll(e => e.map(x => +x.dataset.set));
      const bars = await pg.locator('svg rect[data-game]').count();
      let expIds, expSets;
      if (f === 'all') { expIds = tl.map(t => t.id); expSets = [1, 2, 3]; } else if (f === 'breaks') { expIds = tl.filter(t => t.is_break).map(t => t.id); expSets = [1, 2, 3]; } else { const s = +f.slice(3); expIds = tl.filter(t => t.set === s).map(t => t.id); expSets = [s]; }
      ck(JSON.stringify(ids) === JSON.stringify(expIds), T(`filter ${f} rows (${ids.length} vs ${expIds.length})`));
      ck(JSON.stringify(sets) === JSON.stringify(expSets), T(`filter ${f} set headings`));
      const expBars = expSets.reduce((a, s) => a + tl.filter(t => t.set === s).length, 0); ck(bars === expBars, T(`filter ${f} bars ${bars}/${expBars}`));
      ck(await pg.locator(`[data-filter="${f}"][aria-pressed=true]`).count() === 1, T(`filter ${f} pressed`));
      const br = await pg.locator('svg rect[data-break=true]').count(); ck(br === expSets.reduce((a, s) => a + tl.filter(t => t.set === s && t.is_break).length, 0), T(`filter ${f} break outlines`));
      // chart direction matches data
      const bad = await pg.locator('svg rect[data-game]').evaluateAll((rs, tlj) => rs.filter(r => { const t = tlj.find(x => x.id == r.dataset.game); const a = t.games_after.split(':'); return (+a[0] - +a[1]) != +r.dataset.diff; }).length, tl); ck(bad === 0, T(`filter ${f} chart diff matches data`));
      await noOverflow('timeline-' + f); await shot('timeline_' + f);
      // game results text
      const res = await pg.locator('.game .r').allInnerTexts(); ck(res.join() === tl.filter(t => expIds.includes(t.id)).map(t => t.games_after).join(), T(`filter ${f} scores`));
    };
    for (const f of ['set1', 'set2', 'set3', 'breaks', 'all']) await checkF(f);
    ck(await pg.locator('.game.tp').count() === 1 && await pg.locator('.tplabel').count() === 1, T('one turning point'));
    // right-edge clipping in chart svgs
    const clip = await pg.evaluate(() => { const bad = []; const app = document.getElementById('app').getBoundingClientRect(); document.querySelectorAll('.chart *').forEach(e => { const r = e.getBoundingClientRect(); if (r.width && (r.right > app.right + .5 || r.left < app.left - .5)) bad.push(e.tagName); }); return bad.length; });
    ck(clip === 0, T('chart elements inside viewport'));
    // tabs on timeline
    for (const [i, n] of [[0, 'overview'], [1, 'players'], [2, 'timeline'], [3, 'company']]) { await pg.goto(base + '#/timeline'); await pg.waitForSelector('.chips'); await pg.locator('.tabs button').nth(i).click(); ck((await hash()).startsWith('#/' + n), T('timeline tab ' + n)); }
    // keyboard: tab through timeline
    await pg.goto(base + '#/timeline'); await pg.waitForSelector('.chips'); await pg.keyboard.press('Tab'); await pg.keyboard.press('Tab'); await pg.keyboard.press('Tab');
    const foc = await pg.evaluate(() => document.activeElement && document.activeElement.tagName); ck(foc === 'BUTTON', T('keyboard focus lands on button'));
    await pg.locator('[data-filter="set2"]').focus(); await pg.keyboard.press('Enter'); ck(await pg.locator('.setcap').count() === 1, T('keyboard Enter filter'));
    // keyboard hotspots on PNG screen
    await pg.goto(base + '#/overview'); await pg.waitForSelector('.pimg'); let seen = 0; for (let i = 0; i < 12; i++) { await pg.keyboard.press('Tab'); if (await pg.evaluate(() => document.activeElement.classList.contains('hs'))) seen++; } ck(seen >= 8, T('keyboard reaches hotspots ' + seen));
    await pg.keyboard.press('Enter'); // activates focused
    ck(ext.length === 0, T('external requests: ' + ext.join()));
    ck(bad.length === 0, T('4xx: ' + bad.join()));
    ck(errs.length === 0, T('js errors: ' + errs.join()));
    await ctx.close();
  }
  await br.close(); srv.close();
  console.log(JSON.stringify({ pass, fail: fail.length, failures: fail }, null, 1));
  fs.writeFileSync(out + '/results.json', JSON.stringify({ pass, failed: fail.length, failures: fail }, null, 1));
  process.exit(fail.length ? 1 : 0);
})();
