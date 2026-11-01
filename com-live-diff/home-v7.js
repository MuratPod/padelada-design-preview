// Homepage v7. Text comes from the rendered i18n template, never a second copy in JS.
(function () {
  let reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reveals = Array.from(document.querySelectorAll('.r'));
  let observer;
  if ('IntersectionObserver' in window && !reduced.matches) {
    let fallbackTimer = setTimeout(function () {
      try {
        reveals.forEach(function (el) {
          if (!el.classList.contains('in')) {
            el.classList.add('in');
            if (observer) observer.unobserve(el);
          }
        });
        document.documentElement.classList.add('motion-ready');
      } catch (e) {
        reveals.forEach(function (el) { el.classList.add('in'); });
      }
    }, 300);

    // A late reveal (the safety net below, a block that is already mostly on screen when the observer reports it,
    // or any reveal during a fast flick) fades in over 0.3s with no stagger delay instead of 1s.
    // The class is dropped once the fade is done, so the parallax transform keeps its usual smoothing.
    function revealLate(el) {
      el.classList.add('r-fast', 'in');
      setTimeout(function () { el.classList.remove('r-fast'); }, 400);
    }
    function mostlyOnScreen(entry) {
      let box = entry.boundingClientRect.height;
      let fit = Math.min(box, window.innerHeight);
      // ...and well past the lower edge: a calm 120px wheel step brings a short paragraph fully in, which is
      // still an ordinary reveal; a block whose top is already 200px above the bottom edge was skipped over.
      return fit > 0 && entry.intersectionRect.height >= fit * 0.5 && entry.boundingClientRect.top < (entry.rootBounds ? entry.rootBounds.height : window.innerHeight) - 200;
    }
    // A fast flick (over 2.5 px/ms, i.e. a screen in ~0.3s) carries a block that has just entered at the bottom
    // to the middle of the screen before a 1s fade is done, so a reveal during such a flick is late too. Calm
    // reading (well under 1 px/ms) keeps the normal fade. Only scrollY and a timestamp are read: no layout.
    let lastY = window.scrollY;
    let lastT = performance.now();
    let lastFast = -1e9;
    window.addEventListener('scroll', function () {
      let t = performance.now();
      let y = window.scrollY;
      if (t > lastT && Math.abs(y - lastY) / (t - lastT) > 2.5) lastFast = t;
      lastY = y;
      lastT = t;
    }, { passive: true });
    // The flick counts until 0.4s after its last fast frame, which covers the slow tail of momentum scrolling.
    function flicking() {
      return performance.now() - lastFast < 400;
    }
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (document.documentElement.classList.contains('motion-ready') && (mostlyOnScreen(entry) || flicking())) revealLate(entry.target);
          else entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    // Reveal as soon as the first pixel of a block enters the screen. With a 12% threshold a 650px phone stayed
    // invisible until ~80px of it were on screen (plus its 32px offset), so tall rows read as an empty strip.
    }, { threshold: 0, rootMargin: '0px 0px 0px 0px' });
    reveals.forEach(function (el) { observer.observe(el); });

    // Safety net for IntersectionObserver missing an entry during a fast flick (seen in WebKit): once scrolling
    // settles (scrollend, or 120ms without scroll events where scrollend is missing) and once 1.5s after load,
    // reveal every block that is still hidden and has already reached the screen. One rAF per check, and only
    // the still-hidden blocks are measured, so a page that is fully revealed costs nothing.
    let pending = reveals.slice();
    let checkQueued = false;
    let settleTimer = 0;
    function revealReached() {
      checkQueued = false;
      if (!pending.length) return;
      let vh = window.innerHeight;
      let reached = pending.filter(function (el) {
        return !el.classList.contains('in') && el.getBoundingClientRect().top < vh;
      });
      reached.forEach(function (el) {
        revealLate(el);
        observer.unobserve(el);
      });
      pending = pending.filter(function (el) { return !el.classList.contains('in'); });
      if (!pending.length) {
        window.removeEventListener('scrollend', queueCheck);
        window.removeEventListener('scroll', onScrollSettle);
      }
    }
    function queueCheck() {
      if (checkQueued) return;
      checkQueued = true;
      requestAnimationFrame(revealReached);
    }
    function onScrollSettle() {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(queueCheck, 120);
    }
    if ('onscrollend' in window) window.addEventListener('scrollend', queueCheck, { passive: true });
    else window.addEventListener('scroll', onScrollSettle, { passive: true });
    if (document.readyState === 'complete') setTimeout(queueCheck, 1500);
    else window.addEventListener('load', function () { setTimeout(queueCheck, 1500); });

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        try {
          reveals.forEach(function (el) {
            if (!el.classList.contains('in')) {
              let rect = el.getBoundingClientRect();
              let zeroSize = rect.height === 0 && rect.width === 0;
              if (zeroSize || (rect.top < window.innerHeight && rect.bottom > 0)) {
                el.classList.add('in');
                if (observer) observer.unobserve(el);
              }
            }
          });
          document.documentElement.classList.add('motion-ready');
          clearTimeout(fallbackTimer);
        } catch (e) {
          reveals.forEach(function (el) { el.classList.add('in'); });
        }
      });
    });
  }
  let parallax = Array.from(document.querySelectorAll('[data-par]'));
  let header = document.querySelector('.mast');
  let scheduled = false;
  function frame() {
    scheduled = false;
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
    if (reduced.matches) return;
    parallax.forEach(function (el) {
      let rect = el.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > innerHeight + 100) return;
      let shift = (rect.top + rect.height / 2 - innerHeight / 2) * Number(el.dataset.par);
      shift = Math.max(-40, Math.min(40, shift));
      // The hero stage lives in a 36px scene gap. A negative shift lifts the
      // devices into the CTA (the clamp allows -40px), and a 200px scroll does
      // not bring that gap back. Keep this stage from moving upward.
      if (el.classList.contains('hero-stage')) shift = Math.max(0, shift);
      el.style.setProperty('--parallax', shift + 'px');
    });
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(frame); } }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  reduced.addEventListener('change', function () {
    if (reduced.matches) {
      if (observer) observer.disconnect();
      reveals.forEach(function (el) { el.classList.add('in'); });
      parallax.forEach(function (el) { el.style.removeProperty('--parallax'); });
    }
    schedule();
  });
  schedule();

  let shareButton = document.querySelector('[data-share]');
  let shareStatus = document.querySelector('.share-status');
  let shareTimer;
  if (shareButton) {
    shareButton.addEventListener('click', async function () {
      clearTimeout(shareTimer);
      if (shareStatus) shareStatus.textContent = '';
      shareButton.disabled = true;
      let url = document.querySelector('link[rel="canonical"]').href;
      try {
        if (navigator.share) {
          try {
            await navigator.share({ title: document.title, url: url });
            return;
          } catch (error) {
            if (error.name === 'AbortError') return;
          }
        }
        await navigator.clipboard.writeText(url);
        if (shareStatus) {
          shareStatus.textContent = shareStatus.dataset.copied;
          shareTimer = setTimeout(function () { shareStatus.textContent = ''; }, 3000);
        }
      } catch {
        if (shareStatus) shareStatus.textContent = shareStatus.dataset.error;
      } finally {
        shareButton.disabled = false;
      }
    });
  }

  let tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  let panel = document.querySelector('#format-panel');
  let formatCopy = document.querySelector('#format-copy');

  function dotsFor(cuarto) {
  if (cuarto && !cuarto.dataset.dots) {
    cuarto.dataset.dots = '1';
    let figures = Array.from(cuarto.querySelectorAll('figure'));
    let nav = document.createElement('div');
    nav.className = 'shot-dots';
    figures.forEach(function (figure, index) {
      let button = document.createElement('button');
      button.type = 'button';
      let caption = figure.querySelector('figcaption');
      button.setAttribute('aria-label', caption ? caption.textContent : String(index + 1));
      button.addEventListener('click', function () {
        let left = figure.getBoundingClientRect().left - cuarto.getBoundingClientRect().left + cuarto.scrollLeft;
        cuarto.scrollTo({ left: left, behavior: reduced.matches ? 'auto' : 'smooth' });
      });
      nav.appendChild(button);
    });
    cuarto.after(nav);
    let mark = function () {
      let edge = cuarto.getBoundingClientRect().left;
      let best = 0;
      let bestDist = Infinity;
      figures.forEach(function (figure, index) {
        let dist = Math.abs(figure.getBoundingClientRect().left - edge);
        if (dist < bestDist) { bestDist = dist; best = index; }
      });
      Array.from(nav.children).forEach(function (button, index) {
        button.classList.toggle('on', index === best);
        button.setAttribute('aria-current', index === best ? 'true' : 'false');
      });
    };
    cuarto.addEventListener('scroll', mark, { passive: true });
    mark();
  }
  }
  dotsFor(document.querySelector('#cuarto .shots'));
  dotsFor(document.querySelector('#chats .shots'));

  if (panel && formatCopy) {
    let copy = Array.from(formatCopy.content.querySelectorAll('span')).map(function (el) { return el.textContent; });
    function select(index, focus) {
      tabs.forEach(function (tab, i) {
        tab.classList.toggle('on', i === index);
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
      });
      panel.textContent = copy[index];
      panel.setAttribute('aria-labelledby', tabs[index].id);
      if (focus) tabs[index].focus();
    }
    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () { select(index, false); });
      tab.addEventListener('keydown', function (event) {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { event.preventDefault(); select(next, true); }
      });
    });
  }
})();
