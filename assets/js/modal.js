/*==================================================
  MODAL MANAGER & PRODUCT DETAIL MODAL
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
  PRODUCT DETAIL MODAL LOGIC
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
