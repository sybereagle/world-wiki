# 🌍 World Wiki

A lightweight, self-coded wiki framework for worldbuilding projects — built entirely with **HTML**, **CSS**, and **JavaScript**, and designed to be hosted freely on **GitHub Pages**.  
This repository serves as both a **template** and a **living documentation system** for complex settings, fictional universes, or research archives.

---

## ✨ Features

- 🗂️ **Dynamic Sidebar & Footer** — automatically included on every page for consistent navigation.  
- 🧭 **Single Page Application (SPA)** — seamless page loading without full refreshes.  
- 🪶 **Data-Driven Pages** — all pages listed in `data/placeholders.json` are automatically displayed as homepage cards.  
- 🖼️ **Optional Card Images** — each entry can include a thumbnail, making the homepage visually rich.  
- ⏱️ **Last Updated Timestamps** — generated dynamically for every listed page.  
- 💻 **Simple GitHub Pages Hosting** — just push to `main`, and your site updates automatically.

---

## 🏗️ Project Structure

```plaintext
world-wiki/
├── index.html                    # Homepage (SPA entry point)
├── data/
│   └── pages.json                # Page metadata (title, desc, tags, img, etc.)
├── css/
│   ├── style.css                 # Root stylesheet (imports all others)
│   ├── base/
│   │   ├── reset.css             # Normalize/reset defaults
│   │   ├── variables.css         # Colors, fonts, spacing, etc.
│   │   └── typography.css        # Base text and heading styles
│   ├── layout/
│   │   ├── grid.css              # Grid & flexbox layout helpers
│   │   ├── header.css            # Header/nav styles
│   │   ├── footer.css            # Footer styles
│   │   └── main-layout.css       # Global page layout containers
│   ├── components/
│   │   ├── cards.css             # Wiki article cards
│   │   ├── buttons.css           # Reusable buttons (incl. back-home)
│   │   ├── modals.css            # Popup/modal components (future-proof)
│   │   ├── loader.css            # Loading animation or transitions
│   │   └── tooltips.css          # Hover/tooltip interactions
│   ├── pages/
│   │   ├── homepage.css          # Specific to homepage view
│   │   └── article.css           # Styles for opened wiki articles
│   └── utils/
│       ├── animations.css        # Keyframes & transitions
│       ├── themes.css            # Thematic variations (light/dark/world)
│       └── helpers.css           # Utility classes (margin, padding, z-index)
├── js/
│   ├── main.js                   # Entry point: initializes SPA, sidebar, search, router
│   ├── api/
│   │   └── dataLoader.js         # Fetch JSON data
│   ├── router.js                 # Simple client-side SPA router
│   ├── render/
│   │   ├── renderCards.js        # Homepage cards
│   │   ├── renderPage.js         # Individual wiki page
│   │   ├── renderSearch.js       # Filter and render search results
│   │   ├── renderSearchField.js  # Search input in sidebar
│   │   └── renderSidebar.js      # Sidebar links
│   ├── ui/
│   │   ├── sidebar.js            # Sidebar toggle, overlay, resize handling
│   │   └── backButton.js         # Back home button logic
|   └── utils/
|       └── domUtils.js           # Simplifies DOM creation, updates, and queries
├── assets/
|   ├── images/                   # Optional card or page images
|   └── icons/                    # Sidebar and UI icons
└── README.md                     # Documentation and usage guide
```

## 🚀 Setup & Usage

### **1. Clone the Repository**
```bash
git clone https://github.com/<your-username>/world-wiki.git
cd world-wiki
```

### **2. Run Locally**
Use a simple local web server (recommended):
```bash
python3 -m http.server 8000
```

Then visit:  
👉 [http://localhost:8000](http://localhost:8000)

### **3. Edit or Add Pages**
Add new HTML files in `/pages`, then register them in `data/placeholders.json`:

```json
[
  {
    "title": "New Page Title",
    "file": "pages/new-page.html",
    "description": "A short description of your page.",
    "image": "images/new-thumbnail.jpg",
    "lastUpdated": "2025-10-05"
  }
]
```
### **4. Deploy on GitHub Pages**
- Go to your repo’s **Settings → Pages → Source**  
- Set branch to **main** and folder to `/ (root)`  
- Your site will be live at:  
  **https://<your-username>.github.io/world-wiki**

---

## 🧩 Development Workflow

To safely test changes before publishing:

```bash
git checkout -b dev       # Create dev branch
git add .                 # Stage changes
git commit -m "Update styles or layout"
git push origin dev       # Push to dev branch
```

Once tested, merge to main:

```bash
git checkout main
git merge dev --no-commit
git push origin main
```

## 🪄 Customization Ideas

- Replace placeholder content with your worldbuilding entries.  
- Add a **search bar** or **filter** for tags or categories.  
- Add **dark mode** or **theme switching** via CSS variables.  
- Use the JSON structure to feed from APIs or other data sources.  
- Add **animations** or **tooltips** for a more interactive feel.

---

## 🧠 License

This project is open for personal or educational use.  
Feel free to fork and modify it to suit your own world or creative work.

---

## 💬 Credits

Created by **Christopher O’Connell**, with assistance from **Lumi**, your friendly design and code partner. 🌙  
Built with care for worldbuilders, writers, and creators who want their worlds to live and breathe online.

---

> “Worlds are not written — they are *remembered*.”  
> — *Project Lumina*


