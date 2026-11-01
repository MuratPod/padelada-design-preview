import re,pathlib
idx=pathlib.Path('index.html').read_text().split('\n')
head='\n'.join(idx[:34])
head=re.sub(r'<script>\(function\(\)\{var L=.*?</script>\n','',head,flags=re.S)
head=re.sub(r'<link rel="preload" as="image".*?(?=<link rel="preload" as="font")','',head,flags=re.S)
head=head.replace('<body class="story story--home">','<body class="story">').replace('css/prod/v3.css">','css/prod/v3.css"><link rel="stylesheet" href="css/prod/internal.css">')
foot='\n'.join(l for l in idx[139:] )
JS='''<script>document.querySelectorAll('[data-toast]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();let t=document.createElement('div');t.className='toast';t.textContent=a.dataset.toast;document.body.append(t);setTimeout(()=>t.remove(),2200)}));
const d=document.getElementById('complaint');document.querySelector('[data-complain]')?.addEventListener('click',()=>d.showModal());
const tabs=[...document.querySelectorAll('.tabs a')];addEventListener('scroll',()=>{let c=tabs[0];tabs.forEach(a=>{let s=document.querySelector(a.hash);if(s&&s.getBoundingClientRect().top<160)c=a});tabs.forEach(a=>a.classList.toggle('on',a===c))});
const bx=[...document.querySelectorAll('.duty input')],btn=document.getElementById('acceptBtn');bx.forEach(b=>b.addEventListener('change',()=>{let n=bx.filter(x=>x.checked).length;document.getElementById('dbar').style.width=n*20+'%';document.getElementById('dcount').textContent=n+' / 5';btn.setAttribute('aria-disabled',n<5)}));</script>'''
def page(name,title,body):
    h=re.sub(r'<title>.*?</title>',f'<title>{title} · Club Padelada</title>',head)
    f=foot.replace('</body>',JS+'\n</body>')
    pathlib.Path(name).write_text(h+'\n<main>'+body+'</main>\n'+f)
fu=[("Hoy","20:30","Club Montilivi · Girona","Nivel 3.5 · Dobles","JR,AM,PC",True),("Jue","19:00","Pàdel Salt","Nivel 3.0 · Mixto","NV,LG",False),("Sáb","10:00","Indoor Sarrià","Nivel 4.0 · Dobles","OB,MF,ER",False)]
def slot(d,t,w,x,s,hot):
    a=s.split(',');n=4-len(a)
    seats=''.join(f'<span class="ini">{i}</span>' for i in a)+'<span class="ini ini--e">+</span>'*n
    b='btn' if hot else 'ghost'
    return f'<div class="tile slot{" slot--hot" if hot else ""}"><div class="slot__t"><small>{d}</small>{t}</div><div><div class="slot__w">{w}</div><div class="slot__x">{x}</div></div><div class="slot__seats">{seats}<span class="need">Falta{"n" if n>1 else ""} {n}</span></div><a class="{b}" href="#" data-toast="Te apuntaste. Lo verás en la app.">Me apunto</a></div>'
