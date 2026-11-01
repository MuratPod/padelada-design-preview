import re
D='/workspace/padelada-design/com-live-diff'
h=open(D+'/live-es-original.html').read().replace('\u00a0',' ')
h=h.replace('"../','"./').replace(' ../',' ./')
h=re.sub(r'(src|href|srcset)="/(img|assets|fonts)/',r'\1="./\2/',h)
h=re.sub(r'(, )/(img|assets)/',r'\1./\2/',h)
h=h.replace("if(s==='light'||s==='dark')document.documentElement.setAttribute('data-theme',s);","document.documentElement.setAttribute('data-theme',(s==='light'||s==='dark')?s:'dark');")
h=h.replace('</head>','<link rel="stylesheet" href="./diff/diff.css">\n<script defer src="./diff/diff.js"></script>\n</head>',1)
def rep(a,b):
    global h
    assert a in h, a[:60]; h=h.replace(a,b,1)
rep('<h1 class="r d1">Pádel donde todo es justo</h1>','<h1 class="r d1">Tu nivel real. <span class="nobr">Sin trampas.</span></h1>')
h=re.sub(r'<p class="sub r d2">Siempre aparece[^<]*</p>','<p class="sub r d2">Siempre aparece el cuarto. Un nivel que confirman los partidos. Paddi te echa una\u00a0mano, y cada uno habla su idioma.</p>',h,1)
rep('<section class="scene hero" id="inicio">','<section class="scene hero dx-drive" id="inicio">')
rep('<h2 class="r d1">Habla en tu idioma</h2>','<p class="dx-pillar r">Mensajería · tu idioma</p><h2 class="r d1">Habla en tu idioma</h2>')
rep('<section class="scene chats" id="chats">','<section class="scene chats dx-swipe" id="chats">')
h=re.sub(r'<h2 class="r d1">Un nivel en.el.que puedes confiar</h2>',
 '<p class="dx-pillar r">Nivel honesto</p><h2 class="r d1">Un nivel en el que puedes confiar</h2><p class="dx-rating r d1" aria-label="Nivel 3,42"><span class="dx-num" data-to="3.42">0,00</span><span class="dx-rating-note">confirmado por 4 de 4 jugadores · Baix Empordà</span></p>',h,1)
paddi='''
<section class="scene dx-paddi" id="paddi" aria-labelledby="paddi-h"><div class="copy">
<p class="dx-pillar r">Inteligencia</p>
<h2 class="r d1" id="paddi-h">Paddi, a tu lado</h2>
<p class="sub r d2">Paddi vive dentro de la mensajería de Padelada. No juega por ti ni te pone nota: te ayuda a encontrar partido, entiende tu nivel y te lo explica con calma, en tu idioma.</p>
</div>
<div class="dx-paddi-talk r d3">
<img class="dx-paddi-face" src="./diff/paddi.svg" alt="" width="72" height="72">
<ol class="dx-lines">
<li class="dx-q"><span class="dx-who">Lucía</span>¿Hay alguien de mi nivel para el jueves a las 19:00?</li>
<li class="dx-a"><span class="dx-who">Paddi</span>Sí. En Baix Empordà, Javier, Marta y Andrés están entre 3,2 y 3,6 y libres el jueves. ¿Les aviso de que falta uno?</li>
<li class="dx-q"><span class="dx-who">Lucía</span>¿Por qué he bajado a 3,38?</li>
<li class="dx-a"><span class="dx-who">Paddi</span>El martes perdisteis 6–3, 6–4 contra una pareja de 3,1. Los cuatro lo confirmasteis con el QR, así que cuenta. Nadie puede cambiarlo, tampoco yo.</li>
</ol>
<p class="dx-paddi-foot">Paddi responde en el chat de la app. Tu nivel solo lo mueven los partidos confirmados.</p>
</div></section>
'''
i=h.index('<section class="scene" id="nivel">'); h=h[:i]+paddi+h[i:]
open(D+'/index.html','w').write(h)
