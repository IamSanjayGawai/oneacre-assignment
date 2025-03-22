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








https://oneacre-assignment-wufa.vercel.app/


Why Use mapRef and setMapRef Instead of map and setMap?
When working with Google Maps in React, we need to attach the map to a DOM element (a div). The reason we use mapRef and setMapRef instead of map and setMap is because mapRef stores a reference to the actual HTML element where the map will be rendered.

1. Understanding mapRef and setMapRef
tsx
Copy
Edit
const [mapRef, setMapRef] = useState<HTMLDivElement | null>(null);
mapRef: Stores a reference to the div where the Google Map will be rendered.

setMapRef: A function that updates mapRef when React assigns the div to it.

2. Attaching the div Reference
tsx
Copy
Edit
<div ref={setMapRef} style={{ width: '100%', height: '300px' }} />;
When this div is rendered, React automatically assigns its reference to mapRef via setMapRef.

This ensures mapRef always holds a valid HTML element.

3. Why Not Use map and setMap Instead?
If you used:

tsx
Copy
Edit
const [map, setMap] = useState<google.maps.Map | null>(null);
Problem: map holds the Google Maps instance, not the HTML div. You can't directly attach Google Maps to map—it needs a container (div) first.

The Google Maps API requires a DOM element (document.getElementById('map') equivalent), so mapRef is necessary.



How Does mapRef Have Access to Show the Map?
Good question! Let's break it down step by step.

1. What Is mapRef Actually Holding?
tsx
Copy
Edit
const [mapRef, setMapRef] = useState<HTMLDivElement | null>(null);
mapRef stores a reference to a div (HTML element), not the Google Map itself.

Initially, mapRef is null because the div hasn't been rendered yet.

Once React renders the div, React automatically calls setMapRef(divElement), and mapRef now holds that div reference.

2. How Does Google Maps Attach to mapRef?
tsx
Copy
Edit
useEffect(() => {
    if (mapRef && !map) {
      const initialMap = new google.maps.Map(mapRef, {
        center: { lat: 17.385044, lng: 78.486671 }, // Hyderabad
        zoom: 10,
      });
      setMap(initialMap);
    }
}, [mapRef, map]);
This useEffect runs whenever mapRef changes.

If mapRef is not null, it means the div is now available.

We then create a new Google Maps instance and attach it to mapRef:

tsx
Copy
Edit
new google.maps.Map(mapRef, { ... });
This tells Google Maps:
"Hey, use this div (mapRef) to render the map!"

3. How Does the Map Appear?
🔹 When the component renders:

React creates a <div> element.

The div reference is stored in mapRef.

useEffect initializes Google Maps inside this div.

🔹 Once new google.maps.Map(mapRef, { ... }) runs:

Google Maps modifies the div directly.

It injects the map's UI inside that div.

Since mapRef points to the div, the map appears on the screen.










When to Use useRef vs. useState in Google Maps?
In your case, both useRef and useState can store the map reference (mapRef). However, useRef is the better choice for storing the map's container (div) and even the map instance itself.

📌 Comparing useRef and useState
Hook	When to Use?	Why?
useRef	When storing mutable, non-re-rendering values like DOM elements or external objects.	Does not trigger re-renders when updated. Best for storing DOM references (div for Google Maps).
useState	When storing reactive state that should cause re-renders when changed.	Triggers re-renders when updated, which is unnecessary for Google Maps.
🛑 Why useState Is Not Ideal for mapRef
If you use useState for mapRef like this:

tsx
Copy
Edit
const [mapRef, setMapRef] = useState<HTMLDivElement | null>(null);
Every time setMapRef is called, React re-renders the component.

The map might reinitialize or lose its state.

However, Google Maps does not need re-renders to work. It just needs to be initialized once inside a div.

✅ Best Approach: Use useRef
tsx
Copy
Edit
const mapRef = useRef<HTMLDivElement | null>(null);
const mapInstance = useRef<google.maps.Map | null>(null);

useEffect(() => {
    if (!mapRef.current || mapInstance.current) return; // Avoid re-initialization

    mapInstance.current = new google.maps.Map(mapRef.current, {
        center: { lat: 17.385044, lng: 78.486671 },
        zoom: 10,
    });
}, []);
Why useRef Is Better?
✅ No Unnecessary Re-renders – Unlike useState, useRef updates without triggering a component re-render.

✅ Persists Between Renders – The map instance and div reference remain stable.

✅ More Performant – Prevents multiple re-initializations of Google Maps.

💡 When Should You Use useState?
If you need reactive state updates, like:

Tracking user interactions (e.g., clicked marker)

Changing the center dynamically

Storing UI-related states (e.g., "Is map loaded?")

Example:

tsx
Copy
Edit
const [isMapLoaded, setIsMapLoaded] = useState(false);

useEffect(() => {
  if (mapRef.current && !mapInstance.current) {
    mapInstance.current = new google.maps.Map(mapRef.current, { ... });
    setIsMapLoaded(true);
  }
}, []);
🔥 Conclusion: Use useRef for Google Maps
Use useRef for storing map-related objects (div, google.maps.Map instance).

Use useState only for UI state changes (e.g., "Is map loaded?").

Avoid unnecessary re-renders with useRef.




The `cn` function (imported from `../lib/utils`) is used to **conditionally merge and manage class names efficiently**. It likely uses `clsx` or `tailwind-merge` under the hood.  

### **Why is `cn` required?**
1. **Merging Tailwind Classes Properly**  
   - Tailwind classes can sometimes conflict (e.g., `bg-red-500` and `bg-blue-500` applied together).
   - If `cn` is built using `tailwind-merge`, it intelligently removes conflicting classes.
   
2. **Handling Conditional Classes**  
   - If `className` is provided as a prop, `cn` ensures it merges properly without overriding default styles.
   - Example:
     ```tsx
     <Card className="bg-blue-500" />
     ```
     This will **merge** `"rounded-lg border bg-card text-card-foreground shadow-sm"` with `"bg-blue-500"`, ensuring `bg-card` is replaced by `bg-blue-500`.

3. **Simplifies Class Composition**  
   - Instead of manually concatenating classes using template literals like:
     ```tsx
     <div className={`rounded-lg border ${className || ""}`} />
     ```
     You can simply use:
     ```tsx
     <div className={cn("rounded-lg border", className)} />
     ```

### **How `cn` is usually implemented**
If `cn` is coming from `../lib/utils`, it’s probably defined like this:
```tsx
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
This combines:
- **`clsx`** → For handling conditional class names.
- **`twMerge`** → To intelligently merge Tailwind CSS classes.

### **Example Usage**
```tsx
<Card className="bg-blue-500 text-white" />
```
Without `cn`:
```tsx
<div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} />
```
With `cn`:
```tsx
<div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} />
```
✅ **Ensures Tailwind classes don’t conflict and merge correctly!** 🚀
