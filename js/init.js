(async () => {
  updateProgress();

  const root = await loadFolder(ROOT);
  root.forEach(item => {
    tree.appendChild(createItem(item));
  });

  const last = localStorage.getItem(LAST_VISITED_KEY);
  if (last) {
    navigateToPath(last);
  }
})();
