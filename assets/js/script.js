/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* Show menu */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* Hide menu */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav_link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav_link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
};

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () => {
  const header = document.getElementById("header");
  // Add the .scroll-header class if the bottom scroll of the viewport is greater than 50
  window.scrollY >= 50
    ? header.classList.add("shadow-header")
    : header.classList.remove("shadow-header");
};

window.addEventListener("scroll", shadowHeader);

/*=============== SWIPER FAVORITES ===============*/
const swiperFavorites = new Swiper(".favorites_swiper", {
  loop: true,
  grabCursor: true,
  slidesPerView: "auto",
  centeredSlides: "auto",
});

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  // Add the .scroll-header class if the bottom scroll of the viewport is greater than 350
  window.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};

window.addEventListener("scroll", scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

// Link the ID of each section (section id="home") to each link (a href="#home")
// and activate the link with the class .active-link
const scrollActive = () => {
  // We get the position by scrolling down
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const id = section.id, // id of each section
      top = section.offsetTop - 50, // Distance from the top edge
      height = section.offsetHeight, // Element height
      link = document.querySelector(".nav_menu a[href*=" + id + "]"); // id nav link

    if (!link) return;

    link.classList.toggle(
      "active-link",
      scrollY > top && scrollY <= top + height,
    );
  });
};

window.addEventListener("scroll", scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 300,
  //reset: true, //Animation repeat
});

sr.reveal(`.home_data, .favorites_container, .section_title, .footer_container`);
sr.reveal(`.home_circle, .home_img`, { delay: 600, scale: 0.5 });
sr.reveal(`.home_chips-1, .home_chips-2, .home_chips-3`, {
  delay: 1000,
  interval: 100,
});
sr.reveal(`.home_leaf`, { delay: 1200 });
sr.reveal(`.home_tomato-1, .home_tomato-2`, { delay: 1400, interval: 100 });
sr.reveal(`.care_img, .contact_img`, { origin: "left" });
sr.reveal(`.care_list, .contact_data`, { origin: "right" });
sr.reveal(`.banner_item, .products_card`, { interval: 100 });

/*==================================================
  E-COMMERCE SYSTEM ARCHITECTURE & STATE
==================================================*/

// Centralized Product Database
const PRODUCTS = [
  {
    id: 1,
    name: "Crab Chips",
    subtitle: "Crab",
    price: 8,
    image: "assets/img/product-chips-1.png",
    rating: 4.8,
    description:
      "Crispy and savory gourmet crab flavored chips seasoned with coastal spices and natural sea salt.",
  },
  {
    id: 2,
    name: "Cheese Chips",
    subtitle: "Cheese",
    price: 5,
    image: "assets/img/product-chips-2.png",
    rating: 4.9,
    description:
      "Golden fried organic potato chips generously coated with rich melted cheddar and parmesan cheese.",
  },
  {
    id: 3,
    name: "BBQ Chips",
    subtitle: "BBQ",
    price: 6,
    image: "assets/img/product-chips-3.png",
    rating: 4.7,
    description:
      "Smoky sweet barbecue chips seasoned with authentic hickory smoked spices and caramelized onion.",
  },
  {
    id: 4,
    name: "Hot Chips",
    subtitle: "Hot",
    price: 9,
    image: "assets/img/product-chips-4.png",
    rating: 4.9,
    description:
      "Fiery spicy crunch made for thrill-seekers with crushed chili peppers, paprika, and a touch of lime.",
  },
  {
    id: 5,
    name: "Mix Chips",
    subtitle: "Mix",
    price: 11,
    image: "assets/img/product-chips-5.png",
    rating: 5.0,
    description:
      "Deluxe party assortment uniting all signature chip flavors into one crunchy, satisfying experience.",
  },
];

// Helper: Get product by ID
const getProductById = (id) => PRODUCTS.find((p) => p.id === Number(id));

// LocalStorage Keys
const STORAGE_KEYS = {
  CART: "chips_cart",
  WISHLIST: "chips_wishlist",
  ORDERS: "chips_orders",
  LAST_ORDER: "chips_last_order",
};

