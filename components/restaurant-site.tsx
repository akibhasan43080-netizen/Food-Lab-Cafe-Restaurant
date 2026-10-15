"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowRight, Check, ChevronDown, Clock3, Facebook, MapPin, Menu as MenuIcon, Minus, Phone, Plus, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { menuCategories, type MenuItem } from "@/data/menu";
import { restaurant } from "@/data/restaurant";

type CartLine = {
  key: string;
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
};

const money = (value: number) => value === 0 ? "MRP" : `৳${value.toLocaleString("en-BD")}`;

function PlaceholderImage({ seed, label, className = "" }: { seed: string; label: string; className?: string }) {
  return (
    <div className={`food-placeholder ${className}`} role="img" aria-label={`${label} photo placeholder`}>
      <div className="placeholder-orbit" />
      <span className="placeholder-caption">{label}</span>
      <span className="placeholder-credit">Photo placeholder</span>
    </div>
  );
}

export default function RestaurantSite() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("pizza");
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", orderType: "Pickup", address: "", note: "" });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    try {
      const saved = localStorage.getItem("foodlab-cart");
      if (saved) setCart(JSON.parse(saved) as CartLine[]);
    } catch { /* Ignore malformed local cart data. */ }
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem("foodlab-cart", JSON.stringify(cart));
  }, [cart, ready]);

  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.reduce((sum, line) => sum + line.price * line.quantity, 0);

  const filteredCategories = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return menuCategories;
    return menuCategories.map(category => ({
      ...category,
      items: category.items.filter(item => item.name.toLowerCase().includes(term))
    })).filter(category => category.items.length);
  }, [search]);

  function addItem(item: MenuItem, size?: { label: string; price: number }) {
    const chosenSize = size?.label;
    const price = size?.price ?? item.price;
    const key = `${item.id}${chosenSize ? `-${chosenSize}` : ""}`;
    setCart(previous => {
      const found = previous.find(line => line.key === key);
      if (found) return previous.map(line => line.key === key ? { ...line, quantity: line.quantity + 1 } : line);
      return [...previous, { key, itemId: item.id, name: item.name, price, quantity: 1, size: chosenSize }];
    });
    setCartOpen(true);
  }

  function updateQuantity(key: string, delta: number) {
    setCart(previous => previous
      .map(line => line.key === key ? { ...line, quantity: line.quantity + delta } : line)
      .filter(line => line.quantity > 0));
  }

  function sendOrder() {
    if (!customer.name.trim() || !customer.phone.trim()) {
      alert("Please enter your name and phone number.");
      return;
    }
    if (customer.orderType === "Delivery" && !customer.address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }
    if (!cart.length) return;

    const lines = cart.map(line =>
      `${line.quantity} × ${line.name}${line.size ? ` (${line.size})` : ""} — ${money(line.price * line.quantity)}`
    );
    const message = [
      `Hello ${restaurant.shortName}! I'd like to place an order.`,
      "",
      `Name: ${customer.name}`,
      `Phone: ${customer.phone}`,
      `Order type: ${customer.orderType}`,
      ...(customer.orderType === "Delivery" ? [`Delivery address: ${customer.address}`] : []),
      "",
      ...lines,
      "",
      `Subtotal: ${money(subtotal)}`,
      "Please confirm availability, delivery charges (if applicable), and estimated time.",
      customer.note.trim() ? `Notes: ${customer.note.trim()}` : ""
    ].filter(Boolean).join("\n");
    const url = `https://wa.me/${restaurant.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const featured = [
    { title: "Tandoori Chicken Pizza", note: "Smoky, savoury, made for sharing", price: "৳550", seed: "pizza", category: "pizza" },
    { title: "Chef Special Burger", note: "A house favourite from the menu", price: "৳320", seed: "burger", category: "burgers" },
    { title: "Food Lab Special Chow Mein", note: "A satisfying noodle classic", price: "৳350", seed: "noodles", category: "chow-mein" }
  ];

  return (
    <main>
      <div className="announcement">
        <span className="announcement-dot" />
        A little more flavour in your day
        <span className="announcement-right">Kulaura, Bangladesh</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Food Lab home">
          <span className="brand-mark">FL<span>.</span></span>
          <span className="brand-copy"><strong>FOOD LAB</strong><small>CAFE & RESTAURANT</small></span>
        </a>
        <nav className={`main-nav ${mobileMenu ? "is-open" : ""}`} aria-label="Main navigation">
          <a href="#menu" onClick={() => setMobileMenu(false)}>Menu</a>
          <a href="#story" onClick={() => setMobileMenu(false)}>Our story</a>
          <a href="#gallery" onClick={() => setMobileMenu(false)}>Gallery</a>
          <a href="#visit" onClick={() => setMobileMenu(false)}>Find us</a>
        </nav>
        <div className="header-actions">
          <a className="header-call" href={`tel:${restaurant.phoneLink}`}><Phone size={15} /> Call us</a>
          <button className="button button-dark header-order" onClick={() => { setActiveCategory("pizza"); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); }}>Order now <ArrowRight size={15} /></button>
        </div>
        <button className="mobile-menu-toggle" aria-label={mobileMenu ? "Close navigation" : "Open navigation"} onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X /> : <MenuIcon />}
        </button>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span /> YOUR KULAURA FOOD STOP</p>
          <h1>Good food.<br /><em>Great moments.</em></h1>
          <p className="hero-description">From cheesy, oven-fresh pizza to comfort-food classics, make room for something delicious at Food Lab.</p>
          <div className="hero-actions">
            <a href="#menu" className="button button-orange">Explore the menu <ArrowDownRight size={17} /></a>
            <a href={`tel:${restaurant.phoneLink}`} className="button button-outline"><Phone size={16} /> Call to order</a>
          </div>
          <div className="hero-proof">
            <span className="proof-icon"><MapPin size={16} /></span>
            <span><strong>Right here in Kulaura</strong><small>Hospital Road, Kulaura</small></span>
            <span className="proof-divider" />
            <span><strong>Made for your cravings</strong><small>Pizza · Burgers · More</small></span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap">
            <PlaceholderImage seed="hero-food" label="Signature pizza" className="hero-food-image" />
            <div className="hero-image-shade" />
            <div className="image-note"><span className="note-kicker">A GOOD PLACE TO</span><strong>Come hungry.<br />Leave happy.</strong></div>
          </div>
          <div className="hero-side-note"><span className="side-line" /> GOOD TASTE, CLOSE TO HOME</div>
          <div className="hero-circle"><span>MADE WITH</span><strong>LOVE<br />& FLAVOUR</strong><Sparkles size={19} /></div>
        </div>
        <div className="hero-bottom-rule"><span>01</span><span>Food tastes better together</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="intro-strip" id="story">
        <div className="intro-label">A TABLE FOR EVERY CRAVING</div>
        <p>Casual bites, comforting classics, and a reason to <em>stay a little longer.</em></p>
        <a href="#menu" className="text-link">Find your favourite <ArrowRight size={16} /></a>
      </section>

      <section className="featured-section section-pad">
        <div className="section-heading">
          <div><p className="eyebrow"><span /> THE CROWD PLEASERS</p><h2>Good things<br /><em>worth sharing.</em></h2></div>
          <p className="section-description">A few menu highlights to get you started. Browse the full menu and pick what sounds good today.</p>
        </div>
        <div className="featured-grid">
          {featured.map((item, index) => (
            <article className={`featured-card featured-card-${index + 1}`} key={item.title}>
              <PlaceholderImage seed={item.seed} label={item.title} className="featured-image" />
              <div className="featured-card-content">
                <div><span className="card-index">0{index + 1} / MENU FAVOURITE</span><h3>{item.title}</h3><p>{item.note}</p></div>
                <div className="featured-card-bottom"><strong>{item.price}</strong><button className="round-arrow" aria-label={`Browse ${item.title}`} onClick={() => { setActiveCategory(item.category); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); }}><ArrowRight size={18} /></button></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="menu-section section-pad" id="menu">
        <div className="menu-topline"><p className="eyebrow"><span /> SOMETHING FOR EVERY MOOD</p><span className="menu-source-note">Menu & prices from supplied menu</span></div>
        <div className="section-heading menu-heading">
          <div><h2>Take a look.<br /><em>Take your pick.</em></h2></div>
          <div className="menu-heading-right"><p className="section-description">The classics, the comfort food, and the little treats. Find yours, add it to your cart, and send your order to us.</p><div className="menu-search"><Search size={17} /><input aria-label="Search menu" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search dishes..." /></div></div>
        </div>
        <div className="menu-layout">
          <aside className="category-list" aria-label="Menu categories">
            {menuCategories.map((category, index) => (
              <button key={category.id} className={activeCategory === category.id ? "category-button active" : "category-button"} onClick={() => { setActiveCategory(category.id); setSearch(""); }}>
                <span>{String(index + 1).padStart(2, "0")}</span>{category.name}<ArrowRight size={15} />
              </button>
            ))}
            <div className="menu-aside-note"><span>NEED A HAND?</span><p>Not sure what to choose? Give us a call.</p><a href={`tel:${restaurant.phoneLink}`}>Talk to Food Lab <ArrowRight size={14} /></a></div>
          </aside>
          <div className="menu-items">
            {filteredCategories.filter(category => search || category.id === activeCategory).map(category => (
              <div className="menu-category" key={category.id}>
                <div className="menu-category-heading"><h3>{category.name}</h3><span>{category.items.length} items</span></div>
                {category.note && <p className="category-note">{category.note}</p>}
                {category.items.map(item => (
                  <article className="menu-item" key={item.id}>
                    <div className="menu-item-copy">
                      <div className="menu-item-title">{item.name}{item.badge && <span className="item-badge">{item.badge}</span>}</div>
                      {item.description && <p>{item.description}</p>}
                      {item.sizes && <div className="size-options">{item.sizes.map(size => <button key={size.label} onClick={() => addItem(item, size)}><span>{size.label}</span><strong>{money(size.price)}</strong><Plus size={12} /></button>)}</div>}
                    </div>
                    <div className="menu-item-action">
                      <strong>{item.sizes ? `${money(item.sizes[0].price)}+` : money(item.price)}</strong>
                      {!item.sizes && <button className="add-button" disabled={item.price === 0} onClick={() => addItem(item)} aria-label={`Add ${item.name} to cart`}><Plus size={16} /> Add</button>}
                    </div>
                  </article>
                ))}
              </div>
            ))}
            {filteredCategories.length === 0 && <div className="empty-search">No dishes found. Try another search.</div>}
          </div>
        </div>
      </section>

      <section className="experience-section section-pad" id="gallery">
        <div className="experience-copy">
          <p className="eyebrow"><span /> MAKE IT A FOOD LAB MOMENT</p>
          <h2>Come for the food.<br /><em>Stay for the feeling.</em></h2>
          <p>Catch up with friends, share a pizza, or take a break with your favourite coffee. Your next good meal is waiting in Kulaura.</p>
          <a href={restaurant.facebook} target="_blank" rel="noreferrer" className="button button-light"><Facebook size={16} /> Find us on Facebook <ArrowRight size={15} /></a>
        </div>
        <div className="experience-visual">
          <PlaceholderImage seed="restaurant-interior" label="Restaurant interior" className="experience-image experience-image-tall" />
          <PlaceholderImage seed="coffee-dessert" label="Coffee & something sweet" className="experience-image experience-image-small" />
          <div className="experience-caption"><span>GOOD FOOD IS</span><strong>Better together.</strong></div>
        </div>
      </section>

      <section className="visit-section section-pad" id="visit">
        <div className="visit-heading"><p className="eyebrow"><span /> COME ON OVER</p><h2>Find your way<br /><em>to Food Lab.</em></h2><p>We're on Hospital Road in Kulaura. Call ahead if you'd like to check today's opening hours or confirm an order.</p></div>
        <div className="visit-card">
          <div className="visit-detail"><span className="detail-icon"><MapPin size={18} /></span><div><small>FIND US</small><strong>Hospital Road, Kulaura</strong><p>Kulaura 3230, Bangladesh</p></div></div>
          <div className="visit-detail"><span className="detail-icon"><Clock3 size={18} /></span><div><small>OPENING HOURS</small><strong>{restaurant.estimatedHours}</strong><p>{restaurant.estimatedHoursNote}</p></div></div>
          <div className="visit-detail"><span className="detail-icon"><Phone size={18} /></span><div><small>CALL THE RESTAURANT</small><strong>{restaurant.phoneDisplay}</strong><p>For orders and questions</p></div></div>
          <div className="visit-actions"><a href={restaurant.mapsSearch} target="_blank" rel="noreferrer" className="button button-dark">Open map <ArrowRight size={16} /></a><a href={`tel:${restaurant.phoneLink}`} className="button button-outline">Call Food Lab <Phone size={15} /></a></div>
        </div>
      </section>

      <section className="closing-cta">
        <div><p className="eyebrow"><span /> YOUR NEXT BITE IS CALLING</p><h2>Hungry yet?<br /><em>Let's fix that.</em></h2></div>
        <div className="closing-actions"><p>Choose your favourites and send your order to Food Lab on WhatsApp.</p><button className="button button-orange" onClick={() => { setActiveCategory("pizza"); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); }}>Start an order <ArrowRight size={16} /></button><a href={`tel:${restaurant.phoneLink}`} className="closing-call"><Phone size={15} /> Or call {restaurant.phoneDisplay}</a></div>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home"><span className="brand-mark">FL<span>.</span></span><span className="brand-copy"><strong>FOOD LAB</strong><small>CAFE & RESTAURANT</small></span></a>
        <p>Good food. Great moments.</p>
        <div className="footer-links"><a href="#menu">Menu</a><a href="#visit">Location</a><a href={restaurant.facebook} target="_blank" rel="noreferrer">Facebook</a><a href={`tel:${restaurant.phoneLink}`}>Call us</a></div>
        <small className="copyright">© {new Date().getFullYear()} Food Lab Cafe & Restaurant. Website concept preview.</small>
      </footer>

      <div className="mobile-order-bar">
        <a href={`tel:${restaurant.phoneLink}`} aria-label="Call Food Lab"><Phone size={17} /> Call</a>
        <button onClick={() => { setActiveCategory("pizza"); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); }}>Explore menu <ArrowRight size={16} /></button>
        <button className="mobile-cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${itemCount} items`}><ShoppingBag size={18} /><span>{itemCount}</span></button>
      </div>

      {cartOpen && <div className="overlay" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setCartOpen(false); }}>
        <section className="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <div className="panel-heading"><div><p className="eyebrow"><span /> YOUR SELECTION</p><h2 id="cart-title">Your cart <span>({itemCount})</span></h2></div><button className="icon-button" aria-label="Close cart" onClick={() => setCartOpen(false)}><X /></button></div>
          {cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={32} /><h3>Your cart is waiting.</h3><p>Find something delicious on the menu.</p><button className="button button-orange" onClick={() => { setCartOpen(false); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); }}>Browse menu <ArrowRight size={16} /></button></div> :
            <><div className="cart-lines">{cart.map(line => <div className="cart-line" key={line.key}><div className="cart-line-copy"><strong>{line.name}</strong><small>{line.size ? `${line.size} · ` : ""}{money(line.price)} each</small><div className="quantity-control"><button aria-label={`Remove one ${line.name}`} onClick={() => updateQuantity(line.key, -1)}><Minus size={13} /></button><span>{line.quantity}</span><button aria-label={`Add one ${line.name}`} onClick={() => updateQuantity(line.key, 1)}><Plus size={13} /></button></div></div><strong>{money(line.price * line.quantity)}</strong></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Delivery fees, if any, are confirmed by the restaurant.</p><button className="button button-orange full-width" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>Continue to checkout <ArrowRight size={16} /></button></div></>}
        </section>
      </div>}

      {checkoutOpen && <div className="overlay" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setCheckoutOpen(false); }}>
        <section className="checkout-panel" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
          <div className="panel-heading"><div><p className="eyebrow"><span /> ALMOST THERE</p><h2 id="checkout-title">Order details</h2></div><button className="icon-button" aria-label="Close checkout" onClick={() => setCheckoutOpen(false)}><X /></button></div>
          <p className="checkout-intro">We'll prepare a message with your order. Review it in WhatsApp and press send to contact Food Lab.</p>
          <form onSubmit={event => { event.preventDefault(); sendOrder(); }}>
            <label>Your name<input required value={customer.name} onChange={event => setCustomer({ ...customer, name: event.target.value })} placeholder="Name" /></label>
            <label>Phone number<input required type="tel" value={customer.phone} onChange={event => setCustomer({ ...customer, phone: event.target.value })} placeholder="01XXXXXXXXX" /></label>
            <label>How would you like your order?<span className="select-wrap"><select value={customer.orderType} onChange={event => setCustomer({ ...customer, orderType: event.target.value, address: event.target.value === "Pickup" ? "" : customer.address })}><option>Pickup</option><option>Delivery</option></select><ChevronDown size={16} /></span></label>
            {customer.orderType === "Delivery" && <label>Delivery address<input required value={customer.address} onChange={event => setCustomer({ ...customer, address: event.target.value })} placeholder="House, road, area..." /></label>}
            <label>Order notes <textarea value={customer.note} onChange={event => setCustomer({ ...customer, note: event.target.value })} placeholder="Any special requests?" rows={3} /></label>
            <div className="checkout-total"><span>Order subtotal</span><strong>{money(subtotal)}</strong></div>
            <p className="checkout-disclaimer">No payment is taken on this website. Food Lab must confirm availability, final charges, and timing.</p>
            <button type="submit" className="button button-orange full-width">Continue to WhatsApp <ArrowRight size={16} /></button>
            <a className="checkout-call" href={`tel:${restaurant.phoneLink}`}><Phone size={15} /> Prefer to call? {restaurant.phoneDisplay}</a>
          </form>
        </section>
      </div>}
    </main>
  );
}