fuh=''.join(slot(*r) for r in fu)
mem=[("Jordi R.","JR",1),("Marta S.","MS",0),("Aina M.","AM",0),("Pau C.","PC",0),("Núria V.","NV",0),("Lucía G.","LG",0),("Oriol B.","OB",0),("Montse F.","MF",0),("Eric R.","ER",0),("Laia P.","LP",0)]
memh=''.join(f'<span class="chip{" chip--gold" if f else ""}"><span class="ini">{i}</span>{n}{" · Fundador" if f else ""}</span>' for n,i,f in mem)
TABS='<nav class="tabs" aria-label="Secciones"><div class="wrap"><a href="#falta" class="on">Falta uno</a><a href="#torneos">Torneos</a><a href="#miembros">Miembros</a><a href="#perfil">Mi perfil</a></div></nav>'
page('cabina.html','Cabina · Gironès',f'''<header class="ch"><img src="img/girones.webp" alt=""><div class="wrap"><p class="kicker">Cabina de comarca · Solo miembros</p><h1>Gironès</h1>
<div class="chips"><span class="chip"><b>48</b> miembros</span><span class="chip"><b>3</b> Falta uno</span><span class="chip"><b>1</b> torneo</span><span class="chip chip--gold">★ Fundador · JR</span></div></div></header>
{TABS}
<section class="isec" id="falta"><div class="wrap"><div class="isec__h"><div><p class="kicker">Esta semana</p><h2>Falta uno</h2></div></div><p class="p" style="margin-bottom:18px">Partidos de tu comarca con hueco. Te apuntas aquí; se organiza en la app.</p><div class="tl">{fuh}</div></div></section>
<section class="isec" id="torneos"><div class="wrap"><div class="isec__h"><div><p class="kicker">Agenda</p><h2>Torneos</h2></div><span class="demo">Ejemplo</span></div>
<div class="strip"><a class="tile tour tour--w" href="#" data-toast="Inscripción desde la app."><img src="img/court-indoor.webp" alt=""><span class="chip">Abierto · 16 parejas</span><div class="tour__in"><div class="tour__d">14 NOV</div><h3>Open de Otoño Gironès</h3><p>Club Montilivi · Niveles 3–4</p></div></a>
<a class="tile tour tour--n" href="#" data-toast="Inscripción desde la app."><img src="img/court-night.webp" alt=""><span class="chip">Liga interna</span><div class="tour__in"><div class="tour__d">DIC</div><h3>Liga Nocturna</h3><p>Miércoles · 8 jornadas</p></div></a>
<a class="tile tour tour--w" href="#" data-toast="Inscripción desde la app."><img src="img/court-net.webp" alt=""><span class="chip">Entre comarcas</span><div class="tour__in"><div class="tour__d">ENE</div><h3>Gironès vs Selva</h3><p>Por confirmar</p></div></a></div></div></section>
<section class="isec" id="miembros"><div class="wrap"><div class="isec__h"><div><p class="kicker">48 jugadores</p><h2>Miembros</h2></div></div><div class="mw">{memh}<span class="chip">+38</span></div>
<p style="margin-top:20px"><button class="ghost" data-complain>Reportar al Fundador</button></p><p class="p" style="font-size:14px;margin-top:8px">Solo miembros de Gironès. Lo revisa el equipo Padelada.</p></div></section>
<section class="isec" id="perfil" style="border:0"><div class="wrap"><div class="isec__h"><div><p class="kicker">Tú</p><h2>Mi perfil</h2></div></div>
<div class="tile me"><div class="me__top"><span class="ini">MS</span><div><b style="font-size:20px">Marta S.</b><div class="slot__x">Miembro de Gironès · desde 2026</div></div></div><div class="stats"><div><b>3.6</b><span>Nivel</span></div><div><b>27</b><span>Partidos</span></div><div><b>4</b><span>Comarcas</span></div></div></div>
<p style="margin-top:22px"><a class="link" href="fundador-deberes.html">Deberes del Fundador →</a></p></div></section>
<dialog id="complaint"><h3 style="margin:0">Reportar al Fundador</h3><p class="p" style="font-size:14px">Solo miembros de esta comarca. Cuéntanos qué pasó.</p><form method="dialog"><textarea placeholder="Qué pasó, cuándo…"></textarea><div style="display:flex;gap:10px;justify-content:flex-end"><button class="ghost" value="x">Cancelar</button><button class="btn">Enviar</button></div></form></dialog>''')
page('mi-comarca.html','Mi comarca',f'''<header class="ch" style="min-height:62svh"><img src="img/girones.webp" alt=""><div class="wrap"><p class="kicker">Hola, Marta · Tu comarca</p><h1>Gironès</h1>
<div class="chips" style="margin-bottom:22px"><span class="chip"><b>2</b> partidos esta semana</span><span class="chip"><b>1</b> torneo abierto</span><span class="chip chip--gold">★ Fundador · JR</span></div>
<div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn--lg" href="cabina.html#falta">Ver Falta uno →</a><a class="ghost ghost--lg" href="cabina.html">Abrir cabina</a></div></div></header>
<section class="isec" style="border:0"><div class="wrap"><p class="kicker">Tu próximo partido</p><h2 class="h2s" style="margin:6px 0 16px">Jueves, 20:30</h2><div class="tl">{slot("Jue","20:30","Club Montilivi · Girona","Nivel 3.5 · Dobles","JR,MS,PC",True)}</div></div></section>''')
D=[("Abres la puerta","Das la bienvenida a quien llega y explicas cómo se juega aquí."),("Mueves partidos","Te aseguras de que haya Falta uno cada semana."),("Cuidas el juego limpio","Resultados confirmados por los cuatro. Sin trampas."),("Organizas","Al menos un torneo o evento de comarca por temporada."),("Respondes","Tus miembros pueden reportarte. El equipo Padelada lo revisa.")]
dh=''.join(f'<label class="tile duty"><input type="checkbox"><span class="duty__n">{i+1}</span><h3>{t}</h3><p>{p}</p></label>' for i,(t,p) in enumerate(D))
page('fundador-deberes.html','Deberes del Fundador',f'''<section class="isec" style="border:0;padding-top:36px"><div class="wrap" style="max-width:720px"><p class="kicker" style="color:var(--gold)">★ Antes de aceptar</p><h1 class="h2s" style="font-size:clamp(44px,8vw,80px);margin:8px 0 12px;letter-spacing:-.04em;line-height:.98">Ser Fundador.</h1>
<p class="sub">El capitán de la comarca al empezar. No es un título: es un compromiso.</p><div class="prog"><i id="dbar"></i></div><p class="p" style="font-size:14px;margin:10px 0 22px">Marca los cinco para continuar. Fundar se termina en la app.</p>
{dh}<div class="accept"><span class="p" id="dcount">0 / 5</span><a class="btn btn--lg btn--gold" id="acceptBtn" href="fundar-app.html" aria-disabled="true">Acepto · seguir en la app →</a></div></div></section>''')
