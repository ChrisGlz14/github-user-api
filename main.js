// Obtengo los elementos del buscador
const form = document.querySelector(".form");
const search = document.getElementById("inputsearch");

//Obtengo la card del usuario 
const userCard = document.getElementById("userCard")

// Añado add event listener
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const userName = search.value.trim();
  getUserData(userName);
  search.value = "";
});

//Funcion para busqueda de informacion del user

async function getUserData(username) {
  const API = "https://api.github.com/users/";

  try {
    const userRequest = await fetch(API + username);

    if (!userRequest.ok) {
        throw new Error(userRequest.status)
    }
 
    const userData = await userRequest.json();

    if (userData.public_repos) {
      const reposRequest = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const reposData = await reposRequest.json();

      userData.repos = reposData

    }

    showUserData(userData);
  } catch (error) {
    console.log(error.message);
  }
}

// Funcion para mostrar informacion html 

function showUserData(userData) {

    let userContent = `
      <img class="avatar-img" src="${userData.avatar_url}" alt="imagen de perfil" />
      <h2 class="name">${userData.name}</h2>
      <h3>${userData.location}</h3>
      <p class="bio">${userData.bio}</p>

      <section class="data">
                <ul>
                    <li>Followers: ${userData.followers}</li>
                    <li>Following: ${userData.following}</li>
                    <li>Repos: ${userData.public_repos}</li>
                </ul>
      </section>

      <section class="repos">
        <a href="#">Repo 1</a><a href="#">Repo 2</a><a href="#">Repo 3</a
        ><a href="#">Repo 4</a><a href="#">Repo 5</a><a href="#">Repo 6</a
        ><a href="#">Repo 7</a>
      </section>
    `;
    userCard.innerHTML = userContent;
}


//Funcion para gestionar Errores

function showError(error) {


}

