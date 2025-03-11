export interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  reviews: Review[];
}

export interface Review {
  reviewerName: string;
  rating: number;
  comment: string;
  date: Date;
}
