# Template e-mail — Thalia's Traiteur (Formspree)

**`formspree-template.html` est un document HTML complet et autonome**
(du `<!doctype html>` au `</html>`, CSS déjà embarqué dans le `<head>`).
C'est le seul fichier à coller.

| Fichier | Usage |
|---|---|
| `formspree-template.html` | **le fichier à coller** (complet, CSS inclus) |
| `formspree-template.css`  | *optionnel* — le CSS seul, si un jour tu as des champs HTML/CSS séparés |
| `preview.html` | aperçu local à ouvrir dans un navigateur (données d'exemple) |

## Étapes
1. Formspree → ton formulaire → **Settings → Email Templates** (ou *Customize*).
2. Colle **tout** le contenu de `formspree-template.html` (du `<!doctype>` au `</html>`).
3. **Sujet de l'e-mail** : mets `{{ subject }}` (ou `Nouvelle demande — {{ name }}`).
4. **Enregistre**, puis envoie une demande de test depuis le site pour vérifier.

## Un seul template pour les deux formulaires
Le template gère **Commander** et **Contact** grâce aux blocs `{{#if ...}}` :
une section ne s'affiche que si le champ correspondant est présent. Donc une
commande montre Type / Date / Plats / Total, et un message de contact montre
juste Objet / Message — sans lignes vides.

## Variables disponibles (champs envoyés par le site)
`name` · `email` · `phone` · `subject` · `order_type` · `event_type` ·
`guests` · `date` · `time` · `address` · `place` · `dishes` · `total` ·
`topic` · `message` · `details`

> `details` = tout le récapitulatif déjà mis en forme en texte (utile si tu
> veux un template ultra-simple : un seul `{{ details }}` suffit).

## Si Formspree n'accepte pas les `{{#if}}`
Selon le plan, les conditions ne sont pas toujours supportées. Dans ce cas :
- soit tu **supprimes les balises** `{{#if ...}}` et `{{/if}}` (les lignes
  s'afficheront alors même vides — enlève à la main celles que tu n'utilises pas),
- soit tu remplaces tout le corps par un simple bloc `{{ details }}` (le style
  `.tt-message` avec `white-space: pre-line` conserve les retours à la ligne).

## Notes de rendu
- Les polices Google (Playfair / Poppins) se chargent sur Apple Mail / iOS ;
  ailleurs (Gmail, Outlook) un repli **Georgia / Poppins système** prend le
  relais — le rendu reste soigné.
- Le bouton « Répondre au client » ouvre un mail pré-adressé à `{{ email }}`.
- Aperçu local : ouvre `preview.html` dans un navigateur (données d'exemple).
