import { categoriesObj } from "./caterogies.js";
import { deleteObject } from "./delete.js";
import { editeFavorites } from "./editeTask.js";
import { fillInputs } from "./main.js";
import { localStorageContent } from "./pushIntoLocalStorage.js";

const mainSection = document.getElementById("main-section");
const favoriteSection = document.getElementById("favorite-section");

const newTaskSection = document.getElementById("new-task");

const favoriteContainer = document.getElementById("favorites-container");

// Btns
const addTaskBtn = document.getElementById("add-btn");
const editeTaskBtn = document.getElementById("edite-btn");

function createCard(currObj) {
  // Object ==> { id, image, title }
  let categoryId = categoriesObj[currObj["folder"]];

  const cardDiv = document.createElement("div");
  cardDiv.className = "card";

  const link = document.createElement("a");
  link.setAttribute("href", `${currObj.url}`);
  link.setAttribute("id", `card-link`);

  const mainImageDiv = document.createElement("div");
  mainImageDiv.className = "main-image";

  const linkImage = document.createElement("img");
  linkImage.setAttribute("src", `${categoryId.image}`);
  linkImage.setAttribute("alt", `${currObj.title}`);

  const contentDiv = document.createElement("div");
  contentDiv.className = "content";

  const categoryDiv = document.createElement("div");
  categoryDiv.className = "category";

  const categoryImg = document.createElement("img");
  categoryImg.setAttribute("src", `${categoryId.image}`);
  categoryImg.setAttribute("alt", `${categoryId.title}`);

  const categoryTitle = document.createElement("h3");
  categoryTitle.className = "category-title";
  categoryTitle.textContent = `${categoryId.title}`;

  const cardTitle = document.createElement("h1");
  cardTitle.className = "title";
  cardTitle.textContent = `${currObj.title}`;

  const cardDescription = document.createElement("p");
  cardDescription.className = "description";
  cardDescription.textContent = `${currObj.description}`;

  const cardActions = document.createElement("div");
  cardActions.className = "actions";

  const favoriteLink = document.createElement("i");
  favoriteLink.className =
    currObj.favorite === "true" ? "fa-solid fa-heart" : "fa-regular fa-heart";

  // To Switch (Between Favotie Or Not)
  favoriteLink.addEventListener("click", () => {
    let favVal = "true";
    if (favoriteLink.className === "fa-regular fa-heart") {
      favoriteLink.className = "fa-solid fa-heart";
    } else {
      favoriteLink.className = "fa-regular fa-heart";
      favVal = "false";
    }
    // Edite The Favotite State (true || false)
    editeFavorites(currObj.id, favVal);
  });

  const editeLink = document.createElement("i");
  editeLink.setAttribute("data-id", currObj.id);
  editeLink.className = "fa-solid fa-pen-to-square";

  // Show Editing Section
  editeLink.addEventListener("click", () => {
    // Choose The Btn That Will Apear
    editeTaskBtn.style.display = "block";
    addTaskBtn.style.display = "none";

    mainSection.style.display = "none";
    favoriteSection.style.display = "none";
    newTaskSection.style.display = "flex";

    let mainObj = localStorageContent.filter(function (obj) {
      if (obj.id === Number(editeLink.dataset.id)) {
        return {
          title: obj.title,
          description: obj.description,
          url: obj.url,
          folder: obj.folder,
        };
      }
    });
    // Fill The Inputs
    fillInputs(mainObj[0]);
  });

  const shareLink = document.createElement("i");
  shareLink.className = "fa-solid fa-share-nodes";

  const deleteLink = document.createElement("i");
  deleteLink.className = "fa-solid fa-trash";

  deleteLink.addEventListener("click", () => {
    let userAnswer = confirm("Do You Wanna Really Delete This Task ?");

    if (userAnswer) {
      deleteObject(currObj);
    }
  });

  // Append linkImage Into mainImageDiv
  mainImageDiv.append(linkImage);

  // Append categoryImg And categoryTitle Into categoryDiv
  categoryDiv.append(categoryImg);
  categoryDiv.append(categoryTitle);

  // Append All Actions Into cardAction Div
  cardActions.append(favoriteLink);
  cardActions.append(editeLink);
  cardActions.append(shareLink);
  cardActions.append(deleteLink);

  // Append Category, title, description And actions Into Content
  contentDiv.append(categoryDiv);
  contentDiv.append(cardTitle);
  contentDiv.append(cardDescription);
  contentDiv.append(cardActions);

  // Append All Into cardDiv
  cardDiv.append(link);
  cardDiv.append(mainImageDiv);
  cardDiv.append(contentDiv);

  return cardDiv;
}

export default createCard;
