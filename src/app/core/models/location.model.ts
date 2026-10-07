export interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  schedule: { days: string; hours: string }[];
  image: string;
  mapUrl: string;
  coordinates: { lat: number; lng: number };
}
