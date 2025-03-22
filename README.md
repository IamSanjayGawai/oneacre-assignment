This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



npx create-next-app@latest



Installing dependencies:
- react
- react-dom
- next

Installing devDependencies:
- typescript
- @types/node
- @types/react
- @types/react-dom
- @tailwindcss/postcss
- tailwindcss
- eslint
- eslint-config-next
- @eslint/eslintrc








## Live Link :: https://oneacre-assignment-wufa.vercel.app/
# 🗺️ React + Google Maps Integration Guide

A comprehensive guide to effectively integrating Google Maps in React applications using hooks and best practices.

## 📚 Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation & Dependencies](#installation--dependencies)
- [Key Concepts](#key-concepts)
- [Implementation Guide](#implementation-guide)
- [Best Practices](#best-practices)
- [Examples](#examples)
- [Utility Functions](#utility-functions)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Introduction

This guide covers everything you need to know about properly integrating Google Maps with React applications. We focus on performance optimization, proper state management, and clean implementation patterns.

## 📋 Prerequisites

- Node.js (v18+)
- npm/yarn/pnpm
- Basic knowledge of React and Hooks
- Google Maps API key

## 📦 Installation & Dependencies

Add the following dependencies to your project:

```json
"dependencies": {
  "@googlemaps/js-api-loader": "^1.16.8",
  "@radix-ui/react-slot": "^1.1.2",
  "@shadcn/ui": "^0.0.4",
  "@tanstack/react-query": "^5.69.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "embla-carousel-react": "^8.5.2",
  "lucide-react": "^0.483.0",
  "next": "15.2.3",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-intersection-observer": "^9.16.0",
  "tailwind-merge": "^3.0.2"
}
```

Install the dependencies:

```bash
# npm
npm install

# yarn
yarn

# pnpm
pnpm install
```

## 🔑 Key Concepts

### Using References for Map Elements

When working with Google Maps in React, it's crucial to understand how references work. There are two primary references to manage:

1. **Map Container Reference** - The HTML element where the map renders
2. **Map Instance Reference** - The actual Google Maps instance

### Why Use `useRef` Instead of `useState`?

#### The Problem with `useState`

```tsx
// ❌ Not Recommended
const [mapRef, setMapRef] = useState<HTMLDivElement | null>(null);
const [map, setMap] = useState<google.maps.Map | null>(null);
```

Using `useState` for these references causes:
- Unnecessary re-renders when references change
- Potential map reinitialization issues
- Performance degradation

#### The Recommended Approach with `useRef`

```tsx
// ✅ Recommended
const mapContainerRef = useRef<HTMLDivElement | null>(null);
const mapInstanceRef = useRef<google.maps.Map | null>(null);
```

Benefits:
- No re-renders when updating references
- Stable references between renders
- Better performance
- More idiomatic for DOM references

## 💻 Implementation Guide

### Basic Setup

```tsx
import { useRef, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const MapComponent = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    // Avoid re-initialization
    if (!mapContainerRef.current || mapInstanceRef.current) return;
    
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
    });

    loader.load().then(() => {
      mapInstanceRef.current = new google.maps.Map(mapContainerRef.current!, {
        center: { lat: 17.385044, lng: 78.486671 },
        zoom: 10,
        mapTypeControl: false,
      });
    });
  }, []);

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-[500px] rounded-lg"
    />
  );
};

export default MapComponent;
```

### When to Use `useState` with Maps

Use `useState` only for reactive UI states:

```tsx
const [isMapLoaded, setIsMapLoaded] = useState(false);
const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);

useEffect(() => {
  if (!mapContainerRef.current || mapInstanceRef.current) return;
  
  loader.load().then(() => {
    mapInstanceRef.current = new google.maps.Map(mapContainerRef.current!, {
      center: { lat: 17.385044, lng: 78.486671 },
      zoom: 10,
    });
    setIsMapLoaded(true); // UI state change
  });
}, []);
```

## 🛠️ Best Practices

### 1. Proper Class Handling with Utility Functions

Use utility functions like `cn` to manage classes effectively:

```tsx
import { cn } from '../lib/utils';

const MapContainer = ({ className, ...props }) => (
  <div 
    ref={mapContainerRef}
    className={cn("w-full h-[400px] rounded-lg border", className)}
    {...props}
  />
);
```

### 2. Loading State Management

```tsx
const MapComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Map initialization code...
  
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <Spinner />
        </div>
      )}
      <div ref={mapContainerRef} className="w-full h-[400px]" />
    </div>
  );
};
```

### 3. Event Handling

```tsx
useEffect(() => {
  if (!mapInstanceRef.current) return;
  
  const listener = mapInstanceRef.current.addListener('click', (e) => {
    setSelectedLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });
  });
  
  // Clean up listener on unmount
  return () => {
    google.maps.event.removeListener(listener);
  };
}, [mapInstanceRef.current]);
```

## 📋 Examples

### Adding Markers

```tsx
const addMarker = (position) => {
  if (!mapInstanceRef.current) return;
  
  const marker = new google.maps.Marker({
    position,
    map: mapInstanceRef.current,
    animation: google.maps.Animation.DROP,
  });
  
  markersRef.current.push(marker);
  
  return marker;
};
```

### Custom Controls

```tsx
const addCustomControl = () => {
  if (!mapInstanceRef.current) return;
  
  const controlDiv = document.createElement('div');
  controlDiv.className = 'custom-control';
  
  // Build your custom control UI
  controlDiv.innerHTML = `
    <button class="bg-white p-2 rounded-full shadow-md">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <!-- SVG content here -->
      </svg>
    </button>
  `;
  
  controlDiv.addEventListener('click', handleControlClick);
  
  mapInstanceRef.current.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
};
```

## 🧰 Utility Functions

### The `cn` Function Explained

The `cn` function combines `clsx` and `tailwind-merge` to efficiently handle class names:

```tsx
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Why it's important:**
- Properly merges Tailwind classes
- Resolves conflicts (e.g., `bg-red-500` and `bg-blue-500`)
- Handles conditional classes elegantly

## 🔧 Troubleshooting

### Common Issues

1. **Map Not Displaying**
   - Check if container has explicit height
   - Verify API key is valid
   - Check browser console for errors

2. **Multiple Map Initializations**
   - Ensure proper dependency array in useEffect
   - Verify condition: `if (!mapContainerRef.current || mapInstanceRef.current) return;`

3. **Map Losing State**
   - Check if you're accidentally using useState for references

## 📦 Package Ecosystem

This project leverages the following packages:

| Package | Version | Purpose |
|---------|---------|---------|
| **@googlemaps/js-api-loader** | ^1.16.8 | Load the Google Maps JavaScript API |
| **@radix-ui/react-slot** | ^1.1.2 | Primitive component for slot pattern |
| **@shadcn/ui** | ^0.0.4 | UI component collection |
| **@tanstack/react-query** | ^5.69.0 | Data fetching and caching |
| **class-variance-authority** | ^0.7.1 | Create variant components |
| **clsx** | ^2.1.1 | Construct className strings conditionally |
| **embla-carousel-react** | ^8.5.2 | Carousel component |
| **lucide-react** | ^0.483.0 | Icon library |
| **next** | 15.2.3 | React framework |
| **react** | ^19.0.0 | UI library |
| **react-dom** | ^19.0.0 | React DOM bindings |
| **react-intersection-observer** | ^9.16.0 | Intersection observer hooks |
| **tailwind-merge** | ^3.0.2 | Merge Tailwind CSS classes |

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
