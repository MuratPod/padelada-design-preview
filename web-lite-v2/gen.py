# Generador de web-lite v2 (solo laboratorio). python3 gen.py
I=dict(
back='<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>',
share='<svg viewBox="0 0 24 24"><path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7M16 6l-4-4-4 4M12 2v14"/></svg>',
more='<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>',
pin='<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
clock='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
euro='<svg viewBox="0 0 24 24"><path d="M18 7a7 7 0 100 10M4 10h10M4 14h10"/></svg>',
trophy='<svg viewBox="0 0 24 24"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0zM17 5h3v2a3 3 0 01-3 3M7 5H4v2a3 3 0 003 3"/></svg>',
users='<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6M16 4a3.5 3.5 0 010 7M22 20c0-3-2-5-5-5.7"/></svg>',
lock='<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>',
chat='<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z"/></svg>',
bell='<svg viewBox="0 0 24 24"><path d="M6 8a6 6 0 0112 0c0 7 3 8 3 8H3s3-1 3-8M10 20a2 2 0 004 0"/></svg>',
home='<svg viewBox="0 0 24 24"><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/></svg>',
ball='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M5 6c3 3 3 9 0 12M19 6c-3 3-3 9 0 12"/></svg>',
cal='<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
plus='<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
gear='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-2.9 1.2V21a2 2 0 01-4 0v-.1A1.7 1.7 0 009 19.4a1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1A1.7 1.7 0 003.2 14H3a2 2 0 010-4h.1A1.7 1.7 0 004.6 9a1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1A1.7 1.7 0 009 4.6V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>',
qr='<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/></svg>',
phone='<svg viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/></svg>',
check='<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
wa='<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z"/><path d="M9 9.5c.5 2 2 3.6 4.5 4.5"/></svg>',
search='<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
)
LANG='<div class="lang"><button class="on">ES</button><button>CA</button><button>EN</button><button>RU</button><button>UK</button></div>'
P={'Marc':('MA','a1'),'Laia':('LA','a2'),'Jordi':('JO','a3'),'Núria':('NÚ','a4'),'Pau':('PA','a5'),'Clara':('CL','a6')}
def lvc(r):
    t=[(1.5,0),(2.5,2),(3.0,3),(3.6,4),(4.1,5),(4.6,6)]
    for lim,l in t:
        if r<lim:return l
    return 7
def chip(r):return f'<span class="lv lv{lvc(r)}">{str(r).replace(".",",")}</span>'
def av(n,cls=''):i,c=P[n];return f'<div class="av {c} {cls}">{i}</div>'
def status():return '<div class="status"><span>19:02</span><span class="ic"><span class="sig"><i style="height:4px"></i><i style="height:6px"></i><i style="height:8px"></i><i style="height:10px"></i></span><span class="b sm">5G</span><span class="bat"><i></i></span></span></div>'
def mpage(name,title,nav,body,dock,wa=None,back='club.html'):
    w=f'<div class="wa">{I["wa"].replace("<svg","<svg width=14 height=14 stroke=#FFB547 fill=none stroke-width=2")}<span>Abierto desde <b>WhatsApp</b> · {wa}</span></div>' if wa else ''
    return f'''<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>{title} · Padelada</title><link rel="stylesheet" href="css/app.css"></head>
<body class="m" data-page="{name}"><div class="phone">{status()}{w}
<div class="nav"><a class="circ" href="{back}" data-back="{back}" aria-label="Atrás">{I["back"]}</a><div class="t">{nav}</div>{LANG}</div>
<div class="scroll">{body}</div>
<div class="dock">{dock}<div class="home"></div></div></div><script src="js/app.js"></script></body></html>'''
def li(n,r,meta,right=''):return f'<div class="li">{av(n)}<div class="grow"><div class="nm">{n}</div><div class="meta">{meta}</div></div>{chip(r)}{right}</div>'

