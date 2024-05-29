const urlBase = "https://jsonplaceholder.typicode.com/posts";
let posts = [];

function getData() {
  fetch(urlBase)
    .then((res) => res.json())
    .then((data) => {
      posts = data;
      renderPostsList();
    })
    .catch((error) => console.error("Error al llamar a la api.", error));
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
          <textarea id="editBody-${post.id}"  required>${post.body}</textarea>
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

function editPost(id) {
  const editForm = document.getElementById(`editForm-${id}`);
  editForm.style.display = editForm.style.display == "none" ? "block" : "none";
}
function updatePost(id) {
  const editTitle = document.getElementById(`editTitle-${id}`).value;
  const editBody = document.getElementById(`editBody-${id}`).value;

  fetch(`${urlBase}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id: id,
      title: editTitle,
      body: editBody,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const index = posts.findIndex((post) => post.id === data.id);
      if (index != -1) {
        posts[index] = data;
      } else {
        alert("hubo un error al actualizar la info del posteo", error);
      }
      renderPostsList();
    })
    .catch((error) => console.error(`error al crear posteo: ${error}`));
}
