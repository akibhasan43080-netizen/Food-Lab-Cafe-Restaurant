# Independent Contained Menu Scroll & Mobile Bounded View

Architectural specification for isolating the menu category item lists into independent, hover-activated scrollable containers on desktop (matching the category sidebar height) and bounding mobile categories to 3 visible items with ample scroll-bypass clearance.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed during Phase 1 clarification:
> - **Desktop Scrollbar Behavior**: Subtle slim custom scrollbar visible on container hover to maintain visual elegance when idle.
> - **Mobile Display Strategy**: Internal scrollable box displaying 3 items at a time (~235px container height) with clean scroll clearance beneath, allowing thumb scrolling across the main site body without obstruction.

---

### 1. Overview & Core Concept

- **Problem**: When a user selects a large category (like Pizza with 20+ items), the vertical height expands to several thousand pixels. Diners wishing to browse other sections (Reviews, Experience, Address, Footer) are forced to scroll through the entire item catalog, leading to fatigue and poor viewport control.
- **Solution**: 
  - On **PC / Desktop**, the category items container is bound to the exact visual height of the category navigation sidebar (~460px–480px). When the mouse pointer hovers over the list, the wheel scrolls through items internally without growing the overall webpage. Moving the cursor outside allows effortless main-page scrolling.
  - On **Mobile devices**, the category list is bound to show 3 items at a time (~230px–240px) with touch-scrollable overflow and a subtle end-of-list gradient hint. The rest of the screen offers generous bypass whitespace so diners can easily continue scrolling down the page.

---

### 2. User Experience & Visual Design

#### Desktop User Flow
1. **Initial Selection**: Diner clicks a category (e.g., Pizza or Burgers) in the sticky sidebar.
2. **Category Header**: Category name, item count, and optional chef's note render cleanly at the top of the card.
3. **Scrollable Items Viewport**:
   - The items list renders inside a dedicated `.menu-category-scroll-container` capped at `max-height: 480px`.
   - Idle state: Clean, unencumbered view with zero harsh scrollbar tracks.
   - Hover state: A subtle 5px rounded amber/stone scrollbar thumb appears, indicating scrollability.
   - Pointer over container: Mouse wheel and trackpad scroll items smoothly within the card.
   - Pointer outside container: Wheel scrolls the main page directly down to Reviews and Gallery.

#### Mobile User Flow
1. **Instant Category Switching**: Diner taps horizontal category pills.
2. **3-Item Bounded Viewport**:
   - Mobile displays exactly 3 items at a time (`max-height: 235px`).
   - If a category contains more than 3 items, a subtle scroll hint indicator ("+X more dishes — scroll list" / "আরও পদ দেখতে স্ক্রোল করুন") guides the user.
   - The space below the category card remains free, enabling uninterrupted full-page thumb scrolling.

#### Visual Details & Styling
- **Scrollbar Accent**:
  ```css
  .menu-category-scroll-container::-webkit-scrollbar {
    width: 5px;
  }
  .menu-category-scroll-container::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 9999px;
    transition: background 0.2s ease;
  }
  .menu-category-scroll-container:hover::-webkit-scrollbar-thumb {
    background: rgba(31, 43, 35, 0.25);
  }
  .menu-category-scroll-container:hover::-webkit-scrollbar-thumb:hover {
    background: var(--orange);
  }
  ```
- **Overscroll Behavior**: `overscroll-behavior: contain;` prevents scroll chaining from inadvertently jumping the parent window when reaching the top or bottom of the list.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Container Scope (Per-Category Scroll vs Full-Layout Scroll)**
  - *Chosen Approach*: Wrap the items list within each category card (`.menu-category-scroll-container`) rather than locking the entire `.menu-layout`.
  - *Why*: Keeps the category title, item count badge, and category description fixed at the top of the card while only the dish rows scroll.
  - *Alternatives Considered*: Locking `.menu-items` as a whole was rejected because it would hide the category header when scrolling down.

- **Decision 2: Mobile Height Boundary (3-Item Clamp)**
  - *Chosen Approach*: Clamp mobile item list height to 3 items (`max-height: 235px`) with `overflow-y: auto; overscroll-behavior: contain;` and touch scrolling.
  - *Why*: Prevents mobile screens from being dominated by endless pizza lists, leaving thumb zones above and below for main page navigation.
  - *Alternatives Considered*: "Show More" accordion button was considered but user confirmed internal scroll box preference.

---

### 4. Technical Architecture & Component Mapping

#### Component Hierarchy Diagram

```
┌──────────────────────────────────────────────────────────────┐
│  <section id="menu" className="menu-section">                │
│                                                              │
│  ┌───────────────────────────┐  ┌─────────────────────────┐  │
│  │ <aside className=         │  │ <div className=         │  │
│  │   "category-list">        │  │   "menu-items">         │  │
│  │                           │  │                         │  │
│  │  [01 Pizza]               │  │  ┌────────────────────┐ │  │
│  │  [02 Burgers]             │  │  │ .menu-category     │ │  │
│  │  [03 Chow Mein]           │  │  │ ├─ Category Header │ │  │
│  │  [04 Fried Rice]          │  │  │ ├─ Category Note   │ │  │
│  │  [05 Appetizers]          │  │  │ └─ [Scroll Area]   │ │  │
│  │  [06 Pasta]               │  │  │    ├─ Item 1       │ │  │
│  │  [07 Beverages]           │  │  │    ├─ Item 2       │ │  │
│  │  [08 Desserts]            │  │  │    ├─ Item 3       │ │  │
│  │                           │  │  │    └─ (Items 4..N) │ │  │
│  │  Height: ~460px (Sticky)  │  │  │    Height: ~480px  │ │  │
│  └───────────────────────────┘  │  └────────────────────┘ │  │
│                                 └─────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

#### State & DOM Integration
1. **CSS Updates in `app/globals.css`**:
   - Add `.menu-category-scroll-container` with desktop `max-height: 480px`, `overflow-y: auto`, `overscroll-behavior: contain`, and hover scrollbar styling.
   - Add responsive media query for mobile (`@media (max-width: 760px)`) setting `max-height: 235px` (exactly 3 dish rows).
2. **JSX Updates in `components/restaurant-site.tsx`**:
   - Wrap `category.items.map(...)` inside `<div className="menu-category-scroll-container">`.
   - Add item counter indicator when items exceed 3 on mobile or exceed container height on desktop.
