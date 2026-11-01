import pathlib
NAV='''<nav class="nav"><a class="logo" href="index.html"><img src="img/logo.svg" alt="Padelada"></a>
<div class="links"><a href="index.html#comarcas">Comarcas</a><a href="mapa.html">Mapa</a><a href="world.html">Padelada World</a><a href="index.html#faq">Preguntas</a></div>
<a class="enter" href="entrar.html">Entrar</a></nav>'''
FOOT='''<footer class="foot"><p class="d big">Juega en tu comarca.</p>
<div class="stores"><a href="fundar-app.html"><small>Descárgala en</small>App Store</a><a href="fundar-app.html"><small>Disponible en</small>Google Play</a></div>
<nav><a href="#">Términos</a><a href="#">Privacidad</a><a href="world.html">Padelada World</a><a href="mapa.html">Mapa</a><span>ES · CA · EN · RU · UK</span></nav>
<span>© 2026 Padelada</span></footer>'''
def page(name,title,body,nav=True,foot=True):
    html=f'''<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{title} · Padelada</title><link rel="stylesheet" href="css/app.css"></head><body>
{NAV if nav else ''}{body}{FOOT if foot else ''}
<script src="js/app.js"></script></body></html>'''
    pathlib.Path(name).write_text(html)
C=[("Baix Empordà","baix-emporda-1200","Fundador activo",True),("Gironès","girones","Fundador activo",True),("Barcelonès","barcelones","Buscando Fundador",False),("Maresme","maresme","Fundador activo",True),("Selva","selva","Buscando Fundador",False),("Segrià","segria","Buscando Fundador",False),("Alt Empordà","alt-emporda","Fundador activo",True)]
idx="".join(f'<li><a href="comarca.html" data-img="img/{i}.webp"><span class="n">{n+1:02d}</span><span class="nm">{c}</span><span class="st">{"<b>●</b> " if a else ""}{s}</span></a></li>' for n,(c,i,s,a) in enumerate(C))
words="Aquí no hay rankings comprados ni partidos inventados. Hay una pista, cuatro personas y un resultado que todos confirman. Tu comarca es tu club.".split()
stmt=" ".join(f"<span>{w}</span>" for w in words)
page("index-cinematic.html","Tu comarca (alt cinematic)",f'''
<header class="hero"><picture><source media="(max-width:700px)" srcset="img/hero-court-night-m-720.webp"><img class="bg" src="img/hero-court-night-1920.webp" alt=""></picture>
<div class="in"><p class="eyebrow">Padelada Club · España</p><h1 class="d">Tu comarca.<br><em>Tu pista.</em></h1>
<p class="sub">El club de pádel de tu zona. Partidos de cuatro, resultados confirmados, gente de verdad.</p>
<div class="row"><a class="btn btn-cta" href="#camino">Empezar <span class="arrow">→</span></a><a class="btn btn-ghost" href="mapa.html">Ver el mapa</a></div></div>
<span class="scrollcue">Desliza</span></header>
<section class="statement"><p>{stmt}</p></section>
<section class="modes"><p class="eyebrow mx">Cómo se juega aquí</p>
<article class="mode reveal"><span class="mn">01</span><div><h2 class="d">Falta uno.</h2><p>Tres personas y una pista reservada. Tú eres el cuarto. Te apuntas en un toque y la conversación sigue en la app.</p></div>
<div class="demo-slot" aria-hidden="true"><div class="ds-t"><small>Hoy</small>20:30</div><div class="ds-w">Club Montilivi · Nivel 3.5</div><div class="seats"><span class="ini">JR</span><span class="ini">AM</span><span class="ini">PC</span><span class="ini empty">+</span></div><span class="ds-f">Falta 1</span></div></article>
<article class="mode alt reveal"><span class="mn">02</span><div><h2 class="d">Resultado<br>de cuatro.</h2><p>Un partido cuenta cuando los cuatro lo confirman. Sin trampas, sin partidos inventados. Tu nivel sale de ahí.</p></div>
<div class="demo-score" aria-hidden="true"><div><b>6</b><b>4</b><b>7</b></div><div><b>3</b><b>6</b><b>5</b></div><p><span class="ok">✓</span><span class="ok">✓</span><span class="ok">✓</span><span class="ok">✓</span> Confirmado por los cuatro</p></div></article>
<article class="mode reveal"><span class="mn">03</span><div><h2 class="d">Torneos<br>de comarca.</h2><p>Opens, ligas nocturnas y duelos entre comarcas. Los organiza tu Fundador; te inscribes desde la app.</p></div>
<div class="demo-date" aria-hidden="true"><span>14</span><small>NOV · Open de Otoño Gironès</small></div></article></section>
<section class="path" id="camino"><div><p class="q">¿Desde dónde llegas?</p>
<div class="seg" role="tablist">
<button aria-selected="true" data-p="p1"><small>01</small>Ya juego</button>
<button aria-selected="false" data-p="p2"><small>02</small>Empiezo hoy</button>
<button aria-selected="false" data-p="p3"><small>03</small>Vivo fuera</button></div></div>
<div class="panels">
<div class="panel on" id="p1"><p>Entra con la misma cuenta de la app y te llevamos directo a tu comarca.</p><a class="btn btn-cta" href="entrar.html">Entrar <span class="arrow">→</span></a></div>
<div class="panel" id="p2"><p>Descarga la app, elige tu comarca y juega tu primer partido. Ser miembro se gana jugando.</p><a class="btn btn-cta" href="no-miembro.html">Cómo ser miembro <span class="arrow">→</span></a></div>
<div class="panel" id="p3"><p>Por ahora Padelada vive en España. Pide tu país y lo abrimos contigo.</p><a class="btn btn-cta" href="world.html">Padelada World <span class="arrow">→</span></a></div>
</div></section>
<section class="index" id="comarcas"><header class="reveal"><h2 class="d">Comarcas<br>de España</h2><a class="btn btn-ghost" href="mapa.html">Mapa <span class="arrow">→</span></a></header>
<ol>{idx}</ol><div class="peek on"><img src="img/girones.webp" alt=""></div></section>
<section class="moment"><img src="img/court-net.webp" alt=""><div class="in reveal"><p class="eyebrow">Sin fronteras</p><h2 class="d">Juega en<br>cualquier<br>comarca.</h2><p>Tu comarca es tu casa, no tu jaula. Apúntate a un Falta uno donde estés.</p></div></section>
<section class="split"><div class="reveal"><p class="eyebrow">Padelada World</p><p class="d big"><span class="es">Espa<br>ña.</span></p></div>
<div class="reveal"><p class="lst"><span>España — activa.</span><br>¿Tu país? Aún no.<br>Pero puedes pedirlo.</p><a class="btn btn-cta" style="margin-top:28px" href="world.html">Abrir mi país <span class="arrow">→</span></a></div></section>
<section class="faq" id="faq"><h2 class="d reveal">Preguntas</h2><div>
<details open><summary>¿Puedo jugar fuera de mi comarca?</summary><p>Sí. No hay límites: juegas en cualquier comarca y te apuntas a cualquier Falta uno.</p></details>
<details><summary>¿Qué es una comarca?</summary><p>Tu zona de juego. Un club local con sus partidos, torneos y miembros.</p></details>
<details><summary>¿Cómo me hago miembro?</summary><p>Desde la app: eliges comarca y juegas. El resto llega jugando.</p></details>
<details><summary>¿Quién es el Fundador?</summary><p>Quien abre la comarca y la cuida al principio. Hace de capitán.</p></details>
<details><summary>¿Puedo fundar una comarca desde la web?</summary><p>No. Se funda solo desde la app, en tu zona.</p></details></div></section>''')
page("world.html","Padelada World",'''<main class="page"><p class="eyebrow">Padelada World</p><h1 class="d">Un país.<br>Por ahora.</h1>
<p class="lede">Padelada está activa en España. No abrimos países vacíos: cada país empieza con gente real que quiere jugar.</p>
<section class="split" style="padding-left:0;padding-right:0"><div><p class="lst"><span>● España</span> — activa<br>Tu país — <span style="color:var(--ac)">pídelo</span></p></div>
<form class="form" id="worldForm"><label>País</label><input required placeholder="Portugal, Italia…"><label>Ciudad o zona</label><input placeholder="Lisboa"><label>Email</label><input type="email" required placeholder="tu@email.com">
<button class="btn btn-cta" style="justify-self:start;margin-top:14px">Quiero jugar en mi país <span class="arrow">→</span></button><p class="mu" style="font-size:13px">Lo revisamos a mano. Sin spam.</p></form></section></main>''')
pins=[(640,118,"Alt Empordà"),(628,140,"Baix Empordà"),(608,132,"Gironès"),(598,148,"Selva"),(590,166,"Maresme"),(570,178,"Barcelonès"),(498,150,"Segrià")]
pp="".join(f'<g class="pin"><circle class="r" cx="{x}" cy="{y}" r="7"/><circle class="c" cx="{x}" cy="{y}" r="6"/><text x="{x+12}" y="{y+4}">{n}</text></g>' for x,y,n in pins)
SP="M96,58 L150,44 L214,52 L276,46 L338,60 L392,66 L430,78 L470,84 L512,98 L560,104 L604,100 L646,112 L668,124 L650,146 L618,170 L586,190 L560,214 L536,246 L522,282 L500,318 L474,352 L446,384 L404,404 L356,416 L304,420 L262,430 L222,422 L190,400 L168,376 L150,382 L136,358 L150,330 L164,300 L156,268 L170,236 L162,204 L152,176 L132,158 L108,150 L86,128 L70,104 L78,78 Z"
BAL="M600,262 l22,-8 l16,6 l-6,14 l-24,4 Z M652,250 l12,-4 l8,6 l-10,6 Z M574,282 l8,-2 l2,8 l-8,2 Z"
page("mapa.html","Mapa",f'''<main class="page"><p class="eyebrow">Mapa · solo España</p><h1 class="d">Dónde<br>se juega.</h1>
<div class="mapwrap"><svg class="spain" viewBox="0 0 720 470" role="img" aria-label="Mapa de España"><path class="land" d="{SP}"/><path class="land" d="{BAL}"/><text class="lbl" x="300" y="240">ESPAÑA</text>{pp}</svg>
<div><p class="lede" style="margin-top:0">Toca una comarca para verla. Las que buscan Fundador se abren desde la app.</p>
<ol class="steps"><li>7 comarcas en el mapa</li><li>4 con Fundador activo</li><li>3 buscando Fundador</li></ol>
<a class="btn btn-ghost" style="margin-top:28px" href="fundar-app.html">Fundar una comarca <span class="arrow">→</span></a></div></div></main>''')
page("entrar.html","Entrar",'''<main class="auth"><div class="art"><img src="img/court-night.webp" alt=""></div>
<div class="box"><p class="eyebrow">Entrar</p><h1 class="d">Vuelve a<br>tu pista.</h1><p class="lede">La misma cuenta que en la app. Sin contraseñas nuevas.</p>
<div class="oauth"><a href="mi-comarca.html"><b class="gmark">G</b> Continuar con Google <span class="arrow">→</span></a>
<a class="apple" href="mi-comarca.html"><b></b> Continuar con Apple <span class="arrow">→</span></a></div>
<p class="mu" style="font-size:14px;margin-top:28px">¿Sin cuenta? <a href="no-miembro.html" style="color:var(--tx);border-bottom:1px solid var(--bd)">Así se empieza</a> · Demo: <a href="no-miembro.html" style="color:var(--ac)">ver estado no-miembro</a></p></div></main>''',foot=False)
page("mi-comarca.html","Mi comarca",'''<header class="chead"><img src="img/girones.webp" alt=""><div class="in"><p class="eyebrow">Hola, Marta · Tu comarca</p><h1 class="d">Gironès</h1>
<div class="meta"><span><b>2</b> partidos te esperan esta semana</span><span><b>1</b> torneo abierto</span></div>
<div class="row" style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn-cta" href="cabina.html#falta">Ver Falta uno <span class="arrow">→</span></a><a class="btn btn-ghost" href="cabina.html">Abrir cabina</a></div></div></header>
<section class="statement" style="padding-top:80px;padding-bottom:100px"><p style="font-size:clamp(26px,3.4vw,48px)">Próximo: <span class="lit" style="color:var(--ac)">jueves 20:30</span>, Club Montilivi. Falta uno.</p></section>''',foot=False)
page("no-miembro.html","Hazte miembro",'''<main class="gate"><img class="bg" src="img/court-rackets.webp" alt=""><div class="in"><p class="eyebrow">Aún no eres miembro</p>
<h1 class="d">Tu comarca<br>te espera.</h1><p class="lede">La cabina es para miembros. Hacerse miembro empieza en la app.</p>
<ol class="steps"><li>Descarga Padelada</li><li>Elige tu comarca</li><li>Juega tu primer partido</li></ol>
<div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:32px"><a class="btn btn-cta" href="fundar-app.html">Descargar la app <span class="arrow">→</span></a><a class="btn btn-ghost" href="comarca.html">Ver comarca pública</a></div></div></main>''',foot=False)
fu=[("Hoy","20:30","Club Montilivi · Girona","Nivel 3.5 · Dobles","JR,AM,PC",True),("Jue","19:00","Pàdel Salt","Nivel 3.0 · Mixto","NV,LG",False),("Sáb","10:00","Indoor Sarrià","Nivel 4.0","OB,MF,ER",False)]
def seats(s):
    a=s.split(",");return "".join(f'<span class="ini">{x}</span>' for x in a)+"".join('<span class="ini empty">+</span>' for _ in range(4-len(a)))
