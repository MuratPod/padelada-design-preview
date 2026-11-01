// Язык сайта: первый язык браузера из списка сайта, иначе испанский.
// Ручной выбор (padelada.site.lang) важнее. Явный префикс в адресе не переписываем.
(function (global) {
  var LANGS = ['es', 'ca', 'en', 'ru', 'uk'];

  function preferred(languages, saved) {
    if (typeof saved === 'string' && LANGS.indexOf(saved) >= 0) return saved;
    var list = languages && languages.length ? languages : [];
    for (var i = 0; i < list.length; i++) {
      var tag = String(list[i] || '').toLowerCase().replace(/_/g, '-');
      var base = tag.split('-')[0];
      if (LANGS.indexOf(base) >= 0) return base;
    }
    return 'es';
  }

  // Пустая строка — остаться. Иначе полный адрес для replace.
  function target(pathname, search, hash, preferredLang) {
    var path = pathname || '/';
    var parts = path.split('/').filter(Boolean);
    if (parts.length && LANGS.indexOf(parts[0]) >= 0) return '';
    if (!preferredLang || preferredLang === 'es') return '';
    var rest = path.replace(/^\//, '');
    return '/' + preferredLang + '/' + rest + (search || '') + (hash || '');
  }

  global.PadeladaLang = { preferred: preferred, target: target };
})(typeof globalThis !== 'undefined' ? globalThis : this);