// State Getters & Setters with Safe Fallback
const getStoredCart = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CART);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading cart from localStorage", e);
    return [];
  }
};

const saveStoredCart = (cart) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  } catch (e) {
    console.error("Error saving cart to localStorage", e);
  }
};

const getStoredWishlist = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading wishlist from localStorage", e);
    return [];
  }
};

const saveStoredWishlist = (wishlist) => {
  try {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  } catch (e) {
    console.error("Error saving wishlist to localStorage", e);
  }
};

const getStoredOrders = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading orders from localStorage", e);
    return [];
  }
};

const saveStoredOrders = (orders) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  } catch (e) {
    console.error("Error saving orders to localStorage", e);
  }
};

const getStoredLastOrder = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LAST_ORDER);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Error reading last order from localStorage", e);
    return null;
  }
};

const saveStoredLastOrder = (order) => {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_ORDER, JSON.stringify(order));
  } catch (e) {
    console.error("Error saving last order to localStorage", e);
  }
};

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
  BOTTOM TOAST NOTIFICATION SYSTEM
==================================================*/
const showToast = ({ image, title, message, icon = "ri-check-line" }) => {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast_item";
  toast.innerHTML = `
    <img src="${image}" alt="${title}" class="toast_img" />
    <div class="toast_content">
      <h4 class="toast_title">${title}</h4>
      <span class="toast_message"><i class="${icon}"></i> ${message}</span>
    </div>
    <button class="toast_close" aria-label="Close notification">
      <i class="ri-close-line"></i>
    </button>
  `;

  const closeBtn = toast.querySelector(".toast_close");
  const removeToast = () => {
    toast.classList.remove("show");
    toast.classList.add("hide");
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 400);
  };

  closeBtn.addEventListener("click", removeToast);

  container.appendChild(toast);

  // Trigger entrance transition
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Auto remove after 3.5 seconds
  setTimeout(removeToast, 3500);
};

/*==================================================
  FIX 2: UI BADGES & DYNAMIC CART ITEM COUNT
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
  MODAL MANAGER & SCROLL LOCK
==================================================*/
let activeModalsStack = [];

const openModal = (modalId) => {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  if (!activeModalsStack.includes(modalId)) {
    activeModalsStack.push(modalId);
  }
  document.body.classList.add("modal_open");
};

const closeModal = (modalId) => {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  activeModalsStack = activeModalsStack.filter((id) => id !== modalId);

  if (activeModalsStack.length === 0) {
    document.body.classList.remove("modal_open");
  }
};

const closeAllModals = () => {
  document.querySelectorAll(".modal.active").forEach((modal) => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  });
  activeModalsStack = [];
  document.body.classList.remove("modal_open");
};

// Close on Escape Key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && activeModalsStack.length > 0) {
    const topModal = activeModalsStack[activeModalsStack.length - 1];
    closeModal(topModal);
  }
});

/*==================================================
  1. PRODUCT DETAIL MODAL LOGIC (FIX 1: Wishlist button inside modal)
==================================================*/
let currentModalProductId = 1;
let currentModalQty = 1;

const openProductModal = (productId) => {
  const product = getProductById(productId);
  if (!product) return;

  currentModalProductId = product.id;
  currentModalQty = 1;

  const imgEl = document.getElementById("modal-product-img");
  const subtitleEl = document.getElementById("modal-product-subtitle");
  const titleEl = document.getElementById("modal-product-title");
  const ratingEl = document.getElementById("modal-product-rating");
  const descEl = document.getElementById("modal-product-desc");
  const priceEl = document.getElementById("modal-product-price");
  const qtyValEl = document.getElementById("modal-qty-val");
  const wishlistBtn = document.getElementById("modal-wishlist-toggle");

  if (imgEl) {
    imgEl.src = product.image;
    imgEl.alt = product.name;
  }
  if (subtitleEl) subtitleEl.textContent = product.subtitle;
  if (titleEl) titleEl.textContent = product.name;
  if (ratingEl) ratingEl.textContent = product.rating.toFixed(1);
  if (descEl) descEl.textContent = product.description;
  if (priceEl) priceEl.textContent = `$${product.price}`;
  if (qtyValEl) qtyValEl.textContent = currentModalQty;

  const wishlist = getStoredWishlist();
  if (wishlistBtn) {
    if (wishlist.includes(product.id)) {
      wishlistBtn.classList.add("active");
    } else {
      wishlistBtn.classList.remove("active");
    }
  }

  openModal("product-modal");
};

