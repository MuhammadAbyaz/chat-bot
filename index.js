import { loader } from "./components/loader";
import { createImageDiv } from "./components/imageDiv";
import { createResponseDiv } from "./components/responseDiv";

const prompt = document.querySelector("#prompt");
const generateResponse = document.querySelector("#generate-response");
const reponseBody = document.querySelector("#responses");

function getResponse(prompt, output) {
  generateResponse.classList.add("cursor-not-allowed");
  generateResponse.classList.add("opacity-50");
  const imageDiv = createImageDiv("./robot.png", "robot");
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
  const imageDiv = createImageDiv("./man.png", "man");
  const questionDiv = createResponseDiv();
  const value = prompt.value;
  questionDiv.append(imageDiv);
  const text = document.createElement("div");
  text.classList.add("max-w-[90%]");
  text.innerText = value;
  questionDiv.append(text);
  prompt.value = "";
  const output = createResponseDiv();
  output.innerText = "Generating Response";
  output.append(loader);
  reponseBody.append(questionDiv);
  reponseBody.append(output);
  getResponse(value, output);
});
