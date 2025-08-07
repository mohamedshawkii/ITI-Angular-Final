export interface IBrand {
  id: number;
  name: string;
  description?: string;
  address?: string;
  image?: string;
  profileImage?: string;
  categoryID: string;
  categoryName: string;
  ownerID: string;
  productCount?: number;
  averageRating?: number;
  icon?: string;
  location?: string;
  isFollowed?: boolean;
}