# ---- match
match=mpage('match','Falta uno','Falta uno',f'''
<h1 class="lt">Falta uno</h1><p class="sub">Marc busca al cuarto · nivel 3,0–3,8</p>
<div class="hero sec" style="margin-top:16px">
 <div class="when"><div class="date"><div class="m">nov</div><div class="d">7</div></div><div class="grow"><div class="b" style="font-size:17px">Sábado · 19:30–21:00</div><div class="sm mu">Pàdel Sabadell · Pista 3 cubierta</div></div><span id="st" class="pill warn"><i class="d"></i>Falta 1</span></div>
 <div class="court">
  <div class="spot">{av("Marc")}<div class="n">Marc</div>{chip(3.5)}</div>
  <div class="spot">{av("Laia")}<div class="n">Laia</div>{chip(3.4)}</div>
  <div class="spot">{av("Jordi")}<div class="n">Jordi</div>{chip(3.7)}</div>
  <a class="spot free" href="gate-otp.html"><div class="av empty">+</div><div class="n">Tu sitio</div><span class="lv lv4" style="opacity:.6">3,0–3,8</span></a>
 </div>
 <div class="row between" style="margin-top:14px"><span class="sm mu">Jugadores</span><span class="b" id="cnt">3/4</span></div>
 <div class="prog" style="margin-top:6px"><i style="width:75%"></i></div>
</div>
<div class="sec"><div class="hd"><h3>Quién ya juega</h3><span class="sm mu">Organiza Marc</span></div>
<div class="list">{li("Marc",3.5,"Organizador · 42 partidos",'')}{li("Laia",3.4,"Confirmada · 18 partidos")}{li("Jordi",3.7,"Confirmado · 27 partidos")}</div></div>
<div class="sec"><div class="hd"><h3>Detalles</h3></div>
<div class="kv"><div><div class="cap">Precio</div><div class="v">9 € / persona</div></div><div><div class="cap">Tipo</div><div class="v">Amistoso</div></div><div><div class="cap">Pista</div><div class="v">Cubierta · cristal</div></div><div><div class="cap">Bolas</div><div class="v">Pone Marc</div></div></div>
<a class="list li" href="club.html" style="margin-top:12px;display:flex"><div class="ico">{I["pin"]}</div><div class="grow"><div class="nm">Pàdel Sabadell</div><div class="meta">Carrer de Can Puiggener 12 · Vallès Occidental</div></div><span class="chev">›</span></a></div>''',
f'''<div class="btns" id="dockbtns"><a class="btn cta full" href="gate-otp.html">Unirse</a><a class="btn sec2 full" href="onboarding.html?from=match.html">Abrir en la app</a></div><div class="note">Google o Apple · WhatsApp es para escribir a Paddi</div>''',wa='Grupo «Pàdel dijous»')

# ---- torneo
pairs=[("Marc","Laia",3.5,"Pagado"),("Jordi","Núria",3.8,"Pagado"),("Pau","Clara",3.2,"Pendiente")]
torneo=mpage('torneo','Open de Tardor','Torneo',f'''
<div class="cap" style="margin-top:8px">Pàdel Sabadell · Torneo</div><h1 class="lt">Open de Tardor</h1><p class="sub">Americano mixto · nivel 3,0–4,0</p>
<div class="hero" style="margin-top:16px">
 <div class="when"><div class="date"><div class="m">nov</div><div class="d">15</div></div><div class="grow"><div class="b" style="font-size:17px">Domingo · 9:00–14:00</div><div class="sm mu">6 pistas · grupos + eliminatoria</div></div></div>
 <div class="row between" style="margin-top:16px"><span class="sm mu">Parejas inscritas</span><span class="b">12/16</span></div>
 <div class="prog" style="margin-top:6px"><i style="width:75%"></i></div>
 <div class="sm ac" style="margin-top:6px">Quedan 4 plazas</div>
</div>
<div class="kv sec" style="margin-top:12px"><div><div class="cap">Inscripción</div><div class="v">24 € / pareja</div></div><div><div class="cap">Cierre</div><div class="v">13 nov · 22:00</div></div><div><div class="cap">Premios</div><div class="v">Material + cena</div></div><div><div class="cap">Partidos</div><div class="v">Mín. 4</div></div></div>
<div class="sec"><div class="seg" data-group="t"><button class="on" data-tab="ins">Inscritos</button><button data-tab="cuadro">Cuadro</button><button data-tab="info">Normas</button></div></div>
<div class="tab on" data-pane="t" data-k="ins" style="margin-top:12px"><div class="list">{"".join(f'<div class="li"><div class="pair"><div class="avs">{av(a,"s")}{av(b,"s")}</div></div><div class="grow"><div class="nm">{a} y {b}</div><div class="meta">Pareja #{i+1}</div></div>{chip(r)}</div>' for i,(a,b,r,_) in enumerate(pairs))}<div class="li"><div class="av empty s">+</div><div class="grow"><div class="nm ac">Tu pareja</div><div class="meta">4 plazas libres</div></div></div></div><p class="sm mu" style="margin-top:8px">y 9 parejas más</p></div>
<div class="tab" data-pane="t" data-k="cuadro" style="margin-top:12px"><div class="card"><div class="cap" style="margin-bottom:10px">Grupo A · Pista 1 · 9:00</div><div class="vs"><div class="pair"><div class="avs">{av("Marc","s")}{av("Laia","s")}</div><span class="sm">Marc / Laia</span></div><span class="x">VS</span><div class="pair"><div class="avs">{av("Jordi","s")}{av("Núria","s")}</div><span class="sm">Jordi / Núria</span></div></div></div>
<div class="card" style="margin-top:10px"><div class="cap" style="margin-bottom:10px">Grupo A · Pista 2 · 9:00</div><div class="vs"><div class="pair"><div class="avs">{av("Pau","s")}{av("Clara","s")}</div><span class="sm">Pau / Clara</span></div><span class="x">VS</span><div class="pair"><div class="avs"><div class="av empty s">?</div><div class="av empty s">?</div></div><span class="sm ac">Plaza libre</span></div></div></div></div>
<div class="tab" data-pane="t" data-k="info" style="margin-top:12px"><div class="card stack sm"><p>• Partidos a 20 min, punto de oro.</p><p>• Pago en la app o en recepción antes del 13 nov.</p><p>• Bolas nuevas por partido.</p></div></div>''',
f'''<div class="row" style="margin-bottom:10px"><div class="grow"><div class="b">24 € / pareja</div><div class="sm mu">Pago en la app</div></div><a class="circ" href="#" data-toast="Enlace copiado para WhatsApp">{I["share"]}</a></div><div class="btns"><a class="btn cta full" href="gate-otp.html?next=torneo.html">Inscribirme</a><a class="btn sec2 full" href="onboarding.html?from=torneo.html">Abrir en la app</a></div>''',wa='Club Pàdel Sabadell')

