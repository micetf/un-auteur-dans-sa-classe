import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

/**
 * Dates des activités en 2026
 * Janvier : L5, Ma6, J8, V9, L12, Ma13, J15, V16, L19, Ma20, J22, V23, L26, Ma27, J29, V30
 * Février : L2, Ma3, J5, V6, L23, Ma24, J26, V27
 * Mars : L2, Ma3, J5, V6, L9, Ma10, J12, V13, L16, Ma17, J19, V20, L23, Ma24, J25, V26, L30, Ma31
 * Avril : J2, V3, L20, Ma21, J23, V24
 */
const dates = [
    // Janvier 2026
    "2026-01-05",
    "2026-01-06",
    "2026-01-08",
    "2026-01-09",
    "2026-01-12",
    "2026-01-13",
    "2026-01-15",
    "2026-01-16",
    "2026-01-19",
    "2026-01-20",
    "2026-01-22",
    "2026-01-23",
    "2026-01-26",
    "2026-01-27",
    "2026-01-29",
    "2026-01-30",

    // Février 2026
    "2026-02-02",
    "2026-02-03",
    "2026-02-05",
    "2026-02-06",
    "2026-02-23",
    "2026-02-24",
    "2026-02-26",
    "2026-02-27",

    // Mars 2026
    "2026-03-02",
    "2026-03-03",
    "2026-03-05",
    "2026-03-06",
    "2026-03-09",
    "2026-03-10",
    "2026-03-12",
    "2026-03-13",
    "2026-03-16",
    "2026-03-17",
    "2026-03-19",
    "2026-03-20",
    "2026-03-23",
    "2026-03-24",
    "2026-03-25",
    "2026-03-26",
    "2026-03-30",
    "2026-03-31",

    // Avril 2026
    "2026-04-02",
    "2026-04-03",
    "2026-04-20",
    "2026-04-21",
    "2026-04-23",
    "2026-04-24",
];

/**
 * IDs des auteurs/illustrateurs pour créer les placeholders photos
 */
const auteurs = [
    "tarchala",
    "broncard",
    "vaquez",
    "balme",
    "bonbon",
    "dieterle",
    "jacoud",
    "bronn",
    "pollet",
    "lafond",
    "desplanche",
    "duchesne",
    "morgenstern",
];

console.log("🚀 Création de la structure des dossiers d'images...\n");

// Créer le dossier principal images
const imagesDir = path.join(projectRoot, "public", "images");
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log("✓ Dossier images/ créé");
}

// Créer le dossier auteurs
const auteursDir = path.join(imagesDir, "auteurs");
if (!fs.existsSync(auteursDir)) {
    fs.mkdirSync(auteursDir, { recursive: true });
    console.log("✓ Dossier auteurs/ créé");
}

// Créer un fichier README dans le dossier auteurs
const auteursReadme = path.join(auteursDir, "README.md");
if (!fs.existsSync(auteursReadme)) {
    const readmeContent = `# Photos des auteurs et illustrateurs

Placez ici les photos des auteurs/illustrateurs au format :
\`{id-auteur}.jpg\`

Liste des fichiers attendus :
${auteurs.map((id) => `- ${id}.jpg`).join("\n")}

**Dimensions recommandées :** 400px × 400px (carré)
**Format :** .jpg ou .jpeg
`;
    fs.writeFileSync(auteursReadme, readmeContent);
    console.log("  → README.md créé dans auteurs/");
}

// Créer le dossier activites
const activitesDir = path.join(imagesDir, "activites");
if (!fs.existsSync(activitesDir)) {
    fs.mkdirSync(activitesDir, { recursive: true });
    console.log("✓ Dossier activites/ créé");
}

// Créer les dossiers pour chaque date d'activité
console.log("\n📅 Création des dossiers par date...\n");

let count = 0;
dates.forEach((date) => {
    const dateDir = path.join(activitesDir, date);
    if (!fs.existsSync(dateDir)) {
        fs.mkdirSync(dateDir, { recursive: true });

        // Créer un fichier README dans chaque dossier
        const readmePath = path.join(dateDir, "README.md");
        const dateObj = new Date(date);
        const dateFormatted = dateObj.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const readmeContent = `# Activité du ${dateFormatted}

Placez ici les images pour l'activité du ${date}.

## Selon le type d'activité :

### Quiz visuel
\`\`\`
image-principale.jpg    # L'image à observer
proposition-a.jpg       # Image proposition A (optionnelle)
proposition-b.jpg       # Image proposition B (optionnelle)
proposition-c.jpg       # Image proposition C (optionnelle)
proposition-d.jpg       # Image proposition D (optionnelle)
\`\`\`

### Jeu de l'intrus
\`\`\`
vignette-1.jpg
vignette-2.jpg
vignette-3.jpg
vignette-4.jpg
\`\`\`

### "Je lis une image"
\`\`\`
image-principale.jpg
\`\`\`

### Micro-défi créatif
\`\`\`
image-reference.jpg (optionnelle)
\`\`\`

**Dimensions recommandées :**
- Images principales : 1200-1600px de large
- Propositions/vignettes : 600-800px de large
- Format : .jpg ou .jpeg
`;

        fs.writeFileSync(readmePath, readmeContent);
        count++;

        // Afficher avec regroupement par mois
        if (
            count === 1 ||
            date.slice(0, 7) !== dates[dates.indexOf(date) - 1].slice(0, 7)
        ) {
            const monthYear = dateObj.toLocaleDateString("fr-FR", {
                month: "long",
                year: "numeric",
            });
            console.log(`\n  📆 ${monthYear}`);
        }
        console.log(`    ✓ ${date}/`);
    }
});

// Créer un README global dans le dossier activites
const activitesReadme = path.join(activitesDir, "README.md");
if (!fs.existsSync(activitesReadme)) {
    const readmeContent = `# Images des activités

Ce dossier contient les images pour les **${dates.length} activités** du compte à rebours.

## Structure

Chaque activité a son propre dossier nommé par sa date (YYYY-MM-DD) :

\`\`\`
activites/
├── 2026-01-05/
│   ├── image-principale.jpg
│   ├── proposition-a.jpg
│   └── ...
├── 2026-01-06/
└── ...
\`\`\`

## Période couverte

- **Janvier 2026 :** 16 activités
- **Février 2026 :** 8 activités
- **Mars 2026 :** 18 activités
- **Avril 2026 :** 6 activités (jusqu'au 24 avril)

**Total :** ${dates.length} activités

**Salon du livre :** 25 avril 2026

## Convention de nommage

Consultez le README.md dans chaque dossier de date pour connaître les noms de fichiers attendus selon le type d'activité.
`;
    fs.writeFileSync(activitesReadme, readmeContent);
    console.log("\n✓ README.md créé dans activites/");
}

// Résumé final
console.log("\n" + "=".repeat(60));
console.log("✅ Structure créée avec succès !");
console.log("=".repeat(60));
console.log(`\n📊 Résumé :`);
console.log(`   • Dossier auteurs : ${auteurs.length} photos à ajouter`);
console.log(`   • Dossiers activités : ${dates.length} créés`);
console.log(`\n📁 Emplacement : ${imagesDir}`);
console.log(`\n💡 Conseil : Consultez les README.md dans chaque dossier pour`);
console.log(`   connaître les noms de fichiers attendus.`);
console.log("");
