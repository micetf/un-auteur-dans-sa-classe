# README - Un auteur dans sa classe · Compte à rebours Salon du Livre 2026

## 📖 Table des matières

- [Présentation du projet](#présentation-du-projet)
- [Types d'activités](#types-dactivités)
- [État d'avancement](#état-davancement)
- [Architecture technique](#architecture-technique)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Structure du projet](#structure-du-projet)
- [Guide de développement](#guide-de-développement)
- [Gestion des activités](#gestion-des-activités)
- [Mode développement](#mode-développement)
- [Déploiement](#déploiement)
- [Contribution](#contribution)
- [Troubleshooting](#troubleshooting)

---

## 📚 Présentation du projet

### Vue d'ensemble

Application web interactive **"Un auteur dans sa classe"** permettant aux classes de maternelle à CM2 de suivre un **compte à rebours de 100 jours** avant un salon du livre jeunesse. Chaque jour d'école (lundi, mardi, jeudi, vendredi), une activité courte (≈10 minutes) est proposée pour découvrir les auteurs et illustrateurs invités.

### Informations clés

- **URL de production** : [https://micetf.fr/un-auteur-dans-sa-classe](https://micetf.fr/un-auteur-dans-sa-classe)
- **Période** : Du J-100 (15 janvier 2026) au J-1 (24 avril 2026)
- **Événement** : Salon du livre jeunesse le 25 avril 2026
- **Nombre d'activités** : 48 activités réparties sur 4 mois
- **Public** : Maternelle, Cycle 2, Cycle 3
- **Usage** : Collectif, projeté (vidéoprojecteur/TNI)

### Objectifs pédagogiques

- Installer un rituel quotidien de découverte culturelle
- Développer l'observation, le langage oral et la justification
- Créer de l'envie et de l'attente pour le salon du livre
- Proposer des activités adaptables de la maternelle au CM2
- Faire découvrir 13 auteurs et illustrateurs de littérature jeunesse

### Auteurs invités

1. **Lionel TARCHALA** - Illustrateur
2. **Xavière BRONCARD** - Illustratrice
3. **Clémentine VAQUEZ** - Illustratrice
4. **Philippe JALBERT** - Auteur/Illustrateur
5. **Nathalie BONBON** - Autrice
6. **Nathalie DIETERLE** - Illustratrice
7. **Marion JACOUD** - Illustratrice
8. **Hervé LE GOFF** - Illustrateur
9. **Cécile POLLET** - Autrice/Illustratrice
10. **Séverine LAFOND** - Autrice
11. **Charlotte DESPLANCHE** - Autrice
12. **Christelle DUCHESNE** - Autrice
13. **Susie MORGENSTERN** - Autrice

---

## 🎨 Types d'activités

L'application propose **4 types d'activités** différentes pour varier les approches pédagogiques et maintenir l'engagement des élèves.

### 1. Quiz visuel 🖼️

**Objectif :** Observer une illustration et répondre à une question

**État : ✅ IMPLÉMENTÉ**

---

### 2. Jeu de l'intrus 🔍

**Objectif :** Identifier l'élément qui ne correspond pas aux autres

**État : ✅ IMPLÉMENTÉ**

---

### 3. "Je lis une image" 📖

**Objectif :** Analyser une illustration en profondeur avec plusieurs questions successives

**État : ✅ IMPLÉMENTÉ**

---

### 4. Micro-défi créatif ✏️

**Objectif :** Proposer une consigne créative simple sans interaction numérique

**Fonctionnement :**

- Affichage plein écran d'une consigne créative
- Une image de référence (optionnelle) peut accompagner la consigne
- **Modale d'agrandissement** : Clic sur l'image → affichage en grand pour analyse détaillée
- Pas d'interaction : l'activité se fait hors écran (dessin, écriture, oral)
- Durée : 5-10 minutes de création
- Retour possible en classe : exposition des productions

**État : ✅ IMPLÉMENTÉ**

---

## 📊 État d'avancement

### ✅ Modules terminés (7/8)

#### Module 1 : Fondations ✅

**Statut : 100% complet**

- [x] Configuration Vite + React 19 + Tailwind CSS 3
- [x] Système de configuration JSON (`config.json`, `activites.json`)
- [x] Hook `useCountdown` avec support J-100
- [x] Hook `useActiviteDuJour`
- [x] Hook `useDevMode`
- [x] Utilitaires de dates (`dateUtils.js`)
- [x] Structure de dossiers images créée (script automatique)
- [x] Alias de chemins configurés (@, @components, @hooks, @utils)
- [x] Palette de couleurs et tailles projection Tailwind

---

#### Module 2 : Page d'accueil ✅

**Statut : 100% complet**

- [x] Composant `Accueil.jsx` principal
- [x] Composant `DecompteAffichage.jsx` (badge J-??)
- [x] Composant `BoutonActivite.jsx` (actif/inactif selon contexte)
- [x] Composant `MessageStatut.jsx` (messages contextuels)
- [x] Gestion des états (too-early, before, day-j, after)
- [x] Mode d'emploi intégré
- [x] Design responsive optimisé projection
- [x] Animations et transitions

---

#### Module 3 : Quiz visuel ✅

**Statut : 100% complet**

- [x] Composant `QuizVisuel.jsx` (layout plein écran sans scroll)
- [x] Composant `PropositionQuiz.jsx` (mode compact)
- [x] Composant `PhotoAuteur.jsx` (photo avec source cliquable)
- [x] Composant `AideEnseignant.jsx` (panneau aide différencié)
- [x] Layout split 60/40 : image principale | propositions
- [x] Support 3 propositions maximum
- [x] Feedback immédiat avec commentaire pédagogique
- [x] Validation visuelle (bordures vertes/rouges)
- [x] Bouton "Réessayer" fonctionnel
- [x] Intégration consignes enseignant/élèves
- [x] Adaptations maternelle/cycle2/cycle3

---

#### Module 4 : Jeu de l'intrus ✅

**Statut : 100% complet**

- [x] Composant `JeuIntrus.jsx` (design optimisé plein écran)
- [x] Composant `VignetteIntrus.jsx` (grandes vignettes)
- [x] Composant `PhotoAuteur.jsx` (réutilisé du module 3)
- [x] Layout adaptatif (3 vignettes = ligne, 4 vignettes = grille 2×2)
- [x] Grandes vignettes occupant 95% de l'espace vertical
- [x] Vue split-screen après sélection (50/50)
- [x] Feedback avec badge résultat (🎯 ou ✗)
- [x] Explication pédagogique affichée
- [x] Miniatures des autres vignettes en contexte
- [x] Bouton "Recommencer" toujours visible
- [x] Thème violet (purple-600) distinct du quiz

---

#### Module 5 : Mode développement ✅

**Statut : 100% complet**

- [x] Hook `useDevMode` avec persistance localStorage
- [x] Composant `DevToolbar.jsx` (bouton flottant 🔧)
- [x] Panneau expansible avec 2 onglets (Dates, Activités)
- [x] Navigation rapide entre les 48 dates
- [x] Sélection directe d'une activité
- [x] Highlight date simulée vs date réelle
- [x] Bouton reset pour revenir à la date réelle
- [x] Intégration dans tous les hooks (countdown, activiteDuJour)
- [x] Persistance entre rechargements

---

#### Module 6 : "Je lis une image" ✅

**Statut : 100% complet**

- [x] Composant `LectureImage.jsx`
- [x] Gestion état currentQuestion (useState)
- [x] Navigation entre questions
- [x] Composant `QuestionLecture.jsx`
- [x] Support options avec images ou texte
- [x] Affichage feedback par question
- [x] Bouton "Question suivante"
- [x] Bouton "Recommencer" à la fin
- [x] Intégration dans App.jsx (type 'lecture')
- [x] Adaptation multi-cycles (2-3 questions selon niveau)
- [x] Thème visuel distinct (indigo/bleu)
- [x] Barre de progression des questions

---

#### Module 7 : Micro-défi créatif ✅

**Statut : 100% complet**

- [x] Composant `DefiCreatif.jsx`
- [x] Affichage consigne plein écran
- [x] Support image de référence optionnelle
- [x] **Modale d'agrandissement d'image** (clic sur image → vue plein écran)
- [x] Affichage durée estimée
- [x] Affichage matériel nécessaire
- [x] Design épuré et lisible avec scroll interne optimisé
- [x] Intégration dans App.jsx (type 'defi')
- [x] Variantes par cycle affichées dans aide
- [x] Thème visuel distinct (amber/orange)

**Fonctionnalités clés :**

- Layout avec scroll interne pour visibilité complète du contenu
- Image cliquable avec indicateurs visuels (hover, bordure, icône 🔍)
- Modale plein écran pour analyse détaillée de l'exemple
- Fermeture intuitive (clic dehors, bouton ✕, touche Escape)
- Accessibilité complète (ARIA, navigation clavier)

---

### ⏳ Modules en cours / à faire (1/8)

#### Module 8 : Intégration finale et polish ⏳

**Statut : 75% - En cours**

**✅ Déjà fait :**

- [x] Router de base dans App.jsx (state-based)
- [x] Navigation retour accueil
- [x] Chargement dynamique quiz, intrus, lecture et défi
- [x] Gestion états loading/error
- [x] PropTypes sur tous les composants
- [x] Design plein écran sans scroll

**⏳ À faire :**

- [ ] Transitions animées entre vues (Framer Motion ?)
- [ ] Écran de chargement amélioré
- [ ] Gestion d'erreur robuste (images manquantes, JSON invalide)
- [ ] Tests finaux tous types d'activités
- [ ] Optimisation performances (lazy loading composants)
- [ ] Validation accessibilité complète (WCAG AA)
- [ ] Tests sur vidéoprojecteur réel
- [ ] Ajustements tailles police si nécessaire
- [ ] Documentation utilisateur enseignants

**Complexité estimée :** Moyenne  
**Temps estimé :** 4-6 heures  
**Priorité :** Haute (finalisation avant prod)

---

### 📈 Progression globale

```
████████████████████░░  87.5% (7/8 modules)

Détail par module :
✅ Module 1 : Fondations                    [████████████████████] 100%
✅ Module 2 : Page d'accueil                [████████████████████] 100%
✅ Module 3 : Quiz visuel                   [████████████████████] 100%
✅ Module 4 : Jeu de l'intrus               [████████████████████] 100%
✅ Module 5 : Mode développement            [████████████████████] 100%
✅ Module 6 : "Je lis une image"            [████████████████████] 100%
✅ Module 7 : Micro-défi créatif            [████████████████████] 100%
⏳ Module 8 : Intégration finale            [███████████████░░░░░]  75%
```

**Estimation pour finalisation :**

- Module 8 : 4-6 heures
- **Total : 4-6 heures de développement**

---

### 🎯 Prochaines étapes immédiates

**Sprint 1 : Contenu (20h)**

1. Rédiger les 48 activités (15h)

    - 12 quiz visuels
    - 12 jeux de l'intrus
    - 12 lectures d'images
    - 12 défis créatifs

2. Collecter/créer les images (5h)
    - 13 photos auteurs
    - Images pour les 48 activités

**Sprint 2 : Finalisation (6h)**

3. Intégration et tests (3h)

    - Tests sur vidéoprojecteur
    - Ajustements design

4. Polish et déploiement (3h)
    - Animations transitions
    - Optimisations performances
    - Déploiement sur micetf.fr

---

## 🏗️ Architecture technique

### Stack technologique

```
Frontend
├── React 19.2.0          # Library UI
├── Vite 7.2.4            # Build tool & dev server
├── Tailwind CSS 3.4.1    # Framework CSS utility-first
└── PropTypes             # Validation des props

Development Tools
├── ESLint                # Linter JavaScript
├── pnpm                  # Gestionnaire de packages
└── Node.js 16+           # Runtime JavaScript
```

### Principes architecturaux

1. **Composants fonctionnels React** : Utilisation exclusive de hooks
2. **Design responsive** : Optimisé pour projection (1920×1080)
3. **Pas de backend** : Application 100% statique (fichiers JSON)
4. **Pas de base de données** : Données stockées dans `/public/data/`
5. **Mode développement intégré** : Simulation de dates pour tests
6. **Accessibility first** : ARIA labels, navigation clavier

---

## 🔧 Prérequis

### Logiciels requis

```bash
Node.js >= 16.0.0
pnpm >= 8.0.0  (ou npm >= 9.0.0)
Git >= 2.30.0
```

### Vérification des versions

```bash
node --version   # v16.x.x ou supérieur
pnpm --version   # 8.x.x ou supérieur
git --version    # 2.30.x ou supérieur
```

### Installation de pnpm (si nécessaire)

```bash
npm install -g pnpm
```

---

## 🚀 Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/micetf/un-auteur-dans-sa-classe.git
cd un-auteur-dans-sa-classe
```

### 2. Installer les dépendances

```bash
pnpm install
```

### 3. Créer la structure des dossiers d'images

```bash
node scripts/create-image-folders.js
```

### 4. Lancer le serveur de développement

```bash
pnpm dev
```

L'application sera accessible sur **http://localhost:3000**

### 5. Build de production

```bash
pnpm build
```

Les fichiers optimisés seront générés dans `/dist/`

---

## ⚙️ Configuration

### Fichiers de configuration principaux

#### `public/data/config.json`

Configuration globale de l'application.

#### `public/data/activites.json`

Contenu des 48 activités.

---

## 📁 Structure du projet

```
un-auteur-dans-sa-classe/
├── public/
│   ├── data/
│   │   ├── config.json
│   │   └── activites.json
│   └── images/
│       ├── auteurs/
│       └── activites/
│
├── src/
│   ├── components/
│   │   ├── Accueil/
│   │   ├── Activite/
│   │   │   ├── QuizVisuel.jsx         ✅
│   │   │   ├── JeuIntrus.jsx          ✅
│   │   │   ├── LectureImage.jsx       ✅
│   │   │   ├── DefiCreatif.jsx        ✅
│   │   │   └── ...
│   │   └── Dev/
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔨 Guide de développement

### Conventions de code

#### Composants React

```javascript
/**
 * Documentation JSDoc complète en français
 * @param {Object} props - Description
 * @returns {JSX.Element} Description
 */
function MonComposant({ prop1, prop2 }) {
    // Code...
    return <div>...</div>;
}

MonComposant.propTypes = {
    prop1: PropTypes.string.isRequired,
    prop2: PropTypes.number,
};

export default MonComposant;
```

---

## 🛠️ Mode développement

### Activation

Cliquer sur le bouton **🔧** en bas à droite de l'écran.

### Fonctionnalités

- **Dates** : Liste des 48 dates avec activités
- **Activités** : Liste des 48 activités avec détails
- **Sélection** : Clic pour simuler une date/activité
- **Reset** : Bouton pour revenir à la date réelle

---

## 🚀 Déploiement

### URL de production

**https://micetf.fr/un-auteur-dans-sa-classe**

### Build de production

```bash
pnpm build
```

---

## 🤝 Contribution

### Workflow Git

```bash
git checkout -b feat/nom-fonctionnalite
git add .
git commit -m "feat: description"
git push origin feat/nom-fonctionnalite
```

**Convention de commit :**

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage
- `refactor:` Refactoring
- `test:` Ajout de tests
- `chore:` Maintenance

---

## 🐛 Troubleshooting

### Problème : Les images ne s'affichent pas

✅ **Solution :** Vérifier les chemins dans le JSON (doivent commencer par `/`)

### Problème : Le compte à rebours ne démarre pas

✅ **Solution :** Utiliser le mode dev pour simuler une date après le 15 janvier 2026

---

## 📊 Statistiques du projet

**État actuel (Janvier 2026) :**

- ✅ 7/8 modules terminés (87.5%)
- ✅ 4/4 types d'activités implémentés
- ⏳ 4-6h de développement restantes

---

## 📄 Licence

Ce projet est la propriété de **MiCetF** (Frédéric MISERY).

Tous droits réservés © 2024-2026 MiCetF

---

## 📞 Contact et support

**Mainteneur :** Frédéric MISERY  
**Site :** [https://micetf.fr](https://micetf.fr)  
**Email :** webmaster@micetf.fr  
**Projet :** [https://micetf.fr/un-auteur-dans-sa-classe](https://micetf.fr/un-auteur-dans-sa-classe)

---

**Dernière mise à jour :** 06 janvier 2026  
**Version du document :** 2.2  
**Auteur :** MiCetF (Frédéric MISERY)
