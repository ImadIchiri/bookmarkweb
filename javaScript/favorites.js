import createCard from "./cards.js";

const favoriteContainer = document.getElementById("favorites-container");

function allFavorites(listOfFavorites) {
  favoriteContainer.innerHTML = "";
  listOfFavorites.length > 0
    ? listOfFavorites.forEach((obj) => {
        fillFavoriteContainer(obj);
      })
    : favoriteContainer.append(emptyMsg());
}

function fillFavoriteContainer(currObj) {
  // Append The Card Into #favorites-container
  favoriteContainer.append(createCard(currObj));
}

function emptyMsg() {
  const heading = document.createElement("h3");
  heading.className = "empty-msg";

  const msg = document.createTextNode("This Section Is Empty !");

  heading.append(msg);

  return heading;
}

export { fillFavoriteContainer, favoriteContainer, allFavorites, emptyMsg };
