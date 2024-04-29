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
const loaderSpan = document.createElement("span");
loaderSpan.classList.add(...loaderSpanClass);
loaderSpan.innerText = "Loading...";

export const loader = document.createElement("div");
loader.classList.add(...loaderDivClass);
loader.append(loaderSpan);
loader.role = "status";
