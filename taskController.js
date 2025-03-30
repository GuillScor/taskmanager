const Task = require("./taskModel");
exports.getTasks = async (req, res) => {
    try {
        let query = {};
        
        //filtre sur éléments de la tache
        if (req.query.statut) query.statut = req.query.statut;
        if (req.query.priorite) query.priorite = req.query.priorite;
        if (req.query.categorie) query.categorie = req.query.categorie;
        if (req.query.auteur) query["auteur.nom"] = req.query.auteur;
        if (req.query.etiquette) query.etiquettes = req.query.etiquette;

        //échéances min/max
        if (req.query.echeanceMin) {
            query.echeance = { $gte: new Date(req.query.echeanceMin) };
        }
        if (req.query.echeanceMax) {
            query.echeance = { 
                ...query.echeance, 
                $lte: new Date(req.query.echeanceMax) 
            };
        }

        //tri
        let sortOptions = {};
        if (req.query.sortBy) {
            const sortField = req.query.sortBy;
            const sortOrder = req.query.order === "asc" ? 1 : -1;
            sortOptions[sortField] = sortOrder;
        } else {
            sortOptions.dateCreation = -1; 
        }

        //utilisation des filtres + tri
        const tasks = await Task.find(query).sort(sortOptions);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des tâches", error });
    }
};

exports.createTask = async (req, res) => { res.json(await new Task(req.body).save()); };
exports.updateTask = async (req, res) => { res.json(await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })); };
exports.deleteTask = async (req, res) => { res.json(await Task.findByIdAndDelete(req.params.id)); };

exports.addComment = async (req, res) => {
    const { auteur, contenu } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Tâche non trouvée" });

    task.commentaires.push({ auteur, contenu });
    await task.save();
    res.json(task);
};

exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ error: "Tâche non trouvée" });

    task.commentaires = task.commentaires.filter(c => c._id.toString() !== commentId);
    await task.save();
    res.json(task);
};