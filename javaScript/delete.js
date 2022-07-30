import { localStorageContent, isnert } from "./pushIntoLocalStorage.js";

function deleteObject({ id }) {
  id = Number(id);

  let newArr = localStorageContent.filter((obj) => {
    return obj.id !== id;
  });

  console.log(newArr);
  isnert("savedLinks", JSON.stringify(newArr));
}

export { deleteObject };
