import { favoriteContainer, allFavorites } from "./favorites.js";
import { localStorageContent } from "./pushIntoLocalStorage.js";
import allObjectsFunc from "./history.js";

const mainSection = document.getElementById("main-section");
const favoriteSection = document.getElementById("favorite-section");
const historySection = document.getElementById("history-section");

const favoriteIcon = document.getElementById("favorite-footer");
const homeIcon = document.getElementById("home-footer");
const historyIcon = document.getElementById("history-footer");

const newTaskClose = document.getElementById("close-new-task");

const foldersContainer = document.getElementById("folders-container");
const insideFolder = document.getElementById("inside-folder");

const historyConatiner = document.getElementById("history-container");

const savedLinks = document.getElementById("saved-links");

const goBackArrow = document.getElementById("go-back");

const footerList = document.querySelectorAll("#footer-list li");

let favoriteList = [];
let allObjsList = [];

footerList.forEach((item) => {
  item.addEventListener("click", () => {
    footerList.forEach((item) => {
      item.classList.remove("active");
    });
    item.classList.add("active");
  });
});

favoriteIcon.addEventListener("click", () => {
  newTaskClose.setAttribute("previous-place", "favorite");

  mainSection.style.display = "none";
  historySection.style.display = "none";
  favoriteSection.style.display = "block";

  favoriteContainer.innerHTML = "";

  localStorageContent.forEach((obj) => {
    if (obj.favorite === "true") {
      favoriteList.push(obj);
    }
  });

  // Send The List To 'allFavorites' in favoriteSection.js
  allFavorites(favoriteList);

  // Empty The Array Again
  favoriteList.length = 0;

  goBackArrow.style.display = "none";
});

homeIcon.addEventListener("click", () => {
  favoriteSection.style.display = "none";
  historySection.style.display = "none";
  mainSection.style.display = "block";

  foldersContainer.style.display = "flex";
  insideFolder.style.display = "none";
  savedLinks.innerHTML = "";

  // favoriteContainer.innerHTML = "";

  goBackArrow.style.display = "none";
});

historyIcon.addEventListener("click", () => {
  newTaskClose.setAttribute("previous-place", "history");

  mainSection.style.display = "none";
  favoriteSection.style.display = "none";
  historySection.style.display = "block";

  favoriteContainer.innerHTML = "";
  historyConatiner.innerHTML = "";

  localStorageContent.forEach((obj) => {
    allObjsList.push(obj);
  });

  // Send The List To 'allObjects' in favoriteSection.js
  allObjectsFunc(allObjsList);

  // Empty The Array Again
  allObjsList.length = 0;
});
