export type Language = "bn" | "en";

export const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliNumber(val: number | string): string {
  return String(val).replace(/\d/g, d => bnDigits[parseInt(d, 10)] ?? d);
}

export function formatPrice(value: number, lang: Language): string {
  if (value === 0) {
    return lang === "bn" ? "এমআরপি (MRP)" : "MRP";
  }
  const formatted = value.toLocaleString("en-BD");
  if (lang === "bn") {
    return `৳${toBengaliNumber(formatted)}`;
  }
  return `৳${formatted}`;
}

export const translations = {
  bn: {
    announcement: "দিনের প্রতিটি মুহূর্তে সেরা স্বাদ",
    locationTag: "কুলাউড়া, মৌলভীবাজার",
    nav: {
      menu: "মেন্যু",
      reviews: "রিভিউ",
      story: "আমাদের কথা",
      gallery: "গ্যালারি",
      visit: "ঠিকানা ও যোগাযোগ"
    },
    actions: {
      callUs: "কল করুন",
      orderNow: "অর্ডার করুন",
      startOrder: "অর্ডার শুরু করুন",
      exploreMenu: "মেন্যু দেখুন",
      callToOrder: "অর্ডার করতে কল",
      addToCart: "যোগ করুন",
      added: "যোগ হয়েছে",
      continueCheckout: "অর্ডার এগিয়ে নিন",
      continueWhatsApp: "হোয়াটসঅ্যাপে অর্ডার পাঠান",
      preferCall: "সরাসরি ফোনে অর্ডার দিতে কল করুন",
      openMap: "গুগল ম্যাপে দেখুন",
      findFacebook: "ফেসবুক পেজ দেখুন",
      talkToFoodLab: "ফুড ল্যাবে কথা বলুন",
      browseDishes: "মেন্যু ব্রাউজ করুন"
    },
    hero: {
      eyebrow: "আপনার কুলাউড়ার খাবারের নির্ভরযোগ্য ঠিকানা",
      titleLine1: "দারুণ খাবার।",
      titleLine2: "সেরা মুহূর্ত।",
      description: "ওভেন-ফ্রেশ চিজি পিৎজা থেকে শুরু করে লোভনীয় ক্রিস্পি বার্গার ও ফ্রাইড রাইস—ফুড ল্যাবে উপভোগ করুন প্রতিটি খাবারের খাঁটি স্বাদ।",
      proof1Title: "কুলাউড়ার কেন্দ্রস্থলে",
      proof1Subtitle: "স্টেশন চৌমুহনী, কুলাউড়া",
      proof2Title: "আপনার পছন্দের খাবার",
      proof2Subtitle: "পিৎজা · বার্গার · চাউমিন · কফি",
      imageKicker: "আড্ডা আর স্বাদের ঠিকানা",
      imageQuote: "ক্ষুধা নিয়ে আসুন।\nতৃপ্তি নিয়ে ফিরুন।",
      badgeTitle: "ভালোবাসা\nও সেরা স্বাদ",
      badgeSub: "তাজা ও সুস্বাদু",
      sideNote: "খাঁটি স্বাদ, আপনার একদম কাছেই",
      footerStep1: "০১",
      footerStep2: "একসাথে খাওয়ার আনন্দই আলাদা",
      footerStep3: "নিচে স্ক্রোল করে মেন্যু দেখুন ↓",
      reviewsBadge: "৪.২ ★ ৪৪৭ গুগল রিভিউ",
      seeReviews: "রিভিউ দেখুন"
    },
    intro: {
      label: "প্রতিটি পছন্দের জন্য প্রস্তুত",
      quote: "বন্ধুদের আড্ডা, পরিবারের মিলনমেলা, কিংবা প্রিয় কফিতে কিছুটা সময়—",
      highlight: "প্রতিটি মুহূর্ত হোক আনন্দময়।",
      link: "আপনার পছন্দের খাবার বেছে নিন"
    },
    reviews: {
      eyebrow: "গুগল রিভিউ ও রেটিং",
      title: "গ্রাহকদের ভালোবাসায়",
      titleEm: "ফুড ল্যাব।",
      description: "কুলাউড়ার ভোজনরসিকদের মুখে মুখে ফুড ল্যাবের সুস্বাদু খাবারের প্রশংসা। দেখে নিন গুগল ম্যাপসে অতিথিদের বাস্তব অভিজ্ঞতা ও মতামত।",
      ratingLabel: "গুগল রেটিং",
      ratingOutOf: "৫.০ এর মধ্যে",
      verifiedGoogle: "গুগল ভেরিফায়েড রিভিউ",
      totalReviewsSuffix: "+ রিভিউ",
      writeReview: "গুগলে রিভিউ দিন",
      readAllOnGoogle: "গুগল ম্যাপসে সব রিভিউ দেখুন",
      recommendedDish: "পছন্দের পদ:",
      verifiedCustomer: "ভেরিফায়েড গুগল রিভিউয়ার",
      liveDinerFeedback: "অতিথিদের সরাসরি মতামত",
      prev: "পূর্ববর্তী",
      next: "পরবর্তী"
    },
    featured: {
      eyebrow: "সবার পছন্দের শীর্ষে",
      title: "জনপ্রিয় খাবার,",
      titleEm: "ভাগ করে খাওয়ার আনন্দ।",
      description: "শুরুতেই দেখে নিতে পারেন আমাদের সর্বাধিক বিক্রিত কিছু স্পেশাল আইটেম। এরপর পুরো মেন্যু থেকে আপনার পছন্দ বেছে নিন।",
      tag: "মেন্যু স্পেশাল",
      items: [
        {
          id: "tandoori-chicken-pizza",
          title: "তান্দুরি চিকেন পিৎজা",
          titleEn: "Tandoori Chicken Pizza",
          note: "স্মোকি তান্দুরি মশলা ও গলিত চিজের সেরা মেলবন্ধন",
          price: 550,
          category: "pizza",
          seed: "pizza"
        },
        {
          id: "chef-special-burger",
          title: "শেফ স্পেশাল বার্গার",
          titleEn: "Chef Special Burger",
          note: "জুসি চিকেন প্যাটি ও সিক্রেট সসে সাজানো স্পেশাল বার্গার",
          price: 320,
          category: "burgers",
          seed: "burger"
        },
        {
          id: "foodlab-special-chowmein",
          title: "ফুড ল্যাব স্পেশাল চাউমিন",
          titleEn: "Food Lab Special Chow Mein",
          note: "চিকেন ও তাজা সবজির মিশ্রণে মুখরোচক চাউমিন",
          price: 350,
          category: "chow-mein",
          seed: "noodles"
        }
      ]
    },
    menu: {
      eyebrow: "প্রতিটি স্বাদের জন্য কিছু না কিছু",
      sourceNote: "মূল মেন্যু ও রেট তালিকা অনুযায়ী",
      title: "এক নজরে মেন্যু দেখুন।",
      titleEm: "পছন্দ করুন এখনই।",
      description: "ক্লাসিক খাবার, হালকা নাস্তা ও রিফ্রেশিং শেক। খাবার কার্টে যোগ করুন এবং সরাসরি হোয়াটসঅ্যাপে অর্ডার পাঠিয়ে দিন।",
      searchPlaceholder: "খাবারের নাম দিয়ে খুঁজুন (যেমন: পিৎজা, বার্গার)...",
      needHelp: "সাহায্য লাগবে?",
      needHelpDesc: "কোন খাবারটি নিবেন বুঝতে পারছেন না? সরাসরি আমাদের সাথে কথা বলুন।",
      itemCountSuffix: "টি আইটেম",
      noResults: "কোনো খাবার পাওয়া যায়নি। অন্য কিছু লিখে খুঁজুন।",
      allCategoryLabel: "সব ক্যাটাগরি"
    },
    experience: {
      eyebrow: "ফুড ল্যাবে কাটুক বিশেষ মুহূর্ত",
      title: "খাবারের টানে আসুন।",
      titleEm: "অনুভূতির মায়ায় থাকুন।",
      description: "বন্ধুদের সাথে জমিয়ে আড্ডা, বড় পিৎজা শেয়ার করা, কিংবা এক কাপ গরম কফিতে সারাদিনের ক্লান্তি দূর করা—কুলাউড়ায় আপনার স্বাচ্ছন্দ্যময় সময় কাটাতে ফুড ল্যাব সদাপ্রস্তুত।",
      interiorLabel: "রেস্তোরাঁর মনোরম পরিবেশ",
      coffeeLabel: "কফি ও মিষ্টি ড্রিঙ্কস",
      badgeTitle: "সেরা স্বাদ",
      badgeQuote: "একসাথে খাওয়ার আনন্দ।"
    },
    visit: {
      eyebrow: "চলে আসুন আমাদের ঠিকানায়",
      title: "খুঁজে নিন আপনার",
      titleEm: "ফুড ল্যাব ক্যাফে।",
      description: "আমরা আছি কুলাউড়ার স্টেশন চৌমুহনীর শিশির মার্কেটে (১ম তলা)। অর্ডার নিশ্চিত করতে বা আজকের খোলা থাকার সময় জানতে আগে কল করে নিতে পারেন।",
      addressLabel: "ঠিকানা",
      addressValue: "শিশির মার্কেট (১ম তলা), স্টেশন চৌমুহনী, কুলাউড়া",
      addressSub: "কুলাউড়া ৩২৩০, মৌলভীবাজার, বাংলাদেশ",
      hoursLabel: "খোলা থাকার সময়",
      hoursValue: "সকাল ১১:০০ – রাত ১০:০০",
      hoursSub: "প্রতিদিন (আনুমানিক সময়, নিশ্চিত হতে কল করুন)",
      phoneLabel: "রেস্তোরাঁয় সরাসরি কল",
      phoneSub: "অর্ডার ও যেকোনো তথ্যের জন্য"
    },
    closing: {
      eyebrow: "ক্ষুধা ডাকছে আপনার?",
      title: "ক্ষুধা লেগেছে?",
      titleEm: "চলুন দূর করা যাক।",
      description: "পছন্দের খাবার নির্বাচন করুন এবং এক ক্লিকে হোয়াটসঅ্যাপে ফুড ল্যাবে অর্ডার পাঠান।",
      callText: "অথবা সরাসরি কল করুন"
    },
    footer: {
      tagline: "দারুণ খাবার। সেরা মুহূর্ত।",
      copyright: "ফুড ল্যাব ক্যাফে অ্যান্ড রেস্টুরেন্ট · সর্বস্বত্ব সংরক্ষিত।"
    },
    cart: {
      eyebrow: "আপনার নির্বাচন",
      title: "আপনার কার্ট",
      emptyTitle: "আপনার কার্টটি খালি।",
      emptyDesc: "মেন্যু থেকে পছন্দের খাবারগুলো যোগ করুন।",
      each: "প্রতিটি",
      subtotal: "সাবটোটাল",
      deliveryNote: "ডেলিভারি চার্জ (যদি প্রযোজ্য হয়) ও সময় রেস্তোরাঁ থেকে নিশ্চিত করা হবে।",
      itemsUnit: "টি খাবার"
    },
    checkout: {
      eyebrow: "অর্ডার সম্পন্ন করুন",
      title: "অর্ডারের বিবরণ",
      intro: "আপনার অর্ডারের একটি বিস্তারিত তালিকা তৈরি হবে। হোয়াটসঅ্যাপে মেসেজটি পাঠিয়ে দিলেই ফুড ল্যাব আপনার অর্ডার পেয়ে যাবে।",
      nameLabel: "আপনার নাম",
      namePlaceholder: "আপনার পুরো নাম লিখুন",
      phoneLabel: "মোবাইল নম্বর",
      phonePlaceholder: "০১XXXXXXXXX",
      orderTypeLabel: "অর্ডার কিভাবে নিতে চান?",
      pickupOption: "রেস্তোরাঁ থেকে পিকআপ (Pickup)",
      deliveryOption: "হোম ডেলিভারি (Home Delivery)",
      addressLabel: "ডেলিভারির পূর্ণ ঠিকানা",
      addressPlaceholder: "বাসা নং, সড়ক, এলাকা বা পরিচিত স্থান...",
      notesLabel: "বিশেষ অনুরোধ বা রান্নার নির্দেশনা (ঐচ্ছিক)",
      notesPlaceholder: "যেমন: কম ঝাল, এক্সট্রা সস ইত্যাদি...",
      orderSubtotal: "অর্ডার সাবটোটাল",
      disclaimer: "ওয়েবসাইটে কোনো অগ্রিম পেমেন্ট নেওয়া হয় না। খাবার প্রাপ্যতা, ডেলিভারি চার্জ এবং সময় রেস্তোরাঁ কর্তৃপক্ষ চূড়ান্ত করবে।",
      errorNamePhone: "অনুগ্রহ করে আপনার নাম এবং সঠিক মোবাইল নম্বর দিন।",
      errorAddress: "হোম ডেলিভারির জন্য অনুগ্রহ করে আপনার পূর্ণ ঠিকানা দিন।"
    },
    mobileBar: {
      call: "কল",
      menu: "মেন্যু",
      cart: "কার্ট"
    }
  },
  en: {
    announcement: "A little more flavour in your day",
    locationTag: "Kulaura, Bangladesh",
    nav: {
      menu: "Menu",
      reviews: "Reviews",
      story: "Our story",
      gallery: "Gallery",
      visit: "Find us"
    },
    actions: {
      callUs: "Call us",
      orderNow: "Order now",
      startOrder: "Start an order",
      exploreMenu: "Explore the menu",
      callToOrder: "Call to order",
      addToCart: "Add",
      added: "Added",
      continueCheckout: "Continue to checkout",
      continueWhatsApp: "Continue to WhatsApp",
      preferCall: "Prefer to call?",
      openMap: "Open map",
      findFacebook: "Find us on Facebook",
      talkToFoodLab: "Talk to Food Lab",
      browseDishes: "Browse menu"
    },
    hero: {
      eyebrow: "YOUR KULAURA FOOD STOP",
      titleLine1: "Good food.",
      titleLine2: "Great moments.",
      description: "From cheesy, oven-fresh pizza to comfort-food classics, make room for something delicious at Food Lab.",
      proof1Title: "Right here in Kulaura",
      proof1Subtitle: "Station Chowmuhoni, Kulaura",
      proof2Title: "Made for your cravings",
      proof2Subtitle: "Pizza · Burgers · Chow Mein · More",
      imageKicker: "A GOOD PLACE TO",
      imageQuote: "Come hungry.\nLeave happy.",
      badgeTitle: "LOVE\n& FLAVOUR",
      badgeSub: "MADE WITH",
      sideNote: "GOOD TASTE, CLOSE TO HOME",
      footerStep1: "01",
      footerStep2: "Food tastes better together",
      footerStep3: "SCROLL TO EXPLORE ↓",
      reviewsBadge: "4.2 ★ 447 Google reviews",
      seeReviews: "See Reviews"
    },
    intro: {
      label: "A TABLE FOR EVERY CRAVING",
      quote: "Casual bites, comforting classics, and a reason to ",
      highlight: "stay a little longer.",
      link: "Find your favourite"
    },
    reviews: {
      eyebrow: "GOOGLE REVIEWS & RATINGS",
      title: "Loved by diners,",
      titleEm: "verified on Google.",
      description: "Real reviews and genuine experiences shared by our valued guests on Google Maps. Taste the flavours that Kulaura loves.",
      ratingLabel: "Google Rating",
      ratingOutOf: "out of 5.0",
      verifiedGoogle: "Verified Google Reviews",
      totalReviewsSuffix: "+ Reviews",
      writeReview: "Write a Review on Google",
      readAllOnGoogle: "View all on Google Maps",
      recommendedDish: "Recommended:",
      verifiedCustomer: "Verified Google Reviewer",
      liveDinerFeedback: "Real Diner Feedback",
      prev: "Previous",
      next: "Next"
    },
    featured: {
      eyebrow: "THE CROWD PLEASERS",
      title: "Good things",
      titleEm: "worth sharing.",
      description: "A few menu highlights to get you started. Browse the full menu and pick what sounds good today.",
      tag: "MENU FAVOURITE",
      items: [
        {
          id: "tandoori-chicken-pizza",
          title: "Tandoori Chicken Pizza",
          titleEn: "Tandoori Chicken Pizza",
          note: "Smoky, savoury, made for sharing",
          price: 550,
          category: "pizza",
          seed: "pizza"
        },
        {
          id: "chef-special-burger",
          title: "Chef Special Burger",
          titleEn: "Chef Special Burger",
          note: "A house favourite from the menu",
          price: 320,
          category: "burgers",
          seed: "burger"
        },
        {
          id: "foodlab-special-chowmein",
          title: "Food Lab Special Chow Mein",
          titleEn: "Food Lab Special Chow Mein",
          note: "A satisfying noodle classic",
          price: 350,
          category: "chow-mein",
          seed: "noodles"
        }
      ]
    },
    menu: {
      eyebrow: "SOMETHING FOR EVERY MOOD",
      sourceNote: "Menu & prices from supplied menu",
      title: "Take a look.",
      titleEm: "Take your pick.",
      description: "The classics, the comfort food, and the little treats. Find yours, add it to your cart, and send your order to us.",
      searchPlaceholder: "Search dishes (e.g. pizza, burger)...",
      needHelp: "NEED A HAND?",
      needHelpDesc: "Not sure what to choose? Give us a call.",
      itemCountSuffix: "items",
      noResults: "No dishes found. Try another search.",
      allCategoryLabel: "All categories"
    },
    experience: {
      eyebrow: "MAKE IT A FOOD LAB MOMENT",
      title: "Come for the food.",
      titleEm: "Stay for the feeling.",
      description: "Catch up with friends, share a pizza, or take a break with your favourite coffee. Your next good meal is waiting in Kulaura.",
      interiorLabel: "Restaurant interior",
      coffeeLabel: "Coffee & something sweet",
      badgeTitle: "GOOD FOOD IS",
      badgeQuote: "Better together."
    },
    visit: {
      eyebrow: "COME ON OVER",
      title: "Find your way",
      titleEm: "to Food Lab.",
      description: "We're located at Shishir Market (1st floor), Station Chowmuhoni in Kulaura. Call ahead if you'd like to check today's opening hours or confirm an order.",
      addressLabel: "FIND US",
      addressValue: "Shishir Market (1st floor), Station Chowmuhoni, Kulaura",
      addressSub: "Kulaura 3230, Bangladesh",
      hoursLabel: "OPENING HOURS",
      hoursValue: "11:00 AM – 10:00 PM",
      hoursSub: "Daily (Estimated, call to confirm)",
      phoneLabel: "CALL THE RESTAURANT",
      phoneSub: "For orders and questions"
    },
    closing: {
      eyebrow: "YOUR NEXT BITE IS CALLING",
      title: "Hungry yet?",
      titleEm: "Let's fix that.",
      description: "Choose your favourites and send your order to Food Lab on WhatsApp.",
      callText: "Or call"
    },
    footer: {
      tagline: "Good food. Great moments.",
      copyright: "Food Lab Cafe & Restaurant. All rights reserved."
    },
    cart: {
      eyebrow: "YOUR SELECTION",
      title: "Your cart",
      emptyTitle: "Your cart is waiting.",
      emptyDesc: "Find something delicious on the menu.",
      each: "each",
      subtotal: "Subtotal",
      deliveryNote: "Delivery fees, if any, are confirmed by the restaurant.",
      itemsUnit: "items"
    },
    checkout: {
      eyebrow: "ALMOST THERE",
      title: "Order details",
      intro: "We'll prepare a message with your order. Review it in WhatsApp and press send to contact Food Lab.",
      nameLabel: "Your name",
      namePlaceholder: "Enter your full name",
      phoneLabel: "Phone number",
      phonePlaceholder: "01XXXXXXXXX",
      orderTypeLabel: "How would you like your order?",
      pickupOption: "Pickup",
      deliveryOption: "Home Delivery",
      addressLabel: "Delivery address",
      addressPlaceholder: "House, road, area...",
      notesLabel: "Order notes (Optional)",
      notesPlaceholder: "Any special requests or cooking preferences?",
      orderSubtotal: "Order subtotal",
      disclaimer: "No payment is taken on this website. Food Lab must confirm availability, final charges, and timing.",
      errorNamePhone: "Please enter your name and valid phone number.",
      errorAddress: "Please enter your delivery address."
    },
    mobileBar: {
      call: "Call",
      menu: "Menu",
      cart: "Cart"
    }
  }
} as const;
