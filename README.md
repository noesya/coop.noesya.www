# Noesya

## Setup des domaines

Dans Netlify, domaine principal (avec/sans www) et domaines secondaires (sans www)
- `noesya.netlify.app` (par défaut)
- `www.noesya.coop` (principal)
- `noesya.coop` (redirige vers principal)
- `noesya.com` (alias)
- `noesya.fr` (alias)

Table de redirections dans le fichier [`netlify.toml`](https://github.com/noesya/noesya-www/blob/master/netlify.toml)

### noesya.coop

```
@ 300 IN A 75.2.60.5
www 300 IN CNAME noesya.netlify.app.
```

### noesya.com

*Redirection Web : `http(s)://www.noesya.com` vers `https://www.noesya.coop`*

```
@ 300 IN A 75.2.60.5
www	CNAME	10800	webredir.gandi.net.
```

### noesya.fr

*Redirection Web : `http(s)://www.noesya.fr` vers `https://www.noesya.coop`*

```
@ 300 IN A 75.2.60.5
www	CNAME	10800	webredir.gandi.net.
```


## Maquette

https://www.figma.com/file/7KG0r0KsUBcxrt7iXGaR4m/Explorations?node-id=151%3A285


## Research


- Button size :  https://uxmovement.com/mobile/optimal-size-and-spacing-for-mobile-buttons/
- Vertical Grid tool : https://chrome.google.com/webstore/detail/grid-ruler/joadogiaiabhmggdifljlpkclnpfncmj/related?hl=en

## Grid

Afficher la grille avec l'extension CSS Grid pour Chrome :

```
[
  {
    "columns": 12,
    "from": 840,
    "gutters": 25,
    "margins": 50,
    "maxWidth": 1440,
    "to": 7680
  }
]
```

## Todo

- Système de grille et container (grid css)
- Définir feuille de style typo
- Balisage sémantique
