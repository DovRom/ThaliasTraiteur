/* ================================================================
   Thalia's Traiteur — central config
   >>> Renseigne ces valeurs pour activer la conversion réelle <<<
   ================================================================ */
window.TT_CONFIG = {
   /* ----------------------------------------------------------------
      ENVOI DES MAILS — choisis le fournisseur ici :
        "formspree" -> envoi via Formspree (rapide, 1 URL à coller)
        "emailjs"   -> envoi via EmailJS  (templates + auto-réponse gratuits)
        "mailto"    -> ouvre le logiciel mail du visiteur (aucun compte)
        "auto"      -> choisit tout seul : EmailJS si configuré, sinon
                       Formspree si configuré, sinon mailto (défaut).
      Dans tous les cas, si le fournisseur choisi échoue, on retombe
      automatiquement sur "mailto" pour ne jamais perdre une demande.
      ---------------------------------------------------------------- */
   MAIL_PROVIDER: "formspree",

   /* --- Option A : FORMSPREE ---
      1) Crée un formulaire sur https://formspree.io (gratuit, 50 envois/mois)
      2) Colle ici l'URL fournie, ex: "https://formspree.io/f/abcdwxyz" */
   FORM_ENDPOINT: "https://formspree.io/f/meajrdbk",

   /* --- Option B : EMAILJS (https://emailjs.com — gratuit 200 envois/mois) ---
      1) Crée un compte, connecte un service mail (ex. Gmail) -> Service ID
      2) Crée 2 templates (un pour les commandes/devis, un pour le contact)
         avec les variables : {{name}} {{email}} {{phone}} {{subject}}
         {{order_type}} {{date}} {{dishes}} {{total}} {{message}} {{details}}
      3) Récupère ta Public Key (Account > API Keys) et colle tout ci-dessous. */
   EMAILJS_PUBLIC_KEY: "",
   EMAILJS_SERVICE_ID: "",
   EMAILJS_TEMPLATE_ID: "",          // template commandes / devis (page Commander)
   EMAILJS_TEMPLATE_ID_CONTACT: "",  // template messages (page Contact)

   /* Google Analytics 4 : colle ton ID de mesure, ex: "G-XXXXXXXXXX"
      (laisse vide pour désactiver le suivi). */
   GA_ID: "",

   /* Adresse mail de repli (utilisée par le mailto si aucun fournisseur). */
   CONTACT_EMAIL: "contact@thaliastraiteur.ca",

   /* Délai de réponse annoncé (réassurance). */
   REPLY_TIME: "24 h"
};