# ---- club
nm=[("Sáb 7 nov · 19:30","Falta uno · Marc","3/4",3.5,"match.html","warn","Falta 1"),("Dom 8 nov · 10:00","Amistoso · Núria","2/4",3.0,"match.html","warn","Faltan 2"),("Mar 10 nov · 20:00","Liga interna · Pau","4/4",4.0,"match.html","ok","Completo")]
club=mpage('club','Pàdel Sabadell','',f'''
<div class="row" style="margin-top:4px"><div class="av l" style="background:var(--ac);border-radius:18px">PS</div><div class="grow"><h1 class="lt" style="font-size:26px;margin:0">Pàdel Sabadell</h1><div class="sm mu">Vallès Occidental · Sabadell</div></div></div>
<div class="row" style="gap:8px;margin-top:14px"><span class="pill">214 miembros</span><span class="pill">6 pistas</span><span class="pill ok"><i class="d"></i>Abierto</span></div>
<div class="row" style="margin-top:14px"><div class="row" style="gap:0">{av("Laia","s")}{av("Jordi","s").replace('class="av','style="margin-left:-8px;border:2px solid var(--bg)" class="av')}{av("Clara","s").replace('class="av','style="margin-left:-8px;border:2px solid var(--bg)" class="av')}</div><span class="sm mu">Laia, Jordi y Clara juegan aquí</span></div>
<div class="sec"><div class="seg" data-group="c"><button class="on" data-tab="p">Partidos</button><button data-tab="t">Torneos</button><button data-tab="m">Muro</button></div></div>
<div class="tab on" data-pane="c" data-k="p"><div class="sec" style="margin-top:16px"><div class="hd"><h3>Próximos partidos</h3><a href="match.html">Ver todos</a></div>
<div class="list">{"".join(f'<a class="li" href="{h}"><div class="ico">{I["ball"]}</div><div class="grow"><div class="nm">{t}</div><div class="meta">{d} · {c}</div></div><div style="text-align:right">{chip(r)}<div style="margin-top:4px"><span class="pill {pc}">{pl}</span></div></div><span class="chev">›</span></a>' for d,t,c,r,h,pc,pl in nm)}</div></div></div>
<div class="tab" data-pane="c" data-k="t"><div class="list" style="margin-top:16px"><a class="li" href="torneo.html"><div class="ico">{I["trophy"]}</div><div class="grow"><div class="nm">Open de Tardor</div><div class="meta">Dom 15 nov · 12/16 parejas</div></div><span class="chev">›</span></a></div></div>
<div class="tab" data-pane="c" data-k="m"></div>
<div class="sec"><div class="hd"><h3>Muro del club</h3><span class="pill">{I["lock"].replace("<svg","<svg width=12 height=12 stroke=currentColor fill=none stroke-width=2")}Miembros</span></div>
<div class="locked"><div class="list"><div class="li">{av("Núria")}<div class="grow"><div class="nm">Núria · Admin</div><div class="meta">¡Pistas 5 y 6 cubiertas desde el lunes! 🎾</div></div></div>
<div class="li blurred">{av("Pau")}<div class="grow"><div class="nm">Pau</div><div class="meta">¿Alguien para el jueves a las 20h nivel 4?</div></div></div><div class="li blurred">{av("Clara")}<div class="grow"><div class="nm">Clara</div><div class="meta">Fotos del torneo de octubre ya subidas</div></div></div></div>
<div style="position:absolute;left:0;right:0;bottom:16px;text-align:center"><a class="btn sm sec2" href="onboarding.html?from=club.html">{I["lock"]}Únete para leer el muro</a></div></div></div>''',
f'''<div class="btns"><a class="btn cta full" href="gate-otp.html?next=club.html">Unirme al club</a><a class="btn sec2 full" href="onboarding.html?from=club.html">Descargar la app</a></div>''',wa='enlace del club',back='match.html')

