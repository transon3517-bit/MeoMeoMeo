// Try to find the heading; fall back to the first H1 if id is missing
const heading = document.getElementById("heading") || document.querySelector('h1');

// list of color to change (names adjusted to match colors)
const colors = [
  {hex: "#ff00c3ff", name: "Magenta"},
  {hex: "#e43e99ff", name: "Rose"},
  {hex: "#841775ff", name: "Purple"},
  {hex: "#fe0094ff", name: "Hot Pink"}
];

// Hàm đổi màu nền
function changeBackgroundColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  document.body.style.backgroundColor = randomColor.hex;
  if (heading) {
    heading.textContent = `It is ${randomColor.name}!`;
  }
}

// Hook up the click button to change color once
const changeBtn = document.getElementById('changeColorBtn');
if (changeBtn) {-
  changeBtn.addEventListener('click', changeBackgroundColor);
}

// when reload page start change color (interval >= transition duration)
window.addEventListener("load", () => {
  setInterval(changeBackgroundColor, 600); // change every 600ms
});
