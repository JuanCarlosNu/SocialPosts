const urlBase = "https://jsonplaceholder.typicode.com/posts";
let post = [];

function getData() {
  fetch(urlBase)
    .then((res) => res.json())
    .then((data) => {
      post = data;
      console.log(data); /// metodo para mostrar la inf en pantalla
    })
    .catch((error) => console.log("Error al llamar a la api.", error));
}
