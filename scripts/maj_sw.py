#!/usr/bin/env python3
"""Met à jour la liste des fichiers mis en cache par sw.js et son numéro de version.

À lancer après chaque modification de l'appli, avant de publier :
    python3 scripts/maj_sw.py
La liste est lue dans index.html (scripts, feuilles de style, icônes, manifeste).
La version est une empreinte du contenu : elle ne change que si un fichier change.
"""
import hashlib
import json
import os
import re
import sys

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def chemin_local(url):
    return not re.match(r'^(https?:|data:|//|#|mailto:)', url)


def main():
    with open(os.path.join(RACINE, 'index.html'), encoding='utf-8') as f:
        html = f.read()
    urls = ['./']
    for u in re.findall(r'(?:src|href)="([^"]+)"', html):
        if chemin_local(u) and u not in urls:
            urls.append(u)
    with open(os.path.join(RACINE, 'manifest.webmanifest'), encoding='utf-8') as f:
        manifeste = json.load(f)
    for icone in manifeste.get('icons', []):
        if icone['src'] not in urls:
            urls.append(icone['src'])

    empreinte = hashlib.sha256()
    for u in ['index.html'] + urls[1:]:
        fichier = os.path.join(RACINE, u.split('?')[0])
        if not os.path.isfile(fichier):
            sys.exit('Fichier introuvable : ' + u)
        with open(fichier, 'rb') as f:
            empreinte.update(u.encode() + b'\0' + f.read())
    version = empreinte.hexdigest()[:12]

    bloc = ('/* ASSETS:debut */\n'
            "const VERSION = '" + version + "';\n"
            'const ASSETS = [\n' + ',\n'.join("  '" + u + "'" for u in urls) + '\n];\n'
            '/* ASSETS:fin */')
    sw = os.path.join(RACINE, 'sw.js')
    with open(sw, encoding='utf-8') as f:
        code = f.read()
    nouveau = re.sub(r'/\* ASSETS:debut \*/.*?/\* ASSETS:fin \*/', lambda m: bloc, code, flags=re.S)
    if nouveau != code:
        with open(sw, 'w', encoding='utf-8') as f:
            f.write(nouveau)
    print('sw.js : version ' + version + ', ' + str(len(urls)) + ' fichiers en cache')


if __name__ == '__main__':
    main()
