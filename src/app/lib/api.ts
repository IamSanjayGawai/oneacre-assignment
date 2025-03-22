import { MapMarker } from "./types";

export async function fetchMapMarkers(): Promise<MapMarker[]> {
  try {
    const response = await fetch(
      "https://prod-be.1acre.in/lands/landmaps/?seller_id=211"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch map markers: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching map markers:", error);
    return [];
  }
}
