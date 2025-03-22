export interface MapMarker {
  id: string;
  latitude: number;
  longitude: number;
  property_id: string;
  price_per_acre: number;
  total_acres: number;
}

export interface Property {
  id: string;
  title?: string;
  land_media: any;
  land_price: number;
  currency_type: string;
  land_size: {
    total_land_size_in_acres: {
      acres: number;
      cents?: number | null;
      guntas?: number | null;
    };
  };
  location: {
    district: string;
    village: string;
  };
  images: string[];
  price_per_acre: number;
  price_type: string; // "lakhs" or "Cr"
  total_acres: number;
  total_guntas: number;
  slug: string;
  loading?: boolean;
}
