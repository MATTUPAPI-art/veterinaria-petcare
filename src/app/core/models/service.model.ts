export type ServiceCategory = 'consulta' | 'cirugia' | 'estetica' | 'laboratorio' | 'emergencia';

export interface Service {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  priceFrom: number;
  currency: string;
  durationMinutes: number;
  category: ServiceCategory;
  available: boolean;
}
