export type PropertyType = "hotel" | "apartments" | "villas";

export type FacilityType =
  | "parking"
  | "restaurant"
  | "spa"
  | "free-wifi"
  | "fitness-center"
  | "room-service"
  | "kids-playground";

export interface PriceModel {
  adult: number;
  child: number;
}

export interface PropertyModel {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  reviewScore: number;
  reviewsCount: number;
  type: PropertyType[];
  facilities: FacilityType[];
  price: PriceModel;
  imageUrl: string;
}
