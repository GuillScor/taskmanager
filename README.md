# Gestionnaire de Tâches


## Installation
### 1. Prérequis
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (MongoDB Compass recommandé)

### 2. Cloner le projet
```sh
git clone https://github.com/GuillScor/task-manager.git
cd task-manager
```

### 3. Installer les dépendances
```sh
npm install
```

### 4. Création de la base
Aller sur MongoDB Compass et créer une base de donnée `taskmanager` contenant la collection `tasks`

### 5. Lancer le serveur backend
```sh
node server.js
```

### 6. Ouvrir l’interface utilisateur
Ouvrez `index.html` dans un navigateur.

---

### Tâches
- **Lister toutes les tâches**
  ```http
  GET /tasks
  ```
- **Créer une tâche**
  ```http
  POST /tasks
  ```
  **Body JSON** :
  ```json
  {
    "titre": "Nouvelle tâche",
    "description": "Détails de la tâche",
    "echeance": "2025-09-13",
    "statut": "à faire",
    "priorite": "moyenne",
    "auteur": { "nom": "Scordia", "prenom": "Guillaume", "email": "GS@example.com" },
    "categorie": "Travail",
    "etiquettes": ["urgent", "client"]
  }
  ```
- **Mettre à jour une tâche**
  ```http
  PUT /tasks/:id
  ```
  **Body JSON** :
  ```json
  {
    "statut": "terminée"
  }
  ```
- **Supprimer une tâche**
  ```http
  DELETE /tasks/:id
  ```


### 📌 Commentaires
- **Ajouter un commentaire**
  ```http
  POST /tasks/:id/comments
  ```
  **Body JSON** :
  ```json
  {
    "auteur": "Bob",
    "message": "Ceci est un commentaire"
  }
  ```
- **Supprimer un commentaire**
  ```http
  DELETE /tasks/:taskId/comments/:commentId
  ```

---
