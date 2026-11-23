# Portfolio — Kalancia St Martin

Portfolio personnel de Kalancia St Martin, informaticienne (développement web et réseaux informatiques).
Il est écrit en HTML, CSS et JavaScript, sans dépendance, et hébergé sur **GitHub Pages**.

## Structure

```
index.html        contenu de la page
style.css         design (couleurs en haut du fichier)
script.js         animations, thème, filtres, formulaire
assets/photo.jpg  photo de profil
assets/CV.pdf     CV téléchargeable
assets/favicon.svg
```

## Mettre à jour

- **Textes, projets, parcours** : `index.html`. Pour ajouter un projet, dupliquez un bloc `<article class="card project">`.
- **CV** : remplacez `assets/CV.pdf` en gardant le même nom.
- **Mots animés du titre** : tableau `words` dans `script.js`.
- **LinkedIn** : retirez les commentaires autour du lien dans `index.html` et ajoutez l'adresse du profil.

### Formulaire de contact

1. Créez un compte gratuit sur [formspree.io](https://formspree.io) avec votre e-mail.
2. Créez un formulaire et copiez son identifiant.
3. Dans `index.html`, remplacez `VOTRE_ID` dans `action="https://formspree.io/f/VOTRE_ID"`.

## Mettre en ligne sur GitHub Pages

1. Sur GitHub, créez un dépôt **public** nommé exactement **`Kalmds509.github.io`**.
2. Dans le dossier `portfolio`, lancez :
   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/Kalmds509/Kalmds509.github.io.git
   git push -u origin main
   ```
3. Sur GitHub : **Settings → Pages → Source : Deploy from a branch → `main` / `(root)`** → Save.
4. Après une à deux minutes, le site est en ligne sur **https://kalmds509.github.io**.

Le dépôt `about-me` reste accessible sur https://kalmds509.github.io/about-me/.

## Tester en local

Ouvrez `index.html` dans un navigateur.
