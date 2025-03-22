import { MapMarker } from "./types";


export async function fetchMapMarkers(): Promise<MapMarker[]> {
    try {
      const response = await fetch('https://prod-be.1acre.in/lands/landmaps/?seller_id=211');
      if (!response.ok) {
        throw new Error(`Failed to fetch map markers: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      return data.results
        .filter((marker: any) => marker.lat && marker.long) // Ensure lat/long exist
        .map((marker: any) => ({
          id: marker.id,
          latitude: parseFloat(marker.lat), // Convert string to number
          longitude: parseFloat(marker.long), // Convert string to number
          total_acres: parseFloat((marker.total_land_size || 0).toFixed(2)), // Default to 0 if missing
          price_per_acre: marker.land_price?.price_per_acre_crore?.lakh || 0, // Default price
        }));
    } catch (error) {
      console.error('Error fetching map markers:', error);
      return [];
    }
  }



  export async function fetchProperties(page = 1) {
    try {
        const response = await fetch(`https://prod-be.1acre.in/lands/?seller=211&page=${page}&page_size=10`);
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        
        const data = await response.json();
        console.log("API Response:", data); // Log full response

        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return { results: [], next: null };
    }
}

