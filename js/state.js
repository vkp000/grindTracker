const progressEl = document.getElementById("progressCount");

function getSolvedCount() {
  let c = 0;
  for (const k in localStorage)
    if (k.startsWith("solved:") && localStorage[k] === "true") c++;
  return c;
}

function updateProgress(total = null) {
  const solved = getSolvedCount();
  progressEl.textContent = total
    ? `✔ ${solved} / ${total}`
    : `✔ ${solved} / …`;
}
