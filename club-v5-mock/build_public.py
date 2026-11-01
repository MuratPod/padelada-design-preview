# Public pages on live club-prod classes (sibling of build_internal.py). Writes ONLY:
# comarca, entrar, fundar-app, world, mapa, no-miembro. Never touches cabina/mi-comarca/fundador-deberes.
import re,pathlib
idx=pathlib.Path('index.html').read_text().split('\n')
head='\n'.join(idx[:34])
head=re.sub(r'<script>\(function\(\)\{var L=.*?</script>\n','',head,flags=re.S)
head=re.sub(r'<link rel="preload" as="image".*?(?=<link rel="preload" as="font")','',head,flags=re.S)
head=head.replace('<body class="story story--home">','<body class="story">').replace('css/prod/v3.css">','css/prod/v3.css"><link rel="stylesheet" href="css/prod/internal.css"><link rel="stylesheet" href="css/prod/public.css">')
foot='\n'.join(idx[139:])
JS='''<script>document.querySelectorAll('[data-toast]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();let t=document.createElement('div');t.className='toast';t.textContent=a.dataset.toast;document.body.append(t);setTimeout(()=>t.remove(),2200)}));
document.getElementById('worldForm')?.addEventListener('submit',e=>{e.preventDefault();let t=document.createElement('div');t.className='toast';t.textContent='Recibido. Te escribimos.';document.body.append(t);setTimeout(()=>t.remove(),2200)});</script>'''
def page(name,title,body):
    h=re.sub(r'<title>.*?</title>',f'<title>{title} · Club Padelada</title>',head)
    pathlib.Path(name).write_text(h+'\n<main class="pub">'+body+'</main>\n'+foot.replace('</body>',JS+'\n</body>'))
AR='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
def ph(k,h,sub,cls=''): return f'<p class="kicker">{k}</p><h1 class="pub__h{cls}">{h}</h1><p class="sub">{sub}</p>'
page('comarca.html','Baix Empordà',f'''<header class="ch"><img src="img/baix-emporda-1200.webp" alt=""><div class="wrap"><p class="kicker">Comarca · Catalunya</p><h1>Baix Empordà</h1>
<div class="chips"><span class="chip"><b>31</b> miembros</span><span class="chip"><b>6</b> pistas</span><span class="chip chip--gold">★ Fundador activo</span></div></div></header>
<section class="isec" style="border:0"><div class="wrap pub__split"><div><p class="kicker">Esta semana</p><h2 class="h2s" style="margin:6px 0 14px">4 Falta uno.<br>Torneo el 22 Nov.</h2><p class="p">Juega aunque no seas de aquí.</p></div>
<div><div class="mw"><span class="chip"><span class="ini">AB</span>Álvaro B.</span><span class="chip"><span class="ini">JM</span>Júlia M.</span><span class="chip"><span class="ini">RC</span>Roger C.</span><span class="chip"><span class="ini">EP</span>Elena P.</span><span class="chip">+27</span></div>
<div class="pub__cta"><a class="btn btn--lg" href="entrar.html">Entrar para jugar {AR}</a><a class="ghost ghost--lg" href="mapa.html">Otras comarcas</a></div></div></div></section>''')
page('entrar.html','Entrar',f'''<section class="isec pub__auth" style="border:0"><div class="wrap pub__split"><div class="pub__art"><img src="img/court-night.webp" alt=""></div><div>{ph("Entrar","Vuelve a<br>tu pista.","La misma cuenta que en la app. Sin contraseñas nuevas.")}
<div class="pub__oauth"><a class="tile" href="mi-comarca.html"><b class="g">G</b>Continuar con Google {AR}</a><a class="tile" href="mi-comarca.html"><b></b>Continuar con Apple {AR}</a></div>
<p class="p" style="font-size:15px;margin-top:24px">¿Sin cuenta? <a class="link" style="font-size:15px" href="no-miembro.html">Así se empieza</a></p></div></div></section>''')
page('fundar-app.html','Fundar una comarca',f'''<section class="isec" style="border:0"><div class="wrap pub__split"><div>{ph("Fundar una comarca","Se funda<br>en la pista,<br>no aquí.","Fundar una comarca se hace solo en la app, desde tu zona.")}
<div class="pub__cta"><a class="btn btn--lg" href="padelada://fundar" data-toast="Abriendo Padelada…">Abrir en la app {AR}</a><a class="ghost ghost--lg" href="#" data-toast="App Store / Google Play">Descargar</a></div>
<p class="p" style="font-size:15px;margin-top:20px">La web no usa tu ubicación. Todo lo que pide zona ocurre en la app.</p></div>
<div class="pub__phone"><img src="img/join-es-m.webp" alt="Pantalla de la app"></div></div></section>''')
page('world.html','Padelada World',f'''<section class="isec" style="border:0"><div class="wrap pub__split"><div>{ph("Padelada World","Un país.<br>Por ahora.","Padelada está activa en España. No abrimos países vacíos: cada país empieza con gente real que quiere jugar.")}
<div class="chips" style="margin-top:22px"><span class="chip"><b>España</b> · activa</span><span class="chip">Tu país · pídelo</span></div></div>
<form class="tile pub__form" id="worldForm"><label>País<input required placeholder="Portugal, Italia…"></label><label>Ciudad o zona<input placeholder="Lisboa"></label><label>Email<input type="email" required placeholder="tu@email.com"></label>
<button class="btn btn--lg">Quiero jugar en mi país {AR}</button><p class="p" style="font-size:14px">Lo revisamos a mano. Sin spam.</p></form></div></section>''')
svg=pathlib.Path('assets/map/spain.svg').read_text().strip()
page('mapa.html','Mapa',f'''<section class="isec" style="border:0"><div class="wrap">{ph("Mapa · solo España","Dónde<br>se juega.","Toca una comarca para verla. Las que buscan Fundador se abren desde la app.")}
<div class="pub__map"><div class="pub__mapart">{svg}</div><div><div class="stats"><div><b>7</b><span>Comarcas</span></div><div><b>4</b><span>Con Fundador</span></div><div><b>3</b><span>Buscan Fundador</span></div></div>
<div class="pub__cta"><a class="ghost ghost--lg" href="fundar-app.html">Fundar una comarca {AR}</a></div></div></div></div></section>''')
page('no-miembro.html','Aún no eres miembro',f'''<header class="ch" style="min-height:58svh"><img src="img/court-rackets.webp" alt=""><div class="wrap"><p class="kicker">Aún no eres miembro</p><h1>Tu comarca<br>te espera.</h1><p class="sub">La cabina es para miembros. Hacerse miembro empieza en la app.</p></div></header>
<section class="isec" style="border:0"><div class="wrap"><div class="tl">{''.join(f'<div class="tile duty" style="cursor:default"><span class="duty__n">{i+1}</span><h3>{t}</h3><p>{p}</p></div>' for i,(t,p) in enumerate([("Descarga Padelada","Gratis en App Store y Google Play."),("Elige tu comarca","Donde juegas de verdad."),("Juega tu primer partido","El juego te abre la puerta.")]))}</div>
<div class="pub__cta"><a class="btn btn--lg" href="fundar-app.html">Descargar la app {AR}</a><a class="ghost ghost--lg" href="comarca.html">Ver comarca pública</a></div></div></section>''')
