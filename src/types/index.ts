export interface IRestaurant {
  _id: string;
  name: string;
  slug: string;
  description: string;
  cuisine: string;
  priceRange: 1 | 2 | 3 | 4;
  rating: number;
  reviewCount: number;
  location: string;
  address: string;
  images: string[];
  isOpen: boolean;
  openingHours: { open: string; close: string };
  menu: IMenuItem[];
  featured: boolean;
  createdAt: string;
}

export interface IMenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

export interface IUser {
  _id: string;
  clerkId: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  savedRestaurants: string[];
  createdAt: string;
}

export interface IBooking {
  _id: string;
  userId: string;
  restaurantId: string | IRestaurant;
  date: string;
  time: string;
  guests: number;
  status: "pending" | "confirmed" | "cancelled";
  specialRequest?: string;
  createdAt: string;
}

export interface IReview {
  _id: string;
  userId: string | IUser;
  restaurantId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface FilterParams {
  search?: string;
  cuisine?: string;
  priceRange?: string;
  rating?: string;
  location?: string;
  isOpen?: string;
  sort?: "rating" | "newest" | "price";
  page?: number;
  limit?: number;
}