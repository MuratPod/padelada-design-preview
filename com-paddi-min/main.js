// Тема (светлая / тёмная, выбор запоминается) и подсказка языка (без автоперехода).
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* хранилище недоступно */ } },
  };

  var saved = store.get('padelada.site.theme');
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);

  // Язык: без автоперехода (24.10, Мурат). Страница всегда отдаётся на своём языке (/ — испанский).
  // Если язык браузера (или выбранный вручную) другой и есть на сайте — внизу маленькая плашка
  // на ЦЕЛЕВОМ языке («View in English?») со ссылкой на эту же страницу и крестиком; закрытие запоминается.
  var HINT = {
    es: { ask: '¿Ver en español?', close: 'Cerrar' },
    ca: { ask: 'Veure en català?', close: 'Tancar' },
    en: { ask: 'View in English?', close: 'Close' },
    ru: { ask: 'Смотреть по-русски?', close: 'Закрыть' },
    uk: { ask: 'Дивитися українською?', close: 'Закрити' },
  };
  var HINT_KEY = 'padelada.site.langHint.dismissed';
  function wantedLang() {
    var chosen = store.get('padelada.site.lang');
    if (chosen && HINT[chosen]) return chosen;
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < list.length; i++) {
      var base = String(list[i] || '').toLowerCase().replace(/_/g, '-').split('-')[0];
      if (HINT[base]) return base;
    }
    return null;
  }
  function langHint() {
    var page = (root.getAttribute('lang') || 'es').toLowerCase().split('-')[0];
    var want = wantedLang();
    if (!want || want === page || store.get(HINT_KEY) === want) return;
    var link = document.querySelector('.langs a[data-lang="' + want + '"]');
    if (!link || !link.getAttribute('href')) return;
    var t = HINT[want];
    var css = document.createElement('style');
    css.textContent =
      '.lang-hint{position:fixed;z-index:900;left:50%;bottom:calc(16px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);' +
      'display:flex;align-items:center;gap:4px;max-width:calc(100% - 32px);padding:4px 4px 4px 6px;border-radius:999px;' +
      'background:var(--inverse,#24123A);color:var(--on-inverse,#FFF1EA);box-shadow:0 8px 24px rgba(0,0,0,.25);font:600 15px/1.2 "Golos Text",system-ui,sans-serif}' +
      '.lang-hint a,.lang-hint button{color:inherit;min-height:40px;border-radius:999px;display:inline-flex;align-items:center}' +
      '.lang-hint a{padding:0 12px;text-decoration:underline;text-underline-offset:3px;white-space:nowrap}' +
      '.lang-hint button{justify-content:center;min-width:40px;padding:0;border:0;background:transparent;cursor:pointer}' +
      '.lang-hint a:focus-visible,.lang-hint button:focus-visible{outline:2px solid var(--brand-mango,#FFA62B);outline-offset:2px}' +
      '.lang-hint a:hover,.lang-hint button:hover{background:rgba(127,127,127,.22)}' +
      'body.nav-lock .lang-hint{display:none}@media print{.lang-hint{display:none}}';
    document.head.appendChild(css);
    var box = document.createElement('div');
    box.className = 'lang-hint';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', t.ask);
    box.setAttribute('lang', want);
    var a = document.createElement('a');
    a.href = link.getAttribute('href') + location.search + location.hash;
    a.setAttribute('hreflang', want);
    a.textContent = t.ask;
    a.addEventListener('click', function () { store.set('padelada.site.lang', want); });
    var x = document.createElement('button');
    x.type = 'button';
    x.setAttribute('aria-label', t.close);
    x.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
    x.addEventListener('click', function () {
      store.set(HINT_KEY, want);
      box.remove();
    });
    box.appendChild(a);
    box.appendChild(x);
    document.body.appendChild(box);
  }

  function isDark() {
    var t = root.getAttribute('data-theme');
    return t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  document.addEventListener('DOMContentLoaded', function () {
    langHint();
    var btn = document.querySelector('.theme');
    function label() { btn.setAttribute('aria-label', isDark() ? btn.dataset.labelLight : btn.dataset.labelDark); }
    if (btn) {
      label();
      btn.addEventListener('click', function () {
        var next = isDark() ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        store.set('padelada.site.theme', next);
        label();
      });
    }
    document.querySelectorAll('.langs a').forEach(function (a) {
      a.addEventListener('click', function () { store.set('padelada.site.lang', a.dataset.lang); });
    });

    var mast = document.querySelector('.mast');
    var opener = document.querySelector('.nav-open');
    var menu = document.getElementById('site-menu');
    if (!mast || !opener || !menu) return;
    var mq = window.matchMedia('(max-width: 1199px)');
    function setOpen(open) {
      mast.classList.toggle('is-open', open);
      opener.setAttribute('aria-expanded', open ? 'true' : 'false');
      opener.setAttribute('aria-label', open ? opener.dataset.labelClose : opener.dataset.labelOpen);
      document.body.classList.toggle('nav-lock', open);
    }
    opener.addEventListener('click', function () {
      var open = !mast.classList.contains('is-open');
      setOpen(open);
      if (open) {
        var first = menu.querySelector('a, button');
        if (first) first.focus({ preventScroll: true });
      }
    });
    menu.addEventListener('click', function (e) {
      if (mq.matches && e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && mq.matches && mast.classList.contains('is-open')) {
        var items = [opener].concat(Array.from(menu.querySelectorAll('a, button')));
        var first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      if (e.key === 'Escape' && mast.classList.contains('is-open')) {
        setOpen(false);
        opener.focus({ preventScroll: true });
      }
    });
    mq.addEventListener('change', function () { if (!mq.matches) setOpen(false); });
  });
})();

