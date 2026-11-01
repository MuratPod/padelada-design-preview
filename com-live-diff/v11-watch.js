// «Играйте с часами»: prev/next for the phone-width card carousel. Text stays in the template (i18n), none here.
(function () {
  const rail = document.querySelector('#reloj .w11-cards');
  if (!rail) return;
  const prev = document.querySelector('#reloj .w11-prev');
  const next = document.querySelector('#reloj .w11-next');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  function step() {
    const card = rail.querySelector('.w11-card');
    if (!card) return rail.clientWidth;
    return card.getBoundingClientRect().width + parseFloat(getComputedStyle(rail).columnGap || '0');
  }
  function sync() {
    const max = rail.scrollWidth - rail.clientWidth - 2;
    prev.disabled = rail.scrollLeft <= 2;
    next.disabled = rail.scrollLeft >= max;
  }
  function go(dir) { rail.scrollBy({ left: dir * step(), behavior: reduced.matches ? 'auto' : 'smooth' }); }
  prev.addEventListener('click', function () { go(-1); });
  next.addEventListener('click', function () { go(1); });
  rail.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync, { passive: true });
  sync();
})();
