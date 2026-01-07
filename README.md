# 🚲 Pedal Pro
### Premium bike service website + multi-step booking flow (front-end)

Pedal Pro is a **production-style, multi-page website** for a premium bike service brand, featuring a **guided booking experience** (specialist → service → time → customer details → confirmation). Built with a clean UI system, responsive layout, and a small modular JavaScript layer that makes the booking flow feel like a real product.

🌐 **Live Demo:** https://pedal-pro.vercel.app/

---

## ✨ Highlights

- ✅ **Multi-step booking flow (4 steps)** with guarded navigation and persistent state  
- ✅ **Specialist-specific service filtering** (only show services the selected expert provides)
- ✅ **Date picker with 14-day availability grid** + time slot selection
- ✅ **Client-side state management** using `localStorage` (robust defaults + safe parsing)
- ✅ **Toast notifications** (custom lightweight system — no libs)
- ✅ **Responsive, premium UI** with glass panels, soft dark theme, and consistent design tokens
- ✅ **Form validation UX** using Bootstrap validation patterns + progressive feedback
- ✅ **Deployed to Vercel**

---

## 🧭 Pages

- `index.html` — marketing / homepage
- `pages/services.html` — service catalog with pricing + durations
- `pages/about.html` — brand story + specialists section
- `pages/contact.html` — validated contact form (demo)
- Booking flow:
  1. `pages/book.html` — choose specialist
  2. `pages/book-service.html` — choose service (filtered by specialist)
  3. `pages/book-time.html` — choose date + time
  4. `pages/book-details.html` — customer details (validated)
  5. `pages/book-confirmation.html` — booking summary

---

## 🧠 Booking Flow Architecture

This project uses a simple, scalable pattern you’ll see in real apps:

### 1) Centralized booking store (persistent state)
- Booking state lives in `localStorage` with safe defaults and patch updates
- Every step reads from / writes to the same source of truth

### 2) Step scripts (modular JS)
Each booking page has a dedicated ES module script that:
- reads state
- updates UI
- validates selections
- patches state
- blocks invalid navigation

### 3) Lightweight UI utilities
A small shared core module provides:
- DOM helpers
- string utilities
- **toast** notifications
- HTML escaping for safety

---

## 🛠️ Tech Stack

- **HTML5** (semantic, multi-page structure)
- **CSS3** (design tokens, premium dark UI, glass effects)
- **Bootstrap 5.3** (grid, components, validation patterns)
- **Vanilla JavaScript (ES Modules)** (booking flow + UI behaviors)
- **Vercel** (deployment)

---

## 🚀 Run Locally

Because the booking scripts use **ES modules**, you should run this with a local server (not by opening the HTML file directly):

```bash
# Option A (VS Code)
# Install "Live Server" extension → Right-click index.html → "Open with Live Server"

# Option B (Node)
npx serve
