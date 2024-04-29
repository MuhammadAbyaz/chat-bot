export const createImageDiv = (imageUrl, imageAlt) => {
  const imageDivClass = ["flex", "flex-col", "justify-start", "h-full"];
  const imageDiv = document.createElement("div");
  imageDiv.classList.add(...imageDivClass);
  const imageClass = ["h-10", "w-10"];
  const image = document.createElement("img");
  image.classList.add(...imageClass);
  image.src = imageUrl;
  image.alt = imageAlt;
  imageDiv.append(image);
  return imageDiv;
};