# ---- chat
chat=mpage('chat','Chat','Pàdel dijous · 7 nov',f'''
<div class="row" style="margin-top:4px">{av("Marc","s")}<div class="grow"><div class="b">Partido del sábado 19:30</div><div class="sm mu">4 participantes · Pàdel Sabadell</div></div><a class="pill" href="match.html">Ver partido ›</a></div>
<div class="daysep">Hoy</div>
<div class="msgrow">{av("Marc","s")}<div class="bub in"><div class="who">Marc</div>Laia y Jordi dentro. ¿Alguien trae a un cuarto? 🎾</div></div>
<div class="msgrow">{av("Laia","s")}<div class="bub in"><div class="who">Laia</div>He pasado el enlace al grupo del club 👇</div></div>
<div class="locked" style="min-height:300px;margin-top:4px">
 <div class="blurred"><div class="bub out">Yo me apunto si es pista cubierta</div><div class="msgrow">{av("Jordi","s")}<div class="bub in">Sí, la 3, cubierta. Pongo bolas nuevas</div></div><div class="bub out">Perfecto, nos vemos allí</div><div class="msgrow">{av("Marc","s")}<div class="bub in">Confirmad en la app porfa ✅</div></div></div>
 <div class="lockcard"><div class="ico">{I["lock"]}</div><div class="b" style="font-size:17px">12 mensajes más</div><p class="sm mu" style="margin-top:6px">El chat del partido vive en la app: mensajes, avisos y confirmaciones.</p></div>
</div>
<div class="composer" style="opacity:.5">{I["lock"].replace("<svg","<svg width=16 height=16 stroke=currentColor fill=none stroke-width=2")}Para escribir, abre la app</div>''',
f'''<div class="btns"><a class="btn cta full" href="onboarding.html?from=chat.html">Abrir en la app</a><a class="btn sec2 full" href="onboarding.html?from=chat.html">Descargar</a></div>''',wa='Marc te ha invitado',back='match.html')

# ---- onboarding (sheet over blurred match)
onb=f'''<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Descarga Padelada</title><link rel="stylesheet" href="css/app.css"></head>
<body class="m"><div class="phone">{status()}<div class="scroll blurred" style="padding-top:20px"><h1 class="lt">Falta uno</h1><div class="hero" style="height:300px"></div></div>
<div class="backdrop"></div><div class="sheet"><div class="grab"></div>
<div class="row"><div class="av" style="background:var(--cta);border-radius:14px;width:56px;height:56px;font-size:22px">P</div><div class="grow"><h2 style="font-size:22px">Descarga Padelada</h2><div class="sm mu">Gratis · iPhone</div></div></div>
<div class="stack" style="margin-top:20px">
<div class="reason"><div class="ico">{I["check"]}</div><div><div class="b">Confirma tu plaza</div><div class="sm mu">Un toque y el organizador lo sabe al momento.</div></div></div>
<div class="reason"><div class="ico">{I["chat"]}</div><div><div class="b">Chat del partido</div><div class="sm mu">Habla con Marc, Laia y Jordi sin grupos de WhatsApp.</div></div></div>
<div class="reason"><div class="ico">{I["bell"]}</div><div><div class="b">Avisos de «Falta uno»</div><div class="sm mu">Te avisamos cuando buscan alguien de tu nivel cerca.</div></div></div></div>
<div style="text-align:center;margin-top:24px"><a class="store" href="#" data-toast="Abriría App Store (.tp)"><svg width="22" height="22" viewBox="0 0 24 24" fill="#F5F5F7"><path d="M16.4 12.6c0-2.4 2-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.9-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2-1.1 2.8-2.3.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-.9-2.5-3.7zM14.2 5.5c.6-.8 1.1-1.8 1-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2.1-.5 2.7-1.3z"/></svg><span style="text-align:left"><small>Descárgalo en el</small><b>App Store</b></span></a><div class="cap" style="margin-top:6px">.tp · badge oficial en producción</div></div>
<a class="btn ghost full" style="margin-top:16px" href="match.html" id="cont">Seguir en la web</a></div></div>
<script src="js/app.js"></script><script>const f=new URLSearchParams(location.search).get('from');if(f)document.getElementById('cont').href=f;</script></body></html>'''

