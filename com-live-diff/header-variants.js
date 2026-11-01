// Шапка C (утверждена владельцем): группа «Padelada ▾» (Club Padelada, Torneo Padelada) и общее меню языка и темы.
// Меню «Ещё» убрано 18.10 (Мурат): его ссылки живут в подвале.
(function () {
  var root = document.documentElement;
  var variant = 'c';

  var mast = document.querySelector('.mast');
  var menu = document.getElementById('site-menu');
  if (!mast || !menu) return;

  var LANGS = ['es', 'ca', 'en', 'ru', 'uk'];
  var mq = window.matchMedia('(max-width: 899px)');

  var chevron = '<svg class="hv-chevron" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2.2 4.4 6 8l3.8-3.6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  // Thin globe (apple.com style) before the language code in the closed header.
  var globe = '<svg class="hv-globe" viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.1"><circle cx="8" cy="8" r="6.6"/><ellipse cx="8" cy="8" rx="2.9" ry="6.6"/><path d="M1.4 8h13.2M2.5 4.7h11M2.5 11.3h11"/></g></svg>';
  var checkSvg = '<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2.2 6.2 4.8 8.8 9.8 3.2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var langs = mast.querySelector('.langs');
  var langBtn = null;
  var langMenu = null;
  if (langs) {
    var label = langs.getAttribute('aria-label') || '';
    langBtn = document.createElement('button');
    langBtn.type = 'button';
    langBtn.className = 'hv-lang-btn';
    langBtn.setAttribute('aria-haspopup', 'true');
    langBtn.setAttribute('aria-expanded', 'false');
    langBtn.setAttribute('aria-controls', 'hv-lang-menu');
    if (label) langBtn.setAttribute('aria-label', label);
    langBtn.innerHTML = '<span class="hv-lang-code"></span>' + chevron;
    langMenu = document.createElement('div');
    langMenu.className = 'hv-lang-menu hv-pop';
    langMenu.id = 'hv-lang-menu';
    langMenu.hidden = true;
    var code = (root.getAttribute('lang') || 'es').toUpperCase();
    while (langs.firstChild) langMenu.appendChild(langs.firstChild);
    langMenu.querySelectorAll('a').forEach(function (a) {
      var raw = a.getAttribute('aria-label') || a.textContent || '';
      var parts = raw.split('·');
      var name = (parts[1] || parts[0] || '').trim();
      var short = (a.textContent || '').trim();
      a.textContent = '';
      var mark = document.createElement('span');
      mark.className = 'hv-check';
      mark.setAttribute('aria-hidden', 'true');
      if (a.getAttribute('aria-current') === 'page') mark.innerHTML = checkSvg;
      var nameEl = document.createElement('span');
      nameEl.className = 'hv-name';
      nameEl.textContent = name || short;
      a.append(mark, nameEl);
      if (name) a.setAttribute('aria-label', name);
      if (a.getAttribute('aria-current') === 'page' && short) code = short;
    });
    langBtn.querySelector('.hv-lang-code').textContent = code;
    langs.classList.add('hv-lang');
    langs.append(langBtn, langMenu);
    langMenu.hidden = false;
    langMenu.classList.remove('hv-pop');
  }

  var theme = mast.querySelector('.theme');
  if (theme && !theme.querySelector('.hv-theme-label')) {
    var themeLabel = document.createElement('span');
    themeLabel.className = 'hv-theme-label';
    themeLabel.textContent = theme.getAttribute('aria-label') || '';
    theme.appendChild(themeLabel);
    new MutationObserver(function () {
      themeLabel.textContent = theme.getAttribute('aria-label') || '';
    }).observe(theme, { attributes: true, attributeFilter: ['aria-label'] });
  }

  var homeNav = mast.querySelector('.home-sections');
  var nav = mast.querySelector('.launch-nav');

  // «Padelada ▾»: links marked data-group become one dropdown in place, so the row keeps its order.
  var moreBtn = null;
  var moreMenu = null;
  var moreWrap = null;
  if (variant === 'c' && nav) {
    var extras = nav.querySelectorAll('a[data-group]');
    if (extras.length) {
      var groupLabel = nav.getAttribute('data-group-label') || 'Padelada';
      moreWrap = document.createElement('div');
      moreWrap.className = 'hv-more hv-group';
      moreBtn = document.createElement('button');
      moreBtn.type = 'button';
      moreBtn.className = 'hv-more-btn';
      moreBtn.setAttribute('aria-haspopup', 'true');
      moreBtn.setAttribute('aria-expanded', 'false');
      moreBtn.setAttribute('aria-controls', 'hv-more-menu');
      moreBtn.innerHTML = '<span class="hv-more-label"></span>' + chevron;
      moreBtn.querySelector('.hv-more-label').textContent = groupLabel;
      var mobileLabel = document.createElement('span');
      mobileLabel.className = 'hv-group-label';
      mobileLabel.setAttribute('aria-hidden', 'true');
      mobileLabel.textContent = groupLabel;
      moreMenu = document.createElement('div');
      moreMenu.className = 'hv-more-menu hv-pop';
      moreMenu.id = 'hv-more-menu';
      moreMenu.setAttribute('role', 'group');
      moreMenu.setAttribute('aria-label', groupLabel);
      moreMenu.hidden = true;
      extras[0].parentNode.insertBefore(moreWrap, extras[0]);
      extras.forEach(function (a) { moreMenu.appendChild(a); });
      moreWrap.append(moreBtn, mobileLabel, moreMenu);
    }
  }

  var toolsBtn = null;
  var toolsMenu = null;
  if (variant === 'c' && langs && theme) {
    var controls = mast.querySelector('.controls');
    var tools = document.createElement('div');
    tools.className = 'hv-tools';
    toolsBtn = document.createElement('button');
    toolsBtn.type = 'button';
    toolsBtn.className = 'hv-tools-btn';
    toolsBtn.setAttribute('aria-haspopup', 'true');
    toolsBtn.setAttribute('aria-expanded', 'false');
    toolsBtn.setAttribute('aria-controls', 'hv-tools-menu');
    // «Язык: Русский» — in the page language, with the current language's own name.
    var current = langMenu && langMenu.querySelector('a[aria-current="page"]');
    var currentName = current ? (current.getAttribute('aria-label') || current.textContent || '').trim() : '';
    var langLabel = langs.getAttribute('aria-label') || '';
    if (langLabel || currentName) toolsBtn.setAttribute('aria-label', langLabel && currentName ? langLabel + ': ' + currentName : (langLabel || currentName));
    toolsBtn.innerHTML = globe + '<span class="hv-lang-code"></span>' + chevron;
    toolsBtn.querySelector('.hv-lang-code').textContent = langBtn.querySelector('.hv-lang-code').textContent;
    toolsMenu = document.createElement('div');
    toolsMenu.className = 'hv-tools-menu hv-pop';
    toolsMenu.id = 'hv-tools-menu';
    toolsMenu.hidden = true;
    tools.append(toolsBtn, toolsMenu);
    toolsMenu.append(langs, theme);
    if (controls) controls.appendChild(tools);
  }

  function setPop(pop, btn, open) {
    if (!pop || !btn || (pop === langMenu && variant === 'c')) return;
    if (mq.matches) {
      pop.hidden = false;
      pop.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      return;
    }
    pop.classList.toggle('is-open', open);
    pop.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function closePops() {
    setPop(langMenu, langBtn, false);
    setPop(toolsMenu, toolsBtn, false);
    setPop(moreMenu, moreBtn, false);
  }
  // Only one dropdown is open at a time.
  function openOnly(pop, btn, open) {
    if (open) [[langMenu, langBtn], [toolsMenu, toolsBtn], [moreMenu, moreBtn]].forEach(function (pair) {
      if (pair[0] !== pop) setPop(pair[0], pair[1], false);
    });
    setPop(pop, btn, open);
  }
  if (langBtn && langMenu) {
    langBtn.addEventListener('click', function () { openOnly(langMenu, langBtn, !!langMenu.hidden); });
  }
  if (toolsBtn && toolsMenu) {
    toolsBtn.addEventListener('click', function () { openOnly(toolsMenu, toolsBtn, !!toolsMenu.hidden); });
    // Keyboard as in «Padelada ▾»: ↓/↑ open and move (wrapping), Home/End, Tab out closes; Esc is handled below.
    var toolItems = function () { return Array.prototype.slice.call(toolsMenu.querySelectorAll('a, button')).filter(function (el) { return el.getClientRects().length > 0; }); };
    var focusTool = function (i) {
      var list = toolItems();
      if (list.length) list[(i + list.length) % list.length].focus({ preventScroll: true });
    };
    toolsBtn.addEventListener('keydown', function (event) {
      if (mq.matches || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) return;
      event.preventDefault();
      openOnly(toolsMenu, toolsBtn, true);
      focusTool(event.key === 'ArrowDown' ? 0 : -1);
    });
    toolsMenu.addEventListener('keydown', function (event) {
      if (mq.matches) return;
      var i = toolItems().indexOf(document.activeElement);
      if (event.key === 'ArrowDown') { event.preventDefault(); focusTool(i + 1); }
      else if (event.key === 'ArrowUp') { event.preventDefault(); focusTool(i - 1); }
      else if (event.key === 'Home') { event.preventDefault(); focusTool(0); }
      else if (event.key === 'End') { event.preventDefault(); focusTool(-1); }
    });
    toolsBtn.parentNode.addEventListener('focusout', function (event) {
      if (mq.matches) return;
      if (event.relatedTarget && !toolsBtn.parentNode.contains(event.relatedTarget)) setPop(toolsMenu, toolsBtn, false);
    });
  }
  if (moreBtn && moreMenu) {
    var hoverable = window.matchMedia('(hover: hover) and (pointer: fine)');
    var hoverOpened = 0;
    var leaveTimer = 0;
    var items = function () { return Array.prototype.slice.call(moreMenu.querySelectorAll('a')); };
    var focusItem = function (i) {
      var list = items();
      if (!list.length) return;
      list[(i + list.length) % list.length].focus({ preventScroll: true });
    };
    moreBtn.addEventListener('click', function () {
      // A click right after hover opened the menu keeps it open instead of closing it again.
      if (!moreMenu.hidden && Date.now() - hoverOpened < 400) return;
      openOnly(moreMenu, moreBtn, !!moreMenu.hidden);
    });
    moreWrap.addEventListener('mouseenter', function () {
      if (mq.matches || !hoverable.matches) return;
      clearTimeout(leaveTimer);
      if (moreMenu.hidden) { hoverOpened = Date.now(); openOnly(moreMenu, moreBtn, true); }
    });
    moreWrap.addEventListener('mouseleave', function () {
      if (mq.matches || !hoverable.matches) return;
      clearTimeout(leaveTimer);
      leaveTimer = setTimeout(function () {
        if (!moreWrap.contains(document.activeElement) || document.activeElement === moreBtn) setPop(moreMenu, moreBtn, false);
      }, 180);
    });
    moreBtn.addEventListener('keydown', function (event) {
      if (mq.matches) return;
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        openOnly(moreMenu, moreBtn, true);
        focusItem(event.key === 'ArrowDown' ? 0 : -1);
      }
    });
    moreMenu.addEventListener('keydown', function (event) {
      if (mq.matches) return;
      var list = items();
      var i = list.indexOf(document.activeElement);
      if (event.key === 'ArrowDown') { event.preventDefault(); focusItem(i + 1); }
      else if (event.key === 'ArrowUp') { event.preventDefault(); focusItem(i - 1); }
      else if (event.key === 'Home') { event.preventDefault(); focusItem(0); }
      else if (event.key === 'End') { event.preventDefault(); focusItem(-1); }
    });
    moreWrap.addEventListener('focusout', function (event) {
      if (mq.matches) return;
      if (event.relatedTarget && !moreWrap.contains(event.relatedTarget)) setPop(moreMenu, moreBtn, false);
    });
  }
  document.addEventListener('click', function (event) {
    if (mq.matches) return;
    [[langMenu, langBtn], [toolsMenu, toolsBtn], [moreMenu, moreBtn]].forEach(function (pair) {
      var pop = pair[0], btn = pair[1];
      if (!pop || pop.hidden || !btn) return;
      if (pop.contains(event.target) || btn.contains(event.target)) return;
      setPop(pop, btn, false);
    });
  });
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape' || mq.matches) return;
    var opened = (langMenu && !langMenu.hidden) || (toolsMenu && !toolsMenu.hidden) || (moreMenu && !moreMenu.hidden);
    if (!opened) return;
    var focus = moreMenu && !moreMenu.hidden ? moreBtn : (toolsMenu && !toolsMenu.hidden ? toolsBtn : langBtn);
    closePops();
    if (focus) focus.focus({ preventScroll: true });
  });

  var GAP = 24;
  function clash(navEl, left, right) {
    if (!navEl || !left || !right) return false;
    var n = navEl.getBoundingClientRect();
    var l = left.getBoundingClientRect();
    var r = right.getBoundingClientRect();
    if (n.width < 2 || l.width < 2 || r.width < 2) return false;
    return n.left < l.right + GAP || n.right > r.left - GAP;
  }
  var wasMobile = mq.matches;
  function syncSheets() {
    if (!mq.matches) return;
    if (langMenu && variant !== 'c') langMenu.hidden = false;
    if (toolsMenu) toolsMenu.hidden = false;
    if (moreMenu) moreMenu.hidden = false;
  }
  function fit() {
    root.classList.remove('hv-tight', 'hv-tighter', 'hv-logo-sm', 'hv-flow');
    if (mq.matches !== wasMobile) {
      wasMobile = mq.matches;
      closePops();
    }
    if (mq.matches) {
      var bar = mast.getBoundingClientRect().height;
      mast.style.setProperty('--bar', Math.ceil(bar) + 'px');
      syncSheets();
      return;
    }
    mast.style.removeProperty('--bar');
    var logo = mast.querySelector('.logo');
    var side = mast.querySelector('.controls');
    // Steps stay cumulative; the bar is measured again after each one.
    ['hv-tight', 'hv-tighter', 'hv-logo-sm', 'hv-flow'].some(function (step) {
      if (!clash(nav, logo, side)) return true;
      root.classList.add(step);
      return false;
    });
  }

  // Homepage scroll-spy: each story block lights the menu item it belongs to.
  // Hero, «Уровень», the clubs strip and anything unmapped light nothing.
  var spySections = ['inicio', 'cuarto', 'chats', 'nivel', 'club', 'torneo-padelada', 'reloj', 'formatos', 'clubs', 'pronto'];
  var spyTarget = {
    chats: function (h) { return /#chats$/.test(h); },
    reloj: function (h) { return /#(reloj|watch)$/.test(h); },
    formatos: function (h) { return /\/organizers\/?$/.test(h); },
    club: function (h) { return /\/club\/?$/.test(h); },
    'torneo-padelada': function (h) { return /\/torneo-padelada\/?$/.test(h); }
  };
  var spyLinks = [];
  mast.querySelectorAll('a[href]').forEach(function (a) { spyLinks.push(a); });
  var spyTick = false;
  function spy() {
    spyTick = false;
    if (homeNav) {
      var line = Math.max(mast.getBoundingClientRect().bottom + 2, window.innerHeight * 0.35);
      var current = '';
      spySections.forEach(function (id) {
        var section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= line) current = id;
      });
      var match = spyTarget[current];
      spyLinks.forEach(function (a) {
        var href = (a.getAttribute('href') || '').split('?')[0];
        a.classList.toggle('is-here', !!match && match(href));
      });
    }
    if (moreBtn && moreMenu) {
      var here = false;
      moreMenu.querySelectorAll('a').forEach(function (a) {
        if (a.classList.contains('is-here') || a.getAttribute('aria-current') === 'page') here = true;
      });
      moreBtn.classList.toggle('is-here', here);
    }
  }
  function onScroll() {
    if (spyTick) return;
    spyTick = true;
    requestAnimationFrame(spy);
  }

  root.classList.add('hv-ready');
  fit();
  spy();
  mq.addEventListener('change', fit);
  window.addEventListener('resize', fit);
  window.addEventListener('scroll', onScroll, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fit(); spy(); });
})();
