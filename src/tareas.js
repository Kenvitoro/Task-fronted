fetch("http://localhost:3000/task")
  .then((response) => response.json())
  .then((data) => {
    const tableBody = document.querySelector("tbody");
    data.forEach((task) => {
      const row = document.createElement("tr");
      const idCell = document.createElement("td");
      const taskCell = document.createElement("td");
      const taskDescription = document.createElement("td");
      const categoryCell = document.createElement("td");
      const actionsCell = document.createElement("td");
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      idCell.textContent = task.id;
      taskCell.textContent = task.title;
      taskDescription.textContent = task.description;
      categoryCell.textContent = task.category;
      editButton.textContent = "Editar";
      deleteButton.textContent = "Eliminar";

      deleteButton.classList.add("btn");
      editButton.classList.add("btn");

      editButton.addEventListener("click", () => {
        const editar = document.querySelector(".editar");

        const modal = document.createRange().createContextualFragment(`
              <div  class="background">
              <div class="modal">
              <form class="form">
                      <div class="form-group">
                        <label for="title">Título</label>
                        <input type="text" id="titlemodal" name="title" class="form-input" required value="${task.title}">
                      </div>
                      <div class="form-group">
                        <label for="description">Descripción</label>
                        <textarea id="descriptionmodal" name="description" class="form-input" required >${task.description}</textarea>
                      </div>
                      <button type="submit" class="form-button btn enviar">Añadir</button>
                      <button class="form-button btn cerrar">Cerrar</button>
                    </form>
              </div>
              </div>
        `);

        editar.append(modal);
        

        const enviar = document.querySelector(".enviar");
        const cerrar = document.querySelector(".cerrar");

        enviar.addEventListener("click", (e) => {
          e.preventDefault();

          const title = document.querySelector("#titlemodal").value;
          const description = document.querySelector("#descriptionmodal").value;
          const category = document.querySelector("#categorymodal").value;

          console.log(category);

          fetch(`http://localhost:3000/task/${task.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: title,
              description: description,
              category: category,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              console.log(data);
              // do something with the response data
            })
            .catch((error) => {
              console.error("There was an error:", error);
            });

          console.log(category);
        });

        cerrar.addEventListener("click", () => {
          editar.removeChild(modal);
        window.location.reload();
        });


      });

      deleteButton.addEventListener("click", () => {

        fetch(`http://localhost:3000/task/${task.id}`, {
          method: "DELETE",
        });
        window.location.reload();
      });

      actionsCell.appendChild(editButton);
      actionsCell.appendChild(deleteButton);

      row.appendChild(idCell);
      row.appendChild(taskCell);
      row.appendChild(taskDescription);
      row.appendChild(categoryCell);
      row.appendChild(actionsCell);

      tableBody.appendChild(row);
    });
  });

const createBtn = document.querySelector(".create-task");

createBtn.addEventListener("click", function () {
  window.location.href = "http://localhost:5173";
});