# ---- gate: Google + Apple + WA→Paddi (sin SMS)
g_ico = '<svg width="18" height="18" viewBox="0 0 18 18"><path fill="#EA4335" d="M9 7.2v3.5h4.9c-.2 1.2-1.5 3.5-4.9 3.5A5.4 5.4 0 119 3.6c1.5 0 2.6.7 3.2 1.2l2.2-2.1A8.7 8.7 0 009 .5 8.5 8.5 0 1017.5 9c0-.6-.1-1.2-.2-1.8H9z"/><path fill="#34A853" d="M9 17.5c2.3 0 4.2-.7 5.6-2l-2.7-2.1c-.8.5-1.8.9-2.9.9A5.4 5.4 0 013.6 9.9L.8 12A8.5 8.5 0 009 17.5z"/><path fill="#FBBC05" d="M3.6 9.9A5.1 5.1 0 013.3 9c0-.7.1-1.3.3-1.9L.8 5A8.4 8.4 0 00.5 9c0 1.4.3 2.7.8 3.9l2.8-3z"/><path fill="#4285F4" d="M17.3 7.2H9v3.5h4.9A4.2 4.2 0 0111.9 13.4l2.7 2.1c1.6-1.5 2.7-3.7 2.7-6.5 0-.6-.1-1.2-.2-1.8z"/></svg>'
a_ico = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.4 2-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.9-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2-1.1 2.8-2.3.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-.9-2.5-3.7zM14.2 5.5c.6-.8 1.1-1.8 1-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2.1-.5 2.7-1.3z"/></svg>'
wa_ico = I["wa"].replace("<svg",'<svg width="18" height="18" stroke="currentColor" fill="none" stroke-width="2"')
otp=f'''<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Unirse · Padelada</title><link rel="stylesheet" href="css/app.css"></head>
<body class="m"><div class="phone" id="otp">{status()}<div class="scroll blurred" style="padding-top:20px"><h1 class="lt">Falta uno</h1><div class="hero" style="height:280px"></div></div>
<div class="backdrop"></div><div class="sheet"><div class="grab"></div>
<div data-step="1">
<h2 style="font-size:22px">Unirse al partido</h2>
<p class="sm mu" style="margin-top:6px">Entra con Google o Apple en un toque. Sin contraseñas.</p>
<div class="callout" style="margin-top:14px"><div class="ico" style="width:28px;height:28px;flex:none">{I["ball"]}</div><div><div class="b sm">Partido de Marc</div><div class="sm mu">Sáb 7 nov · 19:30 · Pàdel Sabadell · Pista 3</div></div></div>
<button class="btn prov full" style="margin-top:18px" id="goGoogle" data-provider="Google">{g_ico}Continuar con Google</button>
<button class="btn prov full" style="margin-top:10px" id="goApple" data-provider="Apple">{a_ico}Continuar con Apple</button>
<div class="or"><span>o escribe a Paddi</span></div>
<button class="btn sec2 full" id="goWA">{wa_ico}WhatsApp · hablar con Paddi</button>
<p class="sm mu" style="margin-top:12px;text-align:center">Si eres miembro del club, WhatsApp es obligatorio: canal de emergencia y avisos del partido.</p>
<a class="btn link full" style="margin-top:12px" href="onboarding.html?from=match.html">Prefiero abrir la app</a>
</div>
<div data-step="2" hidden>
<div class="row" style="gap:12px;align-items:center;margin-bottom:12px"><div class="av" style="background:var(--cta);border-radius:14px;width:44px;height:44px;font-size:15px;flex:none">P</div><div class="grow"><div class="b">Paddi</div><div class="sm mu">Asistente · WhatsApp corporativo</div></div></div>
<div class="bub in" style="max-width:100%"><div class="who">Paddi</div>Hola 👋 Soy Paddi. ¿Quieres unirte al partido de Marc el sábado 7 nov a las 19:30?</div>
<div class="bub out" style="max-width:100%;margin-top:8px"><div class="who">Tú</div>Sí, quiero la plaza libre.</div>
<div class="bub in" style="max-width:100%;margin-top:8px"><div class="who">Paddi</div>Hecho. Plaza reservada. Confírmala en la app para que cuente al organizador.</div>
<button class="btn cta full" style="margin-top:18px" id="confirmwa">Listo · ver el partido</button>
<button class="btn sec2 full" style="margin-top:10px" id="back1">Volver</button>
</div>
<div data-step="3" hidden style="text-align:center"><div class="ico" style="margin:6px auto 12px;width:56px;height:56px;border-radius:50%;background:rgba(255,181,71,.14)">{I["check"].replace("<svg",'<svg style="stroke:#FFB547"')}</div><h2 style="font-size:22px">¡Estás dentro!</h2><p class="sm mu" style="margin-top:6px" id="joinsum">Plaza reservada en el partido de Marc · sáb 7 nov 19:30. Confírmala en la app para que cuente.</p>
<a class="btn cta full" style="margin-top:18px" id="done" href="match.html?joined=1">Ver el partido</a></div>
</div></div><script src="js/app.js"></script><script>const n=new URLSearchParams(location.search).get('next');if(n){{document.querySelector('a.btn.link').href='onboarding.html?from='+n;const d=document.getElementById('done');const u=new URL(n,location.href);u.searchParams.set('joined','1');d.href=u.pathname.split('/').pop()+u.search}}</script></body></html>'''

