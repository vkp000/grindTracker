const toggle = document.getElementById("toggle");

if (localStorage.theme === "dark") {
  document.body.classList.add("dark");
  toggle.textContent = "☀️";
}

toggle.onclick = () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  toggle.textContent = dark ? "☀️" : "🌙";
  localStorage.theme = dark ? "dark" : "light";
};
