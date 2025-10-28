const searchInput = document.getElementById('searchInput');
const productContainer = document.getElementById('productContainer');
const productCards = Array.from(productContainer.getElementsByClassName('product-card'));
const cartCount = document.getElementById('cartCount');
const cartIcon = document.getElementById('cart');
const cartPopup = document.getElementById('cartPopup');
const cartList = document.getElementById('cartList');
const cartTotalElem = document.getElementById('cartTotal');
const closeCartBtn = document.getElementById('closeCart');


let cartItems = {}; // { "Pizza": {price:12, quantity:2, img:"images/placeholder.png"}, ... }

// Tìm kiếm món ăn
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  productCards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    card.style.display = name.includes(query) ? 'block' : 'none';
  });
});

// Thêm vào giỏ hàng + hiệu ứng bay
productCards.forEach(card => {
  const btn = card.querySelector('button.addToCart');
  btn.addEventListener('click', () => {
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);
    const img = card.querySelector('img').src;

    if(cartItems[name]){
      cartItems[name].quantity += 1;
    } else {
      cartItems[name] = {price, quantity:1, img};
    }

    // Animation zoom card
    card.style.transform = "scale(1.05)";
    setTimeout(() => card.style.transform = "scale(1)", 200);

    // Clone ảnh để bay vào giỏ
    const imgClone = card.querySelector('img').cloneNode(true);
    imgClone.classList.add('flying-img');
    document.body.appendChild(imgClone);

    const cardRect = card.querySelector('img').getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    imgClone.style.left = cardRect.left + 'px';
    imgClone.style.top = cardRect.top + 'px';

    requestAnimationFrame(() => {
      imgClone.style.transform = `translate(${cartRect.left - cardRect.left}px, ${cartRect.top - cardRect.top}px) scale(0.1)`;
      imgClone.style.opacity = 0.5;
    });

    // Sau khi bay xong, update giỏ hàng nhưng không mở popup
    setTimeout(() => {
      imgClone.remove();
      renderCart();
    }, 850); 
  });
});

// Render danh sách giỏ hàng với ảnh, tăng giảm, xoá
function renderCart(){
  cartList.innerHTML = '';
  let total = 0;
  let totalItems = 0;

  for(const name in cartItems){
    const item = cartItems[name];
    total += item.price * item.quantity;
    totalItems += item.quantity;

    const li = document.createElement('li');

    li.innerHTML = `
      <img src="${item.img}" alt="${name}">
      <span>${name} - $${item.price}</span>
      <span class="item-controls">
        <button class="dec" data-name="${name}">-</button>
        ${item.quantity}
        <button class="inc" data-name="${name}">+</button>
        <button class="remove" data-name="${name}">Remove</button>
      </span>
      <span>= $${(item.price * item.quantity).toFixed(2)}</span>
    `;

    cartList.appendChild(li);
  }

  cartTotalElem.textContent = total.toFixed(2);
  cartCount.textContent = totalItems;

  // Nút tăng giảm
  document.querySelectorAll('.inc').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      cartItems[name].quantity += 1;
      renderCart();
    });
  });

  document.querySelectorAll('.dec').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      if(cartItems[name].quantity > 1){
        cartItems[name].quantity -= 1;
      } else {
        delete cartItems[name];
      }
      renderCart();
    });
  });

  // Nút xoá
  document.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      delete cartItems[name];
      renderCart();
    });
  });
}

// Mở/đóng giỏ hàng chỉ khi bấm icon
cartIcon.addEventListener('click', () => {
  cartPopup.classList.toggle('active');
});

closeCartBtn.addEventListener('click', () => {
  cartPopup.classList.remove('active');
});
