# Regenerates HTML only (css/js are hand-tuned, not touched)
P={}
def page(name,title,body,nav='pub',active=''):
    links=[('index.html','Inicio'),('mapa.html','Mapa'),('world.html','Padelada World'),('entrar.html','Entrar')] if nav=='pub' else [('mi-comarca.html','Mi comarca'),('cabina.html#falta','Falta uno'),('cabina.html#torneos','Torneos'),('cabina.html#miembros','Miembros'),('cabina.html#perfil','Perfil')]
    n=''.join(f'<a href="{h}" class="{"on" if h==active else ""}">{t}</a>' for h,t in links)
    bn=''.join(f'<a href="{h}">{t}</a>' for h,t in links)
    P[name]=f'''<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title} · Padelada</title><link rel="stylesheet" href="css/app.css"></head><body>
<header><div class="wrap"><a class="logo" href="index.html">padelada</a><nav class="top">{n}</nav><select class="lang" aria-label="Idioma"><option>es</option><option>ca</option><option>en</option><option>ru</option><option>uk</option></select></div></header>
<main>{body}</main><footer><div class="wrap">Padelada · maqueta club-v6 (club-test) · no publicar</div></footer><nav class="bnav">{bn}</nav><div id="toast"></div><script src="js/app.js"></script></body></html>'''

CAP=[('Barcelonès',14),('Vallès Occidental',9),('Maresme',7),('Baix Llobregat',6),('Madrid Centro',11),('Valencia Horta',5),('Málaga Costa',4),('Sevilla Área',3)]
cards=''.join(f'<a class="card" href="comarca.html"><span class="tag">{c}</span><h3>{n}</h3><p>{c} pistas/zonas activas · Falta uno abierto</p></a>' for n,c in CAP)

page('index.html','Tu comarca',f'''
<section class="hero"><div class="wrap"><div class="kick">padelada.club</div><h1>Tu comarca.<br>Tu pista de noche.</h1><p>Nuestra misión: pádel de verdad cerca de casa. Gente real, partidos completos con Falta uno y tu nivel, sin trampas.</p><div class="row"><a class="btn cta" href="#entradas">Empezar</a><a class="btn" href="fundar-app.html">Fundar una comarca</a></div></div></section>
<section id="entradas"><div class="wrap"><div class="kick">Tres entradas</div><h2>¿Cómo llegas?</h2><div class="grid g3">
<a class="card" href="entrar.html"><span class="tag">A</span><h3>Ya estoy en Padelada</h3><p>Tienes la app. Entra y ve directo a tu comarca.</p></a>
<a class="card" href="mapa.html"><span class="tag">B</span><h3>Soy nuevo · sin app</h3><p>Mira el mapa de España y descarga la app.</p></a>
<a class="card" href="world.html"><span class="tag">C</span><h3>Estoy en otro país</h3><p>Padelada World: pide abrir tu país.</p></a></div></div></section>
<section><div class="wrap"><div class="kick">España</div><h2>Comarcas de España</h2><p>Lugares y zonas, sin nombres de jugadores.</p><div class="grid g4">{cards}</div><a class="btn full" href="mapa.html">Ver mapa de España</a></div></section>
<section><div class="wrap"><div class="kick">Padelada World</div><h2>Padelada World</h2><p>Hoy solo en España. ¿Tu país? Pide abrirlo.</p><a class="btn ac" href="world.html">Abrir un país</a></div></section>
<section><div class="wrap"><div class="kick">FAQ</div><h2>Preguntas</h2>
<details><summary>¿Qué es una comarca?</summary><p>Tu zona local de pádel: pistas, gente y partidos cerca de ti.</p></details>
<details><summary>¿Necesito la app?</summary><p>Para unirte a una comarca, sí. En la web ves tu comarca, Falta uno y torneos.</p></details>
<details><summary>¿Quién es el Fundador?</summary><p>Quien abre la comarca y la cuida al inicio, como capitán.</p></details>
<details><summary>¿Puedo fundar desde la web?</summary><p>No. Solo desde la app.</p></details>
<details open><summary>¿Puedo jugar en otra comarca?</summary><p>Sí, sin restricciones: juegas en cualquier comarca y te apuntas a su Falta uno. Tu comarca es la zona de tu casa.</p></details>
</div></section>''',active='index.html')

