const tree = document.getElementById("tree");

async function loadFolder(p) {
  return fetch(`${p}/index.json`).then(r => r.json());
}

function createItem(item, base = "") {
  const full = base + item.name;
  const solved = localStorage.getItem(solvedKey(full)) === "true";

  const row = document.createElement("div");
  row.className = "tree-item";
  row.dataset.path = full;

  row.innerHTML = `
    <span class="chevron">${item.type === "folder" ? "▶" : ""}</span>
    ${item.type === "file" ? `<span class="cb ${solved ? "checked" : ""}"></span>` : `<span style="width:16px"></span>`}
    <span class="icon">${item.type === "folder" ? "📁" : "📄"}</span>
    <span class="label">${item.name}</span>
  `;

  if (item.type === "folder") {
    let cont;
    row.onclick = async () => {
      if (!cont) {
        const d = await loadFolder(`${ROOT}/${full}`);
        cont = document.createElement("div");
        cont.className = "children";
        d.forEach(c => cont.appendChild(createItem(c, `${full}/`)));
        row.after(cont);
      }
      const chev = row.querySelector(".chevron");
      const open = chev.textContent === "▶";
      chev.textContent = open ? "▼" : "▶";
      cont.style.display = open ? "block" : "none";
    };
  } else {
    row.onclick = () => {
      localStorage.setItem(LAST_VISITED_KEY, full);
      renderFile(full, item.name, row);
    };

    // 🔥 original lastVisited restore
    if (localStorage.getItem(LAST_VISITED_KEY) === full) {
      setTimeout(() => row.click(), 0);
    }
  }

  return row;
}
