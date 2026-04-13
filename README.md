# GRM Alerts Dashboard

A React-based dashboard for Ground Resources Management (GRM) operators to monitor, review, and acknowledge satellite contact alerts. Built with the [Astro UXDS](https://astrouxds.com/) component library.

## Features

- **Alert Table** — Displays all alerts with severity, message, contact name, and contact time window
- **Severity Filtering** — Filter alerts by severity level (Critical, Serious, Caution, Warning)
- **Sorted by Recency** — Alerts are sorted by error time with the most recent at the top
- **Alert Details** — Click "Show Details" to view satellite and contact detail information in a dialog
- **Acknowledge Alerts** — Mark alerts as acknowledged to track which have been reviewed; acknowledged alerts are visually distinct and cannot be un-acknowledged
- **Astro UXDS Status Indicators** — Severity levels are displayed using Astro status symbols for quick visual identification

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Tech Stack

- **React 19** — UI framework
- **Vite** — Build tool and dev server
- **Astro UXDS** — Component library and design system for space operations UIs
- **ESLint** — Code linting

## Project Structure

```
src/
├── App.jsx              # Main application component
├── App.css              # Application styles
├── main.jsx             # Entry point
├── index.css            # Global styles
├── data/
│   └── data.json        # GRM contact and alert data
└── utils/
    └── transformAlerts.js  # Flattens nested alert data for display
```
