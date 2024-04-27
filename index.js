const responseClassList = ["text-black", "border", "rounded-xl", "p-2", "m-2"];

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

function getResponse(prompt, output) {
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
      if (done) return "Stream Ended";
      if (
        output.innerText === "Generating Response\nLoading..." &&
        output.innerHTML
      ) {
        output.innerText = "";
        output.innerHTML = "";
      }
      output.innerText += JSON.parse(decoder.decode(value)).response;
      readData();
    };
    readData();
  });
}

loaderDivClass.map((value) => {
  loader.classList.add(value);
});
const loaderSpan = document.createElement("span");
loaderSpanClass.map((value) => loaderSpan.classList.add(value));
loaderSpan.innerText = "Loading...";
loader.append(loaderSpan);
loader.role = "status";
generateResponse.addEventListener("click", () => {
  const value = prompt.value;
  prompt.value = "";
  const output = document.createElement("div");
  responseClassList.map((value) => output.classList.add(value));
  output.innerText = "Generating Response";
  output.append(loader);
  reponseBody.append(output);
  getResponse(value, output);
});
