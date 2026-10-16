"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import logoImg from "@/public/foodlab-logo.jpg";
import {
  AlertCircle,
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Facebook,
  Globe,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Phone,
  Plus,
  Quote,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  X
} from "lucide-react";
import { menuCategories, type MenuItem } from "@/data/menu";
import { restaurant } from "@/data/restaurant";
import { googleReviews, reviewsSummary } from "@/data/reviews";
import {
  formatPrice,
  toBengaliNumber,
  translations,
  type Language
} from "@/data/translations";

type CartLine = {
  key: string;
  itemId: string;
  name: string;
  nameBn: string;
  price: number;
  quantity: number;
  size?: string;
  sizeBn?: string;
};



export default function RestaurantSite() {
  // Bangla by default as requested
  const [lang, setLang] = useState<Language>("bn");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("pizza");
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    orderType: "Pickup",
    address: "",
    note: ""
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    setReady(true);
    try {
      const savedLang = localStorage.getItem("foodlab-lang");
      if (savedLang === "en" || savedLang === "bn") {
        setLang(savedLang);
        document.documentElement.lang = savedLang;
      } else {
        document.documentElement.lang = "bn";
      }

      const savedCart = localStorage.getItem("foodlab-cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart) as CartLine[]);
      }
    } catch {
      /* Ignore storage parse errors */
    }
  }, []);

  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem("foodlab-cart", JSON.stringify(cart));
      } catch {
        /* Ignore storage write errors */
      }
    }
  }, [cart, ready]);

  function switchLanguage(newLang: Language) {
    setLang(newLang);
    try {
      localStorage.setItem("foodlab-lang", newLang);
      document.documentElement.lang = newLang;
    } catch {
      /* Ignore storage write errors */
    }
  }

  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.reduce((sum, line) => sum + line.price * line.quantity, 0);

  // Reviews Carousel state & interactions
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  function handleCarouselScroll() {
    const el = carouselTrackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const cardWidth = card.offsetWidth + 20; // 20px gap
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveReviewIndex(Math.max(0, Math.min(index, googleReviews.length - 1)));
  }

  function scrollReviewTo(index: number) {
    const el = carouselTrackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const cardWidth = card.offsetWidth + 20;
    el.scrollTo({
      left: index * cardWidth,
      behavior: "smooth"
    });
    setActiveReviewIndex(index);
  }

  function handlePrevReview() {
    const prevIndex = Math.max(0, activeReviewIndex - 1);
    scrollReviewTo(prevIndex);
  }

  function handleNextReview() {
    const nextIndex = (activeReviewIndex + 1) % googleReviews.length;
    scrollReviewTo(nextIndex);
  }

  const menuItemsRef = useRef<HTMLDivElement>(null);

  function handleCategorySelect(categoryId: string) {
    if (categoryId === activeCategory && !search) return;

    const menuElem = document.getElementById("menu");

    if (menuElem) {
      const headerOffset = 90;
      const menuTop = menuElem.getBoundingClientRect().top + window.scrollY - headerOffset;

      if (window.scrollY > menuTop + 30) {
        window.scrollTo({
          top: menuTop,
          behavior: "smooth"
        });

        setActiveCategory(categoryId);
        setSearch("");

        if (typeof document !== "undefined") {
          const scrollContainers = document.querySelectorAll(".menu-category-scroll-container");
          scrollContainers.forEach(c => (c.scrollTop = 0));
        }
        return;
      }
    }

    setActiveCategory(categoryId);
    setSearch("");

    // Reset inner scroll position of menu category scroll containers
    if (typeof document !== "undefined") {
      const scrollContainers = document.querySelectorAll(".menu-category-scroll-container");
      scrollContainers.forEach(c => (c.scrollTop = 0));
    }
  }

  useEffect(() => {
    if (isCarouselHovered) return;
    const interval = setInterval(() => {
      setActiveReviewIndex(prev => {
        const next = (prev + 1) % googleReviews.length;
        const el = carouselTrackRef.current;
        if (el) {
          const card = el.firstElementChild as HTMLElement | null;
          if (card) {
            const cardWidth = card.offsetWidth + 20;
            el.scrollTo({
              left: next * cardWidth,
              behavior: "smooth"
            });
          }
        }
        return next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isCarouselHovered]);

  const filteredCategories = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return menuCategories;
    return menuCategories
      .map(category => ({
        ...category,
        items: category.items.filter(
          item =>
            item.name.toLowerCase().includes(term) ||
            item.nameBn.toLowerCase().includes(term) ||
            (item.description && item.description.toLowerCase().includes(term)) ||
            (item.descriptionBn && item.descriptionBn.toLowerCase().includes(term))
        )
      }))
      .filter(category => category.items.length > 0);
  }, [search]);

  function addItem(
    item: MenuItem,
    size?: { label: string; labelBn?: string; price: number }
  ) {
    const chosenSize = size?.label;
    const chosenSizeBn = size?.labelBn ?? size?.label;
    const price = size?.price ?? item.price;
    const key = `${item.id}${chosenSize ? `-${chosenSize}` : ""}`;
    setCart(previous => {
      const found = previous.find(line => line.key === key);
      if (found) {
        return previous.map(line =>
          line.key === key ? { ...line, quantity: line.quantity + 1 } : line
        );
      }
      return [
        ...previous,
        {
          key,
          itemId: item.id,
          name: item.name,
          nameBn: item.nameBn,
          price,
          quantity: 1,
          size: chosenSize,
          sizeBn: chosenSizeBn
        }
      ];
    });
    setCartOpen(true);
  }

  function updateQuantity(key: string, delta: number) {
    setCart(previous =>
      previous
        .map(line =>
          line.key === key ? { ...line, quantity: line.quantity + delta } : line
        )
        .filter(line => line.quantity > 0)
    );
  }

  function handleCheckoutSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError(null);

    if (!customer.name.trim() || !customer.phone.trim()) {
      setFormError(t.checkout.errorNamePhone);
      return;
    }
    if (customer.orderType === "Delivery" && !customer.address.trim()) {
      setFormError(t.checkout.errorAddress);
      return;
    }
    if (!cart.length) {
      setFormError(t.cart.emptyDesc);
      return;
    }

    const orderTypeLabel =
      customer.orderType === "Delivery"
        ? lang === "bn"
          ? "হোম ডেলিভারি"
          : "Delivery"
        : lang === "bn"
        ? "পিকআপ (রেস্তোরাঁ থেকে)"
        : "Pickup";

    const itemLines = cart.map(line => {
      const displayName = lang === "bn" ? line.nameBn : line.name;
      const sizeTag = line.size
        ? ` (${lang === "bn" && line.sizeBn ? line.sizeBn : line.size})`
        : "";
      const qty = lang === "bn" ? toBengaliNumber(line.quantity) : line.quantity;
      const priceStr = formatPrice(line.price * line.quantity, lang);
      return `• ${qty} × ${displayName}${sizeTag} — ${priceStr}`;
    });

    const subtotalStr = formatPrice(subtotal, lang);

    const message =
      lang === "bn"
        ? [
            `আসসালামু আলাইকুম/হ্যালো ${restaurant.shortNameBn}! আমি একটি নতুন অর্ডার দিতে চাই।`,
            "",
            `👤 গ্রাহকের নাম: ${customer.name.trim()}`,
            `📞 মোবাইল নম্বর: ${customer.phone.trim()}`,
            `📦 অর্ডারের ধরন: ${orderTypeLabel}`,
            ...(customer.orderType === "Delivery"
              ? [`📍 ডেলিভারির ঠিকানা: ${customer.address.trim()}`]
              : []),
            "",
            "📋 অর্ডারকৃত খাবারের তালিকা:",
            ...itemLines,
            "",
            `💰 মোট সাবটোটাল: ${subtotalStr}`,
            "অনুগ্রহ করে খাবারের প্রাপ্যতা, ডেলিভারি চার্জ (যদি থাকে) ও সময় জানিয়ে অর্ডারটি নিশ্চিত করবেন। ধন্যবাদ!",
            customer.note.trim() ? `📝 বিশেষ নোট: ${customer.note.trim()}` : ""
          ]
            .filter(Boolean)
            .join("\n")
        : [
            `Hello ${restaurant.shortName}! I would like to place an order.`,
            "",
            `Name: ${customer.name.trim()}`,
            `Phone: ${customer.phone.trim()}`,
            `Order type: ${orderTypeLabel}`,
            ...(customer.orderType === "Delivery"
              ? [`Delivery address: ${customer.address.trim()}`]
              : []),
            "",
            "Ordered Items:",
            ...itemLines,
            "",
            `Subtotal: ${subtotalStr}`,
            "Please confirm availability, delivery charges (if applicable), and estimated preparation time. Thank you!",
            customer.note.trim() ? `Notes: ${customer.note.trim()}` : ""
          ]
            .filter(Boolean)
            .join("\n");

    const whatsappUrl = `https://wa.me/${restaurant.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Safe navigation that works reliably within iframes and mobile browsers
    window.location.href = whatsappUrl;
  }

  const numDisplay = (val: number | string) =>
    lang === "bn" ? toBengaliNumber(val) : String(val);

  return (
    <main className={lang === "bn" ? "lang-bn" : "lang-en"}>
      {/* Site Header */}
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Food Lab home">
          <span className="brand-logo-wrap">
            <Image
              src={logoImg}
              alt="Food Lab Logo"
              width={44}
              height={44}
              priority
              className="brand-logo-img"
              referrerPolicy="no-referrer"
            />
          </span>
          <span className="brand-copy">
            <strong>{lang === "bn" ? "ফুড ল্যাব" : "FOOD LAB"}</strong>
            <small>
              {lang === "bn" ? "ক্যাফে অ্যান্ড রেস্টুরেন্ট" : "CAFE & RESTAURANT"}
            </small>
          </span>
        </a>

        {/* Navigation */}
        <nav
          className={`main-nav ${mobileMenu ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <a href="#menu" onClick={() => setMobileMenu(false)}>
            {t.nav.menu}
          </a>
          <a href="#reviews" onClick={() => setMobileMenu(false)}>
            {t.nav.reviews}
          </a>
          <a href="#story" onClick={() => setMobileMenu(false)}>
            {t.nav.story}
          </a>
          <a href="#gallery" onClick={() => setMobileMenu(false)}>
            {t.nav.gallery}
          </a>
          <a href="#visit" onClick={() => setMobileMenu(false)}>
            {t.nav.visit}
          </a>

          {/* Language Switcher inside mobile drawer for quick access */}
          <div className="flex items-center gap-2 pt-3 pb-2 border-t border-[var(--line)] md:hidden">
            <Globe size={15} className="text-[#6c7468]" />
            <span className="text-xs text-[#6c7468]">ভাষা / Language:</span>
            <div className="lang-toggle ml-auto">
              <button
                type="button"
                className={`lang-btn ${lang === "bn" ? "active" : ""}`}
                onClick={() => switchLanguage("bn")}
              >
                বাংলা
              </button>
              <button
                type="button"
                className={`lang-btn ${lang === "en" ? "active" : ""}`}
                onClick={() => switchLanguage("en")}
              >
                EN
              </button>
            </div>
          </div>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Swift Language Switcher */}
          <div
            className="lang-toggle"
            role="group"
            aria-label="Swift Language Switcher"
          >
            <button
              type="button"
              className={`lang-btn ${lang === "bn" ? "active" : ""}`}
              onClick={() => switchLanguage("bn")}
              title="বাংলায় পরিবর্তন করুন"
              aria-pressed={lang === "bn"}
            >
              বাংলা
            </button>
            <button
              type="button"
              className={`lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => switchLanguage("en")}
              title="Switch to English"
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>

          <a
            className="header-call"
            href={`tel:${restaurant.phoneLink}`}
            title={restaurant.phoneDisplay}
          >
            <Phone size={15} />
            <span>{t.actions.callUs}</span>
          </a>

          <button
            className="button button-dark header-order"
            onClick={() => {
              setActiveCategory("pizza");
              document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t.actions.orderNow} <ArrowRight size={15} />
          </button>
        </div>

        <button
          className="mobile-menu-toggle"
          aria-label={mobileMenu ? "Close navigation" : "Open navigation"}
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X /> : <MenuIcon />}
        </button>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-copy">
          <a
            href="#reviews"
            className="hero-rating-badge"
            aria-label={`${numDisplay("4.2")} star rating from ${numDisplay(447)} Google reviews`}
          >
            <span className="hero-badge-g">
              <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
            </span>
            <span className="hero-badge-score">
              <Star size={12} className="inline mr-1" fill="#f59e0b" stroke="#f59e0b" />
              <strong>{numDisplay("4.2")}</strong>
            </span>
            <span className="hero-badge-sep">•</span>
            <span className="hero-badge-reviews">
              {numDisplay(447)} {lang === "bn" ? "গুগল রিভিউ" : "Google reviews"}
            </span>
            <ChevronRight size={13} className="hero-badge-chevron" />
          </a>

          <p className="eyebrow">
            <span /> {t.hero.eyebrow}
          </p>
          <h1>
            {t.hero.titleLine1}
            <br />
            <em>{t.hero.titleLine2}</em>
          </h1>
          <p className="hero-description">{t.hero.description}</p>
          <div className="hero-actions">
            <a href="#menu" className="button button-orange">
              {t.actions.exploreMenu} <ArrowDownRight size={17} />
            </a>
            <a
              href={`tel:${restaurant.phoneLink}`}
              className="button button-outline"
            >
              <Phone size={16} /> {t.actions.callToOrder}
            </a>
            <a href="#reviews" className="button button-reviews-link">
              <Star size={15} fill="#f59e0b" stroke="#f59e0b" />
              <span>{lang === "bn" ? "রিভিউ দেখুন" : "Reviews"}</span>
            </a>
          </div>
          <div className="hero-proof">
            <span className="proof-icon">
              <MapPin size={16} />
            </span>
            <span>
              <strong>{t.hero.proof1Title}</strong>
              <small>{t.hero.proof1Subtitle}</small>
            </span>
            <span className="proof-divider" />
            <span>
              <strong>{t.hero.proof2Title}</strong>
              <small>{t.hero.proof2Subtitle}</small>
            </span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-wrap" style={{ position: "relative", overflow: "hidden" }}>
            <Image
              src="https://i.pinimg.com/736x/3c/3a/00/3c3a009405493f677ca648ef2c326dac.jpg"
              alt={lang === "bn" ? "সিগনেচার পিৎজা" : "Signature pizza"}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="hero-image-shade" />
            <div className="image-note">
              <span className="note-kicker">{t.hero.imageKicker}</span>
              <strong style={{ whiteSpace: "pre-line" }}>
                {t.hero.imageQuote}
              </strong>
            </div>
          </div>
          <div className="hero-circle">
            <span>{t.hero.badgeSub}</span>
            <strong style={{ whiteSpace: "pre-line" }}>
              {t.hero.badgeTitle}
            </strong>
            <Sparkles size={18} />
          </div>
        </div>
      </section>

      {/* Intro Strip */}
      <section className="intro-strip" id="story">
        <div className="intro-label">{t.intro.label}</div>
        <p>
          {t.intro.quote} <em>{t.intro.highlight}</em>
        </p>
        <a href="#menu" className="text-link">
          {t.intro.link} <ArrowRight size={16} />
        </a>
      </section>

      {/* Featured Items */}
      <section className="featured-section section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span /> {t.featured.eyebrow}
            </p>
            <h2>
              {t.featured.title}
              <br />
              <em>{t.featured.titleEm}</em>
            </h2>
          </div>
          <p className="section-description">{t.featured.description}</p>
        </div>

        <div className="featured-grid">
          {t.featured.items.map((item, index) => (
            <article
              className={`featured-card featured-card-${index + 1}`}
              key={item.id}
            >
              <div className="featured-image">
                <Image
                  src={
                    index === 0
                      ? "https://i.pinimg.com/736x/7f/28/2b/7f282bc1851b8892d575c895e13a931b.jpg"
                      : index === 1
                      ? "https://i.pinimg.com/736x/84/69/37/84693701bd08aedca2d80e4d254b0114.jpg"
                      : "https://i.pinimg.com/736x/6d/b3/af/6db3af88109459abbee0815b345cf11c.jpg"
                  }
                  alt={item.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="featured-card-content">
                <div>
                  <span className="card-index">
                    {numDisplay(String(index + 1).padStart(2, "0"))} /{" "}
                    {t.featured.tag}
                  </span>
                  <h3>{item.title}</h3>
                  {lang === "bn" && (
                    <div className="menu-item-subname">{item.titleEn}</div>
                  )}
                  <p>{item.note}</p>
                </div>
                <div className="featured-card-bottom">
                  <strong>{formatPrice(item.price, lang)}</strong>
                  <button
                    className="round-arrow"
                    aria-label={`Browse ${item.title}`}
                    onClick={() => {
                      setActiveCategory(item.category);
                      document
                        .getElementById("menu")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section className="menu-section section-pad" id="menu">
        <div className="menu-topline">
          <p className="eyebrow">
            <span /> {t.menu.eyebrow}
          </p>
        </div>

        <div className="section-heading menu-heading">
          <div>
            <h2>
              {t.menu.title}
              <br />
              <em>{t.menu.titleEm}</em>
            </h2>
          </div>
          <div className="menu-heading-right">
            <p className="section-description">{t.menu.description}</p>
            <div className="menu-search">
              <Search size={17} />
              <input
                aria-label="Search menu"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder={t.menu.searchPlaceholder}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-xs text-stone-500 hover:text-stone-800"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="menu-layout">
          {/* Categories Sidebar */}
          <aside className="category-list" aria-label="Menu categories">
            {menuCategories.map((category, index) => (
              <button
                key={category.id}
                className={
                  activeCategory === category.id
                    ? "category-button active"
                    : "category-button"
                }
                onClick={() => handleCategorySelect(category.id)}
              >
                <span>{numDisplay(String(index + 1).padStart(2, "0"))}</span>
                <span>{lang === "bn" ? category.nameBn : category.name}</span>
                <ArrowRight size={15} />
              </button>
            ))}
          </aside>

          {/* Menu Items Grid */}
          <div className="menu-items" ref={menuItemsRef}>
            {filteredCategories
              .filter(category => search || category.id === activeCategory)
              .map(category => (
                <div className="menu-category" key={category.id}>
                  <div className="menu-category-heading">
                    <h3>{lang === "bn" ? category.nameBn : category.name}</h3>
                    <span>
                      {numDisplay(category.items.length)}{" "}
                      {t.menu.itemCountSuffix}
                    </span>
                  </div>

                  {(category.note || category.noteBn) && (
                    <p className="category-note">
                      {lang === "bn"
                        ? category.noteBn || category.note
                        : category.note}
                    </p>
                  )}

                  <div className="menu-category-scroll-container">
                    {category.items.map(item => {
                      const itemName = lang === "bn" ? item.nameBn : item.name;
                      const itemBadge =
                        lang === "bn" ? item.badgeBn || item.badge : item.badge;
                      const itemDesc =
                        lang === "bn"
                          ? item.descriptionBn || item.description
                          : item.description;

                      return (
                        <article className="menu-item" key={item.id}>
                          <div className="menu-item-copy">
                            <div className="menu-item-title">
                              <span>{itemName}</span>
                              {itemBadge && (
                                <span className="item-badge">{itemBadge}</span>
                              )}
                            </div>
                            {lang === "bn" && item.name !== item.nameBn && (
                              <div className="menu-item-subname">{item.name}</div>
                            )}
                            {itemDesc && <p>{itemDesc}</p>}

                            {item.sizes && (
                              <div className="size-options">
                                {item.sizes.map(size => {
                                  const sizeLabel =
                                    lang === "bn" && size.labelBn
                                      ? size.labelBn
                                      : size.label;
                                  return (
                                    <button
                                      key={size.label}
                                      onClick={() => addItem(item, size)}
                                    >
                                      <span>{sizeLabel}</span>
                                      <strong>
                                        {formatPrice(size.price, lang)}
                                      </strong>
                                      <Plus size={12} />
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          <div className="menu-item-action">
                            <strong>
                              {item.sizes
                                ? `${formatPrice(item.sizes[0].price, lang)}+`
                                : formatPrice(item.price, lang)}
                            </strong>
                            {!item.sizes && (
                              <button
                                className="add-button"
                                disabled={item.price === 0}
                                onClick={() => addItem(item)}
                                aria-label={`Add ${itemName} to cart`}
                              >
                                <Plus size={15} /> {t.actions.addToCart}
                              </button>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  {category.items.length > 3 && (
                    <div className="menu-scroll-hint">
                      <span>
                        {lang === "bn"
                          ? `মোট ${numDisplay(category.items.length)}টি পদ • স্ক্রোল করে দেখুন`
                          : `Showing all ${category.items.length} dishes • Scroll list to view all`}
                      </span>
                    </div>
                  )}
                </div>
              ))}

            {filteredCategories.length === 0 && (
              <div className="empty-search">{t.menu.noResults}</div>
            )}
          </div>
        </div>
      </section>

      {/* Google Ratings & Reviews Social Proof Section */}
      <section className="reviews-section section-pad" id="reviews">
        <div className="reviews-header-wrap">
          <div className="reviews-header-left">
            <p className="eyebrow">
              <span /> {t.reviews.eyebrow}
            </p>
            <h2>
              {t.reviews.title}
              <br />
              <em>{t.reviews.titleEm}</em>
            </h2>
            <p className="section-description">{t.reviews.description}</p>
          </div>

          <div className="reviews-summary-card">
            <div className="google-badge-top">
              <div className="google-brand-badge">
                <svg
                  className="google-g-icon"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <div className="google-brand-text">
                  <strong>Google Reviews</strong>
                  <small>
                    <BadgeCheck size={12} className="inline mr-1" />
                    {lang === "bn" ? "যাচাইকৃত স্থানীয় রেটিং" : "Verified Local Rating"}
                  </small>
                </div>
              </div>

              <div className="google-score-box">
                <span className="google-score-num">
                  {numDisplay(reviewsSummary.rating.toFixed(1))}
                </span>
                <div className="rating-stars-cluster">
                  <div className="stars-row">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className="star-filled"
                        fill={i < 4 ? "#f59e0b" : "#fde68a"}
                        stroke="#f59e0b"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-500 font-medium">
                    {t.reviews.ratingOutOf}
                  </span>
                </div>
              </div>
            </div>

            <div className="google-rating-meta">
              <span>{t.reviews.verifiedGoogle}</span>
              <span className="dot-sep">•</span>
              <span>
                {numDisplay(reviewsSummary.totalReviews)} {t.reviews.totalReviewsSuffix}
              </span>
            </div>

            <div className="google-summary-actions">
              <a
                href={reviewsSummary.writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-orange reviews-write-btn"
              >
                <Sparkles size={14} /> {t.reviews.writeReview} <ExternalLink size={13} />
              </a>
              <a
                href={reviewsSummary.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="reviews-view-all-link"
              >
                {t.reviews.readAllOnGoogle} <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Carousel Control Bar */}
        <div className="reviews-carousel-bar">
          <div className="carousel-live-label">
            <span className="pulse-dot" />
            <span>{t.reviews.liveDinerFeedback}</span>
          </div>

          <div className="carousel-nav-buttons">
            <button
              type="button"
              className="carousel-nav-btn"
              onClick={handlePrevReview}
              aria-label={t.reviews.prev}
              disabled={activeReviewIndex === 0}
            >
              <ChevronLeft size={19} />
            </button>
            <button
              type="button"
              className="carousel-nav-btn"
              onClick={handleNextReview}
              aria-label={t.reviews.next}
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>

        {/* Carousel Scroll Track */}
        <div
          className="reviews-carousel-track"
          ref={carouselTrackRef}
          onScroll={handleCarouselScroll}
          onMouseEnter={() => setIsCarouselHovered(true)}
          onMouseLeave={() => setIsCarouselHovered(false)}
          onTouchStart={() => setIsCarouselHovered(true)}
          onTouchEnd={() => setIsCarouselHovered(false)}
        >
          {googleReviews.map(rev => {
            const authorInitials = rev.authorName
              .split(" ")
              .map(part => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();
            const highlight = lang === "bn" ? rev.highlightBn : rev.highlight;
            const text = lang === "bn" ? rev.textBn : rev.text;
            const time = lang === "bn" ? rev.relativeTimeBn : rev.relativeTime;

            return (
              <article className="review-card" key={rev.id}>
                <Quote size={34} className="review-quote-icon" />

                <div>
                  <div className="review-card-top">
                    <div
                      className="review-avatar"
                      style={{ backgroundColor: rev.avatarColor || "#e85b32" }}
                    >
                      {authorInitials}
                    </div>
                    <div className="review-meta">
                      <strong>{rev.authorName}</strong>
                      <div className="review-meta-sub">
                        <span>{time}</span>
                        <span>•</span>
                        <span className="review-badge-verified">
                          <BadgeCheck size={11} /> {t.reviews.verifiedCustomer}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="review-rating-row">
                    <div className="stars-row">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="star-filled"
                          fill="#f59e0b"
                          stroke="#f59e0b"
                        />
                      ))}
                    </div>
                  </div>

                  {highlight && (
                    <div className="review-dish-tag">
                      <strong>{highlight}</strong>
                    </div>
                  )}

                  <p className="review-card-text">
                    &ldquo;{text}&rdquo;
                  </p>
                </div>

                <div className="review-card-bottom">
                  <span className="review-source-tag">
                    <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    Google Maps
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Carousel Indicator Dots */}
        <div className="carousel-indicators" role="tablist" aria-label="Review pagination">
          {googleReviews.map((rev, index) => (
            <button
              key={rev.id}
              type="button"
              className={`carousel-indicator-dot ${index === activeReviewIndex ? "active" : ""}`}
              onClick={() => scrollReviewTo(index)}
              aria-label={`Go to review ${index + 1}`}
              aria-selected={index === activeReviewIndex}
              role="tab"
            />
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section section-pad" id="gallery">
        <div className="experience-copy">
          <p className="eyebrow">
            <span /> {t.experience.eyebrow}
          </p>
          <h2>
            {t.experience.title}
            <br />
            <em>{t.experience.titleEm}</em>
          </h2>
          <p>{t.experience.description}</p>
          <a
            href={restaurant.facebook}
            target="_blank"
            rel="noreferrer"
            className="button button-light"
          >
            <Facebook size={16} /> {t.actions.findFacebook}{" "}
            <ArrowRight size={15} />
          </a>
        </div>
        <div className="experience-visual">
          <div className="experience-image experience-image-tall" style={{ position: "relative", overflow: "hidden" }}>
            <Image
              src="https://i.pinimg.com/736x/ea/42/6f/ea426f32b03842be40aaf4f1bd4cda5d.jpg"
              alt={t.experience.interiorLabel}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="experience-image experience-image-small" style={{ position: "relative", overflow: "hidden" }}>
            <Image
              src="https://i.pinimg.com/736x/0a/68/5f/0a685f8485294478cd2ee7b9071fc1be.jpg"
              alt={t.experience.coffeeLabel}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="experience-caption">
            <span>{t.experience.badgeTitle}</span>
            <strong>{t.experience.badgeQuote}</strong>
          </div>
        </div>
      </section>

      {/* Visit Section */}
      <section className="visit-section section-pad" id="visit">
        <div className="visit-heading">
          <p className="eyebrow">
            <span /> {t.visit.eyebrow}
          </p>
          <h2>
            {t.visit.title}
            <br />
            <em>{t.visit.titleEm}</em>
          </h2>
          <p>{t.visit.description}</p>
        </div>

        <div className="visit-card">
          <div className="visit-detail">
            <span className="detail-icon">
              <MapPin size={18} />
            </span>
            <div>
              <small>{t.visit.addressLabel}</small>
              <strong>
                {lang === "bn" ? restaurant.addressBn : restaurant.address}
              </strong>
              <p>{t.visit.addressSub}</p>
            </div>
          </div>

          <div className="visit-detail">
            <span className="detail-icon">
              <Clock3 size={18} />
            </span>
            <div>
              <small>{t.visit.hoursLabel}</small>
              <strong>
                {lang === "bn"
                  ? restaurant.estimatedHoursBn
                  : restaurant.estimatedHours}
              </strong>
              <p>{t.visit.hoursSub}</p>
            </div>
          </div>

          <div className="visit-detail">
            <span className="detail-icon">
              <Phone size={18} />
            </span>
            <div>
              <small>{t.visit.phoneLabel}</small>
              <strong>
                {lang === "bn"
                  ? restaurant.phoneDisplayBn
                  : restaurant.phoneDisplay}
              </strong>
              <p>{t.visit.phoneSub}</p>
            </div>
          </div>

          <div className="visit-actions">
            <a
              href={restaurant.mapsSearch}
              target="_blank"
              rel="noreferrer"
              className="button button-dark"
            >
              {t.actions.openMap} <ArrowRight size={16} />
            </a>
            <a
              href={`tel:${restaurant.phoneLink}`}
              className="button button-outline"
            >
              {t.actions.callToOrder} <Phone size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="closing-cta">
        <div>
          <p className="eyebrow">
            <span /> {t.closing.eyebrow}
          </p>
          <h2>
            {t.closing.title}
            <br />
            <em>{t.closing.titleEm}</em>
          </h2>
        </div>
        <div className="closing-actions">
          <p>{t.closing.description}</p>
          <button
            className="button button-orange"
            onClick={() => {
              setActiveCategory("pizza");
              document
                .getElementById("menu")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t.actions.startOrder} <ArrowRight size={16} />
          </button>
          <a href={`tel:${restaurant.phoneLink}`} className="closing-call">
            <Phone size={15} /> {t.closing.callText}{" "}
            {lang === "bn"
              ? restaurant.phoneDisplayBn
              : restaurant.phoneDisplay}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-logo-wrap">
            <Image
              src={logoImg}
              alt="Food Lab Logo"
              width={44}
              height={44}
              className="brand-logo-img"
              referrerPolicy="no-referrer"
            />
          </span>
          <span className="brand-copy">
            <strong>{lang === "bn" ? "ফুড ল্যাব" : "FOOD LAB"}</strong>
            <small>
              {lang === "bn" ? "ক্যাফে অ্যান্ড রেস্টুরেন্ট" : "CAFE & RESTAURANT"}
            </small>
          </span>
        </a>
        <div className="footer-links">
          <a href="#menu">{t.nav.menu}</a>
          <a href="#visit">{t.nav.visit}</a>
          <a href={restaurant.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href={`tel:${restaurant.phoneLink}`}>{t.actions.callUs}</a>
        </div>
        <small className="copyright">
          © 2026 {lang === "bn" ? restaurant.nameBn : restaurant.name}.{" "}
          {t.footer.copyright}
        </small>
      </footer>

      {/* Mobile Sticky Order Bar */}
      <div className="mobile-order-bar">
        <a href={`tel:${restaurant.phoneLink}`} aria-label="Call Food Lab">
          <Phone size={16} /> {t.mobileBar.call}
        </a>
        <button
          onClick={() => {
            setActiveCategory("pizza");
            document
              .getElementById("menu")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {t.mobileBar.menu} <ArrowRight size={15} />
        </button>
        <button
          className="mobile-cart-button"
          onClick={() => setCartOpen(true)}
          aria-label={`Open cart, ${itemCount} items`}
        >
          <ShoppingBag size={17} />
          <span>{numDisplay(itemCount)}</span>
        </button>
      </div>

      {/* Cart Drawer */}
      {cartOpen && (
        <div
          className="overlay"
          role="presentation"
          onMouseDown={event => {
            if (event.target === event.currentTarget) setCartOpen(false);
          }}
        >
          <section
            className="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <div className="panel-heading">
              <div>
                <p className="eyebrow">
                  <span /> {t.cart.eyebrow}
                </p>
                <h2 id="cart-title">
                  {t.cart.title}{" "}
                  <span>({numDisplay(itemCount)})</span>
                </h2>
              </div>
              <button
                className="icon-button"
                aria-label="Close cart"
                onClick={() => setCartOpen(false)}
              >
                <X />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <ShoppingBag size={34} />
                <h3>{t.cart.emptyTitle}</h3>
                <p>{t.cart.emptyDesc}</p>
                <button
                  className="button button-orange"
                  onClick={() => {
                    setCartOpen(false);
                    document
                      .getElementById("menu")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {t.actions.browseDishes} <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="cart-lines">
                  {cart.map(line => {
                    const lineName = lang === "bn" ? line.nameBn : line.name;
                    const sizeLabel =
                      line.size
                        ? `${
                            lang === "bn" && line.sizeBn ? line.sizeBn : line.size
                          } · `
                        : "";

                    return (
                      <div className="cart-line" key={line.key}>
                        <div className="cart-line-copy">
                          <strong>{lineName}</strong>
                          <small>
                            {sizeLabel}
                            {formatPrice(line.price, lang)} {t.cart.each}
                          </small>
                          <div className="quantity-control">
                            <button
                              aria-label={`Remove one ${lineName}`}
                              onClick={() => updateQuantity(line.key, -1)}
                            >
                              <Minus size={13} />
                            </button>
                            <span>{numDisplay(line.quantity)}</span>
                            <button
                              aria-label={`Add one ${lineName}`}
                              onClick={() => updateQuantity(line.key, 1)}
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>
                        <strong>
                          {formatPrice(line.price * line.quantity, lang)}
                        </strong>
                      </div>
                    );
                  })}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>{t.cart.subtotal}</span>
                    <strong>{formatPrice(subtotal, lang)}</strong>
                  </div>
                  <p>{t.cart.deliveryNote}</p>
                  <button
                    className="button button-orange full-width"
                    onClick={() => {
                      setCartOpen(false);
                      setCheckoutOpen(true);
                    }}
                  >
                    {t.actions.continueCheckout} <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      )}

      {/* Checkout Drawer */}
      {checkoutOpen && (
        <div
          className="overlay"
          role="presentation"
          onMouseDown={event => {
            if (event.target === event.currentTarget) setCheckoutOpen(false);
          }}
        >
          <section
            className="checkout-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
          >
            <div className="panel-heading">
              <div>
                <p className="eyebrow">
                  <span /> {t.checkout.eyebrow}
                </p>
                <h2 id="checkout-title">{t.checkout.title}</h2>
              </div>
              <button
                className="icon-button"
                aria-label="Close checkout"
                onClick={() => setCheckoutOpen(false)}
              >
                <X />
              </button>
            </div>

            <p className="checkout-intro">{t.checkout.intro}</p>

            {formError && (
              <div className="checkout-error-banner" role="alert">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCheckoutSubmit}>
              <label>
                {t.checkout.nameLabel}
                <input
                  required
                  value={customer.name}
                  onChange={event => {
                    setCustomer({ ...customer, name: event.target.value });
                    if (formError) setFormError(null);
                  }}
                  placeholder={t.checkout.namePlaceholder}
                />
              </label>

              <label>
                {t.checkout.phoneLabel}
                <input
                  required
                  type="tel"
                  value={customer.phone}
                  onChange={event => {
                    setCustomer({ ...customer, phone: event.target.value });
                    if (formError) setFormError(null);
                  }}
                  placeholder={t.checkout.phonePlaceholder}
                />
              </label>

              <label>
                {t.checkout.orderTypeLabel}
                <span className="select-wrap">
                  <select
                    value={customer.orderType}
                    onChange={event =>
                      setCustomer({
                        ...customer,
                        orderType: event.target.value,
                        address:
                          event.target.value === "Pickup" ? "" : customer.address
                      })
                    }
                  >
                    <option value="Pickup">{t.checkout.pickupOption}</option>
                    <option value="Delivery">{t.checkout.deliveryOption}</option>
                  </select>
                  <ChevronDown size={16} />
                </span>
              </label>

              {customer.orderType === "Delivery" && (
                <label>
                  {t.checkout.addressLabel}
                  <input
                    required
                    value={customer.address}
                    onChange={event => {
                      setCustomer({ ...customer, address: event.target.value });
                      if (formError) setFormError(null);
                    }}
                    placeholder={t.checkout.addressPlaceholder}
                  />
                </label>
              )}

              <label>
                {t.checkout.notesLabel}
                <textarea
                  value={customer.note}
                  onChange={event =>
                    setCustomer({ ...customer, note: event.target.value })
                  }
                  placeholder={t.checkout.notesPlaceholder}
                  rows={3}
                />
              </label>

              <div className="checkout-total">
                <span>{t.checkout.orderSubtotal}</span>
                <strong>{formatPrice(subtotal, lang)}</strong>
              </div>

              <p className="checkout-disclaimer">{t.checkout.disclaimer}</p>

              <button
                type="submit"
                className="button button-orange full-width"
              >
                {t.actions.continueWhatsApp} <ArrowRight size={16} />
              </button>

              <a
                className="checkout-call"
                href={`tel:${restaurant.phoneLink}`}
              >
                <Phone size={15} /> {t.actions.preferCall}:{" "}
                {lang === "bn"
                  ? restaurant.phoneDisplayBn
                  : restaurant.phoneDisplay}
              </a>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
