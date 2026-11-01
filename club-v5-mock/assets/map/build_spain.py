# Real Spain SVG from Natural Earth 1:50m (public domain). Usage: python3 build_spain.py /path/ne_50m_admin_0_countries.geojson
import json,math,sys,re
d=json.load(open(sys.argv[1]))
F={f['properties']['ADM0_A3']:f['geometry'] for f in d['features']}
k=math.cos(math.radians(40));S=78
X0,Y0=-9.6,44.0
def P(lon,lat,ox=0,oy=0,s=S): return ((lon-X0)*k*s+ox,(Y0-lat)*s+oy)
def polys(g): return g['coordinates'] if g['type']=='MultiPolygon' else [g['coordinates']]
def path(g,flt,**kw):
  out=[]
  for poly in polys(g):
    r=poly[0]
    if not flt(r): continue
    pts=[P(x,y,**kw) for x,y in r]
    out.append('M'+'L'.join(f'{a:.1f},{b:.1f}' for a,b in pts)+'Z')
  return ''.join(out)
mainland=lambda r: r[0][1]>34
can=lambda r: r[0][1]<30
ctx=''.join(f'<path class="ctx" d="{path(F[c],lambda r:r[0][1]>34)}"/>' for c in ('PRT','FRA','AND','MAR'))
esp=path(F['ESP'],mainland)
# Canarias inset (lon -18.2..-13.3, lat 27.6..29.5) bottom-left
cx0,cy0=12,572;s2=40
can_d=path(F['ESP'],can,ox=-((-18.3-X0)*k*s2)+cx0,oy=-((Y0-29.5)*s2)+cy0,s=s2)
pins=[('Alt Empordà',3.0,42.27,'comarca.html?z=Alt%20Empord%C3%A0&n=58'),('Baix Empordà',3.1,41.95,'comarca.html?z=Baix%20Empord%C3%A0&n=214'),('Gironès',2.82,42.0,'comarca.html?z=Giron%C3%A8s'),('Selva',2.65,41.8,'comarca.html?z=Selva'),('Maresme',2.45,41.58,'comarca.html?z=Maresme'),('Barcelonès',2.15,41.40,'comarca.html?z=Barcelon%C3%A8s'),('Segrià',0.62,41.62,'comarca.html?z=Segri%C3%A0')]
pg=''
for i,(n,lo,la,h) in enumerate(pins):
  x,y=P(lo,la);tx=x+12 if i%2==0 else x-12;an='start' if i%2==0 else 'end'
  pg+=f'<a class="pin" href="{h}"><circle class="r" cx="{x:.1f}" cy="{y:.1f}" r="7"/><circle class="c" cx="{x:.1f}" cy="{y:.1f}" r="5"/><text x="{tx:.1f}" y="{y+4:.1f}" text-anchor="{an}">{n}</text></a>'
W,H=round((4.6-X0)*k*S)+10,round((Y0-35.8)*S)
svg=(f'<svg class="spain" viewBox="0 0 {W} {H}" role="img" aria-label="Mapa de España con las comarcas activas">'
 f'<rect class="sea" width="{W}" height="{H}"/>{ctx}<path class="land" d="{esp}"/>'
 f'<g class="canarias"><path class="inset" d="M4,{cy0-22}H{cx0+176}V{H-4}"/><path class="land" d="{can_d}"/><text x="{cx0}" y="{cy0-6}">Canarias</text></g>'
 f'{pg}</svg>')
print(svg)