dots=[(330,120,'Barcelonès'),(300,110,'Vallès Occ.'),(345,100,'Maresme'),(310,135,'Baix Llobregat'),(170,190,'Madrid Centro'),(250,230,'Valencia Horta'),(150,330,'Málaga Costa'),(110,300,'Sevilla Área')]
svgd=''.join(f'<a href="comarca.html"><circle cx="{x}" cy="{y}" r="9" fill="#FFB547"><title>{t}</title></circle></a>' for x,y,t in dots)
page('mapa.html','Mapa España',f'''<section><div class="wrap"><div class="kick">Solo España</div><h1>Mapa de comarcas</h1><p>Toca un punto para ver la comarca.</p>
<div class="map card"><svg viewBox="0 0 420 380"><path d="M40 60 L150 40 L260 60 L360 80 L380 110 L330 150 L280 200 L270 260 L220 300 L190 350 L100 350 L60 310 L70 240 L40 200 L50 140 Z" fill="#2C2D31" stroke="#3A3B40" stroke-width="2"/>{svgd}</svg></div>
<div class="grid g4" style="margin-top:16px">{cards}</div></div></section>''',active='mapa.html')

page('comarca.html','Comarca',f'''<section><div class="wrap"><div class="kick">Comarca pública</div><h1>Barcelonès</h1><p>14 pistas/zonas activas. Torneos abiertos visibles para todos.</p>
<div class="grid g3"><div class="card"><h3>Zonas</h3><p>Poblenou · Gràcia · Sants</p></div><div class="card"><h3>Torneo abierto</h3><p>Sáb 14.11 · Poblenou · inscripción en la app</p></div><div class="card"><h3>Miembros</h3><div class="row"><span class="av">··</span><span class="av">··</span><span class="av">··</span><span class="chip">+38</span></div></div></div>
<div class="row" style="margin-top:16px"><a class="btn cta" href="entrar.html">Entrar para ver más</a><a class="btn" href="fundar-app.html">Descargar app</a></div></div></section>''')

page('entrar.html','Entrar','''<section><div class="wrap" style="max-width:420px"><h1>Entrar</h1><p>Con la misma cuenta que en la app.</p>
<a class="btn full" href="mi-comarca.html"> Continuar con Apple</a><a class="btn full" href="mi-comarca.html">G Continuar con Google</a>
<p style="margin-top:24px">Demo de estados:</p><a class="btn full" href="mi-comarca.html">→ Soy miembro</a><a class="btn full" href="no-miembro.html">→ No soy miembro</a></div></section>''',active='entrar.html')

page('no-miembro.html','No eres miembro','''<section><div class="wrap" style="max-width:520px"><div class="kick">Sesión iniciada</div><h1>Aún no eres miembro de un club</h1><p>Hazte miembro desde la app para ver tu comarca, Falta uno y torneos.</p>
<a class="btn cta full" href="fundar-app.html">Descargar la app</a><a class="btn full" href="mapa.html">Ver comarcas de España</a></div></section>''')

page('mi-comarca.html','Mi comarca','''<section class="hero"><div class="wrap"><div class="kick">Tu comarca</div><h1>Barcelonès</h1><div class="row"><span class="chip">42 miembros</span><span class="chip">Fundador: <b style="color:#FFC963">Marc</b></span></div></div></section>
<section><div class="wrap"><div class="grid g4">
<a class="card" href="cabina.html#falta"><span class="tag">Hoy</span><h3>Falta uno</h3><p>3 partidos buscan jugador</p></a>
<a class="card" href="cabina.html#torneos"><span class="tag">14.11</span><h3>Torneos</h3><p>1 abierto · 1 interno</p></a>
<a class="card" href="cabina.html#miembros"><h3>Miembros</h3><p>Roles y Fundador</p></a>
<a class="card" href="cabina.html#perfil"><h3>Mi perfil</h3><p>Rating personal</p></a></div>
</div></section>''',nav='cab',active='mi-comarca.html')

