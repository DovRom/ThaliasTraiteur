# Template e-mail — Thalia's Traiteur (Formspree)

**`formspree-template.html` est un document HTML complet et autonome**
(du `<!doctype html>` au `</html>`, CSS déjà embarqué dans le `<head>`).
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
4. **Enregistre**, puis envoie une demande de test depuis le site pour vérifier.

## Important : Formspree ne fait QUE de la substitution de variables
Formspree remplace uniquement les `{{ variable }}` — **il ne gère aucune
logique** (`{% if %}`, `{{#if}}`… sortent tels quels dans l'e-mail, ou font
planter le rendu). Le template n'utilise donc **que 4 variables**, toujours
présentes :

| Variable | Contenu |
|---|---|
| `{{ subject }}` | l'objet (« Commande livraison – Awa Koné », « Contact – … ») |
| `{{ name }}` | le nom du client |
| `{{ email }}` | le courriel du client (bouton **Répondre au client**) |
| `{{ details }}` | **le récapitulatif complet déjà mis en forme** par le site |

`{{ details }}` contient tout le détail — coordonnées, date, plats, total,
message — que ce soit une **commande** ou un simple **message de contact**.
Un seul template gère donc les deux formulaires, sans aucune condition.
La mise en forme des retours à la ligne est assurée par `white-space: pre-line`.

## Bon à savoir
- Les polices Google (Playfair / Poppins) se chargent sur Apple Mail / iOS ;
  ailleurs (Gmail, Outlook) un repli **Georgia / Poppins système** prend le
  relais — le rendu reste soigné.
- Le bouton « Répondre au client » ouvre un mail pré-adressé à `{{ email }}`.
- Aperçu local : ouvre `preview.html` dans un navigateur.