// Setup Modal Quantity controls
const modalQtyMinus = document.getElementById("modal-qty-minus");
const modalQtyPlus = document.getElementById("modal-qty-plus");
const modalQtyVal = document.getElementById("modal-qty-val");

if (modalQtyMinus) {
  modalQtyMinus.addEventListener("click", () => {
    if (currentModalQty > 1) {
      currentModalQty--;
      if (modalQtyVal) modalQtyVal.textContent = currentModalQty;
    }
  });
}

if (modalQtyPlus) {
  modalQtyPlus.addEventListener("click", () => {
    currentModalQty++;
    if (modalQtyVal) modalQtyVal.textContent = currentModalQty;
  });
}

// Modal Wishlist Button Toggle
const modalWishlistBtn = document.getElementById("modal-wishlist-toggle");
if (modalWishlistBtn) {
  modalWishlistBtn.addEventListener("click", () => {
    const result = toggleWishlist(currentModalProductId);
    if (result.status === "added") {
      modalWishlistBtn.classList.add("active");
    } else {
      modalWishlistBtn.classList.remove("active");
    }
  });
}

// Modal Add to Cart Button with Fly-to-Cart
const modalAddToCartBtn = document.getElementById("modal-add-to-cart");
if (modalAddToCartBtn) {
  modalAddToCartBtn.addEventListener("click", () => {
    const product = getProductById(currentModalProductId);
    const modalImg = document.getElementById("modal-product-img");

    animateToCart(modalImg, () => {
      addToCart(currentModalProductId, currentModalQty);
      showToast({
        image: product.image,
        title: product.name,
        message: `Added ${currentModalQty} to your cart ✓`,
        icon: "ri-checkbox-circle-fill",
      });
      closeModal("product-modal");
    });
  });
}

/*==================================================
  2. CART SYSTEM & OPERATIONS
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

/*==================================================
  3. WISHLIST SYSTEM & OPERATIONS (FIX 3: Full image display)
==================================================*/
const toggleWishlist = (productId) => {
  let wishlist = getStoredWishlist();
  const product = getProductById(productId);
  if (!product) return { status: "error" };

  let status = "";
  if (wishlist.includes(Number(productId))) {
    wishlist = wishlist.filter((id) => id !== Number(productId));
    status = "removed";
    showToast({
      image: product.image,
      title: product.name,
      message: "Removed from wishlist",
      icon: "ri-heart-dislike-line",
    });
  } else {
    wishlist.push(Number(productId));
    status = "added";
    showToast({
      image: product.image,
      title: product.name,
      message: "Added to wishlist ♥",
      icon: "ri-heart-fill",
    });
  }

  saveStoredWishlist(wishlist);
  updateHeaderBadges();
  renderWishlist();
  return { status, product };
};

