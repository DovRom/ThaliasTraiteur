/* ================================================================
   Thalia's Traiteur — central config
   >>> Renseigne ces valeurs pour activer la conversion réelle <<<
   ================================================================ */
window.TT_CONFIG = {
  /* Envoi RÉEL des commandes/devis/contacts.
     1) Crée un formulaire sur https://formspree.io (gratuit)
     2) Colle ici l'URL fournie, ex: "https://formspree.io/f/abcdwxyz"
     Tant que c'est vide, on retombe sur l'ouverture du client mail (mailto). */
  FORM_ENDPOINT: "",

  /* Google Analytics 4 : colle ton ID de mesure, ex: "G-XXXXXXXXXX"
     (laisse vide pour désactiver le suivi). */
  GA_ID: "",

  /* Adresse mail de repli (utilisée par le mailto si pas de FORM_ENDPOINT). */
  CONTACT_EMAIL: "contact@thaliastraiteur.ca",

  /* Délai de réponse annoncé (réassurance). */
  REPLY_TIME: "24 h"
};
