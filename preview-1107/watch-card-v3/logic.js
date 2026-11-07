/* Padelada Watch — логика прототипа (чистый JS, без DOM). Не движок матча.
   Используется index.html и design-proto/tests. */
(function (root) {
  var SIZES = [
    { id: '41', w: 176, h: 215, label: '41 mm · 176×215' },
    { id: '45', w: 198, h: 242, label: '45 mm · 198×242' },
    { id: '49', w: 205, h: 251, label: 'Ultra · 205×251' },
    { id: 'u3', w: 211, h: 257, label: 'Ultra 3 · 211×257' }
  ];
  var PT = ['0', '15', '30', '40'];

  function newSt(tracked) { return { tracked: tracked, pa: 0, pb: 0, spa: 0, spb: 0 }; }

  function buildOrder(firstTeam, pickA, pickB) {
    var f = firstTeam === 'A' ? pickA : pickB, s = firstTeam === 'A' ? pickB : pickA;
    return [f, s, { t: f.t, k: 1 - f.k }, { t: s.t, k: 1 - s.k }];
  }

  function createEngine(rng) {
    rng = rng || Math.random;
    var S, hist;

    function fresh() {
      S = { scr: 'draw', mode: null, sets: [], g: { a: 0, b: 0 }, p: { a: 0, b: 0 },
        tb: false, tbn: 0, tbSi: 0, order: null, si: 0,
        pickA: null, pickB: null, pickFrom: 'draw', st: [newSt(true)] };
      hist = [];
    }
    function snap() { hist.push(JSON.stringify(S)); }
    function curSt() { return S.st[S.st.length - 1]; }
    function srvPl() { return S.order ? S.order[S.si % 4] : null; }
    function srvTeam() { var s = srvPl(); return s ? s.t : null; }
    function matchWinner() {
      var a = 0, b = 0; S.sets.forEach(function (s) { if (s.a > s.b) a++; else b++; });
      return a === 2 ? 'A' : b === 2 ? 'B' : null;
    }

    /* выбор подающих: «Empezar» и «Elegir saque» ведут сюда; дефолта A1→B1 нет */
    function beginPick(from) { S.scr = 'pickA'; S.pickA = null; S.pickB = null; S.pickFrom = from || 'draw'; }
    function start() { beginPick('draw'); }
    function repick() { beginPick('between'); }
    function trackFrom() { beginPick('between'); }
    function pick(team, k) {
      var p = { t: team, k: k };
      if (team === 'A') { S.pickA = p; S.pickB = null; S.scr = 'pickB'; }
      else { S.pickB = p; S.scr = 'first'; }
    }
    function chooseFirst(team) { finishPick(buildOrder(team, S.pickA, S.pickB)); }
    function finishPick(order) {
      S.order = order; S.si = 0; S.mode = 'track'; curSt().tracked = true;
      S.pickA = S.pickB = null; hist = []; S.scr = 'match';
    }
    /* «Sorteo»: случайный первый подающий; результат можно сменить («Cambiar») */
    function drawRandom() {
      var a = { t: 'A', k: rng() < 0.5 ? 0 : 1 }, b = { t: 'B', k: rng() < 0.5 ? 0 : 1 };
      var first = rng() < 0.5 ? 'A' : 'B';
      S.drawn = buildOrder(first, a, b); S.scr = 'drawn'; S.pickFrom = 'draw';
    }
    function acceptDraw() { var o = S.drawn; delete S.drawn; finishPick(o); }
    function changeDraw() { delete S.drawn; beginPick('draw'); }
    function soloFromStart() {
      S.mode = 'score'; S.order = null; curSt().tracked = false; S.scr = 'match';
    }
    /* Atrás: шаг назад, выбор шага, в который вернулись, сбрасывается */
    function back() {
      if (S.scr === 'first') { S.pickB = null; S.scr = 'pickB'; }
      else if (S.scr === 'pickB') { S.pickA = null; S.pickB = null; S.scr = 'pickA'; }
      else if (S.scr === 'pickA') { S.pickA = null; S.pickB = null; S.scr = S.pickFrom === 'between' ? 'between' : 'draw'; }
      else if (S.scr === 'drawn') { delete S.drawn; S.scr = 'draw'; }
    }

    /* отслеживание → «Solo marcador» только с подтверждением; обратно — с нового сета */
    function askSolo() { if (S.mode === 'track' && S.scr === 'match') S.scr = 'confirm'; }
    function cancelSolo() { if (S.scr === 'confirm') S.scr = 'match'; }
    function confirmSolo() {
      if (S.scr !== 'confirm') return;
      S.mode = 'score'; S.order = null; curSt().partial = true; hist = []; S.scr = 'match';
    }

    function point(t) {
      if (S.scr !== 'match') return;
      snap();
      var tr = S.mode === 'track', T = t.toUpperCase(), st = curSt();
      if (tr) { if (T === 'A') st.pa++; else st.pb++; if (srvTeam() === T) { if (T === 'A') st.spa++; else st.spb++; } }
      S.p[t]++;
      var a = S.p.a, b = S.p.b;
      if (S.tb) {
        S.tbn++;
        if (tr && S.tbn % 2 === 1) S.si++;   /* смена подачи: после 1-го, затем каждые 2 */
        if ((a >= 7 || b >= 7) && Math.abs(a - b) >= 2) gameTo(a > b ? 'a' : 'b', true);
      } else if ((a >= 4 || b >= 4) && Math.abs(a - b) >= 2) gameTo(a > b ? 'a' : 'b', false);
    }
    function gameTo(t, wasTb) {
      S.g[t]++; S.p = { a: 0, b: 0 };
      if (S.tb) { S.tb = false; S.tbn = 0; }
      if (S.mode === 'track' && !wasTb) S.si++;
      var a = S.g.a, b = S.g.b;
      if (wasTb || ((a >= 6 || b >= 6) && Math.abs(a - b) >= 2) || a === 7 || b === 7) endSet(wasTb);
      else if (a === 6 && b === 6) { S.tb = true; S.tbn = 0; S.tbSi = S.si; }
    }
    function endSet(wasTb) {
      S.sets.push({ a: S.g.a, b: S.g.b });   /* только счёт сета, без агрегатов по геймам */
      S.g = { a: 0, b: 0 }; S.tb = false;
      /* после тай-брейка первым подаёт тот, кто в нём принимал первым: следующий после его первого подающего */
      if (wasTb && S.mode === 'track') S.si = (S.tbSi + 1) % 4;
      S.st.push(newSt(S.mode === 'track'));
      S.scr = 'between';
    }
    function undo() { if (hist.length && S.scr === 'match') S = JSON.parse(hist.pop()); }
    function nextSet() { S.scr = 'match'; }
    function stats() { S.statsBack = S.scr; S.scr = 'stats'; }
    function closeStats() { S.scr = S.statsBack || 'match'; delete S.statsBack; }
    function canStats() { return S.mode === 'track'; }

    function demoJump(g) {
      if (S.scr === 'draw') { S.mode = 'track'; S.order = buildOrder('A', { t: 'A', k: 0 }, { t: 'B', k: 0 }); S.si = 0; S.scr = 'match'; }
      snap(); S.g = g; S.p = { a: 0, b: 0 }; S.tb = g.a === 6 && g.b === 6; S.tbn = 0; S.tbSi = S.si;
    }
    function ptTxt(t) {
      var a = S.p.a, b = S.p.b;
      if (S.tb) return '' + S.p[t];
      if (a >= 3 && b >= 3) return a === b ? '40' : ((a > b ? 'a' : 'b') === t ? 'AD' : '40');
      return PT[S.p[t]];
    }

    fresh();
    return { fresh: fresh, state: function () { return S; }, start: start, repick: repick, trackFrom: trackFrom, pick: pick,
      chooseFirst: chooseFirst, drawRandom: drawRandom, acceptDraw: acceptDraw, changeDraw: changeDraw,
      soloFromStart: soloFromStart, back: back, askSolo: askSolo, cancelSolo: cancelSolo, confirmSolo: confirmSolo,
      point: point, undo: undo, nextSet: nextSet, stats: stats, closeStats: closeStats, canStats: canStats,
      demoJump: demoJump, ptTxt: ptTxt, srvPl: srvPl, srvTeam: srvTeam, matchWinner: matchWinner, curSt: curSt };
  }

  var api = { createEngine: createEngine, SIZES: SIZES, buildOrder: buildOrder };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.WatchLogic = api;
})(typeof window !== 'undefined' ? window : globalThis);
