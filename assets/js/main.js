/*=============== SHOW MENU ===============*/
const initNavigation = () => {
  const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");

  /* Show menu */
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
    });
  }

  /* Hide menu */
  if (navClose && navMenu) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  }

  /*=============== REMOVE MENU MOBILE ===============*/
  const navLinks = document.querySelectorAll(".nav_link");
  navLinks.forEach((n) =>
    n.addEventListener("click", () => {
      if (navMenu) {
        navMenu.classList.remove("show-menu");
      }
    }),
  );
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavigation);
} else {
  initNavigation();
}

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

const scrollActive = () => {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const id = section.id,
      top = section.offsetTop - 50,
      height = section.offsetHeight,
      link = document.querySelector(".nav_menu a[href*=" + id + "]");

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
  INITIALIZATION & GLOBAL EVENT BINDINGS
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
