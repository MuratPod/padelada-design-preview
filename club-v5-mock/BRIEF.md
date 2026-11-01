# Padelada.club — v5 (с нуля). Бриф Design

## Почему v4 провалился
- Сетка одинаковых карточек (3 входа = 3 плитки, комарки = плитки, кабинет = плитки) → ощущается как ИИ-шаблон.
- Нет одной сильной идеи на экран, всё одного веса, мелкий шрифт, нет кинематографичных моментов.

## Новое направление
- Редакционная композиция в духе apple.com: огромная типографика (Montserrat Alternates 800), неравные секции, full-bleed фото ночного корта (официальные медиа club-prod), одна идея на остановку скролла.
- Главная: hero «Tu comarca. Tu pista.» на ночном корте → манифест, слова подсвечиваются при скролле → «¿Desde dónde llegas?» — один сегментированный выбор крупным текстом (Ya juego / Empiezo hoy / Vivo fuera) с одной панелью → типографский индекс комарок (на десктопе фото-превью при наведении) → full-bleed «Juega en cualquier comarca» (FAQ5) → гигантское «España.» = Padelada World → FAQ-аккордеон → футер.
- Кабинет: кинематографичная шапка комарки + sticky-rail; Falta uno = таймлайн с огромным временем и местами-инициалами; Torneos = горизонтальная лента разной ширины; Miembros = огромное число + «стена» инициалов-пилюль; профиль = полоса статистики.
- Fundador: слева sticky-заголовок золотом, справа 5 нумерованных обязанностей с «Lo asumo»; кнопка «Acepto» активна только после всех 5 → переход в app.
- Микро-взаимодействия: стрелки сдвигаются, press-scale, мягкие reveal; без свечений.

## Карта экранов
index · world · mapa · entrar (Google/Apple) · mi-comarca · no-miembro · cabina (4 секции + жалоба) · fundador-deberes · fundar-app (deep link padelada://fundar) · comarca (тизер)

## Запреты
Нет Plus/цен/наград/«gratis para siempre»; нет чата/Paddi в кабинете; основать комарку только через app; GPS на сайте нет; карта только Испания; World — только ES + заявка; на публичных — только инициалы; оранжевый CTA без тени; золото только для Fundador.

## 01.11 — v5.1 (курс Мурата: эволюция живого club-v3, не новый бренд)
- index.html = живой club-prod index (css/prod, media, assets, js/prod скопированы) + решения 01.11: «capitán» → Fundador (5 deberes, кнопка → fundador-deberes.html), основание только через app (fundar-app.html), добавлен блок Padelada World «Hoy, España.» + «Pedir mi país» → world.html, чат убран из описаний, Plus/цен нет.
- Палитра css/prod перекрашена в D4: бирюза #3DDBB0/#0F7A5E → золото Fundador #FFC963, #FFA62B → #FFB547, лиловый → muted; glow-слои скрыты.
- Прежний «кинематографичный» index сохранён как index-cinematic.html (gen.py пишет его) — альтернатива, не основная.
- Кабина: Falta uno = таймлайн (ближайший слот крупнее, чипы «Falta N» ink #24123A на accent), лента торнеос неравной ширины, стена участников; без чата/Paddi.
- Fundador: золотой прогресс-бар 0→5 в sticky-колонке, отмеченные деберы золотом; «Acepto» только после 5 → app.
- Entrar: Google + Apple, «Sin contraseñas nuevas». Карта: уточнённый контур Испании + Балеары (всё ещё схема — нужна реальная SVG позже).
- Скрины: shots/ (./shoot.sh page width fold|full).
- Остаётся: внутренние экраны (cabina/mi-comarca/fundador) ещё на токенах mock css/app.css (D4), не на классах club-prod — следующий шаг сблизить вёрстку.
**Статус: готово к показу Мурату на утверждение. Sites/preview/deploy не трогались.**

- (01.11 ~11:05) Лого: ракетка #3DDBB0 → #FFB547 (D4 accent); шар #FFA62B → #FFB547; wordmark на dark #FFF1EA → #F5F5F7. Переснят 390-index-fold.

## 01.11 — cabina на club-prod layout pass
- cabina / mi-comarca / fundador-deberes пересобраны на живых классах club-prod (css/prod/club.css+story.css+v3.css: mast, tile, btn, ghost, kicker, p, sub, foot) + тонкий слой css/prod/internal.css на токенах prod. css/app.css больше не используется этими страницами. Генератор: build_internal.py (gen.py эти 3 страницы больше не запускать — перезатрёт).
- Кабина: hero комарки (ночь/dark) → sticky-табы Falta uno/Torneos/Miembros/Mi perfil → таймлайн Falta uno, неравная лента торнеос, стена участников (инициалы), профиль; без чата/Paddi. Золото только Fundador.
- Зелёный вычищен: логотип/фавикон (#3DDBB0 ракетка → #FFB547), мяч на корте #E7F56A → #FFB547, бирюзовый glow в story.css → #FFB547.

## 01.11 12:15
- mapa.html: реальная SVG Испании (Natural Earth 1:50m, assets/map/build_spain.py → spain.svg), Балеары + врезка Канар, D4.
- Убраны оверлеи «mock v5» и MAQUETA-бар. Sticky «Acepto» (fundador) — z-index/граница/safe-area.
- comarca, entrar, fundar-app, world, mapa, no-miembro → классы club-prod (build_public.py + css/prod/public.css). gen.py не запускался.
- Уровни --lv0–4 в club.css без зелёного (muted→янтарь).
