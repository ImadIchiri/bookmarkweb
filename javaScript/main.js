import { categoriesObj } from "./caterogies.js";
import {
  insertIntoLocalStorage,
  localStorageContent,
} from "./pushIntoLocalStorage.js";
import { editeInsideLocalStorage, editeFavorites } from "./editeTask.js";
import createCard from "./cards.js";
import { emptyMsg } from "./favorites.js";

const mainSection = document.getElementById("main-section");
const favoriteSection = document.getElementById("favorite-section");

const foldersContainer = document.getElementById("folders-container");
let cards = [];
const insideFolder = document.getElementById("inside-folder");
const savedLinks = document.getElementById("saved-links");
const folderHeaderImage = document.getElementById("folder-header-image");
const folderTitle = document.getElementById("folder-title");

const goBackArrow = document.getElementById("go-back");

// Inputs
let taskTitle = document.getElementById("task-title");
let taskFavorite = document.getElementById("task-favorite");
let taskId = document.getElementById("task-id");
let taskDescription = document.getElementById("task-description");
let taskUrl = document.getElementById("task-url");
let taskFolder = document.getElementById("task-folder");

// Btns
const addTaskBtn = document.getElementById("add-btn");
const editeTaskBtn = document.getElementById("edite-btn");

const newTaskSection = document.getElementById("new-task");
const newTaskOpen = document.getElementById("open-new-task");
const newTaskClose = document.getElementById("close-new-task");

newTaskClose.setAttribute("previous-place", "inside-folder");

// Create And Push All Folders To The DOM Inside #folders-container
categoriesObj.forEach((e) => {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  cardDiv.setAttribute("data-number", `${e["id"]}`);

  const imageDiv = document.createElement("div");
  imageDiv.className = "image";

  const img = document.createElement("img");
  img.setAttribute("src", `${e["image"]}`);
  img.setAttribute("alt", `${e["title"]}`);

  imageDiv.append(img);

  const title = document.createElement("h2");
  title.className = "title";
  title.textContent = e["title"];

  cardDiv.append(imageDiv);
  cardDiv.append(title);

  foldersContainer.append(cardDiv);
  cards.push(cardDiv);
});

/* 
  Hide The #folders-container And Show The #saved-links
  And Push Cards Into It
*/

goBackArrow.addEventListener("click", () => {
  foldersContainer.style.display = "flex";
  insideFolder.style.display = "none";
  newTaskSection.style.display = "none";
  savedLinks.innerHTML = "";
  goBackArrow.style.display = "none";
});

cards.forEach((card) => {
  newTaskClose.setAttribute("previous-place", "inside-folder");
  card.addEventListener("click", () => {
    foldersContainer.style.display = "none";
    insideFolder.style.display = "block";

    // Show The Back Arrow
    goBackArrow.style.display = "block";

    // Set The Header Of Inside Folder
    setFolderHeader(card);

    if (localStorageContent.length) {
      localStorageContent.forEach((currObj) => {
        createWhatIsInsideFolder(currObj, card.dataset.number);
      });
    } else {
      savedLinks.append(emptyMsg());
    }
  });
});

function setFolderHeader(obj) {
  const currentObj = categoriesObj[obj.dataset.number];
  folderHeaderImage.setAttribute("src", `${currentObj["image"]}`);
  folderTitle.textContent = `${currentObj["title"]}`;
}

// Create Cards Inside The Selected Folder Folder
function createWhatIsInsideFolder(currObj, folderNumber) {
  if (Number(currObj.folder) === Number(folderNumber)) {
    // Append The Card Into #saved-links
    savedLinks.append(createCard(currObj));
  }
}

// Create Options For The Select
categoriesObj.forEach((e) => {
  createOption(e);
});

function createOption(e) {
  taskFolder.innerHTML += `
      <option value="${e.id}">${e.title}</option>
  `;
}

// Show And Hide The New Task Section (Empty)

newTaskOpen.addEventListener("click", () => {
  emptyInputs();

  // Choose The Btn That Will Apear
  editeTaskBtn.style.display = "none";
  addTaskBtn.style.display = "block";

  mainSection.style.display = "none";
  favoriteSection.style.display = "none";
  newTaskSection.style.display = "flex";
});

newTaskClose.addEventListener("click", () => {
  if (newTaskClose.getAttribute("previous-place") === "favorite") {
    favoriteSection.style.display = "block";
  } else if (newTaskClose.getAttribute("previous-place") === "inside-folder") {
    mainSection.style.display = "block";
  }
  newTaskSection.style.display = "none";

  emptyInputs();
});

function emptyInputs() {
  taskTitle.value = "";
  taskDescription.value = "";
  taskUrl.value = "";
  taskFolder.value = "none";
}

// Show And Hide The New Task Section (For Editing)
function fillInputs({ id, title, description, url, folder, favorite }) {
  // Empty The Inputs
  emptyInputs();

  taskId.value = id;
  taskTitle.value = title;
  taskDescription.value = description;
  taskUrl.value = url;
  taskFolder.value = folder;
  taskFavorite.value = favorite;

  // Simple Test
  // console.log({ title, description, url, folder });
}

// Check If Data Can Be Pushed Into LocalStorage
addTaskBtn.addEventListener("click", () => {
  if (
    taskTitle.value !== "" &&
    taskUrl.value !== "" &&
    taskFolder.value !== "none"
  ) {
    let enteredData = {
      folder: taskFolder.value,
      title: taskTitle.value,
      description: taskDescription.value,
      url: taskUrl.value,
    };

    // Send Data To insertIntoLocalStorage(...)
    insertIntoLocalStorage(enteredData);

    // Reload The Website
    window.location.reload();
  } else {
    alert("You Must Enter Some Infos.");
  }
});

// Edite Data Inside The LocalStorage
editeTaskBtn.addEventListener("click", () => {
  if (
    taskTitle.value !== "" &&
    taskUrl.value !== "" &&
    Number(taskFolder.value) !== ""
  ) {
    let editedData = {
      id: taskId.value,
      favorite: taskFavorite.value,
      folder: taskFolder.value,
      title: taskTitle.value,
      description: taskDescription.value,
      url: taskUrl.value,
    };

    // Send Data To editeInsideLocalStorage(...)
    editeInsideLocalStorage(editedData);

    // Reload The Website
    window.location.reload();
  } else {
    alert("You Must Enter Some Infos.");
  }
});

favoriteSection;

export { fillInputs };
