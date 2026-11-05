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
    id: "appetizers",
    name: "Appetizers",
    nameBn: "অ্যাপেটাইজার",
    note: "Crispy bites, wings & finger foods to kickstart your meal.",
    noteBn: "খাবারের শুরুতেই মুচমুচে ফ্রাই, উইংস ও সুস্বাদু স্ন্যাক্স।",
    items: [
      { id: "french-fry", name: "French Fry", nameBn: "ফ্রেঞ্চ ফ্রাই", price: 130 },
      { id: "crispy-chicken-fry-1pc", name: "Crispy Chicken Fry (1pc)", nameBn: "ক্রিস্পি চিকেন ফ্রাই (১ পিস)", price: 110 },
      { id: "crispy-chicken-fry-4pcs", name: "Crispy Chicken Fry (4pcs)", nameBn: "ক্রিস্পি চিকেন ফ্রাই (৪ পিস)", price: 390 },
      { id: "thai-chicken-fry-8pcs", name: "Thai Chicken Fry (8pcs)", nameBn: "থাই চিকেন ফ্রাই (৮ পিস)", price: 450 },
      { id: "nachos", name: "Nachos", nameBn: "নাচোস", price: 250 },
      { id: "special-cheesy-nachos", name: "Special Cheesy Nachos", nameBn: "স্পেশাল চিজি নাচোস", price: 320, badge: "Popular", badgeBn: "জনপ্রিয়" },
      { id: "crispy-chicken-wings-6pcs", name: "Crispy Chicken Wings (6pcs)", nameBn: "ক্রিস্পি চিকেন উইংস (৬ পিস)", price: 240 },
      { id: "bbq-hot-wings-6pcs", name: "BBQ Hot Wings (6pcs)", nameBn: "বারবিকিউ হট উইংস (৬ পিস)", price: 260 },
      { id: "peri-peri-wings-6pcs", name: "Peri Peri Wings (6pcs)", nameBn: "পেরি পেরি উইংস (৬ পিস)", price: 280 },
      { id: "wonthon-6pcs", name: "Wonthon (6pcs)", nameBn: "ওয়ানথন (৬ পিস)", price: 200 },
      { id: "naga-wings-6pcs", name: "Naga Wings (6pcs)", nameBn: "নাগা উইংস (৬ পিস)", price: 280, badge: "Spicy", badgeBn: "ঝাল" }
    ]
  },
  {
    id: "sandwich-shawarma",
    name: "Sandwich & Shawarma",
    nameBn: "স্যান্ডউইচ ও শর্মা",
    items: [
      { id: "cheesy-sub-sandwich", name: "Cheesy Sub Sandwich", nameBn: "চিজি সাব স্যান্ডউইচ", price: 190 },
      { id: "bbq-cheesy-sub-sandwich", name: "BBQ Cheesy Sub Sandwich", nameBn: "বারবিকিউ চিজি সাব স্যান্ডউইচ", price: 220 },
      { id: "chicken-shawarma", name: "Chicken Shawarma", nameBn: "চিকেন শর্মা", price: 180 },
      { id: "cheesy-wrap", name: "Cheesy Wrap", nameBn: "চিজি র‍্যাপ", price: 240 }
    ]
  },
  {
    id: "burgers",
    name: "Burgers",
    nameBn: "বার্গার",
    items: [
      { id: "crispy-chicken-burger", name: "Crispy Chicken Burger", nameBn: "ক্রিস্পি চিকেন বার্গার", price: 180 },
      { id: "chicken-cheese-burger", name: "Chicken Cheese Burger", nameBn: "চিকেন চিজ বার্গার", price: 200 },
      { id: "naga-cheese-burger", name: "Naga Cheese Burger", nameBn: "নাগা চিজ বার্গার", price: 220, badge: "Spicy", badgeBn: "ঝাল" },
      { id: "crispy-cheese-burger", name: "Crispy Cheese Burger", nameBn: "ক্রিস্পি চিজ বার্গার", price: 240 },
      { id: "bbq-chicken-cheese-burger", name: "BBQ Chicken Cheese Burger", nameBn: "বারবিকিউ চিকেন চিজ বার্গার", price: 220 },
      { id: "chicken-classic-burger", name: "Chicken Classic Burger", nameBn: "চিকেন ক্লাসিক বার্গার", price: 240 },
      { id: "beef-cheese-blast", name: "Beef Cheese Blast", nameBn: "বিফ চিজ ব্লাস্ট", price: 320, badge: "Popular", badgeBn: "জনপ্রিয়" },
      { id: "chef-special-burger", name: "Chef Special Burger", nameBn: "শেফ স্পেশাল বার্গার", price: 340, badge: "Chef's pick", badgeBn: "শেফের পছন্দ" }
    ]
  },
  {
    id: "pizza",
    name: "Pizza",
    nameBn: "পিৎজা",
    note: "Select your preferred size (10\" or 12\").",
    noteBn: "পছন্দের সাইজ নির্বাচন করুন (১০ ইঞ্চি বা ১২ ইঞ্চি)।",
    items: [
      {
        id: "mexican-pizza",
        name: "Mexican Pizza",
        nameBn: "মেক্সিকান পিৎজা",
        price: 500,
        sizes: [
          { label: '10"', labelBn: '১০ ইঞ্চি', price: 500 },
          { label: '12"', labelBn: '১২ ইঞ্চি', price: 630 }
        ]
      },
      {
        id: "bbq-pizza",
        name: "BBQ Pizza",
        nameBn: "বারবিকিউ পিৎজা",
        price: 530,
        sizes: [
          { label: '10"', labelBn: '১০ ইঞ্চি', price: 530 },
          { label: '12"', labelBn: '১২ ইঞ্চি', price: 650 }
        ]
      },
      {
        id: "chicken-supreme-pizza",
        name: "Chicken Supreme Pizza",
        nameBn: "চিকেন সুপ্রিম পিৎজা",
        price: 550,
        sizes: [
          { label: '10"', labelBn: '১০ ইঞ্চি', price: 550 },
          { label: '12"', labelBn: '১২ ইঞ্চি', price: 700 }
        ],
        badge: "Popular",
        badgeBn: "জনপ্রিয়"
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
        id: "margherita-pizza",
        name: "Margherita Pizza",
        nameBn: "মার্গারিটা পিৎজা",
        price: 550,
        sizes: [
          { label: '10"', labelBn: '১০ ইঞ্চি', price: 550 },
          { label: '12"', labelBn: '১২ ইঞ্চি', price: 700 }
        ]
      },
      {
        id: "four-seasons-pizza",
        name: "Four Seasons Pizza",
        nameBn: "ফোর সিজনস পিৎজা",
        price: 550,
        sizes: [
          { label: '10"', labelBn: '১০ ইঞ্চি', price: 550 },
          { label: '12"', labelBn: '১২ ইঞ্চি', price: 750 }
        ]
      },
      {
        id: "pizza-badsha",
        name: "Pizza Badsha",
        nameBn: "পিৎজা বাদশাহ",
        price: 750,
        sizes: [
          { label: '10"', labelBn: '১০ ইঞ্চি', price: 750 },
          { label: '12"', labelBn: '১২ ইঞ্চি', price: 1000 }
        ],
        badge: "Special",
        badgeBn: "স্পেশাল"
      }
    ]
  },
  {
    id: "pasta-chowmein",
    name: "Pasta & Chow Mein",
    nameBn: "পাস্তা ও চাউমিন",
    items: [
      { id: "white-sauce-pasta", name: "White Sauce Pasta", nameBn: "হোয়াইট সস পাস্তা", price: 230 },
      { id: "red-sauce-pasta", name: "Red Sauce Pasta", nameBn: "রেড সস পাস্তা", price: 240 },
      { id: "naga-pasta", name: "Naga Pasta", nameBn: "নাগা পাস্তা", price: 260, badge: "Spicy", badgeBn: "ঝাল" },
      { id: "creamy-oven-baked-pasta", name: "Creamy Oven Baked Pasta", nameBn: "ক্রিমি ওভেন বেকড পাস্তা", price: 300, badge: "Popular", badgeBn: "জনপ্রিয়" },
      { id: "naga-baked-pasta", name: "Naga Baked Pasta", nameBn: "নাগা বেকড পাস্তা", price: 320 },
      { id: "pasta-basta", name: "Pasta Basta", nameBn: "পাস্তা বাস্তা", price: 340 },
      { id: "chicken-chow-mein", name: "Chicken Chow Mein", nameBn: "চিকেন চাউমিন", price: 350 },
      { id: "foodlab-special-chowmein", name: "Food Lab Special Chow Mein", nameBn: "ফুড ল্যাব স্পেশাল চাউমিন", price: 380, badge: "Special", badgeBn: "স্পেশাল" },
      { id: "beef-chow-mein", name: "Beef Chow Mein", nameBn: "বিফ চাউমিন", price: 400 },
      { id: "prawn-chow-mein", name: "Prawn Chow Mein", nameBn: "প্রন চাউমিন", price: 400 }
    ]
  },
  {
    id: "soup",
    name: "Soup",
    nameBn: "স্যুপ",
    items: [
      {
        id: "thai-thick-soup",
        name: "Thai Thick Soup (1:3)",
        nameBn: "থাই থিক স্যুপ (১:৩)",
        description: "1:3 serving size for 3 persons.",
        descriptionBn: "১:৩ পরিবেশন (৩ জনের জন্য)।",
        price: 350
      },
      {
        id: "chicken-corn-soup",
        name: "Chicken Corn Soup (1:3)",
        nameBn: "চিকেন কর্ন স্যুপ (১:৩)",
        description: "1:3 serving size for 3 persons.",
        descriptionBn: "১:৩ পরিবেশন (৩ জনের জন্য)।",
        price: 300
      },
      {
        id: "cream-of-mushroom-soup-1-1",
        name: "Cream of Mushroom Soup (1:1)",
        nameBn: "ক্রিম অব মাশরুম স্যুপ (১:১)",
        description: "1:1 single serving.",
        descriptionBn: "১:১ একক পরিবেশন।",
        price: 250
      },
      {
        id: "cream-of-mushroom-soup-1-3",
        name: "Cream of Mushroom Soup (1:3)",
        nameBn: "ক্রিম অব মাশরুম স্যুপ (১:৩)",
        description: "1:3 family serving for 3 persons.",
        descriptionBn: "১:৩ পরিবেশন (৩ জনের জন্য)।",
        price: 500
      }
    ]
  },
  {
    id: "set-menus",
    name: "Set Menus",
    nameBn: "সেট মেন্যু",
    note: "All set menus include Egg Fried Rice and Chinese Vegetables.",
    noteBn: "প্রতিটি সেট মেন্যুতে এগ ফ্রাইড রাইস ও চাইনিজ ভেজিটেবল অন্তর্ভুক্ত।",
    items: [
      {
        id: "set-menu-1",
        name: "Set Menu 1",
        nameBn: "সেট মেন্যু ১",
        description: "Egg Fried Rice, Chicken Tandoori, Masala Chicken, Chinese Vegetables",
        descriptionBn: "এগ ফ্রাইড রাইস, চিকেন তান্দুরি, মশলা চিকেন, চাইনিজ ভেজিটেবল",
        price: 380,
        badge: "Complete Meal",
        badgeBn: "ফুল মিল"
      },
      {
        id: "set-menu-2",
        name: "Set Menu 2",
        nameBn: "সেট মেন্যু ২",
        description: "Egg Fried Rice, Thai Fried Chicken (2pcs), Masala Chicken, Chinese Vegetables",
        descriptionBn: "এগ ফ্রাইড রাইস, থাই ফ্রাইড চিকেন (২ পিস), মশলা চিকেন, চাইনিজ ভেজিটেবল",
        price: 340
      },
      {
        id: "set-menu-3",
        name: "Set Menu 3",
        nameBn: "সেট মেন্যু ৩",
        description: "Egg Fried Rice, BBQ Chicken (2pcs), Masala Chicken, Chinese Vegetables",
        descriptionBn: "এগ ফ্রাইড রাইস, বারবিকিউ চিকেন (২ পিস), মশলা চিকেন, চাইনিজ ভেজিটেবল",
        price: 330
      },
      {
        id: "set-menu-4",
        name: "Set Menu 4",
        nameBn: "সেট মেন্যু ৪",
        description: "Egg Fried Rice, Beef Masala, Chinese Vegetables",
        descriptionBn: "এগ ফ্রাইড রাইস, বিফ মশলা, চাইনিজ ভেজিটেবল",
        price: 350
      },
      {
        id: "set-menu-5",
        name: "Set Menu 5",
        nameBn: "সেট মেন্যু ৫",
        description: "Egg Fried Rice, Masala Chicken, Chinese Vegetables",
        descriptionBn: "এগ ফ্রাইড রাইস, মশলা চিকেন, চাইনিজ ভেজিটেবল",
        price: 250
      },
      {
        id: "set-menu-6",
        name: "Set Menu 6",
        nameBn: "সেট মেন্যু ৬",
        description: "Egg Fried Rice, BBQ Chicken (2pcs), Chinese Vegetables",
        descriptionBn: "এগ ফ্রাইড রাইস, বারবিকিউ চিকেন (২ পিস), চাইনিজ ভেজিটেবল",
        price: 280
      },
      {
        id: "set-menu-7",
        name: "Set Menu 7",
        nameBn: "সেট মেন্যু ৭",
        description: "Egg Fried Rice, Crispy Chicken Fry (2pcs), Chinese Vegetables",
        descriptionBn: "এগ ফ্রাইড রাইস, ক্রিস্পি চিকেন ফ্রাই (২ পিস), চাইনিজ ভেজিটেবল",
        price: 240
      }
    ]
  },
  {
    id: "rice-curry-vegetables",
    name: "Rice, Vegetables, Curry & Salads",
    nameBn: "রাইস, ভেজিটেবল, কারি ও সালাদ",
    items: [
      { id: "egg-fried-rice", name: "Egg Fried Rice", nameBn: "এগ ফ্রাইড রাইস", price: 300 },
      { id: "mexican-fried-rice", name: "Mexican Fried Rice", nameBn: "মেক্সিকান ফ্রাইড রাইস", price: 350 },
      { id: "mixed-fried-rice", name: "Mixed Fried Rice", nameBn: "মিক্সড ফ্রাইড রাইস", price: 400 },
      { id: "basmati-rice", name: "Basmati Rice", nameBn: "বাসমতী রাইস", price: 340 },
      { id: "plain-polaw", name: "Plain Polaw", nameBn: "প্লেইন পোলাও", price: 240 },
      { id: "achari-biryani-rice", name: "Achari Biryani Rice", nameBn: "আচারি বিরিয়ানি রাইস", price: 280 },
      { id: "chinese-vegetables", name: "Chinese Vegetables", nameBn: "চাইনিজ ভেজিটেবল", price: 280 },
      { id: "special-chinese-vegetables", name: "Special Chinese Vegetables", nameBn: "স্পেশাল চাইনিজ ভেজিটেবল", price: 330 },
      { id: "masala-chicken", name: "Masala Chicken", nameBn: "মশলা চিকেন", price: 330 },
      { id: "achari-chicken-masala", name: "Achari Chicken Masala", nameBn: "আচারি চিকেন মশলা", price: 380 },
      { id: "chicken-sizzling", name: "Chicken Sizzling", nameBn: "চিকেন সিজলিং", price: 400 },
      { id: "beef-sizzling", name: "Beef Sizzling", nameBn: "বিফ সিজলিং", price: 500 },
      { id: "beef-masala", name: "Beef Masala", nameBn: "বিফ মশলা", price: 520 },
      { id: "beef-curry", name: "Beef Curry", nameBn: "বিফ কারি", price: 300 },
      { id: "mutton-curry", name: "Mutton Curry", nameBn: "মাটন কারি", price: 320 },
      { id: "achari-chicken-roast-1pc", name: "Achari Chicken Roast (1pc)", nameBn: "আচারি চিকেন রোস্ট (১ পিস)", price: 160 },
      { id: "chicken-roast-sonali-1pc", name: "Chicken Roast (Sonali, 1pc)", nameBn: "চিকেন রোস্ট (সোনালী, ১ পিস)", price: 150 },
      { id: "cashewnut-salad", name: "Cashewnut Salad", nameBn: "কাজুবাদাম সালাদ", price: 400 },
      { id: "green-salad", name: "Green Salad", nameBn: "গ্রিন সালাদ", price: 150 }
    ]
  },
  {
    id: "beverages",
    name: "Coffee, Shakes & Fresh Juices",
    nameBn: "কফি, শেক ও ফ্রেশ জুস",
    items: [
      { id: "cold-coffee", name: "Cold Coffee", nameBn: "কোল্ড কফি", price: 100 },
      { id: "chocolate-cold-coffee", name: "Chocolate Cold Coffee", nameBn: "চকলেট কোল্ড কফি", price: 120 },
      { id: "regular-coffee", name: "Regular Coffee", nameBn: "রেগুলার কফি", price: 70 },
      { id: "lacchi", name: "Lacchi", nameBn: "লাচ্ছি", price: 100 },
      { id: "special-lacchi", name: "Special Lacchi", nameBn: "স্পেশাল লাচ্ছি", price: 120 },
      { id: "chocolate-milkshake", name: "Chocolate Milkshake", nameBn: "চকলেট মিল্কশেক", price: 150 },
      { id: "vanilla-milkshake", name: "Vanilla Milkshake", nameBn: "ভ্যানিলা মিল্কশেক", price: 150 },
      { id: "strawberry-milkshake", name: "Strawberry Milkshake", nameBn: "স্ট্রবেরি মিল্কশেক", price: 150 },
      { id: "oreo-milkshake", name: "Oreo Milkshake", nameBn: "ওরিও মিল্কশেক", price: 170 },
      { id: "kitkat-milkshake", name: "KitKat Milkshake", nameBn: "কিটক্যাট মিল্কশেক", price: 180 },
      {
        id: "soft-drinks",
        name: "Soft Drinks",
        nameBn: "সফট ড্রিংকস",
        price: 0,
        description: "MRP — confirmed at restaurant.",
        descriptionBn: "এমআরপি অনুযায়ী রেস্তোরাঁ নিশ্চিত করবে।"
      },
      {
        id: "water",
        name: "Water",
        nameBn: "মিনারেল ওয়াটার",
        price: 0,
        description: "MRP — confirmed at restaurant.",
        descriptionBn: "এমআরপি অনুযায়ী রেস্তোরাঁ নিশ্চিত করবে।"
      },
      { id: "mango-juice-seasonal", name: "Mango Juice (Seasonal)", nameBn: "ম্যাংগো জুস (মৌসুমি)", price: 100 },
      { id: "orange-juice", name: "Orange Juice", nameBn: "অরেঞ্জ জুস", price: 150 }
    ]
  },
  {
    id: "biriyani",
    name: "Biriyani",
    nameBn: "বিরিয়ানি",
    items: [
      { id: "chicken-kacchi-biriyani", name: "Chicken Kacchi Biriyani", nameBn: "চিকেন কাচ্চি বিরিয়ানি", price: 330 },
      { id: "chicken-dum-biriyani", name: "Chicken Dum Biriyani", nameBn: "চিকেন দম বিরিয়ানি", price: 220 },
      { id: "chicken-dum-biriyani-basmati", name: "Chicken Dum Biriyani (Basmati)", nameBn: "চিকেন দম বিরিয়ানি (বাসমতী)", price: 280 },
      { id: "achari-chicken-biriyani", name: "Achari Chicken Biriyani", nameBn: "আচারি চিকেন বিরিয়ানি", price: 260 },
      { id: "achari-chicken-biriyani-basmati", name: "Achari Chicken Biriyani (Basmati)", nameBn: "আচারি চিকেন বিরিয়ানি (বাসমতী)", price: 320 },
      { id: "shahi-morog-polaw", name: "Shahi Morog Polaw", nameBn: "শাহী মোরগ পোলাও", price: 260 },
      { id: "hyderabadi-chicken-biriyani", name: "Hyderabadi Chicken Biriyani", nameBn: "হায়দ্রাবাদি চিকেন বিরিয়ানি", price: 340 },
      { id: "hyderabadi-mutton-biriyani", name: "Hyderabadi Mutton Biriyani", nameBn: "হায়দ্রাবাদি মাটন বিরিয়ানি", price: 360, badge: "Popular", badgeBn: "জনপ্রিয়" },
      { id: "hyderabadi-beef-biriyani", name: "Hyderabadi Beef Biriyani", nameBn: "হায়দ্রাবাদি বিফ বিরিয়ানি", price: 360 },
      { id: "kacchi-mutton-beef", name: "Kacchi Mutton / Beef", nameBn: "কাচ্চি মাটন / বিফ", price: 380, badge: "Special", badgeBn: "স্পেশাল" },
      { id: "chef-special-biriyani", name: "Chef Special Biriyani", nameBn: "শেফ স্পেশাল বিরিয়ানি", price: 370, badge: "Chef's pick", badgeBn: "শেফের পছন্দ" },
      { id: "beef-biriyani", name: "Beef Biriyani", nameBn: "বিফ বিরিয়ানি", price: 300 },
      { id: "achari-beef-biriyani", name: "Achari Beef Biriyani", nameBn: "আচারি বিফ বিরিয়ানি", price: 350 },
      { id: "achari-beef-biriyani-basmati", name: "Achari Beef Biriyani (Basmati)", nameBn: "আচারি বিফ বিরিয়ানি (বাসমতী)", price: 400 }
    ]
  }
];
