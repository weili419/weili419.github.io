#!/usr/bin/env python3
"""Export a static GitHub Pages guide and map into the parent thailand folder."""
import os
import shutil
import html
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT.parent / 'index.html'
MAP_OUTPUT = ROOT.parent / 'map.html'
ASSETS = ROOT.parent / 'assets'
ASSETS.mkdir(exist_ok=True)
names = ['map-vendor/maplibre-gl.css', 'map-vendor/maplibre-gl.js',
         'trip-map.css', 'trip-food.css', 'trip-plan.css', 'trip-data.js',
         'hotel-data.js', 'food-data.js', 'trip-land.js', 'trip-map.js',
         'trip-guide.js', 'phi-phi-lay.jpg', 'favicon.svg']
map_html = (ROOT / 'public/trip-map.html').read_text()
for name in names:
    destination = ASSETS / name
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(ROOT / 'public' / name, destination)
    map_html = map_html.replace('href="' + name + '"', 'href="assets/' + name + '"')
    map_html = map_html.replace('src="' + name + '"', 'src="assets/' + name + '"')
css = '\n'.join(p.read_text() for p in (ROOT / 'dist/client/_next/static/css').glob('*.css'))
assert css, 'Run the site build before exporting.'
css += '.pack-item input[type=checkbox]{appearance:auto;accent-color:#185adb;width:18px;height:18px;flex-shrink:0;margin-top:6px}.pack-item:has(input:checked) span{color:#8291a1;text-decoration:line-through}'
(ASSETS / 'guide.css').write_text(css)
VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}

class Exporter(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.out=[]
        self.skip=None
        self.depth=0
        self.count=0
    def handle_decl(self, decl):
        self.out.append('<!'+decl+'>')
    def handle_starttag(self, tag, attrs):
        if self.skip:
            if tag==self.skip:self.depth+=1
            return
        a=dict(attrs)
        if tag in {'script','style'}:
            self.skip=tag;self.depth=1;return
        if tag=='link':return
        if tag=='a' and a.get('href','').startswith('/trip-map.html#'):
            attrs=[(k, MAP_OUTPUT.name+'#'+v.split('#',1)[1] if k=='href' else v) for k,v in attrs]
        if a.get('data-slot')=='checkbox' or a.get('role')=='checkbox':
            self.out.append('<input type="checkbox"'+''.join(' '+k+'="'+html.escape(v,quote=True)+'"' for k,v in attrs if k in {'id','aria-label'} and v)+'>')
            self.count+=1
            if tag not in VOID:self.skip=tag;self.depth=1
            return
        if tag=='input' and (a.get('type') in {'checkbox','hidden'} or 'hidden' in a):return
        if tag=='iframe' and a.get('src')=='/trip-map.html':
            attrs=[(k,'map.html' if k=='src' else v) for k,v in attrs]
        if tag=='img' and a.get('src')=='/phi-phi-lay.jpg':attrs=[(k,'assets/phi-phi-lay.jpg' if k=='src' else v) for k,v in attrs]
        self.out.append('<'+tag+''.join(' '+k+('="'+html.escape(v,quote=True)+'"' if v is not None else '') for k,v in attrs)+'>')
    def handle_endtag(self, tag):
        if self.skip:
            if tag==self.skip:
                self.depth-=1
                if not self.depth:self.skip=None
            return
        if tag=='head':self.out.append('<link rel="stylesheet" href="assets/guide.css"><link rel="icon" href="assets/favicon.svg">')
        if tag=='body':self.out.append('<script src="assets/trip-guide.js"></script>')
        if tag not in VOID:self.out.append('</'+tag+'>')
    def handle_data(self, data):
        if not self.skip:self.out.append(data)
    def handle_entityref(self, name):
        if not self.skip:self.out.append('&'+name+';')
    def handle_charref(self, name):
        if not self.skip:self.out.append('&#'+name+';')

parser=Exporter()
parser.feed(urlopen(os.environ.get('PREVIEW_URL','http://localhost:4176/'),timeout=60).read().decode())
result=''.join(parser.out)
assert parser.count==14, f'Expected 14 packing checkboxes, got {parser.count}'
assert 'src="map.html"' in result and '普吉岛：把一天留给浮潜' in result
assert '三个人，三张床，住哪里？' in result and result.count('data-hotel-map=')==9
assert 'data-plan-switch="A"' in result and 'data-plan-switch="B"' in result
assert 'assets/trip-guide.js' in result
OUTPUT.write_text(result)
MAP_OUTPUT.write_text(map_html)
print(f'Exported {OUTPUT.name}: {OUTPUT.stat().st_size:,} bytes; {MAP_OUTPUT.name}; {len(names)+1} assets; {parser.count} packing checkboxes.')
