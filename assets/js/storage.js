/*==================================================
  LOCALSTORAGE MANAGEMENT & SAFE FALLBACKS
==================================================*/

const STORAGE_KEYS = {
  CART: "chips_cart",
  WISHLIST: "chips_wishlist",
  ORDERS: "chips_orders",
  LAST_ORDER: "chips_last_order",
};

// Cart Storage
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

// Wishlist Storage
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

// Orders Storage
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

// Last Order Storage
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
