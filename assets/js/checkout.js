/*==================================================
  CHECKOUT SYSTEM & CASH ON DELIVERY
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
