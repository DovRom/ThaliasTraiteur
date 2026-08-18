# ThaliasTraiteur

Site web pour **Thalia's Traiteur — Cuisine Ivoirienne** (Montréal).

Basé sur le template HTML **Sarab** (restaurant / fast food) adapté aux couleurs
et au menu de Thalia's Traiteur.

## Structure

- `ThaliasTraiteur/` — site (HTML/CSS/JS + assets) — **seul dossier publié sur GitHub Pages**
- `tools/` — outils de build (non publiés), voir ci-dessous
- `Documentation/` — documentation du template d'origine
- `sarab_ressources/` — logo et menu de Thalia's Traiteur

## Développement

Ouvrir `ThaliasTraiteur/index.html` dans un navigateur, ou servir le dossier :

```bash
cd ThaliasTraiteur && python3 -m http.server 8000
```

## Icônes (FontAwesome subset)

Pour la performance, seules les icônes réellement utilisées sont embarquées
(`css/all.min.css` ≈ 3,5 Ko + `webfonts/*.subset.woff2` ≈ 12 Ko, au lieu de ~1,2 Mo).

**➡️ Après avoir ajouté ou retiré une icône `<i class="fas fa-…">` (dans le HTML *ou* un JS
de `ThaliasTraiteur/js/`), relance :**

```bash
python3 tools/fa-subset.py      # prérequis : pip install fonttools brotli
```

Le script :
- rescanne le HTML **et** les JS applicatifs (icônes injectées comprises) ;
- régénère `all.min.css` + les polices subset ;
- applique un cache-busting (`?v=hash`) pour que le changement soit pris en compte
  immédiatement (sinon le navigateur garde l'ancienne version en cache).

Les polices FontAwesome complètes (source du subset) sont dans `tools/fa-src/` — ne pas
les supprimer, elles sont nécessaires à la régénération et ne sont pas publiées.

## Crédits

Template d'origine **Sarab** © [Bestwpware](https://bestwpware.com/),
distribué par [ThemeWagon](https://themewagon.com) sous licence MIT.
