/*==================================================
  FLY-TO-CART ANIMATION
==================================================*/

const animateToCart = (sourceImgElement, callback) => {
  const cartBtn = document.getElementById("cart-btn");
  if (!sourceImgElement || !cartBtn) {
    if (callback) callback();
    return;
  }

  const sourceRect = sourceImgElement.getBoundingClientRect();
  const targetRect = cartBtn.getBoundingClientRect();

  // Create flying clone
  const flyer = document.createElement("img");
  flyer.src = sourceImgElement.src;
  flyer.alt = "Flying Chip";
  flyer.className = "flying-img";

  // Initial position matching the source image
  flyer.style.top = `${sourceRect.top}px`;
  flyer.style.left = `${sourceRect.left}px`;
  flyer.style.width = `${sourceRect.width}px`;
  flyer.style.height = `${sourceRect.height}px`;
  flyer.style.opacity = "1";

  document.body.appendChild(flyer);

  // Force reflow for smooth animation start
  flyer.getBoundingClientRect();

  // Animate toward cart button
  const targetX = targetRect.left + targetRect.width / 2 - 14;
  const targetY = targetRect.top + targetRect.height / 2 - 14;

  flyer.style.top = `${targetY}px`;
  flyer.style.left = `${targetX}px`;
  flyer.style.width = "28px";
  flyer.style.height = "28px";
  flyer.style.opacity = "0.2";
  flyer.style.transform = "scale(0.4) rotate(360deg)";

  setTimeout(() => {
    if (flyer.parentNode) {
      flyer.parentNode.removeChild(flyer);
    }

    // Trigger cart button bounce animation
    cartBtn.classList.remove("cart_bounce");
    // Force reflow
    void cartBtn.offsetWidth;
    cartBtn.classList.add("cart_bounce");

    if (callback) callback();
  }, 750);
};

/*==================================================
  UI BADGES & DYNAMIC CART ITEM COUNT
==================================================*/

const updateHeaderBadges = () => {
  const cart = getStoredCart();
  const wishlist = getStoredWishlist();

  // Total quantity of units in cart
  const totalCartUnits = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

  const cartBadge = document.getElementById("cart-count");
  const wishlistBadge = document.getElementById("wishlist-count");
  const cartHeaderBadge = document.getElementById("cart-header-count");
  const wishlistHeaderBadge = document.getElementById("wishlist-header-count");

  if (cartBadge) cartBadge.textContent = totalCartUnits;
  if (wishlistBadge) wishlistBadge.textContent = totalWishlistCount;

  // Exact grammar next to "Your Snack Cart" (1 Item, 2 Items, etc.)
  if (cartHeaderBadge) {
    const label = totalCartUnits === 1 ? "Item" : "Items";
    cartHeaderBadge.innerHTML = `<span class="badge_num">${totalCartUnits}</span><span class="badge_label">${label}</span>`;
  }
  if (wishlistHeaderBadge) {
    const label = totalWishlistCount === 1 ? "Item" : "Items";
    wishlistHeaderBadge.innerHTML = `<span class="badge_num">${totalWishlistCount}</span><span class="badge_label">${label}</span>`;
  }
};

/*==================================================
  CART SYSTEM & OPERATIONS
==================================================*/

const addToCart = (productId, quantity = 1) => {
  const cart = getStoredCart();
  const existingIndex = cart.findIndex((item) => item.id === Number(productId));

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ id: Number(productId), quantity: quantity });
  }

  saveStoredCart(cart);
  updateHeaderBadges();
  renderCart();
};

const removeFromCart = (productId) => {
  let cart = getStoredCart();
  const product = getProductById(productId);
  cart = cart.filter((item) => item.id !== Number(productId));
  saveStoredCart(cart);
  updateHeaderBadges();
  renderCart();

  if (product) {
    showToast({
      image: product.image,
      title: product.name,
      message: "Removed from your cart",
      icon: "ri-delete-bin-line",
    });
  }
};

