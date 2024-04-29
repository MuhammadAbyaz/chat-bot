export const createResponseDiv = () => {
  const responseClassList = [
    "text-black",
    "p-2",
    "m-2",
    "flex",
    "items-center",
    "gap-x-3",
  ];
  const response = document.createElement("div");
  response.classList.add(...responseClassList);
  return response;
};
