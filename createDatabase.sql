CREATE TABLE Utilisateur(
   ID_Utilisateur INT,
   nom VARCHAR(50),
   prénom VARCHAR(50),
   email VARCHAR(50),
   motdepasse VARCHAR(50),
   PRIMARY KEY(ID_Utilisateur)
);

CREATE TABLE Projet(
   ID_Projet INT,
   nom VARCHAR(50),
   PRIMARY KEY(ID_Projet)
);

CREATE TABLE Etiquette(
   ID_Etiquette INT,
   Nom INT NOT NULL,
   PRIMARY KEY(ID_Etiquette)
);

CREATE TABLE Tâche(
   ID_Tache INT,
   titre VARCHAR(50),
   description VARCHAR(256),
   dateCreation DATETIME,
   echeance DATETIME,
   statut VARCHAR(50),
   priorite VARCHAR(50),
   catégorie VARCHAR(50),
   etiquettes VARCHAR(50),
   ID_Projet INT,
   ID_Tache_1 INT,
   ID_Utilisateur INT,
   ID_Utilisateur_1 INT,
   PRIMARY KEY(ID_Tache),
   FOREIGN KEY(ID_Projet) REFERENCES Projet(ID_Projet),
   FOREIGN KEY(ID_Tache_1) REFERENCES Tâche(ID_Tache),
   FOREIGN KEY(ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur),
   FOREIGN KEY(ID_Utilisateur_1) REFERENCES Utilisateur(ID_Utilisateur)
);

CREATE TABLE Commentaires(
   ID_Commentaire INT,
   datePost DATETIME,
   échéance DATETIME,
   ID_Utilisateur INT NOT NULL,
   ID_Tache INT NOT NULL,
   PRIMARY KEY(ID_Commentaire),
   FOREIGN KEY(ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur),
   FOREIGN KEY(ID_Tache) REFERENCES Tâche(ID_Tache)
);

CREATE TABLE Travaille_sur(
   ID_Utilisateur INT,
   ID_Projet INT,
   PRIMARY KEY(ID_Utilisateur, ID_Projet),
   FOREIGN KEY(ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur),
   FOREIGN KEY(ID_Projet) REFERENCES Projet(ID_Projet)
);

CREATE TABLE Etiquetté(
   ID_Tache INT,
   ID_Etiquette INT,
   PRIMARY KEY(ID_Tache, ID_Etiquette),
   FOREIGN KEY(ID_Tache) REFERENCES Tâche(ID_Tache),
   FOREIGN KEY(ID_Etiquette) REFERENCES Etiquette(ID_Etiquette)
);
