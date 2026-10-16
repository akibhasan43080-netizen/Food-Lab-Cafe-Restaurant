export type MenuItem = {
  id: string;
  name: string;
  nameBn: string;
  description?: string;
  descriptionBn?: string;
  price: number;
  sizes?: { label: string; labelBn?: string; price: number }[];
  badge?: string;
  badgeBn?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  nameBn: string;
  note?: string;
  noteBn?: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "sandwich-shawarma",
    name: "Sandwich & Shawarma",
    nameBn: "স্যান্ডউইচ ও শর্মা",
    items: [
      { id: "sub-sandwich", name: "Sub Sandwich (Regular)", nameBn: "সাব স্যান্ডউইচ (রেগুলার)", price: 160 },
      { id: "cheesy-sub", name: "Cheesy Sub Sandwich", nameBn: "চিজি সাব স্যান্ডউইচ", price: 180 },
      { id: "bbq-cheesy-sub", name: "BBQ Cheesy Sub Sandwich", nameBn: "বারবিকিউ চিজি সাব স্যান্ডউইচ", price: 200 },
      { id: "chicken-shawarma", name: "Chicken Shawarma", nameBn: "চিকেন শর্মা", price: 160 },
      { id: "cheesy-wrap", name: "Cheesy Wrap", nameBn: "চিজি র‍্যাপ", price: 200 }
    ]
  },
  {
    id: "soup",
    name: "Soup & Cream",
    nameBn: "স্যুপ ও ক্রিম",
    note: "Menu source lists these as 1×3 servings where indicated.",
    noteBn: "মেন্যু অনুযায়ী এগুলো ১×৩ পরিবেশন (৩ জনের জন্য)।",
    items: [
      {
        id: "thai-thick-soup",
        name: "Thai Thick Soup",
        nameBn: "থাই থিক স্যুপ",
        price: 220,
      },
      { id: "chicken-corn-soup", name: "Chicken Corn Soup", nameBn: "চিকেন কর্ন স্যুপ", price: 280 },
      { id: "cream-mushroom", name: "Cream of Mushroom", nameBn: "ক্রিম অব মাশরুম স্যুপ", price: 450 }
    ]
  },
  {
    id: "burgers",
    name: "Burgers",
    nameBn: "বার্গার",
    items: [
      { id: "crispy-chicken-burger", name: "Crispy Chicken Burger", nameBn: "ক্রিস্পি চিকেন বার্গার", price: 160 },
      { id: "chicken-cheese-burger", name: "Chicken Cheese Burger", nameBn: "চিকেন চিজ বার্গার", price: 180 },
      { id: "naga-cheese-burger", name: "Naga Cheese Burger", nameBn: "নাগা চিজ বার্গার", price: 200, badge: "Spicy", badgeBn: "ঝাল" },
      { id: "crispy-cheese-burger", name: "Crispy Cheese Burger", nameBn: "ক্রিস্পি চিজ বার্গার", price: 220 },
      { id: "bbq-chicken-cheese-burger", name: "BBQ Chicken Cheese Burger", nameBn: "বারবিকিউ চিকেন চিজ বার্গার", price: 200 },
      { id: "chicken-classic-burger", name: "Chicken Classic Burger", nameBn: "চিকেন ক্লাসিক বার্গার", price: 220 },
      { id: "beef-cheese-blast", name: "Beef Cheese Blast", nameBn: "বিফ চিজ ব্লাস্ট বার্গার", price: 300, badge: "Popular", badgeBn: "জনপ্রিয়" },
      { id: "chef-special-burger", name: "Chef Special Burger", nameBn: "শেফ স্পেশাল বার্গার", price: 320, badge: "Chef's pick", badgeBn: "শেফের পছন্দ" }
    ]
  },
  {
    id: "chow-mein",
    name: "Chow Mein",
    nameBn: "চাউমিন ও নুডলস",
    items: [
      { id: "chicken-chow-mein", name: "Chicken Chow Mein", nameBn: "চিকেন চাউমিন", price: 320 },
      { id: "foodlab-special-chowmein", name: "Food Lab Special Chow Mein", nameBn: "ফুড ল্যাব স্পেশাল চাউমিন", price: 350, badge: "House special", badgeBn: "স্পেশাল" },
      { id: "beef-chowmein", name: "Beef Chow Mein", nameBn: "বিফ চাউমিন", price: 400 }
    ]
  },
  {
    id: "pizza",
    name: "Pizza",
    nameBn: "পিৎজা",
    note: "Choose a size. Prices follow the supplied menu.",
    noteBn: "সাইজ নির্বাচন করুন (১০ ইঞ্চি বা ১২ ইঞ্চি)।",
    items: [
      {
        id: "mexican-jhal-pizza",
        name: "Mexican Jhal Pizza",
        nameBn: "মেক্সিকান ঝাল পিৎজা",
        price: 400,
        sizes: [
          { label: '10"', labelBn: '১০ ইঞ্চি', price: 400 },
          { label: '12"', labelBn: '১২ ইঞ্চি', price: 600 }
        ]
      },
      {
        id: "bbq-temptation-pizza",
        name: "BBQ Temptation Pizza",
        nameBn: "বারবিকিউ টেম্পটেশন পিৎজা",
        price: 500,
        sizes: [
          { label: '10"', labelBn: '১০ ইঞ্চি', price: 500 },
          { label: '12"', labelBn: '১২ ইঞ্চি', price: 620 }
        ]
      },
      {
        id: "tandoori-chicken-pizza",
        name: "Tandoori Chicken Pizza",
        nameBn: "তান্দুরি চিকেন পিৎজা",
        price: 550,
        sizes: [
          { label: '10"', labelBn: '১০ ইঞ্চি', price: 550 },
          { label: '12"', labelBn: '১২ ইঞ্চি', price: 700 }
        ],
        badge: "Popular",
        badgeBn: "জনপ্রিয়"
      },
      {
        id: "chicken-supreme-pizza",
        name: "Chicken Supreme Pizza",
        nameBn: "চিকেন সুপ্রিম পিৎজা",
        price: 520,
        sizes: [
          { label: '10"', labelBn: '১০ ইঞ্চি', price: 520 },
          { label: '12"', labelBn: '১২ ইঞ্চি', price: 680 }
        ]
      },
      {
        id: "beef-supreme-pizza",
        name: "Beef Supreme Pizza",
        nameBn: "বিফ সুপ্রিম পিৎজা",
        price: 580,
        sizes: [
          { label: '10"', labelBn: '১০ ইঞ্চি', price: 580 },
          { label: '12"', labelBn: '১২ ইঞ্চি', price: 750 }
        ]
      },
      {
        id: "four-seasons-pizza",
        name: "Four Seasons Pizza",
        nameBn: "ফোর সিজনস পিৎজা",
        price: 550,
        sizes: [
          { label: '10"', labelBn: '১০ ইঞ্চি', price: 550 },
          { label: '12"', labelBn: '১২ ইঞ্চি', price: 700 }
        ]
      },
      {
        id: "kala-vuna-pizza",
        name: "Beef/Mutton Kala Vuna Pizza",
        nameBn: "বিফ/মাটন কালা ভুনা পিৎজা",
        price: 660,
        sizes: [
          { label: '10"', labelBn: '১০ ইঞ্চি', price: 660 },
          { label: '12"', labelBn: '১২ ইঞ্চি', price: 850 }
        ],
        badge: "Chef's pick",
        badgeBn: "দেশি টুইস্ট"
      },
      {
        id: "pizza-badshah",
        name: "Pizza Badshah",
        nameBn: "পিৎজা বাদশাহ",
        price: 750,
        sizes: [
          { label: '10"', labelBn: '১০ ইঞ্চি', price: 750 },
          { label: '12"', labelBn: '১২ ইঞ্চি', price: 1000 }
        ],
        badge: "Loaded",
        badgeBn: "রয়েল লোডেড"
      },
      {
        id: "half-supreme-bbq-pizza",
        name: "Half Supreme Half BBQ Pizza",
        nameBn: "হাফ সুপ্রিম হাফ বারবিকিউ পিৎজা",
        price: 540,
        sizes: [
          { label: '10"', labelBn: '১০ ইঞ্চি', price: 540 },
          { label: '12"', labelBn: '১২ ইঞ্চি', price: 720 }
        ]
      }
    ]
  },
  {
    id: "pasta",
    name: "Pasta",
    nameBn: "পাস্তা",
    items: [
      { id: "white-sauce-pasta", name: "White Sauce Pasta", nameBn: "হোয়াইট সস পাস্তা", price: 210 },
      { id: "red-sauce-pasta", name: "Red Sauce Pasta", nameBn: "রেড সস পাস্তা", price: 220 },
      { id: "naga-pasta", name: "Naga Pasta", nameBn: "নাগা পাস্তা", price: 240, badge: "Extra Hot", badgeBn: "স্পাইসি" },
      { id: "creamy-oven-baked-pasta", name: "Creamy Oven Baked Pasta", nameBn: "ক্রিমি ওভেন বেকড পাস্তা", price: 280 },
      { id: "naga-baked-pasta", name: "Naga Baked Pasta", nameBn: "নাগা বেকড পাস্তা", price: 300 },
      { id: "pasta-basta", name: "Pasta Basta", nameBn: "পাস্তা বাস্তা", price: 320, badge: "Popular", badgeBn: "জনপ্রিয়" }
    ]
  },
  {
    id: "coffee-shake",
    name: "Coffee & Shake",
    nameBn: "কফি, শেক ও বেভারেজ",
    items: [
      { id: "cold-coffee", name: "Cold Coffee", nameBn: "কোল্ড কফি", price: 100 },
      { id: "chocolate-cold-coffee", name: "Chocolate Cold Coffee", nameBn: "চকলেট কোল্ড কফি", price: 120 },
      { id: "regular-coffee", name: "Regular Coffee", nameBn: "রেগুলার কফি", price: 70 },
      { id: "lacchi", name: "Lacchi", nameBn: "লাচ্ছি", price: 80 },
      { id: "special-lacchi", name: "Special Lacchi", nameBn: "স্পেশাল লাচ্ছি", price: 120 },
      { id: "chocolate-milkshake", name: "Chocolate Milkshake", nameBn: "চকলেট মিল্কশেক", price: 150 },
      { id: "vanilla-milkshake", name: "Vanilla Milkshake", nameBn: "ভ্যানিলা মিল্কশেক", price: 150 },
      { id: "strawberry-milkshake", name: "Strawberry Milkshake", nameBn: "স্ট্রবেরি মিল্কশেক", price: 150 },
      { id: "oreo-milkshake", name: "Oreo Milkshake", nameBn: "ওরিও মিল্কশেক", price: 170 },
      { id: "kitkat-milkshake", name: "KitKat Milkshake", nameBn: "কিটক্যাট মিল্কশেক", price: 180 },
      {
        id: "soft-drinks",
        name: "Soft Drinks",
        nameBn: "কোমল পানীয় (সফট ড্রিংকস)",
        price: 0,
        description: "MRP — price confirmed at order.",
        descriptionBn: "এমআরপি অনুযায়ী রেস্তোরাঁ নিশ্চিত করবে।"
      },
      {
        id: "water",
        name: "Water",
        nameBn: "মিনারেল ওয়াটার",
        price: 0,
        description: "MRP — price confirmed at order.",
        descriptionBn: "এমআরপি অনুযায়ী রেস্তোরাঁ নিশ্চিত করবে।"
      }
    ]
  },
  {
    id: "rice",
    name: "Rice Items",
    nameBn: "রাইস ও পোলাও",
    items: [
      { id: "egg-fried-rice", name: "Egg Fried Rice", nameBn: "এগ ফ্রাইড রাইস", price: 300 },
      { id: "mexican-fried-rice", name: "Mexican Fried Rice", nameBn: "মেক্সিকান ফ্রাইড রাইস", price: 350 },
      { id: "mixed-fried-rice", name: "Mixed Fried Rice", nameBn: "মিক্সড ফ্রাইড রাইস", price: 390 },
      { id: "basmati-rice", name: "Basmati Rice", nameBn: "বাসমতী রাইস", price: 340 },
      { id: "plain-polaw", name: "Plain Polaw", nameBn: "প্লেইন পোলাও", price: 240 },
      { id: "achari-biriyani-rice", name: "Achari Biriyani Rice", nameBn: "আচারি বিরিয়ানি রাইস", price: 280 }
    ]
  },
  {
    id: "vegetables",
    name: "Vegetables",
    nameBn: "ভেজিটেবল (শাকসবজি)",
    items: [
      { id: "chinese-vegetables", name: "Chinese Vegetables", nameBn: "চাইনিজ ভেজিটেবল", price: 280 },
      { id: "special-chinese-vegetables", name: "Special Chinese Vegetables", nameBn: "স্পেশাল চাইনিজ ভেজিটেবল", price: 330 }
    ]
  },
  {
    id: "curry",
    name: "Curry Items",
    nameBn: "কারি ও মাংসের পদ",
    note: "Several dishes are listed as 1×3 servings in the source menu.",
    noteBn: "বেশ কয়েকটি পদ মেন্যুতে ১×৩ পরিবেশন (৩ জনের জন্য) হিসেবে উল্লেখ করা।",
    items: [
      { id: "masala-chicken", name: "Masala Chicken", nameBn: "মশলা চিকেন", price: 330 },
      { id: "achari-chicken-masala", name: "Achari Chicken Masala", nameBn: "আচারি চিকেন মশলা", price: 380 },
      { id: "chicken-sizzling", name: "Chicken Sizzling", nameBn: "চিকেন সিজলিং", price: 350 },
      { id: "beef-masala", name: "Beef Masala", nameBn: "বিফ মশলা", price: 430 },
      { id: "chicken-roast", name: "Chicken Roast (1 pc, Sonali)", nameBn: "চিকেন রোস্ট (১ পিস, সোনালী)", price: 150 },
      { id: "beef-rejala", name: "Beef Rejala", nameBn: "বিফ রেজালা", price: 280 },
      { id: "mutton-rejala", name: "Mutton Rejala", nameBn: "মাটন রেজালা", price: 300 },
      { id: "achari-chicken-roast", name: "Achari Chicken Roast", nameBn: "আচারি চিকেন রোস্ট", price: 160 },
      { id: "cashew-nut-salad", name: "Cashew Nut Salad", nameBn: "কাজু বাদাম সালাদ", price: 350 }
    ]
  },
  {
    id: "indian-platters",
    name: "Indian Platters",
    nameBn: "ইন্ডিয়ান প্ল্যাটার",
    items: [
      {
        id: "polao-gujrati-veg-dal",
        name: "Basmati Polao, Gujrati Vegetable, Dal Butter Fry",
        nameBn: "বাসমতী পোলাও, গুজরাটি ভেজিটেবল, ডাল বাটার ফ্রাই",
        price: 200
      },
      {
        id: "polao-tandoori-dal",
        name: "Basmati Polao, Tandoori Chicken, Dal Butter Fry",
        nameBn: "বাসমতী পোলাও, তান্দুরি চিকেন, ডাল বাটার ফ্রাই",
        price: 260
      },
      {
        id: "polao-mughlai-dal",
        name: "Basmati Polao, Chicken Mughlai, Dal Butter Fry",
        nameBn: "বাসমতী পোলাও, চিকেন মোঘলাই, ডাল বাটার ফ্রাই",
        price: 250
      },
      {
        id: "polao-chicken-masala-dal",
        name: "Basmati Polao, Chicken Masala, Dal Butter Fry",
        nameBn: "বাসমতী পোলাও, চিকেন মশলা, ডাল বাটার ফ্রাই",
        price: 240
      }
    ]
  }
];
