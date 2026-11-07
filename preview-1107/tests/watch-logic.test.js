const test = require('node:test');
const assert = require('node:assert/strict');
const { createEngine, SIZES } = require('../watch-card-v3/logic.js');

const A0 = { t: 'A', k: 0 }, A1 = { t: 'A', k: 1 }, B0 = { t: 'B', k: 0 }, B1 = { t: 'B', k: 1 };
const seq = (...v) => { let i = 0; return () => v[i++ % v.length]; };
function started(first = 'A', ka = 0, kb = 0) {
  const e = createEngine(); e.sorteo(); e.pick('A', ka); e.pick('B', kb); e.chooseFirst(first); return e;
}
const pts = (e, t, n) => { for (let i = 0; i < n; i++) e.point(t); };
const game = (e, t) => pts(e, t, 4);

test('«Sorteo» (manual) no fija A1→B1→A2→B2: primero se elige el saque', () => {
  const e = createEngine(); e.sorteo();
  assert.equal(e.state().scr, 'pickA'); assert.equal(e.state().order, null);
  e.pick('A', 1); assert.equal(e.state().scr, 'pickB');
  e.pick('B', 0); assert.equal(e.state().scr, 'first');
  e.chooseFirst('B');
  assert.deepEqual(e.state().order, [B0, A1, B1, A0]);
  assert.equal(e.state().scr, 'match');
});

test('cola de saque: cada game pasa al siguiente jugador', () => {
  const e = started('A', 0, 0);
  const who = [];
  for (let i = 0; i < 4; i++) { who.push(e.srvPl()); game(e, 'a'); }
  assert.deepEqual(who, [A0, B0, A1, B1]);
});

test('Atrás desde B borra la elección de A y la nueva no se acumula', () => {
  const e = createEngine(); e.sorteo(); e.pick('A', 0);
  e.back();
  assert.equal(e.state().scr, 'pickA'); assert.equal(e.state().pickA, null);
  e.pick('A', 1); e.pick('B', 1); e.chooseFirst('A');
  assert.deepEqual(e.state().order, [A1, B1, A0, B0]);
});

test('Atrás desde «primera pareja» borra B; desde A vuelve al menú', () => {
  const e = createEngine(); e.sorteo(); e.pick('A', 0); e.pick('B', 0);
  e.back(); assert.equal(e.state().scr, 'pickB'); assert.equal(e.state().pickB, null);
  e.back(); assert.equal(e.state().scr, 'pickA');
  e.back(); assert.equal(e.state().scr, 'draw'); assert.equal(e.state().mode, null);
});

test('Atrás en «Elegir saque» entre sets vuelve al descanso sin perder el orden', () => {
  const e = started(); pts(e, 'a', 0);
  for (let i = 0; i < 6; i++) game(e, 'a');
  assert.equal(e.state().scr, 'between');
  const order = e.state().order;
  e.repick(); e.back();
  assert.equal(e.state().scr, 'between'); assert.deepEqual(e.state().order, order);
});

test('«Empezar»: sorteo automático, entra directo al partido con seguimiento', () => {
  const e = createEngine(seq(0.9, 0.1, 0.9)); // A:k=1, B:k=0, primera pareja B
  e.start();
  assert.equal(e.state().scr, 'match'); assert.equal(e.state().mode, 'track');
  assert.deepEqual(e.state().order, [B0, A1, B1, A0]);
  assert.equal(e.curSt().tracked, true);
  const e2 = createEngine(seq(0.1, 0.9, 0.1)); e2.start(); // A0, B1, primera A
  assert.deepEqual(e2.state().order, [A0, B1, A1, B0]);
});

test('«Sorteo» no usa azar: nunca llama al generador y espera la elección manual', () => {
  let calls = 0; const e = createEngine(() => { calls++; return 0.5; });
  e.sorteo(); e.pick('A', 1); e.pick('B', 1); e.chooseFirst('A');
  assert.equal(calls, 0);
  assert.deepEqual(e.state().order, [A1, B1, A0, B0]);
});

