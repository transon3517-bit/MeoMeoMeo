const button = document.getElementById("changeColorBtn");
const heading = document.querySelector("h1");

const color =[
  {hex: "#f8b400", name: "Yellow"},
  {hex: "#f44336", name: "Red"},
  {hex: "#4caf50", name: "Green"},
  {hex: "#2196f3", name: "Blue"},
  {hex: "#9c27b0", name: "Purple"}
];

button.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * color.length);
  const randomColor = color[randomIndex];

  document.body.style.backgroundColor = randomColor.hex;

   heading.textContent = `It is ${randomColor.name}!`;
  alert("Wow! Did you just changed the color? Let see what color it is!");

});


