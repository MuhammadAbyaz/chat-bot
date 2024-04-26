const classList = ["flex", "text-white", "border", "rounded-xl", "p-2", "m-2"];

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
      output.innerText += JSON.parse(decoder.decode(value)).response;
      readData();
    };
    readData();
  });
}
const prompt = document.querySelector("#prompt");
const generateResponse = document.querySelector("#generate-response");
generateResponse.addEventListener("click", () => {
  const value = prompt.value;
  prompt.value = "";
  const output = document.createElement("div");
  classList.map((value) => output.classList.add(value));
  document.body.append(output);
  getResponse(value, output);
});
