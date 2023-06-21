// Obtener el formulario
const form = document.getElementById("form");

// Obtener la barra de búsqueda
const search = document.getElementById("search");

// Obtener el widget del usuario
const userCard = document.getElementById("usercard");

// Escuchar el evento submit del form
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const username = search.value;
  getUserData(username);
  search.value = "";
});

// Obtener la info. del usuario en GitHub
async function getUserData(username) {
  const API = "https://api.github.com/users/";

  try {
    const userRequest = await fetch(API + username);

    if (!userRequest.ok) {
      throw new Error(userRequest.status);
    }

    const userData = await userRequest.json();

    if (userData.public_repos) {
      const reposRequest = await fetch(`https://api.github.com/users/${username}/repos` );
      const reposData = await reposRequest.json();
      userData.repos = reposData;
    }

    showUserData(userData);
  } catch (error) {
    showError(error.message);
  }
}

// Función para elementos HTML
function showUserData(userData) {
  
  let userContent = `
            <img src="${userData.avatar_url}" alt="Avatar">
            <h1>${userData.name}</h1>
            <h2>${userData.location}</h2>
            <p>${userData.bio}</p>
            
            <section class="data">
                <ul>
                    <li>Followers:<span> ${userData.followers}</span></li>
                    <li>Following:<span> ${userData.following}</span></li>
                    <li>Repos:<span> ${userData.public_repos}</span></li>
                </ul>
            </section>
    `;

  if (userData.repos) {
    userContent += `<section class="repos">`

    userData.repos.slice(0, 7).forEach(repo => {
        userContent += `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`
    })

    userContent +=`</section>`;
  }



  userCard.innerHTML = userContent;
}

// Función para gestionar los errores
function showError(error) {
    const errorContent = `<h1>Error ⚠️ ${error}</h1>`
    userCard.innerHTML = errorContent
}


