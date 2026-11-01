# Padelada · облегчённый веб — web-lite v2 (интерактивный прототип)
01.11.2026 · **Статус: ready for Murat approval** · тема D4 тёмная · UI только ES · локально, ничего не опубликовано

## Почему v1 отклонён и что исправлено
Мурат: «халтура» — v1 выглядел как сайт: index-карта с плитками-ссылками, текстовые списки, тонкий CSS.
1. **Нет страницы-карты.** Вход — сразу экран диплинка (match/torneo/club/chat), как будто пришёл из WhatsApp (плашка «Abierto desde WhatsApp»). `_lab.html` — голый список «solo laboratorio», не продукт.
2. **Единая оболочка телефона:** статус-бар, nav с шевроном назад + переключатель ES·CA·EN·RU·UK, большой заголовок, липкий dock с safe-area и home-индикатором.
3. **Настоящие app-паттерны:** строки игроков с аватарами + чипы уровня V8, корт 2×2 с пустым местом «Tu sitio», VS-пары в турнире, сегменты (Inscritos/Cuadro/Normas, Partidos/Torneos/Muro), прогресс плазы, bottom sheets.
4. **Кабинет орга = консоль:** сайдбар с иконками, топбар с действиями, KPI, таблицы со статус-пилюлями, empty state, расписание, копирование ссылки.
5. **Всё кликается:** `css/app.css` (токены, type scale, ~180 плотных строк) + `js/app.js` (тосты, сегменты, OTP-флоу, «Marcar pagado», клики по строкам таблиц, back).

## Карта экранов и переходы
- `match.html` — Falta uno, сб 7 nov 19:30, Pàdel Sabadell pista 3. Unirse/«Tu sitio» → `gate-otp.html` (Google/Apple/WA→Paddi); Abrir en la app → `onboarding.html`; клуб → `club.html`. После входа → `match.html?joined=1`.
- `torneo.html` — Open de Tardor, 15 nov, 12/16 пар, 24 €/пара; Inscribirme → OTP → обратно; Compartir = тост.
- `club.html` — Pàdel Sabadell, Vallès Occidental; строки матчей → `match.html`; вкладка Torneos → `torneo.html`; муро заблюрено.
- `chat.html` — тизер: 2 пузыря, остальное заблюрено + замок; Abrir en la app / Descargar → onboarding. Композер неактивен.
- `onboarding.html` — sheet «Descarga Padelada»: 3 причины, App Store badge (.tp), «Seguir en la web» → откуда пришёл (`?from=`).
- `gate-otp.html` — вход: **Google** и **Apple** (основные) → успех; **WhatsApp** = «hablar con Paddi» (корпоративный wa.me, отвечает бот) → чат → успех. Без SMS и без поля телефона. Членам клуба WhatsApp обязателен (экстренный канал + оповещения матча).
- `org-home.html` → строки «Hoy» → `org-partido.html`; турниры → `org-torneo.html`.
- `org-torneo.html` — инскрипты Pagado/Pendiente (кнопка «Marcar pagado» работает), расписание, ссылка, Compartir WhatsApp (тост).
- `org-partido.html` — статусы подтверждения, детали, QR/check-in вынесены как «en la app».
Скрины: `shots/*-390.png`, `shots/*-1440.png`. Генератор: `gen.py`.

## Вне скоупа
Watch, Live Activity, диктовка, полный мессенджер, оплата в вебе, реальный бэкенд/OTP, переводы кроме ES.

## Открыто
- **Вход (решение Мурата 1.11):** Google + Apple основные; WhatsApp = «напиши нам» → Paddi (корпоративный); без SMS. Членам клуба WA обязателен.
- App Store badge — плейсхолдер (.tp). Вкладка Muro в клубе = тот же заблюренный тизер ниже.

## Статус 01.11.2026
**Ready for Murat approval.** Вход ЗАФИКСИРОВАН (Мурат 01.11): Google + Apple основные; WhatsApp = написать Paddi (корпоративный wa.me, отвечает бот); без SMS, без поля телефона. WA для членов клуба — только в копирайте (экстренный канал + оповещения), не OTP.
Экраны: match (+ joined), torneo, club, chat, onboarding, gate-otp, org-home, org-torneo, org-partido; `_lab.html` — только лаборатория.
Скрины 390: match, match-joined, gate-otp, club, chat, torneo, onboarding, org-*; 1440: org-home, org-torneo, org-partido. Ничего не задеплоено (нет Firebase/Sites/prod).

## 01.11 12:10 — D4-clean
Зелёный убран: чипы уровня l0–l4 = muted→янтарь (#A8AAB2 #C4B8A6 #DDBB88 #F2B866 #FFB547), --ok = янтарь, аватар a5 #E8C9A0. Везде «Paddi».
