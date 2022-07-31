import createCard from "./cards.js";
import { emptyMsg } from "./favorites.js";

const historyConatiner = document.getElementById("history-container");

function allObjectsFunc(allObjs) {
  historyConatiner.innerHTML = "";
  allObjs.length > 0
    ? allObjs.forEach((obj) => {
        fillHistoryContainer(obj);
      })
    : historyConatiner.append(emptyMsg());
}

function fillHistoryContainer(currObj) {
  // Append The Card Into #favorites-container
  historyConatiner.append(createCard(currObj));
}

export default allObjectsFunc;
