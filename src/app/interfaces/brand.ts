export interface Brand {
  id: number;
  name: string;
  category: string;
  description: string;
  icon: string;
  rating: number;
  productCount: number;
  location?: string;
  isFollowed: boolean;
}
