# GrowNexa Media - Modern Agency Landing Page

A premium, responsive, high-converting single-page landing website built for **GrowNexa Media**, a specialized social media marketing agency.

## Key Features

- **Single-Page Architecture**: Seamless, continuous user journey across 10 structured sections.
- **Alternating Contrast System**: Alternates naturally between deep dark surfaces (`#08080A`, `#13141A`) and crisp light canvases (`#F8F8F6`, `#FFFFFF`).
- **Interactive Marketing Visuals**: Abstract SaaS-grade analytics dashboard with dynamic SVG curves, floating metric badges (Instagram Growth, Meta Ads Scaling), and live status beacons.
- **Contextual WhatsApp Conversion System**: 19 targeted WhatsApp CTA touchpoints across all headers, cards, packages, FAQs, and footers, each with tailored prefilled greetings.
- **Floating WhatsApp Widget**: Bottom-right sticky widget with pulsing radar ring and hover micro-animations.
- **Interactive Consultation Modal**: Form that captures client goals and automatically converts them into a structured WhatsApp message.
- **Accessible Accordion FAQ**: Smooth expand/collapse FAQ section leading to a direct WhatsApp prompt.
- **Transparent Agency Positioning**: Uses "Custom Quote" model for packages without fake scarcity or exaggerated claims.
- **Zero External Dependencies**: Pure HTML5, CSS3, and modern vanilla JavaScript. Fast load times, zero build steps needed.

---

## How to Configure Your WhatsApp Number

Open [`js/main.js`](js/main.js) and update line 11:

```javascript
const WHATSAPP_CONFIG = {
  phone: "919122675361", // Active number: 9122675361 (+91 91226 75361)
  defaultMessage: "Hi GrowNexa Media, I'd like to know more about your social media marketing services."
};
```

All 19 WhatsApp buttons on the landing page will automatically update to use your new number!

---

## Running Locally

### Option 1: Double Click
Simply double-click `index.html` to open it in any web browser.

### Option 2: Local Server
Run the included PowerShell server:
```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```
Then visit: [http://localhost:8085/](http://localhost:8085/)

---

## Project Structure

```
grownexa-media/
├── index.html         # Main single-page landing markup
├── css/
│   └── styles.css     # Premium dark/light theme, layout, animations
├── js/
│   └── main.js        # WhatsApp router, modal handler, FAQ accordion, scroll spy
├── serve.ps1          # Lightweight local static HTTP server
├── audit.ps1          # Verification and audit script
└── README.md          # Documentation & setup guide
```
