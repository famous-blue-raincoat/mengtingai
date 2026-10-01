"use strict";

// Values from the paper's Llama3.1-8B table; arrays are MBPP, SVAMP, Avg Acc.
const results = {
  "20": {
    before: { ours: [23.80, 49.00, 55.09], baseline: [4.40, 22.33, 45.65] },
    after: { ours: [33.00, 56.67, 62.11], baseline: [25.20, 33.33, 55.16] }
  },
  "50": {
    before: { ours: [0.20, 9.33, 27.83], baseline: [0.00, 7.33, 23.27] },
    after: { ours: [3.40, 23.00, 38.01], baseline: [0.00, 4.67, 29.78] }
  }
};

function updateResults() {
  const sparsity = document.querySelector('input[name="sparsity"]:checked').value;
  const recovery = document.querySelector('input[name="recovery"]:checked').value;
  const selected = results[sparsity][recovery];
  ["mbpp", "svamp", "avg"].forEach(function (metric, index) {
    document.getElementById("ours-" + metric).textContent = selected.ours[index].toFixed(2);
    document.getElementById("base-" + metric).textContent = selected.baseline[index].toFixed(2);
  });
  document.getElementById("result-state").textContent =
    "Llama3.1-8B · " + sparsity + "% sparsity · " + (recovery === "before" ? "Before LoRA" : "After LoRA");
  document.getElementById("result-gap").textContent =
    "+" + (selected.ours[2] - selected.baseline[2]).toFixed(2) + " points in average accuracy over LLM-Pruner.";
}

document.querySelectorAll(".result-controls input").forEach(function (input) {
  input.addEventListener("change", updateResults);
});

const dialog = document.getElementById("figure-dialog");
let figureTrigger = null;
document.querySelectorAll("[data-zoom]").forEach(function (link) {
  link.addEventListener("click", function (event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (typeof dialog.showModal !== "function") return;
    event.preventDefault();
    figureTrigger = link;
    const image = document.getElementById("enlarged-figure");
    image.src = link.href;
    image.alt = link.querySelector("img").alt;
    document.getElementById("figure-dialog-title").textContent = link.dataset.title;
    document.getElementById("original-image-link").href = link.href;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    document.getElementById("close-figure").focus();
  });
});
document.getElementById("close-figure").addEventListener("click", function () { dialog.close(); });
dialog.addEventListener("click", function (event) {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (
    event.clientX < bounds.left || event.clientX > bounds.right ||
    event.clientY < bounds.top || event.clientY > bounds.bottom
  )) dialog.close();
});
dialog.addEventListener("close", function () {
  document.body.style.overflow = "";
  if (figureTrigger) figureTrigger.focus();
});

document.getElementById("copy-citation").addEventListener("click", async function () {
  const button = this;
  const status = document.getElementById("copy-status");
  const text = document.getElementById("bibtex").textContent;
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = "Copied ✓";
    status.textContent = "BibTeX citation copied to clipboard.";
    window.setTimeout(function () { button.textContent = "Copy BibTeX ⧉"; }, 2200);
  } catch (error) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.getElementById("bibtex"));
    selection.removeAllRanges();
    selection.addRange(range);
    button.textContent = "Selected — copy manually";
    status.textContent = "Automatic copying is unavailable. The citation is selected; use your browser's copy command.";
  }
});