// Страница клуба (/club): поиск по списку членов с «Публичным профилем» — без учёта регистра и ударений.
document.addEventListener('DOMContentLoaded', function () {
  var input = document.querySelector('[data-club-search]');
  var list = document.querySelector('[data-club-list]');
  var empty = document.querySelector('[data-club-empty]');
  if (!input || !list || !empty) return;
  var norm = function (s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); };
  input.addEventListener('input', function () {
    var q = norm(input.value.trim());
    var shown = 0;
    list.querySelectorAll('li').forEach(function (li) {
      var ok = !q || norm(li.getAttribute('data-name') || '').indexOf(q) >= 0;
      li.hidden = !ok;
      if (ok) shown++;
    });
    var vacant = document.querySelector('[data-club-vacant]');
    empty.hidden = shown > 0 || list.querySelectorAll('li').length === 0;
    if (vacant) vacant.hidden = list.querySelectorAll('li').length > 0;
  });
});


// Static snapshots: filtering never fetches or exposes extra profiles in the browser.
document.addEventListener('DOMContentLoaded', function () {
  var help = document.querySelector('[data-help-search]');
  if (help) help.addEventListener('input', function () {
    var q = help.value.trim().toLocaleLowerCase();
    var count = 0;
    document.querySelectorAll('[data-help-article]').forEach(function (li) {
      li.hidden = !li.textContent.toLocaleLowerCase().includes(q);
      if (!li.hidden) count++;
    });
    document.querySelectorAll('[data-help-section]').forEach(function (section) {
      section.hidden = !Array.from(section.querySelectorAll('[data-help-article]')).some(function (li) { return !li.hidden; });
    });
    document.querySelector('[data-help-empty]').hidden = count > 0;
  });
  var form = document.querySelector('[data-tp-filters]');
  var source = document.getElementById('tp-data');
  document.querySelectorAll('[data-tp-retry], [data-champions-retry]').forEach(function (retry) {
    retry.addEventListener('click', function () { location.reload(); });
  });
  if (!form || !source) return;
  var data = null;
  try { data = JSON.parse(source.textContent); } catch (e) { data = null; }
  var emptyEl = document.querySelector('[data-tp-empty]');
  var errorEl = document.querySelector('[data-tp-error]');
  var problemEl = document.querySelector('[data-tp-problem]');
  var list = document.querySelector('[data-tp-table]');
  var value = form.elements.value;
  function showProblem(kind, keepRows) {
    if (emptyEl) emptyEl.hidden = true;
    if (!keepRows && list) { list.replaceChildren(); list.hidden = true; }
    if (errorEl && data) errorEl.textContent = kind === 'missing' ? data.viewMissing : data.loadError;
    if (problemEl) problemEl.hidden = false;
  }
  function showEmpty() {
    if (problemEl) problemEl.hidden = true;
    if (list) { list.replaceChildren(); list.hidden = true; }
    if (emptyEl) { if (data && data.empty) emptyEl.textContent = data.empty; emptyEl.hidden = false; }
  }
  function photoUrl(url) {
    return typeof url === 'string' && url.indexOf('https://') === 0 && url.indexOf(' ') < 0 ? url : '';
  }
  function initials(name) {
    return String(name).trim().split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0); }).join('').toUpperCase();
  }
  function showRows(rows) {
    if (problemEl) problemEl.hidden = true;
    if (emptyEl) emptyEl.hidden = true;
    if (!list) return;
    list.hidden = false;
    list.replaceChildren();
    var rules = new Intl.PluralRules(document.documentElement.lang);
    rows.forEach(function (r) {
      if (!r || typeof r !== 'object') return;
      var li = document.createElement('li');
      li.className = 'crow' + (r.name ? '' : ' anon');
      var place = document.createElement('span'); place.className = 'cpl'; place.textContent = r.place;
      var face;
      var src = photoUrl(r.photo);
      if (r.name && src) { face = document.createElement('img'); face.src = src; face.alt = ''; face.width = 44; face.height = 44; }
      else { face = document.createElement('span'); face.className = 'ini'; face.setAttribute('aria-hidden', 'true'); face.textContent = r.name ? initials(r.name) : '?'; }
      var who = document.createElement('span'); who.className = 'who';
      var name = document.createElement('b'); name.textContent = r.name || (data.labels && data.labels.anonymous) || ''; who.appendChild(name);
      if (r.city) { var city = document.createElement('span'); city.className = 'muted'; city.textContent = r.city; who.appendChild(city); }
      if (Number(r.finals) || Number(r.thirds)) {
        var meta = document.createElement('span'); meta.className = 'muted';
        meta.textContent = String(data.more || '').replace('{{f}}', String(Number(r.finals) || 0)).replace('{{t}}', String(Number(r.thirds) || 0));
        who.appendChild(meta);
      }
      var wins = document.createElement('span'); wins.className = 'cw';
      var n = document.createElement('b'); n.textContent = r.wins; wins.appendChild(n);
      var word = document.createElement('span');
      var forms = data.wins || {};
      word.textContent = String(forms[rules.select(Number(r.wins))] || forms.other || '').replace('{{n}}', '').trim();
      wins.appendChild(word);
      li.append(place, face, who, wins);
      list.appendChild(li);
    });
  }
  if (!data || !Array.isArray(data.tables)) { showProblem('load', true); return; }
  function options() {
    var scope = form.elements.scope.value;
    var box = form.querySelector('[data-filter-value]');
    value.replaceChildren();
    if (scope === 'all') { box.hidden = true; return; }
    var items = scope === 'gender' ? ['M', 'F'] : scope === 'level' ? ['A', 'B', 'C'] : (data.cities || []);
    items.forEach(function (v) {
      var opt = document.createElement('option');
      opt.value = v;
      opt.textContent = (data.labels && data.labels[v]) || v;
      value.appendChild(opt);
    });
    box.hidden = items.length === 0;
  }
  form.elements.scope.addEventListener('change', options);
  options();
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var scope = form.elements.scope.value;
    var selected = scope === 'all' ? null : value.value;
    document.querySelector('[data-tp-season]').textContent = form.elements.season.selectedOptions[0].textContent;
    if (scope !== 'all' && !selected) { showProblem('missing', false); return; }
    var table = data.tables.find(function (t) {
      return t && t.season === form.elements.season.value && t.scope === scope && (scope === 'all' ? t.value == null : t.value === selected);
    });
    if (!table) { showProblem('missing', false); return; }
    if (!Array.isArray(table.rows)) { showProblem('load', false); return; }
    if (!table.rows.length) { showEmpty(); return; }
    showRows(table.rows);
  });
});

