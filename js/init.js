(async () => {
  updateProgress(); // progress restore (optional but correct)

  const root = await loadFolder(ROOT);
  root.forEach(item => {
    tree.appendChild(createItem(item));
  });
})();
