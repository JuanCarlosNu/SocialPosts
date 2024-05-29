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

  for (let i = posts.length - 5; i < posts.length; i++) {
    const post = posts[i];

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
  }
}

function postData() {
  const postTitleInput = document.getElementById("postTitle");
  const postBodyInput = document.getElementById("postBody");
  const postTitle = postTitleInput.value;
  const postBody = postBodyInput.value;
  if (postTitle.trim() == "" || postBody.trim() == "") {
    alert("ese necesario completar ambos campos");
    return;
  }
  fetch(urlBase, {
    method: "POST",
    body: JSON.stringify({
      title: postTitle,
      body: postBody,
      userId: 1, // doesn't matters since we dont have multiple users.
    }),

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      posts.push(data);
      renderPostsList();
      postTitleInput.value = "";
      postBodyInput.value = "";
    })
    .catch((error) => console.error(`error al crear posteo: ${error}`));
}
