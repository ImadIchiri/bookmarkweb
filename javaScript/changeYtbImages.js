function changeYtbImages(img, link) {
  const linkRegex = /(https:\/\/)?(www.)?(youtube.com\/watch\?v=)/gi;
  let idOfVideo = "";

  if (linkRegex.test(link)) {
    const addedToLink = link.match(linkRegex);
    for (let i = addedToLink[0].length; i < link.length; i++) {
      idOfVideo += link[i];
    }

    let mainLink = `https://i.ytimg.com/vi/${idOfVideo}/0.jpg`;

    setNewThumbnail(img, mainLink);
  } else {
    return "";
  }
}

function setNewThumbnail(img, link) {
  img.setAttribute("src", link);
}

export default changeYtbImages;
