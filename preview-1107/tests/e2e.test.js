/* e2e: грузит реальные index.html в Chromium (Playwright) на 390px. Запуск: node --test design-proto/tests/e2e.test.js */
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
let chromium; try { ({ chromium } = require('playwright')); } catch (e) { /* нет playwright — тесты пропускаются */ }
const skip = !chromium && 'playwright не установлен';
const url = (d, q = '') => pathToFileURL(path.join(__dirname, '..', d, 'index.html')).href + q;
const W = '#watch';
const txt = (p) => p.locator(W).innerText();

async function page(browser, d, q, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, ...opts });
  const p = await ctx.newPage(); p.errors = [];
  p.on('pageerror', (e) => p.errors.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error') p.errors.push(m.text()); });
  await p.goto(url(d, q)); return p;
}

async function finishSet(p) {   // очки команды A, пока не появится экран «Set … terminado»
  for (let i = 0; i < 6 && await p.locator(`[data-a="pt"]`).count(); i++) await p.click(`[data-a="pt"][data-t="a"]`);
}

test('Watch @390: Empezar (click, tap, Enter, Space) → матч', { skip }, async () => {
  const b = await chromium.launch();
  try {
    for (const how of ['click', 'tap', 'enter', 'space']) {
      const p = await page(b, 'watch-card-v3', '', how === 'tap' ? { hasTouch: true, isMobile: true } : {});
      const btn = p.locator(`[data-a="start"]`);
      assert.match(await txt(p), /Nuevo partido/);
      if (how === 'click') await btn.click(); else if (how === 'tap') await btn.tap();
      else { await btn.focus(); await p.keyboard.press(how === 'enter' ? 'Enter' : 'Space'); }
      assert.match(await txt(p), /Set 1 · 0-0/, how);
      assert.match(await txt(p), /saca /, how);
      assert.deepEqual(p.errors, [], how);
      await p.context().close();
    }
  } finally { await b.close(); }
});

test('Watch @390: Sorteo → ¿Quién saca? A → B → Atrás', { skip }, async () => {
  const b = await chromium.launch();
  try {
    const p = await page(b, 'watch-card-v3');
    await p.click(`[data-a="sorteo"]`);
    assert.match(await txt(p), /¿Quién saca\?[\s\S]*Pareja A/);
    await p.click(`[data-a="pick"][data-t="A"][data-k="1"]`);
    assert.match(await txt(p), /Pareja B/);
    await p.click(`[data-a="back"]`);
    assert.match(await txt(p), /Pareja A/);
    await p.click(`[data-a="pick"][data-t="A"][data-k="0"]`);
    await p.click(`[data-a="pick"][data-t="B"][data-k="0"]`);
    assert.match(await txt(p), /¿Qué pareja empieza\?/);
    await p.click(`[data-a="first"][data-t="A"]`);
    assert.match(await txt(p), /saca Ana/);
    assert.deepEqual(p.errors, []);
  } finally { await b.close(); }
});

test('Watch @390: Solo marcador → 6-0 → «Estad. · parcial»', { skip }, async () => {
  const b = await chromium.launch();
  try {
    const p = await page(b, 'watch-card-v3');
    await p.click(`[data-a="start"]`);
    await p.click(`[data-a="pt"][data-t="a"]`);            // немного записанной статистики
    await p.click(`[data-a="asksolo"]`);
    assert.match(await txt(p), /¿Solo marcador\?/);
    await p.click(`[data-a="solook"]`);
    assert.match(await txt(p), /Solo marcador/);
    await p.click('#skip');                            // 5-0
    await finishSet(p);
    assert.match(await txt(p), /Set 1 terminado/);
    assert.equal(await p.locator(`[data-a="stats"]`).count(), 0, 'без записи в сете статистика не видна, если нет сохранённого');
  } finally { await b.close(); }
});

test('Watch @390: кнопка «Estad. · parcial» после матча со Solo marcador', { skip }, async () => {
  const b = await chromium.launch();
  try {
    const p = await page(b, 'watch-card-v3');
    await p.click(`[data-a="start"]`);
    await p.click(`[data-a="pt"][data-t="a"]`);
    await p.click(`[data-a="asksolo"]`); await p.click('[data-a="solook"]');
    for (let set = 0; set < 2; set++) {
      await p.click('#skip'); await finishSet(p);
      if (set === 0) await p.click(`[data-a="next"]`);
    }
    assert.match(await txt(p), /Partido terminado/);
    const s = p.locator(`[data-a="stats"]`);
    assert.match(await s.innerText(), /Estad\. · parcial/);
    await s.click();
    assert.match(await txt(p), /Estadísticas/);
    assert.match(await txt(p), /parcial/);
    assert.deepEqual(p.errors, []);
  } finally { await b.close(); }
});

test('Paddi @390: ?state=chip показывает чип, X скрывает весь контейнер', { skip }, async () => {
  const b = await chromium.launch();
  try {
    const p = await page(b, 'paddi-look', '?state=chip');
    const chip = p.locator('#chipb');
    assert.equal(await chip.isVisible(), true);
    assert.match(await chip.innerText(), /Del chat «Pádel Sitges»/);
    await p.click('#chipx');
    assert.equal(await p.locator('#chipw').count(), 0);
    assert.equal(await p.locator('#chipb').count(), 0);
    assert.equal(await p.locator('#chipx').count(), 0);
    assert.equal(await p.locator('#chipslot').evaluate((e) => e.childElementCount), 0);
    assert.equal(await p.locator('#chipslot').evaluate((e) => e.getBoundingClientRect().height), 0);
    assert.deepEqual(p.errors, []);
  } finally { await b.close(); }
});
