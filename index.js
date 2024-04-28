const responseClassList = [
  "text-black",
  "p-2",
  "m-2",
  "flex",
  "items-center",
  "gap-x-3",
];
const questionClassList = [
  "text-black",
  "m-2",
  "p-2",
  "flex",
  "items-center",
  "gap-x-3",
];
const loaderDivClass = [
  "inline-block",
  "h-8",
  "w-8",
  "animate-spin",
  "rounded-full",
  "border-4",
  "border-solid",
  "border-current",
  "border-e-transparent",
  "align-[-0.125em]",
  "text-blue-400",
  "motion-reduce:animate-[spin_1.5s_linear_infinite]",
];
const loaderSpanClass = [
  "!absolute",
  "!-m-px",
  "!h-px",
  "!w-px",
  "!overflow-hidden",
  "!whitespace-nowrap",
  "!border-0",
  "!p-0",
  "![clip:rect(0,0,0,0)]",
];
const prompt = document.querySelector("#prompt");
const generateResponse = document.querySelector("#generate-response");
const reponseBody = document.querySelector("#responses");
const loader = document.createElement("div");
loaderDivClass.map((value) => {
  loader.classList.add(value);
});
const loaderSpan = document.createElement("span");
loaderSpanClass.map((value) => loaderSpan.classList.add(value));
loaderSpan.innerText = "Loading...";
loader.append(loaderSpan);
loader.role = "status";
function getResponse(prompt, output) {
  generateResponse.classList.add("cursor-not-allowed");
  generateResponse.classList.add("opacity-50");
  const robotImage = document.createElement("img");
  robotImage.src = "/robot.png";
  robotImage.alt = "robot";
  robotImage.classList.add("h-10");
  robotImage.classList.add("w-10");
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("flex");
  imageDiv.classList.add("flex-col");
  imageDiv.classList.add("justify-start");
  imageDiv.classList.add("h-full");
  const text = document.createElement("div");
  text.classList.add("max-w-[90%]");
  const data = {
    model: "llama3",
    prompt: prompt,
    stream: true,
  };
  fetch("http://localhost:11434/api/generate", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const readData = async () => {
      const { value, done } = await reader.read();
      if (done) {
        generateResponse.classList.remove("cursor-not-allowed");
        generateResponse.classList.remove("opacity-50");
        return "Stream Ended";
      }
      if (output.innerText === "Generating Response\nLoading...") {
        output.innerText = "";
        imageDiv.append(robotImage);
        output.append(imageDiv);
        output.append(text);
      }
      text.innerText += JSON.parse(decoder.decode(value)).response;
      readData();
    };
    readData();
  });
}

generateResponse.addEventListener("click", () => {
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("flex");
  imageDiv.classList.add("flex-col");
  imageDiv.classList.add("justify-start");
  imageDiv.classList.add("h-full");
  const userImage = document.createElement("img");
  userImage.src = "/man.png";
  userImage.alt = "man";
  userImage.classList.add("h-10");
  userImage.classList.add("w-10");
  imageDiv.append(userImage);
  const questionDiv = document.createElement("div");
  questionClassList.map((val) => questionDiv.classList.add(val));
  const value = prompt.value;
  questionDiv.appendChild(imageDiv);
  const text = document.createElement("div");
  text.innerText = value;
  questionDiv.append(text);
  prompt.value = "";
  const output = document.createElement("div");
  responseClassList.map((value) => output.classList.add(value));
  output.innerText = "Generating Response";
  output.append(loader);
  reponseBody.append(questionDiv);
  reponseBody.append(output);
  getResponse(value, output);
});