test('«Sorteo» → «¿Quién saca?» → «Solo marcador»: solo puntos, sin saque', () => {
  const e = createEngine(); e.sorteo(); e.pick('A', 0); e.back(); // pickA tras Atrás
  e.soloFromStart();
  assert.equal(e.state().mode, 'score'); assert.equal(e.state().order, null);
  assert.equal(e.state().scr, 'match'); assert.equal(e.canStats(), false);
});

test('tie-break: saque 1-2-2-2 y el siguiente set empieza quien recibió primero', () => {
  const e = started('A', 0, 0);                // orden A0 B0 A1 B1
  for (let i = 0; i < 5; i++) { game(e, 'a'); game(e, 'b'); }
  game(e, 'a'); game(e, 'b');                  // 6-6
  const s = e.state();
  assert.equal(s.tb, true);
  assert.deepEqual(e.srvPl(), s.order[s.tbSi % 4]);
  const first = e.srvPl();
  const servers = [];
  for (let i = 0; i < 7; i++) { servers.push(e.srvPl()); e.point('a'); }
  // puntos 1..7 : X, Y, Y, Z, Z, W, W
  assert.equal(servers[0], first);
  assert.equal(servers[1], servers[2]); assert.equal(servers[3], servers[4]); assert.equal(servers[5], servers[6]);
  assert.notEqual(servers[0], servers[1]); assert.equal(e.state().scr, 'between');
  assert.equal(e.state().sets[0].a, 7);
  const expected = e.state().order[(s.tbSi + 1) % 4];
  assert.equal(e.srvPl(), expected);            // el que recibió primero en el tie-break
  assert.notEqual(e.srvPl(), first);
});

test('tie-break: sin importar cuántos puntos dure, el saque del set siguiente es el mismo', () => {
  const e = started('A', 0, 0);
  for (let i = 0; i < 5; i++) { game(e, 'a'); game(e, 'b'); }
  game(e, 'a'); game(e, 'b');
  const next = e.state().order[(e.state().tbSi + 1) % 4];
  for (let i = 0; i < 6; i++) { e.point('a'); e.point('b'); }  // 6-6
  e.point('a'); e.point('b'); e.point('a'); e.point('a');      // 9-7 largo
  assert.equal(e.state().scr, 'between');
  assert.equal(e.srvPl(), next);
});

test('set normal 6-x: el saque sigue la cola', () => {
  const e = started('A', 0, 0);
  for (let i = 0; i < 6; i++) game(e, 'a');   // 6 games -> si=6 -> índice 2
  assert.deepEqual(e.srvPl(), A1);
});

test('Solo marcador: pide confirmación y no cambia nada hasta confirmar', () => {
  const e = started(); pts(e, 'a', 2);
  e.askSolo(); assert.equal(e.state().scr, 'confirm'); assert.equal(e.state().mode, 'track');
  e.cancelSolo(); assert.equal(e.state().scr, 'match'); assert.equal(e.state().mode, 'track');
  assert.equal(e.state().p.a, 2);
  e.askSolo(); e.confirmSolo();
  assert.equal(e.state().mode, 'score'); assert.equal(e.state().order, null);
  assert.equal(e.state().p.a, 2);               // el marcador se conserva
  assert.equal(e.curSt().tracked, true);        // lo registrado se conserva
  assert.equal(e.curSt().partial, true);
  assert.equal(e.curSt().pa, 2);
});

test('Solo marcador: tracked → score conserva las estadísticas ya registradas y los puntos nuevos no las amplían', () => {
  const e = started(); pts(e, 'a', 2); pts(e, 'b', 1);
  const antes = JSON.stringify([e.curSt().pa, e.curSt().pb, e.curSt().spa, e.curSt().spb]);
  e.askSolo(); e.confirmSolo();
  pts(e, 'a', 3); pts(e, 'b', 2);
  const st = e.curSt();
  assert.equal(JSON.stringify([st.pa, st.pb, st.spa, st.spb]), antes);
  assert.equal(st.partial, true);
  assert.equal(e.state().mode, 'score');
});