mem=[('Marc','M','Fundador'),('Laia','L','Miembro'),('Jordi','J','Miembro'),('Núria','N','Miembro'),('Pau','P','Miembro'),('Clara','C','Miembro')]
ml=''.join(f'<div class="check"><span class="av {"gold" if r=="Fundador" else ""}">{i}</span><div style="flex:1"><b>{n}</b><br><span class="{"badge-f" if r=="Fundador" else "chip"}">{r}</span></div></div>' for n,i,r in mem)
page('cabina.html','Cabina','''<section><div class="wrap"><div class="kick">Cabina · Barcelonès</div><h2>Tu comarca</h2>
<div class="tabs"><button class="on" data-p="falta">Falta uno</button><button data-p="torneos">Torneos</button><button data-p="miembros">Miembros</button><button data-p="perfil">Perfil</button></div>
<div class="pane on" id="falta"><div class="grid g3">
<div class="card"><span class="tag">Hoy 20:00</span><h3>Poblenou · pista 2</h3><p>Falta 1 · nivel 3.0–3.5</p><button class="btn cta full" onclick="toast('Apuntado (demo)')">Me apunto</button></div>
<div class="card"><span class="tag">Mañana 19:30</span><h3>Gràcia · pista 1</h3><p>Falta 2 · nivel 2.5–3.0</p><button class="btn cta full" onclick="toast('Apuntado (demo)')">Me apunto</button></div>
<div class="card"><span class="tag">Jue 21:00</span><h3>Sants · pista 4</h3><p>Falta 1 · nivel 3.5</p><button class="btn cta full" onclick="toast('Apuntado (demo)')">Me apunto</button></div></div></div>
<div class="pane" id="torneos"><div class="grid g3"><div class="card"><span class="tag">Abierto · 14.11</span><h3>Open Poblenou</h3><p>Visible para todos · 16 parejas</p></div><div class="card"><span class="tag">Interno · 28.11</span><h3>Liga de noche</h3><p>Solo miembros</p></div></div></div>
<div class="pane" id="miembros"><div class="card">'''+ml+'''<div class="row" style="margin-top:14px"><a class="btn" href="fundador-deberes.html">Ver deberes del Fundador</a><button class="btn" onclick="toast('Queja enviada al equipo Padelada (solo miembros de esta comarca)')">Queja sobre el Fundador</button></div></div></div>
<div class="pane" id="perfil"><div class="card"><div class="row"><span class="av">L</span><div><b>Laia</b><br><span class="chip">Rating personal 3.2</span></div></div><p style="margin-top:12px">Partidos: 27 · Comarca: Barcelonès</p><a class="btn" href="fundar-app.html">Editar en la app</a></div></div></div></section>''',nav='cab',active='cabina.html#falta')

page('fundador-deberes.html','Deberes del Fundador','''<section><div class="wrap" style="max-width:600px"><div class="kick" style="color:#FFC963">Antes de activar el rol</div><h1>Deberes del Fundador</h1><p>El Fundador es el capitán de la comarca al inicio.</p>
<div class="card" oninput="duties()">
<label class="check"><input type="checkbox"><span>Organizo y confirmo partidos y Falta uno.</span></label>
<label class="check"><input type="checkbox"><span>Doy la bienvenida a nuevos miembros.</span></label>
<label class="check"><input type="checkbox"><span>Trato a todos con respeto y sin favoritismos.</span></label>
<label class="check"><input type="checkbox"><span>Acepto que los miembros de mi comarca pueden enviar una queja sobre mí.</span></label>
<button id="acc" class="btn ac full" style="opacity:.4" disabled onclick="accept()">Acepto · activar Fundador</button></div>
<a class="btn full" href="cabina.html#miembros">Ahora no</a></div></section>''',nav='cab')

page('fundar-app.html','Fundar en la app','''<section><div class="wrap" style="max-width:520px"><div class="kick">Solo en la app</div><h1>Abre Padelada</h1><p>Las comarcas se fundan solo desde la app. Desde la web no se puede.</p>
<a class="btn cta full" href="padelada://fundar" onclick="toast('Deep link padelada://fundar (placeholder)')">Abre Padelada</a>
<a class="btn full" href="#" onclick="toast('App Store (placeholder)')">App Store</a><a class="btn full" href="#" onclick="toast('Google Play (placeholder)')">Google Play</a></div></section>''')

page('world.html','Padelada World','''<section class="hero"><div class="wrap"><div class="kick">Padelada World</div><h1>Hoy, solo España</h1><p>Abrimos países a mano, con gente real. Sin pilotos vacíos.</p><div class="row"><span class="chip">🇪🇸 España · activa</span></div></div></section>
<section><div class="wrap" style="max-width:560px"><h2>Abrir un país</h2>
<form onsubmit="return worldSubmit(this)"><label>País</label><input required placeholder="Portugal"><label>Ciudad / zona</label><input required placeholder="Lisboa"><label>Email</label><input type="email" required placeholder="tu@email.com"><label>¿Cuántos jugadores tienes?</label><select><option>4–8</option><option>8–20</option><option>20+</option></select><button class="btn cta full">Enviar solicitud</button></form>
<div id="ok" class="card hidden"><h3>¡Recibido!</h3><p>Revisamos cada solicitud a mano y te escribimos.</p></div></div></section>''',active='world.html')

for k,v in P.items(): open(k,'w').write(v)
print(list(P))