# ---- desktop
def dpage(name,title,crumb,actions,body,active):
    nav=[('org-home.html','home','Inicio',''),('org-partido.html','ball','Partidos','5'),('org-torneo.html','trophy','Torneos','1'),('#','users','Jugadores',''),('#','cal','Calendario',''),('club.html','pin','Club público','')]
    items=''.join(f'<a class="it {"on" if l==active else ""}" href="{h}" {"data-toast=\"Fuera de v1\"" if h=="#" else ""}>{I[i]}{l}{f"<span class=n>{n}</span>" if n else ""}</a>' for h,i,l,n in nav)
    return f'''<!doctype html><html lang="es"><head><meta charset="utf-8"><title>{title} · Padelada Org</title><link rel="stylesheet" href="css/app.css"></head><body class="d"><div class="app">
<aside class="side"><div class="brand"><i>P</i>Padelada <span class="pill" style="margin-left:auto">Org</span></div><div class="grp">Pàdel Sabadell</div>{items}<div class="grp">Cuenta</div><a class="it" href="#" data-toast="Fuera de v1">{I["gear"]}Ajustes</a>
<div class="me">{av("Marc","s")}<div class="grow"><div class="b sm">Marc Puig</div><div class="sm mu">Organizador</div></div></div></aside>
<div><div class="top"><div><div class="crumb">{crumb}</div><h1>{title}</h1></div><div class="sp"></div><div class="search">{I["search"]}Buscar jugador, partido…</div>{LANG}{actions}</div><div class="main">{body}</div></div></div><script src="js/app.js"></script></body></html>'''
def pl(k):return {'ok':'<span class="pill ok"><i class="d"></i>{}</span>','warn':'<span class="pill warn"><i class="d"></i>{}</span>','err':'<span class="pill err"><i class="d"></i>{}</span>','n':'<span class="pill">{}</span>'}[k]
today=[("19:30","Falta uno · Marc","Pista 3","3/4","warn","Falta 1","org-partido.html"),("20:00","Clase grupal · Núria","Pista 1","4/4","ok","Completo","org-partido.html"),("21:00","Liga interna J4","Pista 5","4/4","ok","Confirmado","org-partido.html"),("21:00","Amistoso · Pau","Pista 6","2/4","err","Faltan 2","org-partido.html")]
home=dpage('home','Hola, Marc','Sábado 7 nov · Pàdel Sabadell',f'<a class="btn sm sec2" href="org-torneo.html">{I["trophy"]}Nuevo torneo</a><a class="btn sm cta" href="org-partido.html">{I["plus"]}Crear partido</a>',f'''
<div class="grid g4">{"".join(f'<div class="card stat"><div class="cap">{a}</div><div class="v">{b}</div><div class="d">{c}</div></div>' for a,b,c in [("Partidos hoy","4","1 sin completar"),("Jugadores activos","86","+12 este mes"),("Ocupación pistas","78%","sáb tarde"),("Pendiente de cobro","72 €","3 parejas")])}</div>
<div class="grid g4" style="margin-top:20px">{"".join(f'<a class="qa" href="{h}"><div class="ico">{I[i]}</div><div><div class="b">{t}</div><div class="sm mu">{s}</div></div></a>' for h,i,t,s in [("org-partido.html","ball","Publicar «Falta uno»","Avisa por nivel"),("org-torneo.html","trophy","Abrir inscripciones","Open de Tardor"),("#","wa","Compartir en WhatsApp","Enlace del club"),("org-torneo.html","euro","Revisar pagos","3 pendientes")])}</div>
<div class="grid g-main" style="margin-top:20px">
<div class="panel"><div class="ph"><h3>Hoy · sábado 7 nov</h3><div class="seg" style="width:240px"><button class="on">Hoy</button><button>Mañana</button><button>Semana</button></div></div>
<table><thead><tr><th>Hora</th><th>Partido</th><th>Pista</th><th>Jugadores</th><th>Nivel</th><th>Estado</th><th></th></tr></thead><tbody>
{"".join(f'<tr class="click" data-href="{h}"><td class="b">{t}</td><td>{n}</td><td class="mu">{p}</td><td>{c}</td><td>{chip(3.5 if i%2==0 else 4.0)}</td><td>{pl(k).format(s)}</td><td class="mu">›</td></tr>' for i,(t,n,p,c,k,s,h) in enumerate(today))}
</tbody></table></div>
<div class="stack"><div class="panel"><div class="ph"><h3>Torneos</h3><a class="sm ac b" href="org-torneo.html">Ver todos</a></div>
<a class="li" href="org-torneo.html"><div class="ico">{I["trophy"]}</div><div class="grow"><div class="nm">Open de Tardor</div><div class="meta">Dom 15 nov · 12/16 parejas</div><div class="prog" style="margin-top:8px"><i style="width:75%"></i></div></div></a>
<div class="li"><div class="ico">{I["cal"]}</div><div class="grow"><div class="nm">Nadal Mixt</div><div class="meta">Borrador · 20 dic</div></div>{pl("n").format("Borrador")}</div></div>
<div class="panel"><div class="ph"><h3>Solicitudes</h3></div><div class="empty"><div class="ico">{I["check"]}</div><div class="b" style="color:var(--tx)">Todo al día</div><div class="sm">No hay solicitudes de acceso al club.</div></div></div></div></div>''','Inicio')

