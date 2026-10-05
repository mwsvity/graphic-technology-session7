<div align="center">

# ✨ Melia Winisa — Personal Portfolio

**A modern, interactive personal portfolio built with pure HTML, CSS, and Vanilla JavaScript.**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)](https://fontawesome.com/)
[![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://fonts.google.com/)

[![Responsive](https://img.shields.io/badge/Responsive-✓-d97ab8?style=flat-square)](#)
[![No Framework](https://img.shields.io/badge/No_Framework-Vanilla-8fa8f8?style=flat-square)](#)
[![Claymorphism](https://img.shields.io/badge/Design-Claymorphism-ffe4f0?style=flat-square)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-dce4ff?style=flat-square)](./LICENSE)

<br/>

> *"Designing experiences that are soft, playful, and unforgettable."*

</div>

---

## 🎨 Preview

<div align="center">

| Desktop | Mobile |
|:---:|:---:|
| Sidebar vertikal · 3 project cards · Draggable lanyard | Bottom navigation · 85% card · Envelope CTA |

</div>

> 🌐 **Live Demo:** [meliawinisa.github.io](https://meliawinisa.github.io) *(update with your actual URL)*

---

## 🌸 Highlights

| Section | Features |
|---|---|
| 🏠 **Home** | Layered hero · Animasi blob · Eye-tracking karakter · Floating name pill |
| 👤 **About** | Typing animation · Draggable lanyard · Hover sway physics · Info layout |
| 💼 **Projects** | Horizontal slider · CSS scroll-snap · Full-screen modal · 5 cards |
| 📬 **Contact** | CSS envelope CTA · Surat naik saat hover · Touch-tap mobile support |

---

## 🛠️ Tech Stack

```
Portfolio
├── HTML5            → Semantic structure, accessibility (aria-*)
├── Vanilla CSS      → Claymorphism design, CSS variables, animations
│   ├── Custom Properties  → Centralized pastel pink × blue palette
│   ├── Flexbox + Grid     → Responsive layouts
│   ├── CSS Scroll-Snap    → Project slider (no library)
│   ├── clip-path          → Envelope pocket V-shape
│   └── @keyframes         → Blob drift, cursor blink, WA pulse
└── Vanilla JS       → All interactions, zero npm dependencies
    ├── IntersectionObserver  → Active nav + typing animation trigger
    ├── Drag & Touch Events   → Lanyard drag with velocity rotation
    ├── requestAnimationFrame → Smooth 60fps sway animation
    └── DOM manipulation      → Modal, slider, floating dots
```

---

## 📁 Project Structure

```
grafis-teknologi/
│
├── index.html              # Single-page application
├── README.md               # You are here 👋
│
└── assets/
    ├── css/
    │   └── style.css       # ~2100 lines — full design system
    │
    ├── js/
    │   └── script.js       # ~770 lines — all interactions
    │
    └── image/
        ├── lanyard.png     # Draggable lanyard ID card
        ├── char-center.png # Character — center (default) pose
        ├── char-left.png   # Character — looking left
        ├── char-right.png  # + 6 more directional poses
        └── ...
```

---

## 🎨 Design System

### Palette — Pastel Pink × Blue

| Token | Hex | Preview | Usage |
|:---:|:---:|:---:|---|
| `--color-bg` | `#fdf8ff` | ![](https://via.placeholder.com/16/fdf8ff/fdf8ff?text=+) | Page background |
| `--color-sidebar` | `#dce4ff` | ![](https://via.placeholder.com/16/dce4ff/dce4ff?text=+) | Sidebar · Nav buttons |
| `--color-active` | `#ffe4f0` | ![](https://via.placeholder.com/16/ffe4f0/ffe4f0?text=+) | Active state · Name pill |
| `--color-text` | `#3e3578` | ![](https://via.placeholder.com/16/3e3578/3e3578?text=+) | All primary text |
| `--color-text-muted` | `#8474b8` | ![](https://via.placeholder.com/16/8474b8/8474b8?text=+) | Subtitles · Descriptions |
| `--color-accent` | `#d97ab8` | ![](https://via.placeholder.com/16/d97ab8/d97ab8?text=+) | Numbers · Badges · CTA |
| `--color-dot` | `#b8caf8` | ![](https://via.placeholder.com/16/b8caf8/b8caf8?text=+) | Decorative elements |

### Typography
- **Font:** [Nunito](https://fonts.google.com/specimen/Nunito) — weights 400 · 600 · 700 · 800
- **Scale:** `clamp()` fluid sizing — no fixed breakpoint jumps

### Claymorphism Recipe
```css
/* The signature clay look — used on cards, buttons, and the sidebar */
box-shadow:
  6px 8px 22px rgba(175, 190, 245, 0.22),    /* outer drop */
  -4px -4px 12px rgba(255, 255, 255, 0.95),  /* top-left highlight */
  inset 0 2px 6px rgba(255, 255, 255, 0.85), /* inner top shine */
  inset 0 -2px 6px rgba(200, 215, 255, 0.12); /* inner bottom depth */
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| **> 1024px** | Sidebar vertikal 230px · 3 project cards · Lanyard visible |
| **769–1024px** | Sidebar 190px · 2 project cards · Lanyard dekoratif (opacity 60%) |
| **≤ 768px** | **Bottom navigation** · 85% card · Lanyard hidden · WA di atas nav |
| **≤ 380px** | Typography & envelope diperkecil untuk layar paling kecil |

---

## ⚡ Interactive Features

### 🖱️ Draggable Lanyard
- Klik & drag di seluruh area `#about`
- Velocity-based rotation: `-30° → 30°`
- Spring release: rotasi balik ke 0° dengan elastic easing
- Mouse + Touch support
- `pointer-events: none` pada container — konten di bawah tetap bisa diklik

### 👀 8-Direction Eye-Tracking
- Karakter memiliki 9 pose (center + 8 arah)
- Threshold radius: tidak bereaksi jika mouse terlalu dekat
- Throttled via `requestAnimationFrame` — 60fps smooth

### ✍️ Typing Animation
- Trigger: hanya berjalan sekali saat `#about` masuk viewport
- Speed: 70–90ms per karakter
- Cursor `|` berkedip setelah selesai ketik
- Menggunakan `IntersectionObserver` yang sama dengan active nav

### ✉️ Envelope Contact
- Dibuat 100% dengan CSS (tanpa SVG, tanpa library animasi)
- `clip-path: polygon()` untuk bentuk V pocket
- Spring easing: `cubic-bezier(0.25, 1, 0.35, 1)`
- Touch toggle: tap untuk buka/tutup di mobile

---

## 🚀 Getting Started

### Clone & Run Locally

```bash
# 1. Clone repository
git clone https://github.com/meliawinisa/grafis-teknologi.git

# 2. Masuk ke folder
cd grafis-teknologi

# 3a. Buka langsung di browser
open index.html

# 3b. Atau gunakan Live Server (recommended)
#     VS Code → Install "Live Server" extension
#     Klik kanan index.html → "Open with Live Server"
```

> ✅ **Zero build steps.** Tidak ada `npm install`, tidak ada bundler.  
> Langsung buka di browser — siap jalan.

### Deploy ke GitHub Pages

```bash
# Push ke GitHub
git add .
git commit -m "🚀 initial portfolio"
git push origin main

# Di GitHub repo → Settings → Pages
# Source: Deploy from branch → main → / (root) → Save
```

---

## 🔧 Customization Guide

### Ganti Warna Palette
```css
/* assets/css/style.css — line 15 */
:root {
    --color-bg: #fdf8ff;       /* ← ganti sesuai keinginan */
    --color-sidebar: #dce4ff;
    --color-active: #ffe4f0;
    --color-text: #3e3578;
    --color-accent: #d97ab8;
}
```

### Ganti Konten Teks
Semua konten ada di [`index.html`](./index.html) — cukup edit teks:

```
Nama        → cari "Hi, I'm Melia Winisa!!!" (HTML + script.js)
Bio         → .about-header p
Experience  → .about-list (EXPERIENCE section)
Education   → .about-list (EDUCATION section)
WhatsApp    → href="https://wa.me/6281234567890"
Email       → href="mailto:meliawinisa@gmail.com"
Projects    → .project-card blocks (5 cards)
```

### Ganti Karakter/Gambar
Ganti file di `assets/image/`:
- `char-center.png` → pose default
- `char-[direction].png` → 8 pose directional (up, down, left, right, upLeft, upRight, downLeft, downRight)
- `lanyard.png` → gambar lanyard ID card

---

## 📦 External Dependencies

| Library | Version | Loaded via | Used for |
|---|---|---|---|
| [Font Awesome](https://fontawesome.com/) | 6.5.0 | CDN | All icons |
| [Google Fonts — Nunito](https://fonts.google.com/specimen/Nunito) | — | CDN | Typography |

**Zero npm packages.** No React. No Vue. No Tailwind. Just the web platform. 🎉

---

## 🗺️ Sections Map

```
index.html
│
├── #home     → Hero + animated character + floating name pill
├── #about    → Typing heading + info list + draggable lanyard
├── #project  → 5-card horizontal slider + full-screen modal
└── #contact  → Interactive envelope CTA + mailto button
```

---

## 📄 License

```
MIT License

Copyright (c) 2026 Melia Winisa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software to use, copy, modify, and distribute — with attribution.
```

---

<div align="center">

**Made with 💜 by [Melia Winisa](https://github.com/meliawinisa)**

*Claymorphism · Pastel Pink × Blue · Vanilla JS · No Framework*

<br/>

⭐ **Star this repo** if you found it helpful — it means a lot!

[![GitHub stars](https://img.shields.io/github/stars/meliawinisa/grafis-teknologi?style=social)](https://github.com/meliawinisa/grafis-teknologi)

</div>
