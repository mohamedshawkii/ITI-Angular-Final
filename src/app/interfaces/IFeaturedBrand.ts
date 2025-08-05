export interface IFeaturedBrand {
  id: number;
  name: string;
  description: string;
  icon?: string;
  category?: string;
  isNew?: boolean;
  specialOffer?: string;
  isFollowed?: boolean;
}
