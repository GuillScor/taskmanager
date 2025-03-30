document.addEventListener("DOMContentLoaded", fetchTasks);

function fetchTasks() {
    let status = document.getElementById("filterStatus").value;
    let priority = document.getElementById("filterPriority").value;
    let sortBy = document.getElementById("sortBy").value;
    let order = document.getElementById("order").value;

    let url = "http://localhost:5000/tasks?";
    if (status) url += `statut=${status}&`;
    if (priority) url += `priorite=${priority}&`;
    url += `sortBy=${sortBy}&order=${order}`;

    fetch(url)
    .then(res => res.json())
    .then(tasks => {
        document.getElementById("taskList").innerHTML = tasks.map(task => 
            `<li>
                <strong>${task.titre}</strong> - ${task.description || "Aucune description"} <br>
                Échéance : ${task.echeance ? new Date(task.echeance).toLocaleDateString() : "Non définie"} <br>
                Statut : ${task.statut} | Priorité : ${task.priorite} <br>
                Auteur : ${task.auteur.nom} ${task.auteur.prenom} ${task.auteur.email} <br>
                Catégorie : ${task.categorie} <br>
                Etiquettes : ${task.etiquettes.join(", ")} <br>
                
                <button onclick="editTask('${task._id}', '${task.titre}', '${task.description}', '${task.echeance}', '${task.statut}', '${task.priorite}')">Modifier</button>
                <button onclick="deleteTask('${task._id}')">X</button>

                <div>
                    <input id="commentText-${task._id}" placeholder="Ajouter un commentaire">
                    <input id="commentAuthor-${task._id}" placeholder="Auteur">
                    <button onclick="addComment('${task._id}')">Commenter</button>
                </div>

                <ul id="commentList-${task._id}">
                    ${task.commentaires.map(comment => 
                        `<li>
                            ${comment.contenu} - <i>${comment.auteur}</i>
                            <button onclick="deleteComment('${task._id}', '${comment._id}')">Supprimer</button>
                        </li>`
                    ).join("")}
                </ul>
            </li>`
        ).join("");
    });
}

function addTask() {
    const taskData = {
        titre: document.getElementById("taskTitre").value.trim(),
        description: document.getElementById("taskDescription").value.trim(),
        echeance: document.getElementById("taskEcheance").value || null,
        statut: document.getElementById("taskStatut").value,
        priorite: document.getElementById("taskPriorite").value,
        auteur: {
            nom: document.getElementById("taskAuteurNom").value.trim(),
            prenom: document.getElementById("taskAuteurPrenom").value.trim(),
            email: document.getElementById("taskAuteurEmail").value.trim()
        },
        categorie: document.getElementById("taskCategorie").value.trim(),
        etiquettes: document.getElementById("taskEtiquettes").value.split(",").map(tag => tag.trim())
    };

    fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData)
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById("taskForm").reset();
        fetchTasks();
    })
    .catch(err => console.error("Erreur lors de l'ajout :", err));
}


function deleteTask(id) {
    fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" })
    .then(fetchTasks);
}

function editTask(id, titre, description, echeance, statut, priorite) {
    document.getElementById("editSection").style.display = "block";
    document.getElementById("editId").value = id;
    document.getElementById("editTitre").value = titre;
    document.getElementById("editDescription").value = description || "";
    document.getElementById("editEcheance").value = echeance ? new Date(echeance).toISOString().split("T")[0] : "";
    document.getElementById("editStatut").value = statut;
    document.getElementById("editPriorite").value = priorite;
    document.getElementById("editSection").setAttribute("data-id", id);
}

function saveTask() {
    const id = document.getElementById("editId").value;
    const updatedTask = {
        titre: document.getElementById("editTitre").value,
        description: document.getElementById("editDescription").value,
        echeance: document.getElementById("editEcheance").value,
        statut: document.getElementById("editStatut").value,
        priorite: document.getElementById("editPriorite").value
    };

    fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask)
    }).then(() => {
        document.getElementById("editSection").style.display = "none";
        fetchTasks();
    });
}

function cancelEdit() {
    document.getElementById("editSection").style.display = "none";
}

function addComment(taskId) {
    let contenu = document.getElementById(`commentText-${taskId}`).value;
    let auteur = document.getElementById(`commentAuthor-${taskId}`).value;

    fetch(`http://localhost:5000/tasks/${taskId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auteur, contenu })
    }).then(fetchTasks);
}

function deleteComment(taskId, commentId) {
    fetch(`http://localhost:5000/tasks/${taskId}/comments/${commentId}`, {
        method: "DELETE"
    }).then(fetchTasks);
}