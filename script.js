const button = document.getElementById("changeColorBtn");

button.addEventListener("click", () => {
  const colors = ["#f8b400", "#f44336", "#4caf50", "#2196f3", "#9c27b0"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
});