ins=[("Marc","Laia",3.5,"ok","Pagado","12 oct"),("Jordi","Núria",3.8,"ok","Pagado","14 oct"),("Pau","Clara",3.2,"warn","Pendiente","28 oct"),("Laia","Jordi",3.6,"ok","Pagado","29 oct"),("Núria","Pau",3.3,"warn","Pendiente","30 oct"),("Clara","Marc",3.9,"warn","Pendiente","31 oct")]
tor=dpage('torneo','Open de Tardor','Torneos › Open de Tardor',f'<a class="btn sm sec2" href="torneo.html">Ver página pública</a><a class="btn sm cta" href="#" data-toast="Enlace copiado · listo para WhatsApp">{I["wa"]}Compartir en WhatsApp</a>',f'''
<div class="grid g4">{"".join(f'<div class="card stat"><div class="cap">{a}</div><div class="v">{b}</div><div class="d">{c}</div></div>' for a,b,c in [("Parejas","12/16","4 plazas libres"),("Cobrado","216 €","de 288 €"),("Pendiente","72 €","3 parejas"),("Cierre","13 nov","22:00")])}</div>
<div class="grid g-main" style="margin-top:20px"><div class="panel"><div class="ph"><h3>Inscritos</h3><div class="seg" style="width:300px"><button class="on">Todos 12</button><button>Pagado 9</button><button>Pendiente 3</button></div></div>
<table><thead><tr><th>#</th><th>Pareja</th><th>Nivel</th><th>Inscrita</th><th>Pago</th><th></th></tr></thead><tbody>
{"".join(f'<tr><td class="mu">{i+1}</td><td><div class="row">{av(a,"s")}{av(b,"s").replace("class=\"av","style=\"margin-left:-18px;border:2px solid var(--s1)\" class=\"av")}<span class="b">{a} / {b}</span></div></td><td>{chip(r)}</td><td class="mu">{d}</td><td>{pl(k).format(s)}</td><td style="text-align:right">{"<button class=\"btn sm ghost\" data-confirm>Marcar pagado</button>" if k=="warn" else ""}</td></tr>' for i,(a,b,r,k,s,d) in enumerate(ins))}
</tbody></table><div class="empty" style="padding:16px;border-top:1px solid var(--bd)">+ 6 parejas más · <a class="ac b" href="#" data-toast="Paginación (demo)">Ver todas</a></div></div>
<div class="stack"><div class="panel"><div class="ph"><h3>Enlace público</h3></div><div class="pb"><div class="copy"><span>app.padelada.com/t/open-tardor</span><button class="btn sm sec2" data-toast="Enlace copiado">Copiar</button></div><a class="btn sm cta full" style="margin-top:10px" href="#" data-toast="Abriría WhatsApp con el enlace">{I["wa"]}Compartir en WhatsApp</a></div></div>
<div class="panel"><div class="ph"><h3>Horario · dom 15 nov</h3></div><div class="pb sched">
{"".join(f'<div class="h">{h}</div><div class="s"><div class="slot {"c" if c else ""}">{t}</div></div>' for h,t,c in [("9:00","Fase de grupos · Pistas 1–6",1),("11:00","Cuartos de final",0),("12:30","Semifinales",0),("13:30","Final · Pista 3",1),("14:00","Entrega de premios",0)])}</div></div></div></div>''','Torneos')

