/*==================================================
  CENTRALIZED PRODUCT DATABASE
==================================================*/

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
