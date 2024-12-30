function updateTime() {
    const timeElement = document.getElementById('current-time');
    const now = new Date();
    const timeString = now.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    timeElement.textContent = timeString;
}

// 立即更新时间
updateTime();

// 每秒更新一次时间
setInterval(updateTime, 1000);

// 购物车数据
let cart = [];
let cartTotal = 0;

// DOM 元素
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.querySelector('.cart-items');
const cartTotalElement = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');

// 打开购物车
document.querySelector('.cart-icon').addEventListener('click', function(e) {
    e.preventDefault();
    cartSidebar.classList.add('active');
});

// 关闭购物车
document.querySelector('.close-cart').addEventListener('click', function() {
    cartSidebar.classList.remove('active');
});

// 添加到购物车
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.product-card');
        const product = {
            id: Date.now(), // 临时ID
            name: card.querySelector('h3').textContent,
            price: parseFloat(card.querySelector('.price').textContent.replace('¥', '')),
            image: card.querySelector('img').src,
            quantity: 1
        };
        
        addToCart(product);
        updateCartUI();
        cartSidebar.classList.add('active');
    });
});

// 添加商品到购物车
function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(product);
    }
    
    updateCartTotal();
}

// 从购物车移除商品
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartTotal();
    updateCartUI();
}

// 更新购物车总价
function updateCartTotal() {
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `¥${cartTotal.toFixed(2)}`;
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// 更新购物车界面
function updateCartUI() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>¥${item.price.toFixed(2)} × ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${item.id})" class="remove-item">×</button>
        </div>
    `).join('');
}

// 结算按钮点击事件
document.querySelector('.checkout-btn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('购物车是空的！');
        return;
    }
    alert('感谢您的购买！总计: ¥' + cartTotal.toFixed(2));
    cart = [];
    updateCartUI();
    updateCartTotal();
    cartSidebar.classList.remove('active');
});
