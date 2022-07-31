import { localStorageContent, isnert } from "./pushIntoLocalStorage.js";

function editeInsideLocalStorage({
  id,
  folder,
  title,
  description,
  url,
  favorite,
}) {
  id = Number(id);

  let setNewObj = {
    id,
    folder,
    title,
    description,
    url,
    favorite,
  };

  let newArr = localStorageContent.filter((obj) => {
    return obj.id !== id;
  });

  newArr.push(setNewObj);

  isnert("savedLinks", JSON.stringify(newArr));
}

function editeFavorites(id, favVal) {
  let theObject = localStorageContent.filter((obj) => {
    return obj.id === id;
  });

  theObject[0].favorite = favVal;

  editeInsideLocalStorage(theObject[0]);
}

export { editeInsideLocalStorage, editeFavorites };
