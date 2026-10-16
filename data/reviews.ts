export type GoogleReview = {
  id: string;
  authorName: string;
  avatarColor?: string;
  rating: number;
  relativeTime: string;
  relativeTimeBn: string;
  highlight: string;
  highlightBn: string;
  text: string;
  textBn: string;
};

export type GoogleReviewsSummary = {
  rating: number; // 4.8
  totalReviews: number; // 124
  googleMapsUrl: string;
  writeReviewUrl: string;
};

export const reviewsSummary: GoogleReviewsSummary = {
  rating: 4.2,
  totalReviews: 447,
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Food+Lab+Cafe+Restaurant+Hospital+Road+Kulaura+Bangladesh",
  writeReviewUrl:
    "https://www.google.com/maps/search/?api=1&query=Food+Lab+Cafe+Restaurant+Hospital+Road+Kulaura+Bangladesh"
};

export const googleReviews: GoogleReview[] = [
  {
    id: "rev-1",
    authorName: "Nahidul Haque",
    avatarColor: "#e85b32",
    rating: 5,
    relativeTime: "3 months ago",
    relativeTimeBn: "৩ মাস আগে",
    highlight: "Dum Biriyani Masterpiece",
    highlightBn: "দম বিরিয়ানি মাস্টারপিস",
    text: "Without a doubt, one of the best restaurants in Kulaura! Their Dum Biriyani is absolutely amazing. Honestly, every single time I visit, I order only the Dum Biriyani. It's just that good.",
    textBn: "কুলাউড়ার অন্যতম সেরা রেস্টুরেন্ট! তাদের দম বিরিয়ানি এক কথায় অসাধারণ। আমি যখনই আসি, শুধু দম বিরিয়ানিই অর্ডার করি, কারণ এর স্বাদ অতুলনীয়।"
  },
  {
    id: "rev-2",
    authorName: "Mahin",
    avatarColor: "#3b82f6",
    rating: 5,
    relativeTime: "5 months ago",
    relativeTimeBn: "৫ মাস আগে",
    highlight: "Pizza Perfection",
    highlightBn: "সেরা পিৎজা",
    text: "One word: AMAZING. Tandoori pizza & refreshing mango juice, you guys must try this.",
    textBn: "এক কথায়: অসাধারণ। তান্দুরি পিৎজা এবং রিফ্রেশিং ম্যাংগো জুস, আপনাদের অবশ্যই ট্রাই করা উচিত।"
  },
  {
    id: "rev-3",
    authorName: "Arif King",
    avatarColor: "#10b981",
    rating: 5,
    relativeTime: "4 months ago",
    relativeTimeBn: "৪ মাস আগে",
    highlight: "Outstanding Food",
    highlightBn: "অসাধারণ খাবার",
    text: "One of the best restaurants I have experienced inside Kulaura is Food Lab, their food quality is amazing and their waiters behaviour is too good.",
    textBn: "কুলাউড়ার ভেতরে আমার দেখা সেরা রেস্টুরেন্টগুলোর একটি ফুড ল্যাব, তাদের খাবারের মান অসাধারণ এবং ওয়েটারদের ব্যবহার খুবই ভালো।"
  },
  {
    id: "rev-4",
    authorName: "Wali Uddin",
    avatarColor: "#8b5cf6",
    rating: 5,
    relativeTime: "2 years ago",
    relativeTimeBn: "২ বছর আগে",
    highlight: "Must-try Refreshments",
    highlightBn: "রিফ্রেশিং ড্রিংকস",
    text: "Khub e bhalo food quality!!! Customer service was great. Must try sweet lacchi and cold coffee.",
    textBn: "খুবই ভালো খাবারের মান!!! কাস্টমার সার্ভিস দারুণ ছিল। সুইট লাচ্ছি এবং কোল্ড কফি অবশ্যই ট্রাই করবেন।"
  },
  {
    id: "rev-5",
    authorName: "Lamia Rumu",
    avatarColor: "#ec4899",
    rating: 5,
    relativeTime: "a year ago",
    relativeTimeBn: "১ বছর আগে",
    highlight: "Unbeatable Chowmein",
    highlightBn: "সেরা চাউমিন",
    text: "This is the best chowmein ever in Kulaura town! Taste was just wow and absolutely perfect.",
    textBn: "কুলাউড়া শহরের সেরা চাউমিন এটা! স্বাদ জাস্ট ওয়াও এবং একদম পারফেক্ট।"
  },
  {
    id: "rev-6",
    authorName: "Shiplu Shadiq",
    avatarColor: "#f59e0b",
    rating: 5,
    relativeTime: "a year ago",
    relativeTimeBn: "১ বছর আগে",
    highlight: "Delightful Pizza",
    highlightBn: "মজাদার পিৎজা",
    text: "This Pizza is just lip-smacking with the flavorful topping and creamy cheese. Worth of spending money for quality food!",
    textBn: "পিৎজাটা স্বাদে ভরপুর টপিং এবং ক্রিমি চিজ দিয়ে তৈরি, যা একদম লোভনীয়। মানসম্মত খাবারের জন্য টাকা খরচ করাটা সার্থক!"
  },
  {
    id: "rev-7",
    authorName: "Abdullah Hossen",
    avatarColor: "#06b6d4",
    rating: 5,
    relativeTime: "5 months ago",
    relativeTimeBn: "৫ মাস আগে",
    highlight: "Reliable Service",
    highlightBn: "সেরা সার্ভিস",
    text: "Home delivery service is a great convenience. The speed, sincerity and reliability were all noticeable. A truly commendable initiative.",
    textBn: "হোম ডেলিভারি সার্ভিস আমাদের জন্য অনেক বড় সুবিধা। তাদের গতি, আন্তরিকতা এবং নির্ভরযোগ্যতা বিশেষভাবে লক্ষণীয়। সত্যিই প্রশংসনীয় উদ্যোগ।"
  },
  {
    id: "rev-8",
    authorName: "Tunu Bunu",
    avatarColor: "#6366f1",
    rating: 5,
    relativeTime: "2 years ago",
    relativeTimeBn: "২ বছর আগে",
    highlight: "Delicious & Hygienic",
    highlightBn: "সুস্বাদু খাবার",
    text: "Food was delicious and hygienic. Quality food in perfect price.",
    textBn: "খাবার সুস্বাদু এবং স্বাস্থ্যসম্মত। সঠিক দামে মানসম্মত খাবার।"
  },
  {
    id: "rev-9",
    authorName: "Shojib Mahmud",
    avatarColor: "#a855f7",
    rating: 5,
    relativeTime: "3 years ago",
    relativeTimeBn: "৩ বছর আগে",
    highlight: "Ambiance & Taste",
    highlightBn: "পরিবেশ ও স্বাদ",
    text: "It’s a great experience. The ambiance is very welcoming and charming. Amazing pizza, kacchi biriyani, food and service.",
    textBn: "দারুণ অভিজ্ঞতা। পরিবেশ খুবই চমৎকার এবং স্বাগত জানানো। চমৎকার পিৎজা, কাচ্চি বিরিয়ানি, খাবার এবং সার্ভিস।"
  },
  {
    id: "rev-10",
    authorName: "Abdul Muhid",
    avatarColor: "#f43f5e",
    rating: 5,
    relativeTime: "6 years ago",
    relativeTimeBn: "৬ বছর আগে",
    highlight: "Quality & Decor",
    highlightBn: "মান ও পরিবেশ",
    text: "Food quality is too good here. Environment is too sweet. Service is also good. Price is also affordable.",
    textBn: "খাবারের মান খুবই ভালো। পরিবেশ খুব চমৎকার। সার্ভিসও ভালো। দামও সাশ্রয়ী।"
  }
];
