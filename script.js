const heading = document.getElementById("heading");

// Danh sách màu với tên
const colors = [
  {hex: "#ff00c3ff", name: "Yellow"},
  {hex: "#e43e99ff", name: "Red"},
  {hex: "#841775ff", name: "Green"},
  {hex: "#fe0094ff", name: "Purple"}
];

// Hàm đổi màu nền
function changeBackgroundColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  document.body.style.backgroundColor = randomColor.hex;
  heading.textContent = `It is ${randomColor.name}!`;
}

// Khi load trang, bắt đầu đổi màu liên tục
window.addEventListener("load", () => {
  setInterval(changeBackgroundColor, 600); // đổi màu mỗi 0.6 giây
});
