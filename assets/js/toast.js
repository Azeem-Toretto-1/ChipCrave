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
