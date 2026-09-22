/*==================================================
  ORDER CONFIRMATION, TRACKING & CONFETTI
==================================================*/

/* Rainbow Confetti Animation */
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

/* Order Confirmation Modal */
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

/* Order Tracking Display */
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
