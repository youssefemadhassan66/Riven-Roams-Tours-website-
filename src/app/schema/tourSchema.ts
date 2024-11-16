export interface TourSchema {
  id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: 'easy' | 'medium' | 'difficult';
  ratingsAverage: number;
  ratingQuantity: number;
  price: number;
  priceDiscount?: number;
  bestSeller: boolean;
  summary: string;
  description?: string;
  imageCover: string;
  images: string[];
  createdAt?: Date;
  startDates: Date[];
  secretTour?: boolean;
  startLocation: {
      type: 'Point';
      coordinates: number[];
      address?: string;
      description?: string;
  };
  locations: {
      type: 'Point';
      coordinates: number[];
      address?: string;
      description?: string;
      day?: number;
  }[];
  guides: string[];
}