const updateCartQuantity = (productId, newQty) => {
  const cart = getStoredCart();
  const item = cart.find((i) => i.id === Number(productId));
  if (!item) return;

  if (newQty <= 0) {
    removeFromCart(productId);
  } else {
    item.quantity = newQty;
    saveStoredCart(cart);
    updateHeaderBadges();
    renderCart();
  }
};

const clearCart = () => {
  saveStoredCart([]);
  updateHeaderBadges();
  renderCart();
  showToast({
    image: "assets/img/favicon.png",
    title: "Cart Cleared",
    message: "All items removed from cart",
    icon: "ri-delete-bin-fill",
  });
};

const calculateCartTotals = () => {
  const cart = getStoredCart();
  let subtotal = 0;

  cart.forEach((item) => {
    const product = getProductById(item.id);
    if (product) {
      subtotal += product.price * item.quantity;
    }
  });

  const delivery = subtotal > 0 ? (subtotal >= 25 ? 0 : 3) : 0;
  const total = subtotal + delivery;

  return { subtotal, delivery, total };
};

const renderCart = () => {
  const cart = getStoredCart();
  const container = document.getElementById("cart-items-container");
  const emptyState = document.getElementById("cart-empty-state");
  const contentLayout = document.getElementById("cart-content-layout");

  const subtotalEl = document.getElementById("cart-summary-subtotal");
  const deliveryEl = document.getElementById("cart-summary-delivery");
  const totalEl = document.getElementById("cart-summary-total");

  if (!container || !emptyState || !contentLayout) return;

  if (cart.length === 0) {
    emptyState.style.display = "flex";
    contentLayout.style.display = "none";
    if (subtotalEl) subtotalEl.textContent = "$0.00";
    if (deliveryEl) deliveryEl.textContent = "$0.00";
    if (totalEl) totalEl.textContent = "$0.00";
    return;
  }

  emptyState.style.display = "none";
  contentLayout.style.display = "grid";

  container.innerHTML = "";

  cart.forEach((item) => {
    const product = getProductById(item.id);
    if (!product) return;

    const itemTotal = product.price * item.quantity;
    const itemEl = document.createElement("div");
    itemEl.className = "cart_item";
    itemEl.innerHTML = `
      <div class="cart_item_media">
        <div class="cart_item_img_wrap">
          <img src="${product.image}" alt="${product.name}" class="cart_item_img" />
        </div>
        <div>
          <h4 class="cart_item_title">${product.name}</h4>
          <span class="cart_item_price">$${product.price} each</span>
        </div>
      </div>

      <div class="cart_item_actions">
        <div class="qty_stepper">
          <button type="button" class="qty_btn btn_cart_minus" data-id="${product.id}" aria-label="Decrease quantity">
            <i class="ri-subtract-line"></i>
          </button>
          <span class="qty_value">${item.quantity}</span>
          <button type="button" class="qty_btn btn_cart_plus" data-id="${product.id}" aria-label="Increase quantity">
            <i class="ri-add-line"></i>
          </button>
        </div>

        <span class="cart_item_total">$${itemTotal.toFixed(2)}</span>

        <button type="button" class="cart_item_remove_btn" data-id="${product.id}" aria-label="Remove item" title="Remove">
          <i class="ri-delete-bin-6-line"></i>
        </button>
      </div>
    `;

    // Event listeners for item stepper & remove
    itemEl.querySelector(".btn_cart_minus").addEventListener("click", () => {
      updateCartQuantity(product.id, item.quantity - 1);
    });

    itemEl.querySelector(".btn_cart_plus").addEventListener("click", () => {
      updateCartQuantity(product.id, item.quantity + 1);
    });

    itemEl
      .querySelector(".cart_item_remove_btn")
      .addEventListener("click", () => {
        removeFromCart(product.id);
      });

    container.appendChild(itemEl);
  });

  const totals = calculateCartTotals();
  if (subtotalEl) subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
  if (deliveryEl)
    deliveryEl.textContent =
      totals.delivery === 0 && totals.subtotal > 0
        ? "FREE"
        : `$${totals.delivery.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${totals.total.toFixed(2)}`;
};
