const urlBase = "https://jsonplaceholder.typicode.com/posts";
let posts = [];

function getData() {
  fetch(urlBase)
    .then((res) => res.json())
    .then((data) => {
      posts = data;
      renderPostsList();
    })
    .catch((error) => console.log("Error al llamar a la api.", error));
}

function renderPostsList() {
  const postsList = document.getElementById("postsList");
  postsList.innerHTML = "";

  posts.forEach((post) => {
    const listItem = document.createElement("li");
    listItem.classList.add("postItem");
    listItem.innerHTML = `
    <strong>${post.title}</strong>
    <p>${post.body}</p>
    <button onclick="editPost(${post.id})">Editar</button>
    <button onclick="deletePost(${post.id})">Borrar</button>

    <div id="editForm-${post.id}" class="editForm" >
      <label for="editTitle">Título:</label>
      <input id="editTitle-${post.id}" value="${post.title}" required>
      <label for="editBody">Comentario:</label>
      <textarea id="editBody-${post.id}" required></textarea>
      <button onclick="updatePost(${post.id})">Actualizar</button>
    </div>
    `;
    postsList.appendChild(listItem);
  });
}
