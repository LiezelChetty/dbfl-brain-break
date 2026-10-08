from pathlib import Path
import json
p=Path(__file__).resolve().parent
app=p.joinpath('app.js').read_text().replace('ICONS',p.joinpath('icons.json').read_text())
html=p.joinpath('template.html').read_text().replace('/*CSS*/',p.joinpath('style.css').read_text()).replace('/*ENGINE*/',p.joinpath('engines.js').read_text()).replace('/*PATH*/',p.joinpath('connect-engine.js').read_text()).replace('/*APP*/',app)
p.joinpath('index.html').write_text(html)
print('Built index.html')
