export interface MapMarker {
    long: number | (() => number);
    lat: number | (() => number);
    id: string;
    latitude: number;
    longitude: number;
    property_id: string;
    price_per_acre: number;
    total_acres: number;
  }