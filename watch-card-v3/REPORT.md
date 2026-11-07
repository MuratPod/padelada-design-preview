# Watch Card v3 — отчёт (watch-card-v3-publish-20261107)

Источник: release `watch-card-v3-assets-20261107`, zip SHA256 `9877d5de…4ff8` (совпал), распакован программно. Базовый коммит main: 671e0cc.

## Что сделано
- `watch-card-v3/index.html` + `data.js` (hit-зоны из manifest, @2x) + 144 утверждённых PNG + 4 иллюстративных аватара. Без внешних зависимостей, только относительные пути.
- Рендер — утверждённые PNG; поверх — семантические `<button>` с aria-label по зонам manifest. Tab/Enter/Space, видимый фокус.
- Семь экранов, четыре размера (352×430, 396×484, 410×502, 422×514), фото/инициалы, обычные/длинные имена, счёт 30:15/40:40/AD:40/40:AD (для длинных имён в наборе есть только 30:15), выбор размера, масштаба, «Назад», «Начать заново», переход к экрану.
- Это симуляция: одно касание плитки завершает гейм; не подсчёт очков и не движок. Аватары — вымышленные ИИ-взрослые.
- Путь: 1→2→3→5→6→4→5→6→4→7→6→1 пройден кликами; тупиков нет (4-й заход в «выбор подающего» чередует 5/7).

## Проверки (Playwright/Chromium, сервер под `/padelada-design-preview/watch-card-v3/`)
- Все переходы и клавиатура — PASS (десктоп 1280 и мобильный 360 px).
- Все 4 размера × фото/инициалы × имена × 7 экранов: naturalWidth/Height совпадают с ожидаемыми, зоны есть — PASS.
- Счёт-варианты — выбираются нужные PNG; фолбэк при блокировке фото-PNG → инициалы + сообщение — PASS.
- 404 на ассеты: 0; ошибок JS: 0; горизонтального скролла нет.
- Скриншоты реального браузера: `qa-shots/`.

## Не проверено
Реальные Watch/устройства, читаемость с 2 м, Safari/Firefox, скринридеры (VoiceOver), GitHub Pages живьём (Pages не включались).
Публикуемое дерево (ветка watch-card-v3-pages): `.nojekyll` + `watch-card-v3/{index.html,data.js,png/*,assets/avatars/*}`; REPORT.md и qa-shots в публикацию не входят.

## watch-card-v3-fix1-20261107 (15:19 Madrid fix)
- Marker: watch-card-v3-fix1-20261107. DELTA zip SHA256 dace9db6…c326 verified; 80 PNG applied (48 new, 32 changed) → 192 PNG.
- Selected-seat court icon is dark #1B1530 (s1). Game default is 0:0, serve Right; explicit 0-0 for all 4 sizes × photo/initials × names/longnames.
- Long-name state images hooked (30:15, 40:40, AD:40, 40:AD); score selector now works for all name sets. All hotspots in data.js (192 entries).
- Playwright (Chromium, 390 and 1280 px): 4 sizes default image = s5_state-0-0, 2 hotspots each; 5 scores × 2 avatars × 2 names × 4 sizes all load; keyboard flow s1→s2→s3→s5→s6→s4→s5 works; no 4xx. Screenshots: qa-shots-v3fix1/.
- Not verified: real devices, real Watch readability; sheets not published. Disclaimers kept (fictional AI portraits, simulated score).
