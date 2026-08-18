# Template e-mail — Thalia's Traiteur (Formspree)

**`formspree-template.html` est un document HTML complet et autonome**
(du `<!doctype html>` au `</html>`). C'est le seul fichier à coller.

| Fichier | Usage |
|---|---|
| `formspree-template.html` | **le fichier à coller** dans Formspree |
| `preview.html` | aperçu local à ouvrir dans un navigateur (données d'exemple) |

## Étapes
1. Formspree → ton formulaire → **Settings → Email Templates** (ou *Customize*).
2. Colle **tout** le contenu de `formspree-template.html` (du `<!doctype>` au `</html>`).
3. **Sujet de l'e-mail** : mets `{{ subject }}`.
4. **Enregistre**, puis envoie une demande de test depuis le site.

## Pourquoi ce format (compatible Gmail / Pixel)
L'appli **Gmail Android** est très restrictive : elle **ignore le bloc `<style>`**
et **ne sait pas masquer un champ vide en CSS**. Le template a donc été conçu
pour marcher **sans dépendre d'aucun CSS externe** :

- **Carte fluide** : `width:100%` + `max-width:600px` → belle sur ordinateur,
  et à la **bonne taille sur mobile** (plus de « version PC minuscule »), sans
  media query.
- **Tous les styles sont inline** sur chaque élément (seule chose que Gmail
  respecte à coup sûr).
- **Aucune ligne vide possible** : le contenu variable arrive dans **une seule
  variable `{{ recap }}`**, déjà mise en forme par le site avec *uniquement*
  les champs remplis (Type, date, adresse/lieu, convives, liste des plats,
  total, précisions — ou Objet + message pour un contact). Le même template
  gère donc commande **et** contact, proprement, sur **tous** les clients.

Variables utilisées : `subject` · `name` · `email` · `phone` · `recap`.

> ⚠️ Ne réintroduis pas de `{% if %}` ni `{{#if}}` : Formspree ne fait que
> remplacer les `{{ variables }}`, il n'exécute aucune logique.
