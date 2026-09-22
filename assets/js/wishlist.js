/*==================================================
  WISHLIST SYSTEM & OPERATIONS
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
