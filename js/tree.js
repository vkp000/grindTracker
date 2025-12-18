const tree = document.getElementById("tree");

async function loadFolder(p) {
  return fetch(`${p}/index.json`).then(r => r.json());
}

/* ===== CREATE TREE ITEM ===== */
function createItem(item, base = "") {
  const full = base + item.name;
  const solved = localStorage.getItem(solvedKey(full)) === "true";

  const row = document.createElement("div");
  row.className = "tree-item";
  row.dataset.path = full;

  row.innerHTML = `
    <span class="chevron">${item.type === "folder" ? "▶" : ""}</span>
    ${
      item.type === "file"
        ? `<span class="cb ${solved ? "checked" : ""}"></span>`
        : `<span style="width:16px"></span>`
    }
    <span class="icon">${item.type === "folder" ? "📁" : "📄"}</span>
    <span class="label">${item.name}</span>
  `;

  /* ===== FOLDER ===== */
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
  }

  /* ===== FILE ===== */
  else {
    row.onclick = () => {
      // ✅ SAVE last visited
      localStorage.setItem(LAST_VISITED_KEY, full);

      // active highlight
      document
        .querySelectorAll(".tree-item.active")
        .forEach(x => x.classList.remove("active"));
      row.classList.add("active");

      renderFile(full, item.name, row);
    };
  }

  return row;
}

/* ===== NAVIGATE TO SAVED PATH ===== */
async function navigateToPath(path) {
  const parts = path.split("/");
  let currentBase = "";

  for (const part of parts) {
    const selector = `[data-path="${currentBase + part}"]`;
    const row = document.querySelector(selector);
    if (!row) return;

    const isFolder = row.querySelector(".chevron")?.textContent !== "";

    // open folder
    if (isFolder) {
      row.click();
      currentBase += part + "/";
      await new Promise(r => setTimeout(r, 60));
    }
    // open file
    else {
      row.click();
    }
  }
}
