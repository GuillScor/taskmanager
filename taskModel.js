const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
    titre: String,
    description: String,
    dateCreation: { type: Date, default: Date.now },
    echeance: Date,
    statut: { type: String, enum: ["à faire", "en cours", "terminée", "annulée"], default: "à faire" },
    priorite: { type: String, enum: ["basse", "moyenne", "haute", "critique"], default: "moyenne" },
    auteur: { nom: String, prenom: String, email: String },
    categorie: String,
    etiquettes: [String],
    commentaires: [
        {
            auteur: String,
            contenu: String,
            date: { type: Date, default: Date.now }
        }
    ],
    historiqueModifications: [  // 🆕 Liste des modifications
        {
            champModifie: String,
            ancienneValeur: String,
            nouvelleValeur: String,
            date: { type: Date, default: Date.now }
        }
    ]
});
module.exports = mongoose.model("Task", TaskSchema);