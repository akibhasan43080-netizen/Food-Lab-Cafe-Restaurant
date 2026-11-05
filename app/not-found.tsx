import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#f7f5ed] text-[#1b221a]">
      <span className="text-sm font-bold uppercase tracking-widest text-[#e85d04] mb-2">
        ৪০৪ / 404
      </span>
      <h1 className="text-3xl font-extrabold mb-3">
        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="text-stone-600 max-w-md mb-6 text-sm leading-relaxed">
        আপনি যে পৃষ্ঠাটি খুঁজছেন তা হয়তো সরানো হয়েছে অথবা লিংকটি ভুল। অনুগ্রহ করে ফুড ল্যাবের মূল মেন্যুতে ফিরে যান।
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-[#1b221a] text-white font-semibold text-sm hover:bg-[#e85d04] transition-colors"
      >
        মূল মেন্যুতে ফিরে যান / Back to Home
      </Link>
    </div>
  );
}