const renderWishlist = () => {
  const wishlist = getStoredWishlist();
  const container = document.getElementById("wishlist-items-container");
  const emptyState = document.getElementById("wishlist-empty-state");

  if (!container || !emptyState) return;

  if (wishlist.length === 0) {
    emptyState.style.display = "flex";
    container.style.display = "none";
    return;
  }

  emptyState.style.display = "none";
  container.style.display = "grid";
  container.innerHTML = "";

  wishlist.forEach((id) => {
    const product = getProductById(id);
    if (!product) return;

    const card = document.createElement("article");
    card.className = "wishlist_card";
    card.innerHTML = `
      <button class="wishlist_remove_btn" data-id="${product.id}" title="Remove from wishlist" aria-label="Remove">
        <i class="ri-close-line"></i>
      </button>
      <div class="wishlist_img_wrap">
        <img src="${product.image}" alt="${product.name}" class="wishlist_img" />
      </div>
      <div class="wishlist_info">
        <h3 class="wishlist_title">${product.name}</h3>
        <span class="wishlist_price">$${product.price}</span>
      </div>
      <button type="button" class="button wishlist_add_btn" data-id="${product.id}">
        <i class="ri-shopping-bag-3-line"></i>
        <span>Add to Cart</span>
      </button>
    `;

    // Remove button
    card
      .querySelector(".wishlist_remove_btn")
      .addEventListener("click", () => {
        toggleWishlist(product.id);
      });

    // Add to cart from wishlist button with fly animation
    const addBtn = card.querySelector(".wishlist_add_btn");
    const imgEl = card.querySelector(".wishlist_img");
    addBtn.addEventListener("click", () => {
      animateToCart(imgEl, () => {
        addToCart(product.id, 1);
        showToast({
          image: product.image,
          title: product.name,
          message: "Added to your cart ✓",
          icon: "ri-checkbox-circle-fill",
        });
      });
    });

    container.appendChild(card);
  });
};

/*==================================================
  4. CHECKOUT SYSTEM (FIX 5: Cash on Delivery Only)
==================================================*/
const openCheckoutModal = () => {
  const cart = getStoredCart();
  if (cart.length === 0) {
    showToast({
      image: "assets/img/favicon.png",
      title: "Cart Empty",
      message: "Please add products before checking out.",
      icon: "ri-information-line",
    });
    return;
  }

  const totals = calculateCartTotals();
  const subtotalEl = document.getElementById("checkout-subtotal");
  const deliveryEl = document.getElementById("checkout-delivery");
  const totalEl = document.getElementById("checkout-total");

  if (subtotalEl) subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
  if (deliveryEl)
    deliveryEl.textContent =
      totals.delivery === 0 ? "FREE" : `$${totals.delivery.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${totals.total.toFixed(2)}`;

  closeModal("cart-modal");
  openModal("checkout-modal");
};

// Checkout Validation & Order Placement
const validateCheckoutForm = () => {
  let isValid = true;

  // Clear previous errors
  document.querySelectorAll(".form_error").forEach((el) => (el.textContent = ""));
  document
    .querySelectorAll(".form_input")
    .forEach((el) => el.classList.remove("input_error"));

  const setError = (inputId, errorId, message) => {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    if (input) input.classList.add("input_error");
    if (errorEl) errorEl.textContent = message;
    isValid = false;
  };

  const name = document.getElementById("checkout-name")?.value.trim();
  const email = document.getElementById("checkout-email")?.value.trim();
  const phone = document.getElementById("checkout-phone")?.value.trim();
  const address = document.getElementById("checkout-address")?.value.trim();
  const city = document.getElementById("checkout-city")?.value.trim();
  const zip = document.getElementById("checkout-zip")?.value.trim();

  if (!name || name.length < 2) {
    setError("checkout-name", "err-name", "Please enter your full name.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    setError(
      "checkout-email",
      "err-email",
      "Please enter a valid email address.",
    );
  }

  if (!phone || phone.length < 6) {
    setError("checkout-phone", "err-phone", "Please enter a valid phone number.");
  }

  if (!address || address.length < 5) {
    setError("checkout-address", "err-address", "Please enter your full street address.");
  }

  if (!city || city.length < 2) {
    setError("checkout-city", "err-city", "Please enter your city.");
  }

  if (!zip || zip.length < 3) {
    setError("checkout-zip", "err-zip", "Please enter your postal/zip code.");
  }

  return isValid;
};

