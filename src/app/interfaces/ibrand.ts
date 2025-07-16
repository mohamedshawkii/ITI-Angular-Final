export interface iBrand {
  id: number;
  name: string;
  description: string;
  address: string;
  image: string;
  category: string;
  productCount: number;
  averageRating: number;
  

  icon?: string;
  location?: string;
  isFollowed?: boolean;
}
