# Template e-mail — Thalia's Traiteur (Formspree)

**`formspree-template.html` est un document HTML complet et autonome**
(du `<!doctype html>` au `</html>`, CSS embarqué dans le `<head>`).
C'est le seul fichier à coller.

| Fichier | Usage |
|---|---|
| `formspree-template.html` | pour **Formspree** — document complet (CSS inclus) |
| `formspree-template.css`  | *optionnel* — le même CSS seul, si champs HTML/CSS séparés |
| `emailjs-template.html`   | pour **EmailJS** — fragment `<div>` inline + conditions `{{#if}}` |
| `preview.html` | aperçu local à ouvrir dans un navigateur (données d'exemple) |

## EmailJS (recommandé)
Même design que le template Formspree, mais en format EmailJS (commence par
`<div>`, styles inline, conditions `{{#if}}` exécutées par EmailJS → aucune
ligne vide, même dans Gmail).
1. EmailJS → ton template → onglet **Content** → mode **code `</>`** → colle
   tout `emailjs-template.html`.
2. Onglet **Settings** : **Subject** = `{{subject}}` · **From Name** =
   `{{name}} — via le site` · **Reply To** = `{{email}}`.
3. Fais-en **deux** (Commandes / Devis et Contact) — le même HTML gère les deux.

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

## ⚠️ Note sur Gmail
Le masquage des lignes vides utilise `:has()` / `:empty`, **supportés par Apple
Mail, iOS Mail et la plupart des clients récents, mais PAS par Gmail**. Les
e-mails de **commande / devis** sont parfaits partout (tous les champs sont
remplis, rien à masquer). Pour un **message de contact lu dans Gmail**,
quelques lignes vides peuvent apparaître.

➡️ Si tu veux un rendu **impeccable aussi pour le contact dans Gmail**, le plus
propre est de créer un **2ᵉ formulaire Formspree dédié au contact** avec un
template simplifié. Dis-le-moi, je te le prépare et je branche
`FORM_ENDPOINT_CONTACT` côté site.
