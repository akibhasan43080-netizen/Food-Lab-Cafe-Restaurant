# Food Lab Cafe & Restaurant — website v1

A mobile-first restaurant website concept built with Next.js, TypeScript, and Tailwind CSS. No backend, database, authentication, or payment processing is required for this version.

## Included
- Restaurant landing page and navigation
- Menu from the supplied `menu.txt`, with searchable categories
- Interactive cart and quantity controls
- Checkout form that opens a prefilled WhatsApp order message
- Click-to-call links
- Map search link
- Responsive mobile order bar
- Placeholder food/interior images
- Provisional estimated opening hours, clearly labelled as an estimate

## Run locally
Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Before public launch
1. Replace CSS-generated photo placeholders with owner-approved restaurant and food images.
2. Download and install the official Food Lab logo; the Facebook photo URL is stored in `data/restaurant.ts` as a reference, not embedded as a working image.
3. Confirm the provisional hours (`11:00 AM – 10:00 PM`) with the owner. They are explicitly labelled estimated.
4. Confirm that `+8801831363705` is the correct WhatsApp number and is used for restaurant orders.
5. Confirm the location pin and delivery coverage.
6. Verify the source menu's unusual Thai Thick Soup price (`৳20`) and the MRP-only drinks before launch. Prices are intentionally retained from the supplied menu rather than silently corrected.
7. Add approved privacy notice if the owner requires one for order details.
8. Test the WhatsApp handoff on Android, iOS, and desktop.

## Deploy
Push this folder to a GitHub repository and import it into Netlify. The standard Next.js Netlify integration should detect the project. No environment variables are required for the current version.

## Notes
- Orders are not stored on a server. Customers must press Send in WhatsApp after the prefilled message opens.
- No payment is collected online.
- Delivery charges and order acceptance are confirmed by the restaurant.
- The design uses remote Google Fonts; system fallbacks remain available.
