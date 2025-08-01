export interface iBrand {
  id: number;
  name: string;
  description?: string;
  address?: string;
  image?: string;
  categoryID: string;
  OwnerID: string;
  productCount?: number;
  averageRating?: number;
  icon?: string;
  location?: string;
  isFollowed?: boolean;
}