fuh="".join(f'<div class="slot{" hot" if h else ""}"><div class="t"><small>{d}</small>{t}</div><div><div class="w">{w}</div><div class="x">{x}</div></div><div class="seats">{seats(s)}<span class="need">Falta{"n" if 4-len(s.split(","))>1 else ""} {4-len(s.split(","))}</span></div><a class="btn {"btn-cta" if h else "btn-ghost"} go" href="#" data-toast="Te apuntaste. Lo verás en la app.">Me apunto</a></div>' for d,t,w,x,s,h in fu)
mem=[("Jordi R.","JR","f"),("Marta S.","MS",""),("Aina M.","AM",""),("Pau C.","PC",""),("Núria V.","NV",""),("Lucía G.","LG",""),("Oriol B.","OB",""),("Montse F.","MF",""),("Eric R.","ER",""),("Laia P.","LP",""),("Xavi T.","XT",""),("Carmen D.","CD","")]
memh="".join(f'<span class="m {f}"><span class="ini">{i}</span>{n}{" <em>Fundador</em>" if f else ""}</span>' for n,i,f in mem)
page("cabina.html","Cabina · Gironès",f'''<header class="chead" style="min-height:52svh"><img src="img/girones.webp" alt=""><div class="in"><p class="eyebrow">Cabina de comarca</p><h1 class="d">Gironès</h1>
<div class="meta"><span><b>48</b> miembros</span><span><b>3</b> Falta uno</span><span><b>1</b> torneo</span><span class="role gold">★ Fundador · Jordi R.</span></div></div></header>
<nav class="rail"><a href="#falta" class="on">Falta uno</a><a href="#torneos">Torneos</a><a href="#miembros">Miembros</a><a href="#perfil">Mi perfil</a></nav>
<section class="sec" id="falta"><header><h2 class="d">Falta<br>uno.</h2><p class="mu" style="max-width:300px">Partidos de tu comarca con hueco. Te apuntas aquí; se habla en la app.</p></header><div class="fu">{fuh}</div></section>
<section class="sec" id="torneos"><header><h2 class="d">Torneos</h2><p class="mu">Los abiertos los ve todo el mundo.</p></header>
<div class="ribbon"><a class="tour" href="#" data-toast="Inscripción desde la app."><img src="img/court-indoor.webp" alt=""><div class="in"><span class="tag">Abierto · 16 parejas</span><div class="date">14 NOV</div><h3>Open de Otoño Gironès</h3><p>Club Montilivi · Niveles 3–4</p></div></a>
<a class="tour" href="#" data-toast="Inscripción desde la app."><img src="img/court-night.webp" alt=""><div class="in"><span class="tag">Liga interna</span><div class="date">DIC</div><h3>Liga Nocturna</h3><p>Miércoles · 8 jornadas</p></div></a>
<a class="tour" href="#" data-toast="Inscripción desde la app."><img src="img/court-net.webp" alt=""><div class="in"><span class="tag">Entre comarcas</span><div class="date">ENE</div><h3>Gironès vs Selva</h3><p>Por confirmar</p></div></a></div></section>
<section class="sec" id="miembros"><div class="members"><div><p class="count">48</p><h2 class="d" style="font-size:clamp(36px,4vw,56px);margin-top:-10px">Miembros</h2></div>
<div><div class="wall">{memh}<span class="m" style="color:var(--mu)">+36</span></div><button class="complain" data-complain>Reportar al Fundador</button><p class="mu" style="font-size:12px;margin-top:6px">Solo miembros de Gironès. Lo revisa el equipo Padelada.</p></div></div></section>
<section class="sec" id="perfil" style="border-bottom:0"><div class="me"><div class="av">MS</div><div><h2 class="d" style="font-size:clamp(36px,4vw,56px)">Marta S.</h2><p class="mu">Miembro de Gironès · desde 2026</p></div>
<div class="stats"><div><b>3.6</b><span>Nivel</span></div><div><b>27</b><span>Partidos</span></div><div><b>4</b><span>Comarcas jugadas</span></div></div></div>
<p style="margin-top:44px"><a class="btn btn-ghost" href="fundador-deberes.html">Ver deberes del Fundador <span class="arrow">→</span></a></p></section>
<dialog id="complaint"><h3>Reportar al Fundador</h3><p class="mu" style="font-size:14px">Solo miembros de esta comarca. Cuéntanos qué pasó.</p><form method="dialog"><textarea placeholder="Qué pasó, cuándo…"></textarea>
<div style="display:flex;gap:10px;justify-content:flex-end"><button class="btn btn-ghost" value="x">Cancelar</button><button class="btn btn-cta" id="csend">Enviar</button></div></form></dialog>''',foot=False)
D=[("Abres la puerta","Das la bienvenida a quien llega y explicas cómo se juega aquí."),("Mueves partidos","Te aseguras de que haya Falta uno cada semana."),("Cuidas el juego limpio","Resultados confirmados por los cuatro. Sin trampas."),("Organizas","Al menos un torneo o evento de comarca por temporada."),("Respondes","Tus miembros pueden reportarte. El equipo Padelada lo revisa.")]
dh="".join(f'<label class="duty"><input type="checkbox"><span class="no">{i+1}</span><h3>{t}</h3><p>{p}</p><span class="ck"><i></i>Lo asumo</span></label>' for i,(t,p) in enumerate(D))
page("fundador-deberes.html","Deberes del Fundador",f'''<main class="duties"><div class="lead"><p class="eyebrow" style="color:var(--gold)">Antes de aceptar</p><h1 class="d">Ser<br><span>Fundador.</span></h1>
<p class="lede">El Fundador es el capitán de la comarca al empezar. No es un título: es un compromiso.</p><div class="prog"><i id="dbar"></i></div><p class="mu" style="font-size:13px;margin-top:10px">Marca los cinco para continuar. Fundar se termina en la app.</p></div>
<div>{dh}<div class="accept"><span class="mu" id="dcount">0 / 5</span><a class="btn btn-gold" id="acceptBtn" href="fundar-app.html" disabled>Acepto · seguir en la app <span class="arrow">→</span></a></div></div></main>''',foot=False)
page("fundar-app.html","Fundar en la app",'''<main class="handoff"><div><p class="eyebrow">Fundar una comarca</p><h1 class="d">Se funda<br>en la pista,<br>no aquí.</h1>
<p class="lede">Fundar una comarca se hace solo en la app, desde tu zona.</p>
<div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:32px"><a class="btn btn-cta" href="padelada://fundar" data-toast="Abriendo Padelada… (deep link padelada://fundar)">Abrir en la app <span class="arrow">→</span></a><a class="btn btn-ghost" href="#" data-toast="App Store / Google Play">Descargar</a></div>
<p class="note">La web no usa tu ubicación. Todo lo que pide zona ocurre en la app.</p></div>
<div class="phone"><img src="img/join-es-m.webp" alt="Pantalla de la app"></div></main>''',foot=False)
page("comarca.html","Baix Empordà",'''<header class="chead"><img src="img/baix-emporda-1200.webp" alt=""><div class="in"><p class="eyebrow">Comarca · Catalunya</p><h1 class="d">Baix<br>Empordà</h1>
<div class="meta"><span><b>31</b> miembros</span><span><b>6</b> pistas</span><span class="role gold">★ Fundador activo</span></div></div></header>
<section class="split"><div><p class="lst"><span>Falta uno esta semana: 4.</span><br>Torneo abierto: 22 Nov.<br>Juega aunque no seas de aquí.</p></div>
<div><div class="wall"><span class="m"><span class="ini">AB</span></span><span class="m"><span class="ini">JM</span></span><span class="m"><span class="ini">RC</span></span><span class="m"><span class="ini">EP</span></span><span class="m" style="color:var(--mu)">+27</span></div>
<div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:28px"><a class="btn btn-cta" href="entrar.html">Entrar para jugar <span class="arrow">→</span></a><a class="btn btn-ghost" href="mapa.html">Otras comarcas</a></div></div></section>''')
