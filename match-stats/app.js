(function () {
  'use strict';
  var D = window.MATCH, HOT = window.HOT;
  var $app = document.getElementById('app');
  var P = D.players;
  var GEN = { 'Ана': 'Аны', 'Лео': 'Лео', 'Мурат': 'Мурата', 'Карлос': 'Карлоса' };
  var INS = { 'Ана': 'Аной', 'Лео': 'Лео', 'Мурат': 'Муратом', 'Карлос': 'Карлосом' };
  var MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  var DEFS = [
    ['mvp', 'MVP', '2×геймы на своей подаче + 3×реализованные брейк-пойнты (на приёме) + 1.5×спасённые брейк-пойнты + 0.1×выигранные очки (подача+приём) + 0.5×очки на подаче в тай-брейке + 3 за победу пары. Считается по каждому игроку; максимум — MVP.'],
    ['turn', 'Поворотный момент', 'Первый брейк будущего победителя в решающем сете, сделанный при отставании в счёте.'],
    ['comeback', 'Камбэк', 'Пара выиграла сет, в котором уступала два гейма или больше.'],
    ['bp', 'Брейк-пойнт', 'Очко, выиграв которое принимающая пара берёт гейм соперника. Реализовано ≤ всего шансов.'],
    ['deuce', '«Ровно» / «больше»', 'Гейм, дошедший до 40:40. «Больше» — очко после ровно; реализовано — гейм взят с «больше».'],
    ['load', 'Нагрузка относительно нормы', 'TRIMP (пульс × время) этого матча ÷ среднее за 8 ваших прошлых матчей. 100% — ваша обычная нагрузка. Это не оценка старания.'],
    ['recovery', 'Восстановление', 'Доля пауз между очками, в которых пульс за 20 секунд упал на 12 уд/мин или больше.'],
    ['sensors', 'Датчики', 'Пульс, калории, дистанция и рывки — оценки по датчикам часов, не медицинские данные. Максимальный пульс — оценка по возрасту.'],
    ['rating', 'Рейтинг компании', 'Таблица вымышленной компании по демо-истории матчей: сначала очки, затем разница геймов. Это демо-данные, не реальный рейтинг.']
  ];
  var state = { filter: 'all', sheet: null, opener: null };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function av(id) { return 'assets/avatar_player' + id + '_illustrative.jpg'; }
  function pct(a, b) { return Math.round(a * 100 / b); }
  function fmtDur(s) { var m = Math.round(s / 60); return Math.floor(m / 60) + ' ч ' + (m % 60) + ' мин'; }

  /* ---------- routing ---------- */
  function parse() {
    var h = (location.hash || '#/list').replace(/^#\/?/, '').split('/');
    return { screen: h[0] || 'list', arg: h[1] || '' };
  }
  function go(h) { if (location.hash === h) render(); else location.hash = h; }
  window.addEventListener('hashchange', function () { state.sheet = null; render(); });

  function toast(msg) {
    var old = document.querySelector('.toast'); if (old) old.remove();
    var t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2600);
  }

  /* ---------- chrome ---------- */
  var SHARE_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3M8 7l4-4 4 4M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg>';
  function chrome(backLabel, title, backHash) {
    return '<div class="status" aria-hidden="true"><span>20:41</span><span>●●● ▮</span></div>' +
      '<div class="nav"><button class="back" data-go="' + backHash + '" aria-label="Назад: ' + esc(backLabel) + '">‹ ' + esc(backLabel) + '</button><div class="t">' + esc(title) + '</div>' +
      '<button class="share" data-go="#/share" aria-label="Карточка матча">' + SHARE_SVG + '</button></div>' +
      '<div class="banner" role="note">' + esc(D.meta.label) + '</div>';
  }
  var TABS = [['overview', 'Обзор'], ['players', 'Игроки'], ['timeline', 'Ход матча'], ['company', 'Компания']];
  function tabs(cur) {
    return '<nav class="tabs" aria-label="Разделы матча">' + TABS.map(function (t) {
      return '<button data-go="#/' + t[0] + '"' + (t[0] === cur ? ' aria-current="page"' : '') + '>' + t[1] + '</button>';
    }).join('') + '</nav>';
  }

  /* ---------- PNG screens with hotspots ---------- */
  var LABELS = {
    back: 'Назад', share: 'Карточка матча', 'tab-0': 'Обзор', 'tab-1': 'Игроки', 'tab-2': 'Ход матча', 'tab-3': 'Компания',
    'def-mvp': 'Как считаем MVP', 'def-turn': 'Как считаем поворотный момент', 'open-timeline-turn': 'Показать поворотный гейм в ходе матча',
    'def-comeback': 'Как считаем камбэк', 'open-share': 'Открыть карточку матча', 'def-rating': 'Как считаем рейтинг',
    'player-1': 'Открыть статистику: Ана', 'player-2': 'Открыть статистику: Лео', 'player-3': 'Открыть статистику: Мурат', 'player-4': 'Открыть статистику: Карлос',
    'share-send': 'Отправить в чат компании (демо)', 'share-save': 'Сохранить картинку (демо)'
  };
  var ALT = {
    overview: 'Обзор матча: победа 2:1 по сетам (6:4 3:6 7:6), MVP Мурат, поворотный момент, камбэк, карточка матча. Демо, вымышленные данные.',
    players: 'Четыре игрока матча: Мурат и Лео с данными часов, Ана и Карлос — без данных часов. Демо.',
    company: 'Вымышленная компания: рейтинг, форма, лучшие партнёры. Демо.',
    share: 'Превью карточки матча. Демо, без отправки.'
  };
  function sizeKey() {
    var w = Math.min(window.innerWidth, 430);
    return w <= 382 ? 'se' : (w <= 410 ? 'std390' : 'promax');
  }
  var FILE = { overview: '01_overview', players: '02_players', company: '06_company', share: '08_share_preview' };
  function actionFor(screen, id) {
    var m;
    if (id === 'back') return function () { go('#/list'); };
    if (id === 'share' || id === 'open-share') return function () { go('#/share'); };
    if ((m = /^tab-(\d)$/.exec(id))) return function () { go('#/' + TABS[+m[1]][0]); };
    if ((m = /^def-(.+)$/.exec(id))) return function (e) { openSheet(m[1], e.currentTarget); };
    if (id === 'open-timeline-turn') return function () { go('#/timeline/turn'); };
    if ((m = /^player-(\d)$/.exec(id))) return function () { go('#/player/' + m[1]); };
    if (id === 'share-send') return function () { toast('Демо: отправка не выполняется'); };
    if (id === 'share-save') return function () { toast('Демо: картинка не сохраняется'); };
    return function () { };
  }
  function pngScreen(screen) {
    var sk = sizeKey(), cfg = HOT[screen][sk];
    var html = '<div class="pimg" data-screen="' + screen + '"><img src="png/' + FILE[screen] + '__' + sk + '__full.png" alt="' + esc(ALT[screen]) + '" width="' + cfg.w + '" height="' + cfg.h + '" draggable="false">';
    cfg.rects.forEach(function (r) {
      if (screen === 'share' && (r.id === 'back' || r.id === 'share')) { /* handled below */ }
      html += '<button class="hs" data-hs="' + r.id + '" aria-label="' + esc(LABELS[r.id] || r.id) + '"' +
        (/^tab-/.test(r.id) && TABS[+r.id.slice(4)][0] === screen ? ' aria-current="page"' : '') +
        ' style="left:' + (r.x / cfg.w * 100) + '%;top:' + (r.y / cfg.h * 100) + '%;width:' + (r.w / cfg.w * 100) + '%;height:' + (r.h / cfg.h * 100) + '%"></button>';
    });
    html += '</div>';
    $app.innerHTML = html;
    var hs = $app.querySelectorAll('.hs');
    for (var i = 0; i < hs.length; i++) (function (b) {
      var id = b.getAttribute('data-hs');
      b.addEventListener('click', function (e) {
        if (screen === 'share' && id === 'back') return go('#/overview');
        actionFor(screen, id)(e);
      });
    })(hs[i]);
  }

  /* ---------- list ---------- */
  function renderList() {
    var g = D.history.group, h = '<div class="status" aria-hidden="true"><span>20:41</span><span>●●● ▮</span></div>' +
      '<div class="nav"><span></span><div class="t">Матчи</div><span></span></div><div class="banner" role="note">' + esc(D.meta.label) + '</div><div class="pad">';
    var rs = D.result;
    h += '<h2 class="sec">7 ноября</h2><button class="mrow win" data-go="#/overview" aria-label="Открыть статистику матча 7 ноября">' +
      '<span class="d">7 ноя</span><span class="t">Мурат · Карлос<br><span class="note">против Ана · Лео</span></span><span class="sc2 num">' + rs.sets.join(' ') + '</span></button>';
    h += '<h2 class="sec">Прежние матчи</h2><p class="note" style="margin-top:-6px">' + esc(D.history.note) + '</p>';
    D.history.matches.forEach(function (m) {
      var dt = m.date.split('-'), name = function (ids) { return ids.map(function (i) { return g[i]; }).join(' · '); };
      h += '<button class="mrow" data-toast="В демо подробная статистика есть только у матча 7 ноября" aria-label="' + esc(+dt[2] + ' ' + MONTHS[+dt[1] - 1] + ': ' + name(m.pair_a) + ' против ' + name(m.pair_b)) + '">' +
        '<span class="d">' + (+dt[2]) + ' ' + MONTHS[+dt[1] - 1].slice(0, 3) + '</span><span class="t">' + esc(name(m.pair_a)) + '<br><span class="note">против ' + esc(name(m.pair_b)) + '</span></span><span class="sc2 num">' + m.sets.join(' ') + '</span></button>';
    });
    $app.innerHTML = h + '</div>';
  }

  /* ---------- player ---------- */
  function ring(frac, w) { return ''; }
  function tile(l, v, s, extra) { return '<div class="tile"><div class="l">' + l + '</div><div class="v num">' + v + '</div><div class="s">' + (s || '') + '</div></div>'; }
  function renderPlayer(id) {
    id = +id; if (!P[id]) id = 3;
    var p = P[id], st = D.players_stats[id], pair = D.pairs[p.pair], won = p.pair === D.result.winner;
    var partner = Object.keys(P).map(Number).filter(function (i) { return i !== id && P[i].pair === p.pair; })[0];
    var h = chrome('Матч', 'Игрок', '#/overview') + '<div class="picker" role="group" aria-label="Выбор игрока">';
    [3, 4, 1, 2].forEach(function (i) {
      h += '<button data-go="#/player/' + i + '" aria-pressed="' + (i === id) + '" aria-label="' + esc(P[i].name) + '"><img src="' + av(i) + '" alt=""></button>';
    });
    h += '<span class="cap">Игрок</span></div><div class="pad">';
    h += '<section class="card hero ' + p.pair + '" aria-label="Игрок"><img src="' + av(id) + '" alt="Вымышленный портрет: ' + esc(p.name) + '"><div><h1>' + esc(p.name) + '</h1><p>в паре с ' + INS[P[partner].name] + ' · ' + (won ? 'победа 2:1' : 'поражение 1:2') + '</p>' + (D.mvp.player === id ? '<span class="badge">MVP матча</span>' : '') + '</div></section>';
    h += '<h2 class="sec">Игра</h2><div class="grid">' +
      tile('Геймы на своей подаче', st.serve_games_won + ' из ' + st.serve_games, pct(st.serve_games_won, st.serve_games) + '%') +
      tile('Очки на подаче', st.serve_pts_won + ' из ' + st.serve_pts, pct(st.serve_pts_won, st.serve_pts) + '%') +
      tile('Брейк-пойнты на приёме', st.bp_converted + ' из ' + st.bp_chances, 'реализовано') +
      tile('Брейк-пойнты на подаче', st.bp_saved + ' из ' + st.bp_faced, 'спасено') +
      tile('Очки на приёме', st.ret_pts_won + ' из ' + st.ret_pts, pct(st.ret_pts_won, st.ret_pts) + '%') +
      tile('Решающие очки на подаче', st.decisive_serve_won + ' из ' + st.decisive_serve_pts, 'гейм- и брейк-пойнты') + '</div>';
    h += '<section class="card"><div class="kicker">«Ровно» и «больше» пары<button class="q" data-def="deuce" aria-label="Как считаем: ровно и больше"><span>?</span></button></div>' +
      '<div class="bar" role="img" aria-label="Выиграно ' + pair.deuce_games_won + ' из ' + pair.deuce_games + ' геймов"><i style="width:' + pct(pair.deuce_games_won, pair.deuce_games) + '%"></i></div>' +
      '<div class="row2"><span>Выиграно ' + pair.deuce_games_won + '</span><span>из ' + pair.deuce_games + ' геймов</span></div>' +
      '<p class="note" style="margin:10px 0 0">«Больше» реализовано: ' + pair.adv_converted + ' из ' + pair.adv_chances + '</p></section>';
    var w = D.watch[id];
    if (!p.watch || !w) {
      h += '<h2 class="sec">Часы Padelada</h2><section class="card" data-nowatch="1"><div class="kicker">Без данных часов</div><p style="margin:10px 0 0">У ' + GEN[p.name] + ' нет данных часов Padelada в этом матче, поэтому нагрузка и пульс не показываются. Это не нули — просто данных нет.</p></section>';
    } else {
      var ld = w.load_vs_baseline_pct, lw = ld > 105 ? 'Выше' : (ld < 95 ? 'Ниже' : 'Близко к');
      h += '<h2 class="sec">Нагрузка · часы Padelada<button class="q" data-def="sensors" aria-label="Как считаем: датчики"><span>?</span></button></h2>' +
        '<section class="card"><div class="kicker">Нагрузка относительно личной нормы<button class="q" data-def="load" aria-label="Как считаем: нагрузка"><span>?</span></button></div>' +
        '<div class="big">' + ld + '%</div><p class="note" style="margin:0">' + lw + ' вашей обычной нагрузки в 8 прошлых матчах (среднее = 100%). Это сравнение с собой, не оценка старания.</p></section>' +
        '<div class="grid">' +
        tile('Пульс средний', w.hr_avg + ' уд/мин') +
        tile('Пульс пиковый', w.hr_peak + ' уд/мин', 'на решающих очках ' + w.hr_peak_decisive) +
        tile('Калории', '≈' + w.kcal_est + ' ккал', 'оценка') +
        tile('Дистанция', '≈' + (w.meters_est / 1000).toFixed(1).replace('.', ',') + ' км', 'рывков ≈' + w.sprints_est) +
        tile('Восстановление', w.recovery_pct_points_drop_ge12 + '%', 'пауз, где пульс упал на 12+ уд/мин за 20 с') +
        tile('Падение за 20 с', String(w.recovery_avg_drop_bpm_20s).replace('.', ',') + ' уд/мин', 'в среднем между очками') + '</div>' +
        '<section class="card"><div class="kicker">Пульс по ходу матча</div>' + hrChart(w) + '<p class="note" style="margin:8px 0 0">Пунктир — границы зон от оценочного максимума ' + w.hr_max_est + ' уд/мин.</p></section>' +
        '<section class="card"><div class="kicker">Время в пульсовых зонах</div>' + zones(w) + '</section>' +
        '<p class="note">Пульс, калории, метры и рывки — оценки по датчикам часов, не медицинские показатели.</p>';
    }
    $app.innerHTML = h + '</div>';
  }
  function setStartMin(set) {
    var g = D.timeline.filter(function (t) { return t.set === set; })[0];
    return g.t_start_s / 60;
  }
  function hrChart(w) {
    var s = w.hr_series_per_min, n = s.length, W = 340, H = 170, L = 34, T = 14, B = 28, R = 6, lo = 90, hi = 190;
    var mx = Math.max.apply(null, s), mn = Math.min.apply(null, s); if (mx > hi) hi = Math.ceil(mx / 10) * 10; if (mn < lo) lo = Math.floor(mn / 10) * 10;
    var x = function (i) { return L + (W - L - R) * i / (n - 1); }, y = function (v) { return T + (H - T - B) * (hi - v) / (hi - lo); };
    var o = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Пульс по минутам: от ' + mn + ' до ' + mx + ' уд/мин, среднее ' + w.hr_avg + '">';
    [100, 130, 160, 190].forEach(function (v) { if (v >= lo && v <= hi) o += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(v) + '" y2="' + y(v) + '" stroke="#2B3553" stroke-dasharray="3 4"/><text x="' + (L - 4) + '" y="' + (y(v) + 5) + '" text-anchor="end">' + v + '</text>'; });
    [1, 2, 3].forEach(function (k) { var m = k === 1 ? 0 : setStartMin(k), xx = x(Math.min(m, n - 1)); o += (k > 1 ? '<line x1="' + xx + '" x2="' + xx + '" y1="' + T + '" y2="' + (H - B) + '" stroke="#4a557a"/>' : '') + '<text x="' + (xx + 4) + '" y="' + (T + 12) + '">С' + k + '</text>'; });
    o += '<polyline fill="none" stroke="#FF5E5B" stroke-width="2" stroke-linejoin="round" points="' + s.map(function (v, i) { return x(i).toFixed(1) + ',' + y(v).toFixed(1); }).join(' ') + '"/>';
    [0, 30, 60, 90].forEach(function (m) { if (m < n) o += '<text x="' + x(m) + '" y="' + (H - 6) + '" text-anchor="' + (m === 0 ? 'start' : 'middle') + '">' + m + '</text>'; });
    o += '<text x="' + (W - R) + '" y="' + (H - 6) + '" text-anchor="end">мин</text></svg>';
    return o;
  }
  function zones(w) {
    var tot = w.zones_min.reduce(function (a, b) { return a + b; }, 0), b = w.zone_bounds_pct, lab = ['<' + b[0] + '%', b[0] + '–' + b[1] + '%', b[1] + '–' + b[2] + '%', b[2] + '–' + b[3] + '%', '>' + b[3] + '%'];
    var col = ['#4a557a', '#5b8def', '#4BE3BA', '#FFA62B', '#FF5E5B'];
    return w.zones_min.map(function (m, i) { return '<div class="zone"><span>Зона ' + (i + 1) + ' ' + lab[i] + '</span><span class="tr"><i style="width:' + (m / tot * 100) + '%;background:' + col[i] + '"></i></span><b>' + m + ' мин</b></div>'; }).join('');
  }

  /* ---------- timeline ---------- */
  function gamesOf(set) { return D.timeline.filter(function (t) { return t.set === set; }); }
  function diffAfter(t) { var a = t.games_after.split(':'); return +a[0] - +a[1]; }
  function chartSvg(set) {
    var gs = gamesOf(set), n = gs.length, W = 340, H = 150, mid = 62, unit = 8;
    var maxd = Math.max.apply(null, gs.map(function (t) { return Math.abs(diffAfter(t)); }).concat([2]));
    unit = Math.min(10, 56 / maxd);
    var colW = (W - 10) / n, bw = Math.min(26, colW - 4);
    var o = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Разница в геймах по ходу сета ' + set + '">';
    o += '<line x1="0" x2="' + W + '" y1="' + mid + '" y2="' + mid + '" stroke="#2B3553"/>';
    gs.forEach(function (t, i) {
      var d = diffAfter(t), cx = 5 + colW * i + colW / 2, hgt = Math.max(2, Math.abs(d) * unit), yy = d > 0 ? mid - hgt : mid;
      var fill = d > 0 ? '#4BE3BA' : (d < 0 ? '#FF5E5B' : '#8a91a8');
      if (d === 0) { hgt = 3; yy = mid - 1.5; }
      o += '<rect data-game="' + t.id + '" data-diff="' + d + '" data-break="' + t.is_break + '" x="' + (cx - bw / 2).toFixed(1) + '" y="' + yy.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + hgt.toFixed(1) + '" rx="3" fill="' + fill + '"' + (t.is_break ? ' stroke="#fff" stroke-width="2"' : '') + '/>';
      o += '<text x="' + cx.toFixed(1) + '" y="' + (H - 24) + '" text-anchor="middle">' + t.game + '</text>';
    });
    return o + '</svg>';
  }
  function gameRow(t) {
    var tb = t.type === 'tiebreak', parts = [];
    if (tb) parts.push('Тай-брейк ' + (D.result.tiebreaks.filter(function (x) { return x.set === t.set; })[0] || {}).score);
    else { parts.push(t.is_break ? 'Брейк' : 'Взят на подаче'); if (t.deuce) parts.push('«ровно»'); if (t.break_points) parts.push('БП ' + t.break_points); }
    var tp = t.id === D.turning_point.id;
    return '<div class="game' + (tp ? ' tp' : '') + '" id="set' + t.set + '-game' + t.game + '" data-id="' + t.id + '" data-break="' + t.is_break + '"><span>' + t.game + '</span><img src="' + av(t.server) + '" alt=""><div><div class="a">' + esc(t.server_name) + ' подаёт</div><div class="b">' + parts.join(' · ') + '</div></div><span class="r ' + t.winner + '">' + t.games_after + '</span></div>' + (tp ? '<div class="tplabel">Поворотный момент</div>' : '');
  }
  function renderTimeline(arg) {
    if (arg === 'turn') { state.filter = 'all'; } else if (/^(all|set1|set2|set3|breaks)$/.test(arg)) state.filter = arg;
    var f = state.filter, rs = D.result;
    var h = chrome('Матч', 'Матч 7 ноября', '#/list') + tabs('timeline') + '<div class="pad">';
    var us = [3, 4], them = [1, 2];
    h += '<section class="card scorecard"><h1>Победа · 2:1 по сетам</h1>';
    [['us', us], ['them', them]].forEach(function (pr) {
      var idx = pr[0] === 'us' ? 0 : 1;
      h += '<div class="pairrow"><span class="av">' + pr[1].map(function (i) { return '<img src="' + av(i) + '" alt="">'; }).join('') + '</span><span class="nm">' + pr[1].map(function (i) { return P[i].name; }).join(' · ') + '</span><span class="sc num">' +
        rs.sets.map(function (s) { var a = s.split(':').map(Number), mine = a[idx], other = a[1 - idx]; return '<span class="' + (mine > other ? 'w' : 'l') + '">' + mine + '</span>'; }).join('') + '</span></div>';
    });
    h += '<p class="note" style="margin:8px 0 4px">Тай-брейк в 3-м сете — ' + rs.tiebreaks[0].score + '</p><p class="note" style="margin:0">⏱ ' + fmtDur(rs.duration_s) + ' · ' + rs.games_total + ' гейма · ' + D.points.length + ' очков</p></section>';
    h += '</div><div class="chips" role="group" aria-label="Фильтр хода матча">' + [['all', 'Все'], ['set1', 'Сет 1'], ['set2', 'Сет 2'], ['set3', 'Сет 3'], ['breaks', 'Брейки']].map(function (c) { return '<button data-filter="' + c[0] + '" aria-pressed="' + (f === c[0]) + '">' + c[1] + '</button>'; }).join('') + '</div><div class="pad" id="tl">';
    var sets = f === 'set1' ? [1] : f === 'set2' ? [2] : f === 'set3' ? [3] : [1, 2, 3];
    if (f === 'breaks') {
      var nb = D.timeline.filter(function (t) { return t.is_break; });
      h += '<p class="note" role="status" style="margin:12px 0 0">Брейков в матче: ' + nb.length + ' (ваша пара — ' + nb.filter(function (t) { return t.winner === 'us'; }).length + ', соперники — ' + nb.filter(function (t) { return t.winner === 'them'; }).length + '). Белая рамка на графике — брейк.</p>';
    }
    sets.forEach(function (s) {
      var gs = gamesOf(s), list = f === 'breaks' ? gs.filter(function (t) { return t.is_break; }) : gs;
      h += '<h2 class="setcap" data-set="' + s + '">Сет ' + s + ' · ' + rs.sets[s - 1] + '</h2><section class="card"><div class="kicker">Разница в геймах по ходу сета</div>' + chartSvg(s) + '<p class="note" style="margin:0">Вверх — ваша пара впереди. Белая рамка — брейк. По оси — номер гейма.</p></section><section class="card" aria-label="Геймы сета ' + s + '">' + list.map(gameRow).join('') + '</section>';
    });
    $app.innerHTML = h + '</div>';
    if (arg === 'turn') {
      var el = document.getElementById('set3-game9');
      if (el) { el.scrollIntoView({ block: 'center' }); el.classList.add('flash'); el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true }); }
    }
  }

  /* ---------- sheet ---------- */
  function openSheet(anchor, opener) {
    state.sheet = anchor; state.opener = opener || document.activeElement; drawSheet();
  }
  function drawSheet() {
    var old = document.getElementById('ov'); if (old) old.remove();
    if (!state.sheet) return;
    var ov = document.createElement('div'); ov.className = 'ov'; ov.id = 'ov';
    ov.innerHTML = '<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="shT"><div class="grab"></div><header><h2 id="shT">Как считаем</h2><button class="x" aria-label="Закрыть" data-close>✕</button></header>' +
      DEFS.map(function (d) { return '<section class="def' + (d[0] === state.sheet ? ' on' : '') + '" id="def-' + d[0] + '"><h3>' + d[1] + '</h3><p>' + d[2] + '</p></section>'; }).join('') + '</div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', function (e) { if (e.target === ov || e.target.hasAttribute('data-close')) closeSheet(); });
    var tgt = document.getElementById('def-' + state.sheet); if (tgt) tgt.scrollIntoView({ block: 'start' });
    ov.querySelector('[data-close]').focus({ preventScroll: true });
  }
  function closeSheet() {
    state.sheet = null; var o = document.getElementById('ov'); if (o) o.remove();
    if (state.opener && document.body.contains(state.opener)) state.opener.focus();
  }
  document.addEventListener('keydown', function (e) {
    if (!state.sheet) return;
    if (e.key === 'Escape') { closeSheet(); return; }
    if (e.key === 'Tab') {
      var f = document.querySelectorAll('#ov button'), a = f[0], b = f[f.length - 1];
      var s = document.querySelector('.sheet'); if (!s) return;
      if (document.activeElement && !document.getElementById('ov').contains(document.activeElement)) { e.preventDefault(); a.focus(); }
      else if (f.length === 1) e.preventDefault();
    }
  });

  /* ---------- main ---------- */
  function render() {
    var r = parse();
    closeSheet.call && (function () { var o = document.getElementById('ov'); if (o) o.remove(); })();
    var tt = document.querySelector('.toast'); if (tt) tt.remove();
    if (r.screen === 'list') renderList();
    else if (r.screen === 'player') renderPlayer(r.arg);
    else if (r.screen === 'timeline') renderTimeline(r.arg);
    else if (FILE[r.screen]) pngScreen(r.screen);
    else renderList();
    document.title = 'Padelada — статистика матча (демо)';
    if (!(r.screen === 'timeline' && r.arg === 'turn')) window.scrollTo(0, 0);
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-go],[data-def],[data-filter],[data-toast]'); if (!t) return;
    if (t.hasAttribute('data-go')) go(t.getAttribute('data-go'));
    else if (t.hasAttribute('data-def')) openSheet(t.getAttribute('data-def'), t);
    else if (t.hasAttribute('data-filter')) { state.filter = t.getAttribute('data-filter'); renderTimeline(state.filter); var b = document.querySelector('[data-filter="' + state.filter + '"]'); if (b) b.focus({ preventScroll: true }); history.replaceState(null, '', '#/timeline/' + state.filter); }
    else toast(t.getAttribute('data-toast'));
  });
  var lastKey = sizeKey();
  window.addEventListener('resize', function () { var k = sizeKey(); if (k !== lastKey) { lastKey = k; var r = parse(); if (FILE[r.screen]) pngScreen(r.screen); } });
  window.__MATCH_TEST = { state: state };
  render();
})();
