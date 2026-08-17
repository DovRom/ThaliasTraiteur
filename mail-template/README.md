# Template e-mail — Thalia's Traiteur (Formspree)

**`formspree-template.html` est un document HTML complet et autonome**
(du `<!doctype html>` au `</html>`, CSS embarqué dans le `<head>`).
C'est le seul fichier à coller.

| Fichier | Usage |
|---|---|
| `formspree-template.html` | **le fichier à coller** (complet, CSS inclus) |
| `formspree-template.css`  | *optionnel* — le même CSS seul, si champs HTML/CSS séparés |
| `preview.html` | aperçu local à ouvrir dans un navigateur (données d'exemple) |

## Étapes
1. Formspree → ton formulaire → **Settings → Email Templates** (ou *Customize*).
2. Colle **tout** le contenu de `formspree-template.html` (du `<!doctype>` au `</html>`).
3. **Sujet de l'e-mail** : mets `{{ subject }}` (ou `Nouvelle demande — {{ name }}`).
4. **Enregistre**, puis envoie une demande de test depuis le site.

## Comment ça marche (sans aucune logique)
Formspree ne fait **que remplacer les `{{ variables }}`** — il n'exécute aucune
condition (`{% if %}` / `{{#if}}` cassent ou s'affichent en clair, à ne jamais
utiliser). Ici, **pas de logique du tout** :

- Le **site envoie toujours tous les champs** (vides quand ils ne s'appliquent
  pas), donc aucune balise ne reste jamais « en dur » dans l'e-mail.
- Les lignes/sections dont la valeur est vide sont **masquées en CSS** via
  `:empty` / `:has()`. Résultat : une **commande** montre Type / Date / Plats /
  Total, un **message de contact** montre juste Objet / Message — proprement.

Variables : `subject` · `name` · `email` · `phone` · `order_type` ·
`event_type` · `guests` · `date` · `time` · `address` · `place` · `dishes` ·
`total` · `topic` · `message`.

## Styles 100 % inline (compatibilité Gmail / Pixel)
Tous les styles visuels (largeur, alignement, couleurs, marges) sont écrits
**inline sur chaque élément**, car l'appli **Gmail Android (Pixel)** ignore
souvent le bloc `<style>`. Le `<style>` restant ne sert qu'à deux choses
optionnelles : masquer les lignes vides (`:has` / `:empty`) et le responsive
mobile — le rendu reste correct même si un client les ignore.

## ⚠️ Note sur Gmail (uniquement le formulaire de contact)
Le masquage des lignes vides utilise `:has()` / `:empty`, **non supportés par
Gmail**. Les e-mails de **commande / devis** sont parfaits partout (tous les
champs sont remplis, rien à masquer). Pour un **message de contact lu dans
Gmail**, quelques lignes vides peuvent apparaître.

➡️ Pour un contact **impeccable aussi dans Gmail**, le plus propre est un
**2ᵉ formulaire Formspree dédié au contact** (template simplifié) branché sur
`FORM_ENDPOINT_CONTACT`. Dis-le-moi, je le prépare.
