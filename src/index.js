const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const category = document.querySelector("#category").value;

  fetch("http://localhost:3000/task", {
    method: "POST",
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
      
      const modalContainer = document.querySelector(".modal-container");

        const modal = document.createRange().createContextualFragment(`
              <div  class="background">
              <div class="modal">
              <h2>Listo</h2>
              <h2>ve a "mis tareas"</h2>
              </div>
              </div>
        `);
    
        modalContainer.appendChild(modal)
      

    })
    .catch((error) => {
      console.error("There was an error:", error);
    });
});

document.querySelector(".my-tasks").addEventListener("click", function () {
  window.location.href = "http://localhost:5173/tareas.html";
});