pp=[("Marc",3.5,"ok","Confirmado","Organizador"),("Laia",3.4,"ok","Confirmada","Hace 2 días"),("Jordi",3.7,"warn","Sin confirmar","Invitado por Marc"),]
par=dpage('partido','Falta uno · sáb 7 nov','Partidos › 19:30 Pista 3',f'<a class="btn sm sec2" href="match.html">Ver como jugador</a><a class="btn sm sec2" href="#" data-toast="Enlace copiado para WhatsApp">{I["share"]}Compartir</a><a class="btn sm cta" href="#" data-toast="Aviso enviado a 14 jugadores de nivel 3–4">{I["bell"]}Avisar «Falta uno»</a>',f'''
<div class="grid g-main"><div class="stack"><div class="panel"><div class="ph"><h3>Jugadores · 3/4</h3><div style="width:160px" class="prog"><i style="width:75%"></i></div></div>
<table><thead><tr><th>Jugador</th><th>Nivel</th><th>Estado</th><th>Nota</th><th></th></tr></thead><tbody>
{"".join(f'<tr><td><div class="row">{av(n,"s")}<span class="b">{n}</span></div></td><td>{chip(r)}</td><td>{pl(k).format(s)}</td><td class="mu">{m}</td><td style="text-align:right">{"<button class=\"btn sm ghost\" data-toast=\"Recordatorio enviado a Jordi\">Recordar</button>" if k=="warn" else ""}</td></tr>' for n,r,k,s,m in pp)}
<tr><td><div class="row"><div class="av empty s">+</div><span class="ac b">Plaza libre</span></div></td><td><span class="lv lv4" style="opacity:.6">3,0–3,8</span></td><td>{pl("err").format("Falta 1")}</td><td class="mu">Publicado en el club</td><td style="text-align:right"><button class="btn sm sec2" data-toast="Invitación enviada">Invitar</button></td></tr></tbody></table></div>
<div class="callout"><div class="ico">{I["qr"]}</div><div><div class="b">Check-in con QR y marcador: en la app</div><div class="mu" style="margin-top:2px">El día del partido, los jugadores escanean el QR de la pista desde Padelada en el móvil. La web solo muestra el estado.</div></div></div></div>
<div class="stack"><div class="panel"><div class="ph"><h3>Detalles</h3><button class="btn sm ghost" data-toast="Edición (demo)">Editar</button></div><div class="pb"><div class="kv"><div><div class="cap">Fecha</div><div class="v">Sáb 7 nov</div></div><div><div class="cap">Hora</div><div class="v">19:30–21:00</div></div><div><div class="cap">Pista</div><div class="v">3 · cubierta</div></div><div><div class="cap">Precio</div><div class="v">9 € / pers.</div></div><div><div class="cap">Nivel</div><div class="v">3,0–3,8</div></div><div><div class="cap">Visibilidad</div><div class="v">Club</div></div></div></div></div>
<div class="panel"><div class="ph"><h3>Enlace del partido</h3></div><div class="pb"><div class="copy"><span>app.padelada.com/m/7nov-1930</span><button class="btn sm sec2" data-toast="Enlace copiado">Copiar</button></div></div></div>
<div class="panel"><div class="ph"><h3>Actividad</h3></div><div class="li">{av("Laia","s")}<div class="grow sm">Laia confirmó<div class="mu">hace 2 días</div></div></div><div class="li">{av("Jordi","s")}<div class="grow sm">Jordi fue invitado<div class="mu">ayer</div></div></div></div></div></div>''','Partidos')

for f,c in dict(match=match,torneo=torneo,club=club,chat=chat,onboarding=onb,**{'gate-otp':otp,'org-home':home,'org-torneo':tor,'org-partido':par}).items():
    open(f+'.html','w').write(c)
open('_lab.html','w').write('<!doctype html><meta charset=utf-8><title>solo laboratorio</title><pre>solo laboratorio — no es producto\n'+'\n'.join(f'<a href="{x}.html">{x}.html</a>' for x in 'match torneo club chat onboarding gate-otp org-home org-torneo org-partido'.split())+'</pre>')
