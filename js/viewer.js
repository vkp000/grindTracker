const view = document.getElementById("view");

/**
 * Render file content in the right editor panel
 * @param {string} full - full path (relative to ROOT)
 * @param {string} name - file name
 * @param {HTMLElement} row - sidebar row (for checkbox sync)
 */
async function renderFile(full, name, row) {
  const txt = await fetch(`${ROOT}/${full}`).then(r => r.text());
  const links = extractLinks(txt);
  const isSolved = localStorage.getItem(solvedKey(full)) === "true";

  view.innerHTML = `
    <div class="file-header">${name}</div>

    <div class="editor-actions">
      ${links.map(l =>
        `<img class="link-logo" src="${faviconURL(l)}" data-link="${l}" />`
      ).join("")}

      <button class="copy-btn run-btn">Run Online</button>
      <button class="copy-btn">Copy</button>
      <span class="cb editor-checkbox ${isSolved ? "checked" : ""}"></span>
    </div>

    ${
      name.endsWith('.md')
        ? marked.parse(txt)
        : `<pre><code class="language-java">${txt.replace(/</g, "&lt;")}</code></pre>`
    }

    <div class="compiler-wrap" style="position:relative;">
      <div class="compiler-loader">
        <div class="loader-spinner"></div>
      </div>

      <iframe
        src="https://codepen.io/calebnance/full/nXPaKN"
        loading="lazy"
        referrerpolicy="no-referrer">
      </iframe>
    </div>
  `;

  Prism.highlightAll();

  /* ===== COPY (REMOVE LINKS FIRST) ===== */
  const copyBtn = view.querySelector('.copy-btn:nth-of-type(2)');
  copyBtn.onclick = () => {
    const cleanText = txt.replace(/https?:\/\/[^\s]+/g, '').trim();
    navigator.clipboard.writeText(cleanText);

    const t = copyBtn.textContent;
    copyBtn.textContent = "Copied";
    setTimeout(() => copyBtn.textContent = t, 3000);
  };

  /* ===== LINK ICON CLICK ===== */
  view.querySelectorAll('.link-logo').forEach(icon => {
    icon.onclick = () => window.open(icon.dataset.link, '_blank', 'noopener');
  });

  /* ===== RUN ONLINE TOGGLE + LOADER ===== */
  const runBtn = view.querySelector('.run-btn');
  const compiler = view.querySelector('.compiler-wrap');
  const iframe = compiler.querySelector('iframe');
  const loader = compiler.querySelector('.compiler-loader');

  runBtn.onclick = () => {
    const show = compiler.style.display !== 'block';
    compiler.style.display = show ? 'block' : 'none';
    runBtn.textContent = show ? 'Hide Compiler' : 'Run Online';

    if (show) {
      // show loader
      loader.style.display = 'flex';

      // scroll to compiler
      setTimeout(() => {
        compiler.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 0);

      // hide loader when iframe loads
      iframe.onload = () => {
        loader.style.display = 'none';
      };
    }
  };

  /* ===== EDITOR CHECKBOX SYNC ===== */
  const ecb = view.querySelector('.editor-checkbox');
  ecb.onclick = () => {
    const s = !ecb.classList.contains('checked');
    ecb.classList.toggle('checked', s);
    localStorage.setItem(solvedKey(full), s);
    row.querySelector('.cb')?.classList.toggle('checked', s);
    updateProgress();
  };
}
