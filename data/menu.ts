export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  sizes?: { label: string; price: number }[];
  badge?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  note?: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "sandwich-shawarma",
    name: "Sandwich & Shawarma",
    items: [
      { id: "sub-sandwich", name: "Sub Sandwich (Regular)", price: 160 },
      { id: "cheesy-sub", name: "Cheesy Sub Sandwich", price: 180 },
      { id: "bbq-cheesy-sub", name: "BBQ Cheesy Sub Sandwich", price: 200 },
      { id: "chicken-shawarma", name: "Chicken Shawarma", price: 160 },
      { id: "cheesy-wrap", name: "Cheesy Wrap", price: 200 }
    ]
  },
  {
    id: "soup",
    name: "Soup & Cream",
    note: "Menu source lists these as 1×3 servings where indicated.",
    items: [
      { id: "thai-thick-soup", name: "Thai Thick Soup", price: 20, description: "Source menu price retained; verify before launch." },
      { id: "chicken-corn-soup", name: "Chicken Corn Soup", price: 280 },
      { id: "cream-mushroom", name: "Cream of Mushroom", price: 450 }
    ]
  },
  {
    id: "burgers",
    name: "Burgers",
    items: [
      { id: "crispy-chicken-burger", name: "Crispy Chicken Burger", price: 160 },
      { id: "chicken-cheese-burger", name: "Chicken Cheese Burger", price: 180 },
      { id: "naga-cheese-burger", name: "Naga Cheese Burger", price: 200 },
      { id: "crispy-cheese-burger", name: "Crispy Cheese Burger", price: 220 },
      { id: "bbq-chicken-cheese-burger", name: "BBQ Chicken Cheese Burger", price: 200 },
      { id: "chicken-classic-burger", name: "Chicken Classic Burger", price: 220 },
      { id: "beef-cheese-blast", name: "Beef Cheese Blast", price: 300 },
      { id: "chef-special-burger", name: "Chef Special Burger", price: 320, badge: "Chef's pick" }
    ]
  },
  {
    id: "chow-mein",
    name: "Chow Mein",
    items: [
      { id: "chicken-chow-mein", name: "Chicken Chow Mein", price: 320 },
      { id: "foodlab-special-chowmein", name: "Food Lab Special Chow Mein", price: 350, badge: "House special" },
      { id: "beef-chowmein", name: "Beef Chow Mein", price: 400 }
    ]
  },
  {
    id: "pizza",
    name: "Pizza",
    note: "Choose a size. Prices follow the supplied menu.",
    items: [
      { id: "mexican-jhal-pizza", name: "Mexican Jhal Pizza", price: 400, sizes: [{ label: '10"', price: 400 }, { label: '12"', price: 600 }] },
      { id: "bbq-temptation-pizza", name: "BBQ Temptation Pizza", price: 500, sizes: [{ label: '10"', price: 500 }, { label: '12"', price: 620 }] },
      { id: "tandoori-chicken-pizza", name: "Tandoori Chicken Pizza", price: 550, sizes: [{ label: '10"', price: 550 }, { label: '12"', price: 700 }], badge: "Popular" },
      { id: "chicken-supreme-pizza", name: "Chicken Supreme Pizza", price: 520, sizes: [{ label: '10"', price: 520 }, { label: '12"', price: 680 }] },
      { id: "beef-supreme-pizza", name: "Beef Supreme Pizza", price: 580, sizes: [{ label: '10"', price: 580 }, { label: '12"', price: 750 }] },
      { id: "four-seasons-pizza", name: "Four Seasons Pizza", price: 550, sizes: [{ label: '10"', price: 550 }, { label: '12"', price: 700 }] },
      { id: "kala-vuna-pizza", name: "Beef/Mutton Kala Vuna Pizza", price: 660, sizes: [{ label: '10"', price: 660 }, { label: '12"', price: 850 }] },
      { id: "pizza-badshah", name: "Pizza Badshah", price: 750, sizes: [{ label: '10"', price: 750 }, { label: '12"', price: 1000 }], badge: "Loaded" },
      { id: "half-supreme-bbq-pizza", name: "Half Supreme Half BBQ Pizza", price: 540, sizes: [{ label: '10"', price: 540 }, { label: '12"', price: 720 }] }
    ]
  },
  {
    id: "pasta",
    name: "Pasta",
    items: [
      { id: "white-sauce-pasta", name: "White Sauce Pasta", price: 210 },
      { id: "red-sauce-pasta", name: "Red Sauce Pasta", price: 220 },
      { id: "naga-pasta", name: "Naga Pasta", price: 240 },
      { id: "creamy-oven-baked-pasta", name: "Creamy Oven Baked Pasta", price: 280 },
      { id: "naga-baked-pasta", name: "Naga Baked Pasta", price: 300 },
      { id: "pasta-basta", name: "Pasta Basta", price: 320 }
    ]
  },
  {
    id: "coffee-shake",
    name: "Coffee & Shake",
    items: [
      { id: "cold-coffee", name: "Cold Coffee", price: 100 },
      { id: "chocolate-cold-coffee", name: "Chocolate Cold Coffee", price: 120 },
      { id: "regular-coffee", name: "Regular Coffee", price: 70 },
      { id: "lacchi", name: "Lacchi", price: 80 },
      { id: "special-lacchi", name: "Special Lacchi", price: 120 },
      { id: "chocolate-milkshake", name: "Chocolate Milkshake", price: 150 },
      { id: "vanilla-milkshake", name: "Vanilla Milkshake", price: 150 },
      { id: "strawberry-milkshake", name: "Strawberry Milkshake", price: 150 },
      { id: "oreo-milkshake", name: "Oreo Milkshake", price: 170 },
      { id: "kitkat-milkshake", name: "KitKat Milkshake", price: 180 },
      { id: "soft-drinks", name: "Soft Drinks", price: 0, description: "MRP — price confirmed at order." },
      { id: "water", name: "Water", price: 0, description: "MRP — price confirmed at order." }
    ]
  },
  {
    id: "rice",
    name: "Rice Items",
    items: [
      { id: "egg-fried-rice", name: "Egg Fried Rice", price: 300 },
      { id: "mexican-fried-rice", name: "Mexican Fried Rice", price: 350 },
      { id: "mixed-fried-rice", name: "Mixed Fried Rice", price: 390 },
      { id: "basmati-rice", name: "Basmati Rice", price: 340 },
      { id: "plain-polaw", name: "Plain Polaw", price: 240 },
      { id: "achari-biriyani-rice", name: "Achari Biriyani Rice", price: 280 }
    ]
  },
  {
    id: "vegetables",
    name: "Vegetables",
    items: [
      { id: "chinese-vegetables", name: "Chinese Vegetables", price: 280 },
      { id: "special-chinese-vegetables", name: "Special Chinese Vegetables", price: 330 }
    ]
  },
  {
    id: "curry",
    name: "Curry Items",
    note: "Several dishes are listed as 1×3 servings in the source menu.",
    items: [
      { id: "masala-chicken", name: "Masala Chicken", price: 330 },
      { id: "achari-chicken-masala", name: "Achari Chicken Masala", price: 380 },
      { id: "chicken-sizzling", name: "Chicken Sizzling", price: 350 },
      { id: "beef-masala", name: "Beef Masala", price: 430 },
      { id: "chicken-roast", name: "Chicken Roast (1 pc, Sonali)", price: 150 },
      { id: "beef-rejala", name: "Beef Rejala", price: 280 },
      { id: "mutton-rejala", name: "Mutton Rejala", price: 300 },
      { id: "achari-chicken-roast", name: "Achari Chicken Roast", price: 160 },
      { id: "cashew-nut-salad", name: "Cashew Nut Salad", price: 350 }
    ]
  },
  {
    id: "indian-platters",
    name: "Indian Platters",
    items: [
      { id: "polao-gujrati-veg-dal", name: "Basmati Polao, Gujrati Vegetable, Dal Butter Fry", price: 200 },
      { id: "polao-tandoori-dal", name: "Basmati Polao, Tandoori Chicken, Dal Butter Fry", price: 260 },
      { id: "polao-mughlai-dal", name: "Basmati Polao, Chicken Mughlai, Dal Butter Fry", price: 250 },
      { id: "polao-chicken-masala-dal", name: "Basmati Polao, Chicken Masala, Dal Butter Fry", price: 240 }
    ]
  }
];