// Checkout Form Submission
const checkoutForm = document.getElementById("checkout-form");
if (checkoutForm) {
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateCheckoutForm()) {
      showToast({
        image: "assets/img/favicon.png",
        title: "Validation Error",
        message: "Please fill in all required fields properly.",
        icon: "ri-error-warning-fill",
      });
      return;
    }

    // Place Order
    const cart = getStoredCart();
    const totals = calculateCartTotals();

    const orderId = `CHP-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      items: cart.map((item) => {
        const prod = getProductById(item.id);
        return {
          id: item.id,
          name: prod.name,
          price: prod.price,
          quantity: item.quantity,
          image: prod.image,
        };
      }),
      subtotal: totals.subtotal,
      delivery: totals.delivery,
      total: totals.total,
      customer: {
        name: document.getElementById("checkout-name")?.value.trim(),
        email: document.getElementById("checkout-email")?.value.trim(),
        phone: document.getElementById("checkout-phone")?.value.trim(),
        address: document.getElementById("checkout-address")?.value.trim(),
        city: document.getElementById("checkout-city")?.value.trim(),
        zip: document.getElementById("checkout-zip")?.value.trim(),
      },
      paymentMethod: "Cash on Delivery",
      status: "Preparing",
      timestamp: new Date().toLocaleString(),
    };

    // Store order
    const orders = getStoredOrders();
    orders.unshift(newOrder);
    saveStoredOrders(orders);
    saveStoredLastOrder(newOrder);

    // Clear cart
    saveStoredCart([]);
    updateHeaderBadges();
    renderCart();

    // Reset checkout form
    checkoutForm.reset();

    // Close Checkout Modal & Show Confirmation
    closeModal("checkout-modal");
    showOrderConfirmation(newOrder);
  });
}

/*==================================================
  5. RAINBOW CONFETTI ANIMATION
==================================================*/
const triggerRainbowConfetti = () => {
  const container = document.getElementById("confetti-container");
  if (!container) return;

  container.innerHTML = "";
  const colors = [
    "#ffd100",
    "#00b894",
    "#ff4757",
    "#2ed573",
    "#1e90ff",
    "#ffa502",
    "#ff6b81",
    "#ffffff",
  ];
  const confettiCount = 80;
  const particles = [];

  for (let i = 0; i < confettiCount; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti_piece";
    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.width = `${Math.random() * 8 + 6}px`;
    piece.style.height = `${Math.random() * 12 + 8}px`;

    container.appendChild(piece);

    particles.push({
      element: piece,
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 100,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 3,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
    });
  }

  let animationFrame;
  const startTime = Date.now();

  const renderParticles = () => {
    const elapsed = Date.now() - startTime;
    if (elapsed > 3500) {
      container.innerHTML = "";
      cancelAnimationFrame(animationFrame);
      return;
    }

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;

      p.element.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`;
    });

    animationFrame = requestAnimationFrame(renderParticles);
  };

  renderParticles();
};

/*==================================================
  6. ORDER CONFIRMATION & ORDER TRACKING
==================================================*/
const showOrderConfirmation = (order) => {
  const idEl = document.getElementById("confirm-order-id");
  const totalEl = document.getElementById("confirm-order-total");
  const payEl = document.getElementById("confirm-order-payment");
  const addrEl = document.getElementById("confirm-order-address");

  if (idEl) idEl.textContent = order.id;
  if (totalEl) totalEl.textContent = `$${order.total.toFixed(2)}`;
  if (payEl) payEl.textContent = order.paymentMethod;
  if (addrEl)
    addrEl.textContent = `${order.customer.address}, ${order.customer.city}`;

  openModal("confirmation-modal");
  triggerRainbowConfetti();
};