// Лёгкий сдвиг и масштаб картинок при прокрутке. Текст и экраны видны сразу.
// Без JS и при «уменьшить движение» картинка стоит на месте.
document.addEventListener('DOMContentLoaded', function () {
  var nodes = Array.prototype.slice.call(document.querySelectorAll('.film [data-parallax]'));
  if (!nodes.length) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var ticking = false;
  function place() {
    if (reduce.matches) {
      nodes.forEach(function (node) { node.style.transform = ''; });
      return;
    }
    var vh = window.innerHeight || 1;
    nodes.forEach(function (node) {
      var rect = node.getBoundingClientRect();
      var delta = (rect.top + rect.height / 2 - vh / 2) / vh;
      var shift = Math.max(-16, Math.min(16, delta * -22));
      var scale = 1 + Math.max(-0.025, Math.min(0.025, delta * -0.02));
      node.style.transform = 'translate3d(0,' + shift.toFixed(1) + 'px,0) scale(' + scale.toFixed(3) + ')';
    });
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; place(); });
  }
  function arm() {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (reduce.matches) {
      nodes.forEach(function (node) { node.style.transform = ''; });
      return;
    }
    place();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }
  arm();
  reduce.addEventListener('change', arm);
});


// Мягкое свечение под пальцем: только тач, только интерактивные элементы, без мыши и при reduced-motion.
// Свечение — дочерний span под контентом (z-index:-1 в изолированном контексте), раскладку не двигает.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var TARGET = 'a[href],button,summary,[role=button],[role=switch],[role=tab],label[for]';
  var glow = null;

  function isDark() {
    var t = document.documentElement.getAttribute('data-theme');
    return t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function drop(el) {
    if (el.parentNode) el.parentNode.removeChild(el);
  }

  function fade() {
    if (!glow) return;
    var el = glow;
    glow = null;
    el.style.transition = 'opacity 300ms ease-out';
    el.style.opacity = '0';
    setTimeout(function () { drop(el); }, 340);
  }

  document.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'touch' || reduce.matches || !e.isPrimary) return;
    var host = e.target.closest && e.target.closest(TARGET);
    if (!host || host.disabled || host.getAttribute('aria-disabled') === 'true') return;
    var cs = getComputedStyle(host);
    if (cs.display === 'inline' || cs.display === 'contents' || cs.display === 'none') return;
    var r = host.getBoundingClientRect();
    if (!r.width || !r.height) return;
    if (glow) { drop(glow); glow = null; }
    var dark = isDark();
    var rootStyle = getComputedStyle(document.documentElement);
    var color = dark ? '#FFB547' : (rootStyle.getPropertyValue('--accent').trim() || rootStyle.getPropertyValue('--brand-coral').trim() || '#FF5E5B');
    var radius = Math.round(Math.min(r.width, r.height) * 1.2);
    var x = Math.round(e.clientX - r.left);
    var y = Math.round(e.clientY - r.top);
    if (cs.position === 'static') host.style.position = 'relative';
    host.style.isolation = 'isolate';
    var el = document.createElement('span');
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = 'position:absolute;top:0;right:0;bottom:0;left:0;z-index:-1;pointer-events:none;border-radius:inherit;opacity:0;transition:opacity 80ms ease-out;' +
      'background:radial-gradient(circle ' + radius + 'px at ' + x + 'px ' + y + 'px,' + color + ' 0,transparent 100%)';
    host.appendChild(el);
    glow = el;
    requestAnimationFrame(function () { el.style.opacity = dark ? '.28' : '.2'; });
  }, { passive: true });

  ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (n) {
    document.addEventListener(n, function (e) { if (e.pointerType === 'touch') fade(); }, { passive: true });
  });
  window.addEventListener('scroll', fade, { passive: true, capture: true });
  window.addEventListener('touchmove', fade, { passive: true });
})();
