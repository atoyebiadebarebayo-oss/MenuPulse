# MenuPulse — QR Code Digital Menu & WhatsApp Ordering Engine

MenuPulse is a lightweight digital menu and instant order routing platform built for restaurants, cafes, and food vendors. It enables guests to scan a QR code, browse dish categories, search for items, build a custom cart, and send their order directly to the kitchen via WhatsApp.

![Status](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 🚀 Live Demo

Explore the live workspace here: **[https://promptpulses.netlify.app]*


## ✨ Features

- **Interactive Digital Menu**: Clean category filtering (Mains, Pizza, Beverages, Desserts) and live search bar.
- **Instant Cart Builder**: Dynamic subtotal calculation, quantity adjustment, and custom instructions.
- **Direct WhatsApp Order Router**: Auto-formats selected items, table number, special requests, and price totals into a direct WhatsApp message routed to `+2347040416469`[cite: 2].
- **Dark/Light Mode Support**: Built-in theme switcher with state persistence[cite: 2].
- **Mobile-First Responsive Layout**: Built specifically for seamless browsing on mobile smartphones and tablets[cite: 2].

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Flexbox/Grid, Custom CSS Variables)[cite: 2]
- **JavaScript**: Modern ES6+ (DOM Manipulation, Array Methods, LocalStorage API)[cite: 2]
- **Icons**: FontAwesome 6.4[cite: 2]

---

## 📁 Project Structure

```text
MenuPulse/
│
├── index.html          # Markup structure, categories, and cart drawer
├── style.css           # Styling, themes, responsive layout
├── app.js              # Menu data, cart logic, WhatsApp message generator
├── README.md           # Project documentation
└── .gitignore          # System ignore rules