const renderOrderTracking = () => {
  const order = getStoredLastOrder();
  const emptyState = document.getElementById("tracking-empty-state");
  const content = document.getElementById("tracking-content");

  const idEl = document.getElementById("track-order-id");
  const dateEl = document.getElementById("track-order-date");
  const statusEl = document.getElementById("track-order-status");
  const itemsListEl = document.getElementById("track-items-list");

  if (!emptyState || !content) return;

  if (!order) {
    emptyState.style.display = "flex";
    content.style.display = "none";
    return;
  }

  emptyState.style.display = "none";
  content.style.display = "block";

  if (idEl) idEl.textContent = order.id;
  if (dateEl) dateEl.textContent = order.timestamp || "Today";
  if (statusEl) statusEl.textContent = order.status || "Preparing";

  if (itemsListEl) {
    itemsListEl.innerHTML = "";
    order.items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "tracking_item_row";
      row.innerHTML = `
        <span>${item.quantity}x ${item.name}</span>
        <span style="font-family: var(--second-font); color: var(--second-color);">$${(item.price * item.quantity).toFixed(2)}</span>
      `;
      itemsListEl.appendChild(row);
    });

    const totalRow = document.createElement("div");
    totalRow.className = "tracking_item_row";
    totalRow.style.fontWeight = "bold";
    totalRow.style.paddingTop = "0.5rem";
    totalRow.innerHTML = `
      <span>Grand Total</span>
      <span style="font-family: var(--second-font); color: var(--second-color); font-size: 1.1rem;">$${order.total.toFixed(2)}</span>
    `;
    itemsListEl.appendChild(totalRow);
  }
};

/*==================================================
  7. ATTACH ALL UI CLICK HANDLERS
==================================================*/
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Badges and UI
  updateHeaderBadges();
  renderCart();
  renderWishlist();

  // Product Cards and Arrow buttons -> open product detail modal
  document.querySelectorAll(".products_card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-id");
      if (id) openProductModal(id);
    });
  });

  document.querySelectorAll(".products_button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      if (id) openProductModal(id);
    });
  });

  // Header Nav Cart Button -> Open Cart Modal
  const cartBtn = document.getElementById("cart-btn");
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      renderCart();
      openModal("cart-modal");
    });
  }

  // Header Nav Wishlist Button -> Open Wishlist Modal
  const wishlistBtn = document.getElementById("wishlist-btn");
  if (wishlistBtn) {
    wishlistBtn.addEventListener("click", () => {
      renderWishlist();
      openModal("wishlist-modal");
    });
  }

  // Header Nav Track Order Link -> Open Tracking Modal
  const trackOrderNav = document.getElementById("nav-track-link");
  if (trackOrderNav) {
    trackOrderNav.addEventListener("click", (e) => {
      e.preventDefault();
      renderOrderTracking();
      openModal("tracking-modal");
    });
  }

  // Cart Modal Actions
  const cartProceedBtn = document.getElementById("cart-proceed-checkout");
  if (cartProceedBtn) {
    cartProceedBtn.addEventListener("click", openCheckoutModal);
  }

  const cartClearBtn = document.getElementById("cart-clear-btn");
  if (cartClearBtn) {
    cartClearBtn.addEventListener("click", clearCart);
  }

  // Confirmation Modal "Track Order" button
  const confirmTrackBtn = document.getElementById("confirm-track-btn");
  if (confirmTrackBtn) {
    confirmTrackBtn.addEventListener("click", () => {
      closeModal("confirmation-modal");
      renderOrderTracking();
      openModal("tracking-modal");
    });
  }

  // Generic close attributes
  document.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", () => closeModal("product-modal"));
  });

  document.querySelectorAll("[data-close-cart]").forEach((el) => {
    el.addEventListener("click", () => closeModal("cart-modal"));
  });

  document.querySelectorAll("[data-close-wishlist]").forEach((el) => {
    el.addEventListener("click", () => closeModal("wishlist-modal"));
  });

  document.querySelectorAll("[data-close-checkout]").forEach((el) => {
    el.addEventListener("click", () => closeModal("checkout-modal"));
  });

  document.querySelectorAll("[data-close-confirmation]").forEach((el) => {
    el.addEventListener("click", () => closeModal("confirmation-modal"));
  });

  document.querySelectorAll("[data-close-tracking]").forEach((el) => {
    el.addEventListener("click", () => closeModal("tracking-modal"));
  });
});