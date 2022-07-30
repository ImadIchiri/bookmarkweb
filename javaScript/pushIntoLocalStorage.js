let localStorageContent = [];

if (window.localStorage.getItem("savedLinks")) {
  const savedObjs = JSON.parse(window.localStorage.getItem("savedLinks"));

  savedObjs.forEach((obj) => {
    localStorageContent.push(obj);
  });
}

function insertIntoLocalStorage({ folder, title, description, url }) {
  let id = new Date().getTime();
  let favorite = "false";

  const setObject = {
    id,
    folder,
    title,
    description,
    url,
    favorite,
  };

  localStorageContent.push(setObject);

  //   Inser Into LocalStorage
  isnert("savedLinks", JSON.stringify(localStorageContent));
}

function isnert(key, val) {
  window.localStorage.setItem(key, val);
  window.location.reload();
}

export { insertIntoLocalStorage, localStorageContent, isnert };
