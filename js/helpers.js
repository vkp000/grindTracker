function extractLinks(t) {
  return [...new Set(
    (t.match(/https?:\/\/[^\s]+/g) || [])
      .map(u => u.replace(/[)\],.;:]+$/g, ""))
  )];
}

function faviconURL(u) {
  try {
    return `https://www.google.com/s2/favicons?sz=64&domain=${new URL(u).hostname}`;
  } catch {
    return "";
  }
}