test('Solo marcador: no hay vuelta al seguimiento a mitad de set ni deshacer hacia él', () => {
  const e = started(); pts(e, 'a', 2);
  e.askSolo(); e.confirmSolo();
  e.askSolo(); assert.equal(e.state().scr, 'match');   // no hay menú en score
  e.undo(); assert.equal(e.state().mode, 'score');
});

test('Solo marcador: al volver con «Seguir con saque» solo desde el set nuevo; Atrás no activa seguimiento', () => {
  const e = createEngine(); e.soloFromStart();
  for (let i = 0; i < 6; i++) game(e, 'a');
  assert.equal(e.state().scr, 'between');
  e.trackFrom(); e.back();
  assert.equal(e.state().mode, 'score'); assert.equal(e.state().scr, 'between');
  e.trackFrom(); e.pick('A', 0); e.pick('B', 0); e.chooseFirst('A');
  assert.equal(e.state().mode, 'track'); assert.equal(e.curSt().tracked, true);
  assert.equal(e.state().st[0].tracked, false);
});

test('Solo marcador: no guarda agregados de games ni ofrece estadísticas al final', () => {
  const e = createEngine(); e.soloFromStart();
  for (let s = 0; s < 2; s++) { for (let i = 0; i < 6; i++) game(e, 'a'); if (s === 0) e.nextSet(); }
  assert.equal(e.matchWinner(), 'A');
  assert.equal(e.canStats(), false);
  for (const st of e.state().st) {
    assert.equal(st.tracked, false);
    assert.deepEqual(Object.keys(st).sort(), ['pa', 'pb', 'spa', 'spb', 'tracked']);
    assert.equal(st.pa + st.pb + st.spa + st.spb, 0);
    assert.ok(!('sa' in st) && !('sb' in st));
  }
  assert.deepEqual(e.state().sets, [{ a: 6, b: 0 }, { a: 6, b: 0 }]);
});

test('seguimiento: con estadísticas disponibles', () => {
  const e = started(); game(e, 'a');
  assert.equal(e.canStats(), true);
  assert.equal(e.curSt().pa, 4); assert.equal(e.curSt().spa, 4);
});

test('Deshacer restaura puntos y saque', () => {
  const e = started(); game(e, 'a');
  const si = e.state().si; e.point('b'); e.undo();
  assert.equal(e.state().p.b, 0); assert.equal(e.state().si, si);
});

test('tamaños de reloj: 4, incluido Ultra 3 211×257', () => {
  assert.equal(SIZES.length, 4);
  const u3 = SIZES.find(s => s.id === 'u3');
  assert.deepEqual([u3.w, u3.h], [211, 257]);
});

test('Solo marcador a mitad de seguimiento: al final hay «Estadísticas · parcial» con solo lo guardado', () => {
  const e = started(); game(e, 'a'); game(e, 'b');
  e.askSolo(); e.confirmSolo();
  for (let s = 0; s < 2; s++) { for (let i = 0; i < 6; i++) game(e, 'a'); if (s === 0) e.nextSet(); }
  assert.equal(e.matchWinner(), 'A');
  assert.equal(e.canStats(), true);
  assert.equal(e.statsPartial(), true);
  assert.equal(e.state().st[0].pa, 4); assert.equal(e.state().st[0].pb, 4);
  assert.equal(e.state().st[1].tracked, false);
  assert.equal(e.state().st[1].pa + e.state().st[1].pb, 0);
});

test('matchs totalmente score-only: sin botón de estadísticas ni «parcial» de seguimiento', () => {
  const e = createEngine(); e.soloFromStart();
  for (let s = 0; s < 2; s++) { for (let i = 0; i < 6; i++) game(e, 'a'); if (s === 0) e.nextSet(); }
  assert.equal(e.canStats(), false);
});
